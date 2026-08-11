import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const adminPassword = await bcrypt.hash("admin123", 12);
  const customerPassword = await bcrypt.hash("customer123", 12);

  const admin = await prisma.user.create({
    data: {
      email: "admin@klarheit-optik.de",
      passwordHash: adminPassword,
      role: "ADMIN",
      name: "Klaus Weber",
      companyName: "Klarheit Optik GmbH",
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: "customer@example.com",
      passwordHash: customerPassword,
      role: "CUSTOMER",
      name: "Dr. Sarah Chen",
      companyName: "Photonics Research Lab",
      taxId: "DE123456789",
    },
  });

  console.log("✅ Users created:", admin.email, customer.email);

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Lithography Equipment",
        slug: "lithography-equipment",
        description:
          "High-precision EUV and DUV lithography optics for semiconductor manufacturing. Sub-nanometer accuracy projection lenses, illumination systems, and wafer stepper components.",
        icon: "Cpu",
      },
    }),
    prisma.category.create({
      data: {
        name: "Photonic Sensors",
        slug: "photonic-sensors",
        description:
          "Advanced photonic detection and sensing systems. Photodiodes, spectrometers, LiDAR components, and fiber-optic sensing modules for industrial and research applications.",
        icon: "Zap",
      },
    }),
    prisma.category.create({
      data: {
        name: "Photography Lenses",
        slug: "photography-lenses",
        description:
          "Premium optical glass lenses for professional photography and cinematography. Ultra-sharp prime and zoom lenses with multi-layer anti-reflective coatings.",
        icon: "Camera",
      },
    }),
    prisma.category.create({
      data: {
        name: "Optical Filters",
        slug: "optical-filters",
        description:
          "Precision-engineered bandpass, longpass, shortpass, and neutral density filters. Custom substrate materials with ion-beam sputtered coatings for scientific and industrial use.",
        icon: "Filter",
      },
    }),
  ]);

  console.log("✅ Categories created:", categories.length);

  // Create products
  const products = await Promise.all([
    // Lithography Equipment (RFQ only - high value B2B)
    prisma.product.create({
      data: {
        name: "EUV Projection Lens Assembly",
        slug: "euv-projection-lens-assembly",
        sku: "KO-LITH-001",
        categoryId: categories[0].id,
        priceEUR: 2450000,
        stock: 2,
        isRFQOnly: true,
        featured: true,
        description:
          "State-of-the-art extreme ultraviolet (13.5nm) projection optics system for next-generation semiconductor lithography. Features 0.33 NA with aberration-corrected multilayer Mo/Si mirrors. Designed for ≤5nm node wafer patterning with overlay accuracy below 1nm.",
        technicalSpecs: JSON.stringify({
          wavelength: "13.5 nm (EUV)",
          numericalAperture: "0.33 NA",
          fieldSize: "26 x 33 mm",
          resolution: "≤ 5 nm node",
          overlayAccuracy: "< 1 nm",
          mirrorCount: "6 aspherical mirrors",
          coating: "Mo/Si multilayer",
          weight: "1,200 kg",
          operatingEnvironment: "Vacuum, class 1 cleanroom",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "DUV Stepper Illumination Module",
        slug: "duv-stepper-illumination-module",
        sku: "KO-LITH-002",
        categoryId: categories[0].id,
        priceEUR: 875000,
        stock: 4,
        isRFQOnly: true,
        description:
          "ArF excimer laser (193nm) illumination subsystem for deep-ultraviolet lithography steppers. Provides uniform pupil illumination with programmable coherence settings including annular, dipole, and quadrupole modes for enhanced pattern fidelity.",
        technicalSpecs: JSON.stringify({
          wavelength: "193 nm (ArF)",
          illuminationUniformity: "< 0.5% (3σ)",
          coherenceModes: "Conventional, Annular, Dipole, Quadrupole, Freeform",
          pupilFillFactor: "0.3 - 0.9 σ",
          energyStability: "< 0.1% (pulse-to-pulse)",
          repetitionRate: "Up to 6 kHz",
          opticalElements: "Fused silica, CaF₂",
          lifetime: "> 30 billion pulses",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "Wafer Alignment Optics Kit",
        slug: "wafer-alignment-optics-kit",
        sku: "KO-LITH-003",
        categoryId: categories[0].id,
        priceEUR: 320000,
        stock: 6,
        isRFQOnly: true,
        description:
          "Through-the-lens (TTL) alignment optics package for wafer stepper overlay registration. Broadband illumination with high-resolution imaging optics for multi-mark detection across all lithography layers.",
        technicalSpecs: JSON.stringify({
          alignmentAccuracy: "< 2 nm (3σ)",
          markTypes: "Box-in-box, AIS, ASML proprietary",
          wavelengthRange: "500 - 900 nm broadband",
          fieldOfView: "200 × 200 μm",
          magnification: "100×",
          throughput: "> 250 wafers/hour",
          compatibility: "ASML TWINSCAN, Canon FPA, Nikon NSR",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1580711508376-7fd77b007e96?w=800",
        ]),
      },
    }),

    // Photonic Sensors
    prisma.product.create({
      data: {
        name: "InGaAs Broadband Photodetector",
        slug: "ingaas-broadband-photodetector",
        sku: "KO-PHOT-001",
        categoryId: categories[1].id,
        priceEUR: 4250,
        stock: 45,
        isRFQOnly: false,
        featured: true,
        description:
          "High-sensitivity InGaAs PIN photodiode module for near-infrared detection (900–1700 nm). Thermoelectrically cooled with integrated transimpedance amplifier for low-noise spectroscopic and telecom applications.",
        technicalSpecs: JSON.stringify({
          spectralRange: "900 - 1700 nm",
          peakResponsivity: "1.0 A/W @ 1550 nm",
          darkCurrent: "< 1 nA (@ -5V, 25°C)",
          bandwidth: "DC to 150 MHz (-3dB)",
          activeArea: "1.0 mm diameter",
          cooling: "2-stage TEC, -40°C",
          nep: "2 × 10⁻¹⁵ W/√Hz",
          connector: "FC/APC fiber, BNC electrical",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "Fiber-Optic Spectrometer Module",
        slug: "fiber-optic-spectrometer-module",
        sku: "KO-PHOT-002",
        categoryId: categories[1].id,
        priceEUR: 8900,
        stock: 18,
        isRFQOnly: false,
        featured: true,
        description:
          "Compact crossed Czerny-Turner spectrometer with back-thinned CCD detector. UV-VIS-NIR coverage from 200–1100 nm with 0.1 nm resolution. USB interface with LabVIEW and Python SDK included.",
        technicalSpecs: JSON.stringify({
          spectralRange: "200 - 1100 nm",
          resolution: "0.1 nm (FWHM)",
          detector: "2048-pixel back-thinned CCD",
          dynamicRange: "50,000:1",
          integrationTime: "1 ms - 60 s",
          strayLight: "< 0.05% @ 435 nm",
          interface: "USB 3.0, SMA905 fiber input",
          dimensions: "110 × 72 × 40 mm",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "LiDAR Time-of-Flight Sensor",
        slug: "lidar-tof-sensor",
        sku: "KO-PHOT-003",
        categoryId: categories[1].id,
        priceEUR: 12500,
        stock: 12,
        isRFQOnly: false,
        description:
          "Solid-state LiDAR ToF sensor module with 905nm pulsed laser source. 120° × 25° field of view, 200m range. Automotive-grade (AEC-Q102) with integrated FPGA point-cloud processing.",
        technicalSpecs: JSON.stringify({
          wavelength: "905 nm pulsed laser",
          range: "0.1 - 200 m",
          fieldOfView: "120° × 25°",
          angularResolution: "0.1° × 0.1°",
          pointRate: "1.2 million points/sec",
          accuracy: "± 2 cm",
          eyeSafety: "Class 1 (IEC 60825-1)",
          operatingTemp: "-40°C to +85°C",
          ip_rating: "IP67",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
        ]),
      },
    }),

    // Photography Lenses
    prisma.product.create({
      data: {
        name: "Klarheit APO Sonnar 85mm f/1.4",
        slug: "klarheit-apo-sonnar-85mm",
        sku: "KO-PHTO-001",
        categoryId: categories[2].id,
        priceEUR: 2890,
        stock: 35,
        isRFQOnly: false,
        featured: true,
        description:
          "Apochromatic portrait prime lens with floating element design. T* multi-layer anti-reflective coating eliminates flare and ghosting. Weather-sealed metal construction with de-click aperture ring for cinema use.",
        technicalSpecs: JSON.stringify({
          focalLength: "85 mm",
          maximumAperture: "f/1.4",
          minimumAperture: "f/16",
          opticalDesign: "11 elements in 8 groups (1 APO, 1 aspherical)",
          angleOfView: "28.6°",
          minimumFocusDistance: "0.8 m",
          filterSize: "72 mm",
          weight: "640 g",
          mount: "Sony E, Nikon Z, Canon RF, Leica M",
          coating: "T* multi-layer anti-reflective",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=800",
          "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "Klarheit Distagon 35mm f/1.4",
        slug: "klarheit-distagon-35mm",
        sku: "KO-PHTO-002",
        categoryId: categories[2].id,
        priceEUR: 2450,
        stock: 28,
        isRFQOnly: false,
        description:
          "Wide-angle prime lens engineered for architectural, street, and documentary photography. Retrofocus design with minimal distortion (< 1%). Nano-crystalline T* coating for superior contrast even in harsh backlight.",
        technicalSpecs: JSON.stringify({
          focalLength: "35 mm",
          maximumAperture: "f/1.4",
          minimumAperture: "f/16",
          opticalDesign: "13 elements in 11 groups (2 aspherical)",
          angleOfView: "63.4°",
          distortion: "< 1%",
          minimumFocusDistance: "0.3 m",
          filterSize: "72 mm",
          weight: "720 g",
          mount: "Sony E, Nikon Z, Canon RF",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1606986628253-49438382e3f0?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "Klarheit Makro-Planar 100mm f/2.0",
        slug: "klarheit-makro-planar-100mm",
        sku: "KO-PHTO-003",
        categoryId: categories[2].id,
        priceEUR: 3200,
        stock: 15,
        isRFQOnly: false,
        description:
          "True 1:1 macro lens with apochromatic correction and internal focusing. Floating element system maintains sharpness from infinity to 1:1. Ideal for scientific, product, and nature macro photography.",
        technicalSpecs: JSON.stringify({
          focalLength: "100 mm",
          maximumAperture: "f/2.0",
          magnification: "1:1 (life-size)",
          workingDistance: "132 mm (at 1:1)",
          opticalDesign: "14 elements in 10 groups",
          imageStabilization: "5-axis, 5.5 stops",
          filterSize: "67 mm",
          weight: "710 g",
          mount: "Sony E, Nikon Z, Canon RF",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1621508638997-e30808c10653?w=800",
        ]),
      },
    }),

    // Optical Filters
    prisma.product.create({
      data: {
        name: "532nm Laser-Line Bandpass Filter",
        slug: "532nm-laser-line-bandpass",
        sku: "KO-FILT-001",
        categoryId: categories[3].id,
        priceEUR: 385,
        stock: 120,
        isRFQOnly: false,
        featured: true,
        description:
          "Ultra-narrow bandpass filter centered at 532 nm for Nd:YAG laser applications. Ion-beam sputtered hard coating on UV-grade fused silica. OD6+ out-of-band blocking from 200–1200 nm.",
        technicalSpecs: JSON.stringify({
          centerWavelength: "532 ± 0.2 nm",
          bandwidth: "1.0 nm FWHM",
          peakTransmission: "> 90%",
          outOfBandBlocking: "OD6 (200-1200 nm)",
          substrate: "UV-grade fused silica",
          coating: "Ion-beam sputtered (IBS)",
          surfaceQuality: "40/20 scratch-dig",
          diameter: "25 mm",
          thickness: "3.5 mm",
          laserDamageThreshold: "5 J/cm² @ 532 nm, 10 ns",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "Broadband AR-Coated Window",
        slug: "broadband-ar-coated-window",
        sku: "KO-FILT-002",
        categoryId: categories[3].id,
        priceEUR: 195,
        stock: 200,
        isRFQOnly: false,
        description:
          "Precision-polished optical window with broadband anti-reflective coating (BBAR). < 0.5% reflection per surface across 400–1600 nm. Available in BK7, fused silica, and sapphire substrates.",
        technicalSpecs: JSON.stringify({
          wavelengthRange: "400 - 1600 nm",
          reflectance: "< 0.5% per surface (Ravg)",
          substrate: "BK7 / Fused Silica / Sapphire",
          surfaceFlatness: "λ/10 @ 633 nm",
          surfaceQuality: "20/10 scratch-dig",
          parallelism: "< 30 arcsec",
          diameter: "25.4 mm",
          thickness: "3 mm",
          clearAperture: "> 90%",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800",
        ]),
      },
    }),
    prisma.product.create({
      data: {
        name: "High-Power CO₂ Laser Optics Set",
        slug: "high-power-co2-laser-optics-set",
        sku: "KO-FILT-003",
        categoryId: categories[3].id,
        priceEUR: 42000,
        stock: 3,
        isRFQOnly: true,
        description:
          "Complete optics package for high-power CO₂ laser systems (10.6 μm). Includes ZnSe focusing lens, turning mirrors, and beam expander. Diamond-like carbon (DLC) coated for maximum durability at multi-kilowatt power levels.",
        technicalSpecs: JSON.stringify({
          wavelength: "10.6 μm (CO₂)",
          maxPower: "6 kW CW",
          focusingLens: "ZnSe, 127 mm FL, 38 mm dia",
          mirrors: "3× Si turning mirrors, gold-coated",
          beamExpander: "2× - 5× variable, ZnSe",
          coating: "DLC + AR (< 0.2% absorption)",
          laserDamageThreshold: "15 kW/cm² CW",
          cooling: "Water-cooled mount included",
        }),
        images: JSON.stringify([
          "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
        ]),
      },
    }),
  ]);

  console.log("✅ Products created:", products.length);

  // Create sample orders
  await prisma.order.create({
    data: {
      userId: customer.id,
      totalAmount: 7140,
      currency: "EUR",
      status: "PAID",
      shippingAddress: JSON.stringify({
        street: "123 Photonics Drive",
        city: "Munich",
        state: "Bavaria",
        zip: "80331",
        country: "Germany",
      }),
      items: {
        create: [
          {
            productId: products[3].id,
            quantity: 1,
            priceEUR: 4250,
          },
          {
            productId: products[6].id,
            quantity: 1,
            priceEUR: 2890,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer.id,
      totalAmount: 2450000,
      currency: "EUR",
      status: "QUOTE_REQUESTED",
      shippingAddress: JSON.stringify({
        street: "456 Semiconductor Blvd",
        city: "Dresden",
        state: "Saxony",
        zip: "01069",
        country: "Germany",
      }),
      notes:
        "Request for EUV Projection Lens Assembly. Need delivery by Q3 2027. Please include installation support and training.",
      items: {
        create: [
          {
            productId: products[0].id,
            quantity: 1,
            priceEUR: 2450000,
          },
        ],
      },
    },
  });

  await prisma.order.create({
    data: {
      userId: customer.id,
      totalAmount: 580,
      currency: "EUR",
      status: "SHIPPED",
      trackingNumber: "DHL-DE-9876543210",
      shippingAddress: JSON.stringify({
        street: "789 Optics Lane",
        city: "Jena",
        state: "Thuringia",
        zip: "07743",
        country: "Germany",
      }),
      items: {
        create: [
          {
            productId: products[9].id,
            quantity: 1,
            priceEUR: 385,
          },
          {
            productId: products[10].id,
            quantity: 1,
            priceEUR: 195,
          },
        ],
      },
    },
  });

  console.log("✅ Sample orders created");
  console.log("\n🎉 Seeding complete!");
  console.log("\n📋 Login credentials:");
  console.log("   Admin: admin@klarheit-optik.de / admin123");
  console.log("   Customer: customer@example.com / customer123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
