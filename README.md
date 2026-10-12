# WILDHORIZON SAFARIS (placeholder brand)
Run: `npm install && npm run dev` · Build: `npm run build` · Preview: `npm run preview`

## Configure
- Brand, email, phone, social, nav: `src/data/config.ts`
- Destinations, safaris, wildlife images, journal: `src/data/content.ts` (swap image URLs for licensed/own photos; broken images fall back to a gradient)
- Colors/fonts: CSS variables at top of `src/styles.css`
- Inquiry form: set `VITE_INQUIRY_ENDPOINT` (a URL accepting JSON POST). Without it the form validates but shows an honest "not connected" error; nothing is faked.
- Hosting: `public/_redirects` handles refresh on nested routes (Netlify/Cloudflare). On other hosts add an SPA rewrite to index.html.
