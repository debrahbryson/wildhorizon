import secrets
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone

from fastapi import Depends, FastAPI, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from .config import settings
from .database import Base, engine, get_db
from .models import Inquiry
from .schemas import InquiryIn, InquiryOut


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=engine)  # swap for Alembic migrations later
    yield


app = FastAPI(title="Wildhorizon API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-API-Key"],
)


def require_admin(x_api_key: str = Header(default="")):
    if not settings.admin_api_key:
        raise HTTPException(503, "ADMIN_API_KEY is not configured")
    if not secrets.compare_digest(x_api_key, settings.admin_api_key):
        raise HTTPException(401, "Invalid API key")


@app.get("/api/v1/health")
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok"}


@app.post("/api/v1/inquiries", status_code=201)
def create_inquiry(data: InquiryIn, db: Session = Depends(get_db)):
    # Duplicate guard: same email + same message within the last 60 seconds
    since = datetime.now(timezone.utc) - timedelta(seconds=60)
    dup = db.scalar(
        select(Inquiry).where(
            Inquiry.email == data.email,
            Inquiry.notes == data.notes,
            Inquiry.created_at > since,
        )
    )
    if dup:
        return {"id": dup.id, "duplicate": True}

    row = Inquiry(**data.model_dump())
    db.add(row)
    db.commit()
    return {"id": row.id}


@app.get("/api/v1/inquiries", response_model=list[InquiryOut], dependencies=[Depends(require_admin)])
def list_inquiries(limit: int = 100, db: Session = Depends(get_db)):
    limit = max(1, min(limit, 500))
    return db.scalars(select(Inquiry).order_by(Inquiry.created_at.desc()).limit(limit)).all()