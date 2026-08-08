export interface LensCoating {
  name: string;
  color: string; // hex code for UI accent
  flareClass: string; // for CSS styling
  description: string;
}

export interface LensSpecs {
  focalLength: string;
  aperture: string;
  mount: string;
  weight: string;
  construction: string;
  filterSize: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'camera' | 'cinema' | 'specialty';
  price: number;
  description: string;
  coating: LensCoating;
  specs: LensSpecs;
  features: string[];
  rating: number;
  reviewsCount: number;
  madeIn: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "klarheit-50mm-aureum",
    name: "Klarheit 50mm f/1.2 Aureum",
    tagline: "The Golden Standard of German Portraiture",
    category: "camera",
    price: 1899,
    description: "Handcrafted in Wetzlar, the Aureum 50mm represents the pinnacle of optical engineering. Engineered with custom gold anti-reflective multi-coating, it delivers warm skin tones, stunning micro-contrast, and an incredibly smooth transition from focus to creamy bokeh. Ideal for standard focal length portraits and street photography.",
    coating: {
      name: "Aureum Gold Flare",
      color: "#FFCC00",
      flareClass: "flare-gold",
      description: "A custom gold coating that softens highlights and renders skin with an exquisite, warm German glow."
    },
    specs: {
      focalLength: "50mm",
      aperture: "f/1.2 - f/16",
      mount: "L-Mount / E-Mount / M-Mount",
      weight: "620g",
      construction: "11 elements in 8 groups (3 aspherical)",
      filterSize: "72mm"
    },
    features: [
      "Fluorite lens elements for exceptional chromatic aberration correction",
      "Manual and autofocus models available with linear motor system",
      "Robust weather-sealed aluminum alloy camera chassis",
      "Clickable / clickless aperture ring switch"
    ],
    rating: 4.9,
    reviewsCount: 142,
    madeIn: "Wetzlar, Germany",
    image: "/images/lens-gold.jpg"
  },
  {
    id: "spektrum-85mm-rubin",
    name: "Spektrum 85mm f/1.4 Rubin",
    tagline: "Unmatched Depth and Crimson Brilliance",
    category: "camera",
    price: 2150,
    description: "Designed and assembled in Oberkochen, the Rubin 85mm is optimized for absolute sharpness at wide-open apertures. The ruby-red multi-coating effectively controls stray light and chromatic aberrations, producing a distinct warm crimson flare under strong backlighting. A favorite for high-fashion and commercial portrait photographers.",
    coating: {
      name: "Rubin Crimson Flare",
      color: "#DE263E",
      flareClass: "flare-red",
      description: "A rich red multi-coating optimized for peak red wavelength light transmission, creating dramatic warm lens flares."
    },
    specs: {
      focalLength: "85mm",
      aperture: "f/1.4 - f/16",
      mount: "L-Mount / E-Mount / RF-Mount",
      weight: "780g",
      construction: "13 elements in 10 groups (2 ED glass)",
      filterSize: "77mm"
    },
    features: [
      "Extra-low dispersion (ED) glass elements for maximum contrast",
      "Internal focusing mechanism prevents lens barrel extension",
      "9-rounded aperture blades for perfectly round bokeh balls",
      "Dust and moisture resistance for extreme environments"
    ],
    rating: 4.8,
    reviewsCount: 96,
    madeIn: "Oberkochen, Germany",
    image: "/images/lens-red.jpg"
  },
  {
    id: "prisma-cine-35mm-saphir",
    name: "Prisma Cine 35mm T1.5 Saphir",
    tagline: "Cinematic Precision and Cool Sapphire Flare",
    category: "cinema",
    price: 3499,
    description: "Engineered in Munich for cinematographers demanding clinical precision with artistic character. The Saphir Cine 35mm features industry-standard 0.8 MOD gears, a step-less aperture, and our signature sapphire blue anti-reflective coating, yielding cold-blue horizontal flares that echo the aesthetics of classic cinematic anamorphic masterpieces.",
    coating: {
      name: "Saphir Blue Multi-coating",
      color: "#00A3FF",
      flareClass: "flare-blue",
      description: "An advanced multi-layered blue coating that creates distinct cool horizontal flares when striking direct light sources."
    },
    specs: {
      focalLength: "35mm",
      aperture: "T1.5 - T22",
      mount: "PL Mount / EF Mount",
      weight: "1120g",
      construction: "14 elements in 12 groups (4 aspherical, 2 fluorite)",
      filterSize: "95mm Front Diameter"
    },
    features: [
      "Zero focus breathing design, maintaining exact framing during rack focus",
      "Luminous focus and aperture markings for dark cinematic sets",
      "Uniform front diameter and gear placement across the entire Prisma Cine series",
      "Fully manual mechanical focus with 270 degrees of rotation"
    ],
    rating: 5.0,
    reviewsCount: 38,
    madeIn: "Munich, Germany",
    image: "/images/lens-blue.jpg"
  },
  {
    id: "wald-zoom-smaragd",
    name: "Wald Zoom 24-70mm f/2.8 Smaragd",
    tagline: "The Versatile Workhorse with Emerald Contrast",
    category: "camera",
    price: 2399,
    description: "The Smaragd 24-70mm zoom lens combines prime-like sharpness with the flexibility of a standard zoom range. Developed with an emerald-green coating, it excels in landscape and outdoor photography, enhancing greens and earthy tones while maintaining absolute color accuracy across the frame.",
    coating: {
      name: "Smaragd Emerald Flare",
      color: "#10B981",
      flareClass: "flare-green",
      description: "A specialized green-reflection coating that enriches natural foliage colors and cuts through mountain haze."
    },
    specs: {
      focalLength: "24-70mm",
      aperture: "f/2.8 - f/22",
      mount: "L-Mount / E-Mount / Z-Mount",
      weight: "890g",
      construction: "18 elements in 15 groups (5 aspherical, 3 ED)",
      filterSize: "82mm"
    },
    features: [
      "Constant f/2.8 max aperture throughout the entire zoom range",
      "Fluorine front element coating rejects water, oil, and smudges",
      "Dual linear autofocus motors for silent, instantaneous focus tracking",
      "Customizable focus hold button on the lens body"
    ],
    rating: 4.7,
    reviewsCount: 165,
    madeIn: "Wetzlar, Germany",
    image: "/images/lens-green.jpg"
  },
  {
    id: "nacht-21mm-amethyst",
    name: "Nacht 21mm f/1.8 Amethyst",
    tagline: "Astro-Precision with Deep Violet Light Transmission",
    category: "specialty",
    price: 1750,
    description: "The Nacht 21mm is a wide-angle prime designed specifically for astrophotography and architectural interiors. Made in Oberkochen, its Amethyst coating is formulated to maximize light transmission in dark skies, eliminating sagittal coma flare so stars remain perfect pinpoints from corner to corner.",
    coating: {
      name: "Amethyst Purple Coating",
      color: "#D946EF",
      flareClass: "flare-purple",
      description: "A high-transmittance violet coating designed to minimize chromatic coma aberration and capture stellar detail."
    },
    specs: {
      focalLength: "21mm",
      aperture: "f/1.8 - f/16",
      mount: "E-Mount / Z-Mount / RF-Mount",
      weight: "510g",
      construction: "10 elements in 9 groups (1 double-sided aspherical)",
      filterSize: "67mm"
    },
    features: [
      "Unrivaled control of sagittal coma flare for stargazing accuracy",
      "Ultra-compact and lightweight housing for gimbal and drone usage",
      "Rear filter slot option for gel filters",
      "Focus click switch for tactile focus positioning"
    ],
    rating: 4.9,
    reviewsCount: 54,
    madeIn: "Oberkochen, Germany",
    image: "/images/lens-purple.jpg"
  }
];
