// Image URLs are placeholders: swap for licensed/own photography. Broken URLs fall back gracefully.
const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=70`
export type Destination = {
  slug: string; name: string; kicker: string; blurb: string; story: string; image: string; alt: string
  highlights: string[]; best: string; duration: string; coords: { x: number; y: number }; type: 'safari' | 'trek'; related: string[]
}
export const destinations: Destination[] = [
  { slug: 'serengeti', name: 'The Serengeti', kicker: 'Open plains · Great Migration', type: 'safari',
    blurb: 'Endless plains, big cats and the great wildebeest movement.',
    story: 'The Serengeti is Tanzania\'s great open stage. Herds of wildebeest and zebra move in a circular pattern through the ecosystem across the year, followed by predators. Where the herds are depends on rainfall, so timing is worth discussing with us.',
    image:  '/images/serengeti.jpg', alt: 'Acacia tree on the open Serengeti plains at golden hour',
    highlights: ['Wildebeest and zebra herds', 'Lions, leopards and cheetahs', 'Vast open plains', 'Optional dawn game drives'],
    best: 'Wildlife is good year-round; herd location shifts with the seasons, so choose your region by month. Ask us for current guidance.',
    duration: 'Commonly 3–5 days within the park', coords: { x: 46, y: 22 }, related: ['ngorongoro', 'tarangire'] },
  { slug: 'ngorongoro', name: 'Ngorongoro Crater', kicker: 'Volcanic caldera · Dense wildlife', type: 'safari',
    blurb: 'A volcanic caldera holding remarkable concentrations of wildlife.',
    story: 'The crater floor is a compact, dramatic landscape of grassland, lakes and forest edge, home to a large resident wildlife population. Early mornings on the rim are often cool and misty.',
    image: u('photo-1547471080-7cc2caa01a7e'), alt: 'Elephant walking across grassland in Tanzania',
    highlights: ['Crater-floor game drives', 'Rim viewpoints', 'Rhino sightings possible', 'Short visits fit most itineraries'],
    best: 'Visited year-round; the dry months can mean easier driving and clearer views, though crowds vary.',
    duration: 'Often 1–2 days', coords: { x: 52, y: 30 }, related: ['serengeti', 'tarangire'] },
  { slug: 'tarangire', name: 'Tarangire', kicker: 'Baobabs · Elephant country', type: 'safari',
    blurb: 'Ancient baobabs and elephant herds along a seasonal river.',
    story: 'Tarangire is known for its large baobab trees and elephants gathering near the river, especially in the dry season when other water sources shrink.',
    image: u('photo-1523805009345-7448845a9e53'), alt: 'Elephants and baobab trees in Tarangire National Park',
    highlights: ['Baobab landscapes', 'Elephant herds', 'Birdlife', 'Easy add-on to a northern circuit'],
    best: 'Dry season generally concentrates wildlife near the river; confirm timing with us.',
    duration: 'Often 1–2 days', coords: { x: 56, y: 42 }, related: ['ngorongoro', 'serengeti'] },
  { slug: 'kilimanjaro', name: 'Kilimanjaro', kicker: 'Africa\'s highest mountain · Trekking', type: 'trek',
    blurb: 'A true mountain expedition, distinct from a wildlife safari.',
    story: 'Kilimanjaro is a physical, multi-day trek through changing ecological zones to a high-altitude summit. It requires preparation, acclimatisation time and a suitable route, and is planned very differently from a game-drive safari.',
    image: u('photo-1589553416260-f586c8f1514f'), alt: 'Mount Kilimanjaro rising above clouds',
    highlights: ['Multiple route options', 'Changing ecological zones', 'Summit-day challenge', 'Pairs with a short safari afterward'],
    best: 'Trekking is commonly done in the drier seasons; conditions vary by route and month.',
    duration: 'Typically 6–9 days on the mountain depending on route', coords: { x: 68, y: 38 }, related: ['tarangire', 'ngorongoro'] },
]
export type Safari = { slug: string; title: string; style: string; blurb: string; image: string; alt: string; duration: string; route: string[]; days: { t: string; d: string }[]; included: string[]; excluded: string[] }
const std = { included: ['Itinerary design and planning support', 'Items to be confirmed in your quotation'], excluded: ['International flights', 'Travel insurance', 'Items not listed in your final quotation'] }
export const safaris: Safari[] = [
  { slug: 'luxury-northern-circuit', title: 'Luxury Northern Circuit', style: 'Luxury', blurb: 'Refined camps and lodges across Tanzania\'s northern parks.', image: destinations[0].image, alt: destinations[0].alt, duration: 'Example: 7 days (customisable)', route: ['Arusha', 'Tarangire', 'Ngorongoro', 'Serengeti'],
    days: [{ t: 'Day 1 · Arrive Arusha', d: 'Meet your guide and settle in.' }, { t: 'Day 2 · Tarangire', d: 'Game drives among baobabs and elephants.' }, { t: 'Day 3 · Ngorongoro', d: 'Crater rim and descent to the floor.' }, { t: 'Days 4–6 · Serengeti', d: 'Full days on the plains, region chosen for the season.' }, { t: 'Day 7 · Departure', d: 'Transfer for your onward journey.' }], ...std },
  { slug: 'private-photography', title: 'Private Photography Safari', style: 'Photography', blurb: 'Unhurried light, a flexible vehicle and time at each sighting.', image: destinations[1].image, alt: destinations[1].alt, duration: 'Example: 8 days (customisable)', route: ['Arusha', 'Tarangire', 'Serengeti', 'Ngorongoro'],
    days: [{ t: 'Days 1–2', d: 'Arrive and begin in Tarangire.' }, { t: 'Days 3–6', d: 'Serengeti dawn and dusk drives.' }, { t: 'Days 7–8', d: 'Ngorongoro, then depart.' }], ...std },
  { slug: 'family-adventure', title: 'Family Safari', style: 'Family', blurb: 'Shorter drives, flexible pacing and family-friendly stays.', image: destinations[2].image, alt: destinations[2].alt, duration: 'Example: 6 days (customisable)', route: ['Arusha', 'Tarangire', 'Ngorongoro'],
    days: [{ t: 'Days 1–3', d: 'Arusha and Tarangire at a relaxed pace.' }, { t: 'Days 4–5', d: 'Ngorongoro Crater.' }, { t: 'Day 6', d: 'Depart.' }], ...std },
  { slug: 'honeymoon', title: 'Honeymoon Safari', style: 'Honeymoon', blurb: 'Quiet, romantic settings and time to slow down.', image: destinations[0].image, alt: destinations[0].alt, duration: 'Example: 7 days (customisable)', route: ['Arusha', 'Serengeti'],
    days: [{ t: 'Days 1–2', d: 'Arrive and rest in Arusha.' }, { t: 'Days 3–6', d: 'Serengeti with private sundowners (to be arranged).' }, { t: 'Day 7', d: 'Depart.' }], ...std },
  { slug: 'kilimanjaro-trek', title: 'Kilimanjaro Trek', style: 'Mountain', blurb: 'A route-led mountain expedition, optionally paired with a safari.', image: destinations[3].image, alt: destinations[3].alt, duration: 'Example: 8 days (route-dependent)', route: ['Moshi / Arusha', 'Kilimanjaro'],
    days: [{ t: 'Day 1', d: 'Briefing and gear check.' }, { t: 'Days 2–7', d: 'Trek stages according to the chosen route.' }, { t: 'Day 8', d: 'Descent and celebration.' }], ...std },
]
export const wildlife = [
  { n: 'Lion', img: u('photo-1546182990-dffeafbe841d'), alt: 'Lion resting in golden grass' },
  { n: 'Elephant', img: u('photo-1564760055775-d63b17a55c44'), alt: 'African elephant on the savanna' },
  { n: 'Giraffe', img: u('photo-1547721064-da6cfb341d50'), alt: 'Giraffe standing against the sky' },
  { n: 'Zebra', img: u('photo-1501706362039-c06b2d715385'), alt: 'Zebras grazing on the plains' },
]
export type Post = { slug: string; title: string; cat: string; mins: number; excerpt: string; body: string[] }
export const posts: Post[] = [
  { slug: 'understanding-the-great-migration', title: 'Understanding the Great Migration', cat: 'Wildlife', mins: 4, excerpt: 'Why it is a year-round movement, not a single event.', body: ['The migration is a continuous cycle shaped by rainfall and grazing, so herds are in different parts of the ecosystem at different times.', 'Rather than chasing one famous moment, choose a region and month together. We will explain the trade-offs when you inquire.'] },
  { slug: 'choosing-your-safari-season', title: 'Choosing Your Safari Season', cat: 'Planning', mins: 3, excerpt: 'Dry versus green season, and what each offers.', body: ['Dry seasons often make wildlife easier to find near water. Green seasons bring lush scenery and birdlife.', 'Exact dates matter; treat this as general guidance and confirm with your planner.'] },
  { slug: 'wildlife-photography-basics', title: 'Wildlife Photography Basics', cat: 'Photography', mins: 5, excerpt: 'Light, patience and positioning from a safari vehicle.', body: ['Early and late light is usually softest. Ask for time at each sighting, and keep gear within easy reach.', 'A beanbag is a simple, effective support in a vehicle.'] },
  { slug: 'preparing-for-kilimanjaro', title: 'Preparing for Kilimanjaro', cat: 'Mountain', mins: 5, excerpt: 'What a trek asks of you, and why route choice matters.', body: ['Kilimanjaro is a sustained physical effort at altitude. Training, layered clothing and a realistic schedule matter.', 'Speak with a doctor before booking. We can suggest routes once we know your goals.'] },
]
