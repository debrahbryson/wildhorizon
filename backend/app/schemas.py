from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


class InquiryIn(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    country: str = Field(min_length=1, max_length=120)
    dates: str = Field(min_length=1, max_length=200)
    travelers: int = Field(ge=1, le=50)
    interests: list[str] = Field(default_factory=list, max_length=20)
    budget: str = Field(default="", max_length=120)
    notes: str = Field(default="", max_length=3000)
    consent: bool

    @field_validator("name", "country", "dates", "budget", "notes")
    @classmethod
    def strip(cls, v: str) -> str:
        return v.strip()

    @field_validator("consent")
    @classmethod
    def must_consent(cls, v: bool) -> bool:
        if not v:
            raise ValueError("Consent is required")
        return v


class InquiryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    name: str
    email: str
    country: str
    dates: str
    travelers: int
    interests: list[str]
    budget: str
    notes: str
    status: str