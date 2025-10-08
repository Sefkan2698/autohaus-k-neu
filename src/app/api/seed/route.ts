import { NextResponse } from 'next/server'
import db from '@/lib/database'

// POST /api/seed - Seed database with demo data
export async function POST() {
  try {
    // Clear existing data
    db.exec('DELETE FROM car_feature_map')
    db.exec('DELETE FROM car_images')
    db.exec('DELETE FROM cars')

    // Demo cars data
    const demoCars = [
      {
        title: 'Citroën C3 1.2 PureTech Shine',
        make: 'Citroën',
        model: 'C3',
        variant: '1.2 PureTech Shine',
        first_registration: '2022-03',
        mileage_km: 15000,
        power_kw: 82,
        fuel_type: 'Benzin',
        transmission: 'Schaltgetriebe',
        price_eur: 1590000, // 15.900€ in cents
        category: 'gebraucht',
        warranty_months: 24,
        accident_free: true,
        service_history: 'Scheckheftgepflegt',
        slug: 'citroen-c3-12-puretech-shine-15000km',
        images: [
          { url: '/images/cars/auto1.png', alt: 'Citroën C3 Außenansicht' },
          { url: '/images/cars/auto2.png', alt: 'Citroën C3 Innenraum' }
        ],
        features: [1, 2, 3, 5, 8, 14, 15] // Sitzheizung, Navi, Klima, Kamera, USB, Fensterheber, Zentralverriegelung
      },
      {
        title: 'Citroën C4 1.6 HDi Selection',
        make: 'Citroën',
        model: 'C4',
        variant: '1.6 HDi Selection',
        first_registration: '2021-07',
        mileage_km: 28000,
        power_kw: 92,
        fuel_type: 'Diesel',
        transmission: 'Schaltgetriebe',
        price_eur: 1890000, // 18.900€
        category: 'gebraucht',
        warranty_months: 24,
        accident_free: true,
        service_history: 'Scheckheftgepflegt',
        slug: 'citroen-c4-16-hdi-selection-28000km',
        images: [
          { url: '/images/cars/auto3.png', alt: 'Citroën C4 Außenansicht' },
          { url: '/images/cars/auto4.png', alt: 'Citroën C4 Seitenansicht' }
        ],
        features: [1, 2, 3, 4, 6, 9, 13, 16, 17] // Sitzheizung, Navi, Klima, Parksensoren, LED, Tempomat, Alufelgen, ABS, ESP
      },
      {
        title: 'Citroën C5 Aircross 1.5 BlueHDi Feel',
        make: 'Citroën',
        model: 'C5 Aircross',
        variant: '1.5 BlueHDi Feel',
        first_registration: '2023-01',
        mileage_km: 8500,
        power_kw: 96,
        fuel_type: 'Diesel',
        transmission: 'Automatik',
        price_eur: 2750000, // 27.500€
        category: 'vorfuehr',
        warranty_months: 36,
        accident_free: true,
        service_history: 'Herstellergarantie',
        slug: 'citroen-c5-aircross-15-bluehdi-feel-8500km',
        images: [
          { url: '/images/cars/auto1.png', alt: 'Citroën C5 Aircross Außenansicht' },
          { url: '/images/cars/auto2.png', alt: 'Citroën C5 Aircross Innenraum' }
        ],
        features: [1, 2, 3, 4, 5, 6, 9, 10, 11, 13, 16, 17, 18, 19] // Viele Features für Vorführwagen
      },
      {
        title: 'Citroën ë-C4 136 Feel Edition',
        make: 'Citroën',
        model: 'ë-C4',
        variant: '136 Feel Edition',
        first_registration: '2023-06',
        mileage_km: 2800,
        power_kw: 100,
        fuel_type: 'Elektro',
        transmission: 'Automatik',
        price_eur: 3290000, // 32.900€
        category: 'vorfuehr',
        warranty_months: 48,
        accident_free: true,
        service_history: 'Herstellergarantie',
        slug: 'citroen-e-c4-136-feel-edition-2800km',
        images: [
          { url: '/images/cars/auto3.png', alt: 'Citroën ë-C4 Außenansicht' },
          { url: '/images/cars/auto4.png', alt: 'Citroën ë-C4 Cockpit' }
        ],
        features: [2, 3, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18] // Moderne E-Auto Features
      },
      {
        title: 'Citroën Berlingo 1.6 BlueHDi Club',
        make: 'Citroën',
        model: 'Berlingo',
        variant: '1.6 BlueHDi Club',
        first_registration: '2020-11',
        mileage_km: 45000,
        power_kw: 75,
        fuel_type: 'Diesel',
        transmission: 'Schaltgetriebe',
        price_eur: 1490000, // 14.900€
        category: 'gebraucht',
        warranty_months: 12,
        accident_free: true,
        service_history: 'Teilweise belegt',
        slug: 'citroen-berlingo-16-bluehdi-club-45000km',
        images: [
          { url: '/images/cars/auto1.png', alt: 'Citroën Berlingo Außenansicht' }
        ],
        features: [3, 7, 8, 14, 15, 16, 17, 19, 20] // Praktische Features für Nutzfahrzeug
      }
    ]

    // Insert cars
    const insertCar = db.prepare(`
      INSERT INTO cars (
        title, make, model, variant, first_registration, mileage_km,
        power_kw, fuel_type, transmission, price_eur, category,
        warranty_months, accident_free, service_history, slug
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const insertImage = db.prepare(`
      INSERT INTO car_images (car_id, url, alt, sort_index)
      VALUES (?, ?, ?, ?)
    `)

    const insertFeatureMap = db.prepare(`
      INSERT INTO car_feature_map (car_id, feature_id) VALUES (?, ?)
    `)

    demoCars.forEach(car => {
      const result = insertCar.run(
        car.title, car.make, car.model, car.variant || null, car.first_registration || null,
        car.mileage_km || null, car.power_kw || null, car.fuel_type || null, car.transmission || null,
        car.price_eur, car.category, car.warranty_months || null, car.accident_free ? 1 : 0,
        car.service_history || null, car.slug
      )

      const carId = result.lastInsertRowid as number

      // Insert images
      car.images.forEach((image, index) => {
        insertImage.run(carId, image.url, image.alt, index)
      })

      // Insert features
      car.features.forEach(featureId => {
        insertFeatureMap.run(carId, featureId)
      })
    })

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${demoCars.length} cars with images and features`
    })

  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}