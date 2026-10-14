import galleryPhotos from "./gallery-photos.json";
export interface Photograph {
  hotspot?: { x: number; y: number };
  src: string;
  alt: string;
}
export interface Album {
  title: string;
  slug: string;
  category: string;
  location: string;
  description: string;
  cover: Photograph;
  images: Photograph[];
}
export const settings = {
  headline: "Portraits that feel like you.",
  introduction:
    "Family, portrait, and brand photography. Thoughtful planning, gentle direction, and photographs you’ll want to keep.",
  story:
    "A favorite shirt. The people who know you best. A new chapter with your name on it. We’re drawn to the details that make a photograph feel personal. Alder House is an imagined independent studio with a relaxed approach and a love for timeless, natural images.",
};
const family = {
  src: "/images/family.jpg",
  alt: "Parents in light summer clothes walking along the beach with their two children",
};
const portrait = {
  hotspot: { x: 0.5, y: 0 },
  src: "/images/portrait.jpg",
  alt: "A woman in a tailored pinstripe blazer beside a pale textured wall",
};
const brand = {
  hotspot: { x: 0.5, y: 0.15 },
  src: "/images/brand.jpg",
  alt: "A woman wearing a white blazer over a blue top in a bright studio portrait",
};
const couple = {
  hotspot: { x: 0.5, y: 0.8 },
  src: "/images/couple.jpg",
  alt: "A couple dressed in white walking hand in hand along the water’s edge",
};
export const albums: Album[] = [
  {
    title: "A little salt air",
    slug: "a-little-salt-air",
    category: "Families",
    location: "Coastal afternoons",
    description:
      "Bare feet, crisp cotton, and the whole afternoon ahead. An illustrative family story about making room for a little play.",
    cover: family,
    images: [
      family,
      ...galleryPhotos.filter((photo) => photo.group === "family"),
    ],
  },
  {
    title: "In your element",
    slug: "in-your-element",
    category: "Portraits",
    location: "A fresh perspective",
    description:
      "A favorite blazer and a quiet kind of confidence. An imagined portrait session that leaves room for personality.",
    cover: portrait,
    images: [
      portrait,
      ...galleryPhotos.filter((photo) => photo.group === "portrait"),
    ],
  },
  {
    title: "A name of your own",
    slug: "a-name-of-your-own",
    category: "Brands",
    location: "The studio edit",
    description:
      "Clean light, thoughtful styling, and a face behind the work. An illustrative personal-brand portrait for a new chapter.",
    cover: brand,
    images: [
      brand,
      ...galleryPhotos.filter((photo) => photo.group === "brand"),
    ],
  },
  {
    title: "Just us, just here",
    slug: "just-us-just-here",
    category: "Couples",
    location: "Along the shoreline",
    description:
      "An anniversary, a fresh start, or a day with no occasion at all. An imagined coastal story for two.",
    cover: couple,
    images: [
      couple,
      ...galleryPhotos.filter((photo) => photo.group === "couple"),
    ],
  },
];
export const sessions = [
  {
    id: "portraits",
    name: "Portraits & milestones",
    action: "Find your portrait session",
    number: "01",
    description:
      "A graduation, a new chapter, or simply a photograph that feels like you. Natural direction, thoughtful styling, and room for your personality.",
    detail: "Individuals · Graduates · Personal milestones",
  },
  {
    id: "families",
    name: "Families & couples",
    action: "Plan time with your people",
    number: "02",
    description:
      "Your favorite people, exactly as they are. Easygoing sessions with a little movement, a little laughter, and no need to have it all together.",
    detail: "Families · Couples · Everyday life",
  },
  {
    id: "brands",
    name: "Brands & makers",
    action: "Bring your brand to life",
    number: "03",
    description:
      "Put a face to what you do. Considered portraits and lifestyle images for independent businesses and people with something to share.",
    detail: "Headshots · Personal branding · Editorial",
  },
  {
    id: "celebrations",
    name: "Gatherings & weddings",
    action: "Capture your celebration",
    number: "04",
    description:
      "From a backyard anniversary to an intimate wedding. The people, the details, and the feeling of being there together.",
    detail: "Intimate weddings · Parties · Anniversaries",
  },
];
