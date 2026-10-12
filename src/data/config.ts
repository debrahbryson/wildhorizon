// Central site configuration: edit here to rebrand. Contact fields are placeholders.
export const brand = {
  name: 'WILDHORIZON SAFARIS',
  short: 'WILDHORIZON',
  tagline: 'Extraordinary journeys · Tanzania, East Africa',
  email: '' as string, // e.g. 'hello@yourdomain.com' — leave empty until real
  phone: '' as string,
  address: '' as string,
  social: { instagram: '', facebook: '', youtube: '' } as Record<string, string>,
  siteUrl: 'https://example.com',
  inquiryEndpoint: (import.meta.env.VITE_INQUIRY_ENDPOINT as string | undefined) ?? '',
}
export const nav = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Safari experiences', to: '/safaris' },
  { label: 'Our story', to: '/about' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]
