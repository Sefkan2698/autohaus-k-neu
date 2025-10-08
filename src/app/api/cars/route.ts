import { NextRequest, NextResponse } from 'next/server'
import db, { Car, CarWithDetails } from '@/lib/database'

// GET /api/cars - List all cars with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // 'gebraucht' or 'vorfuehr'
    const status = searchParams.get('status') || 'published'
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = `
      SELECT * FROM cars
      WHERE status = ?
    `
    const params = [status]

    if (category) {
      query += ' AND category = ?'
      params.push(category)
    }

    query += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const cars = db.prepare(query).all(...params) as Car[]

    // Get images and features for each car
    const carsWithDetails: CarWithDetails[] = cars.map(car => {
      const images = db.prepare(`
        SELECT * FROM car_images
        WHERE car_id = ?
        ORDER BY sort_index ASC
      `).all(car.id)

      const features = db.prepare(`
        SELECT cf.* FROM car_features cf
        JOIN car_feature_map cfm ON cf.id = cfm.feature_id
        WHERE cfm.car_id = ?
        ORDER BY cf.name ASC
      `).all(car.id)

      return {
        ...car,
        images,
        features
      }
    })

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM cars WHERE status = ?'
    const countParams = [status]

    if (category) {
      countQuery += ' AND category = ?'
      countParams.push(category)
    }

    const { total } = db.prepare(countQuery).get(...countParams) as { total: number }

    return NextResponse.json({
      cars: carsWithDetails,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })

  } catch (error) {
    console.error('Error fetching cars:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cars' },
      { status: 500 }
    )
  }
}

// POST /api/cars - Create a new car
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      title,
      make,
      model,
      variant,
      first_registration,
      mileage_km,
      power_kw,
      fuel_type,
      transmission,
      price_eur,
      category,
      warranty_months,
      accident_free = true,
      service_history,
      vin,
      slug,
      status = 'published',
      images = [],
      features = []
    } = body

    // Start transaction
    const transaction = db.transaction(() => {
      // Insert car
      const insertCar = db.prepare(`
        INSERT INTO cars (
          title, make, model, variant, first_registration, mileage_km,
          power_kw, fuel_type, transmission, price_eur, category,
          warranty_months, accident_free, service_history, vin, slug, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)

      const result = insertCar.run(
        title, make, model, variant, first_registration, mileage_km,
        power_kw, fuel_type, transmission, price_eur, category,
        warranty_months, accident_free, service_history, vin, slug, status
      )

      const carId = result.lastInsertRowid as number

      // Insert images
      if (images.length > 0) {
        const insertImage = db.prepare(`
          INSERT INTO car_images (car_id, url, alt, sort_index)
          VALUES (?, ?, ?, ?)
        `)

        images.forEach((image: any, index: number) => {
          insertImage.run(carId, image.url, image.alt || null, index)
        })
      }

      // Insert features
      if (features.length > 0) {
        const insertFeatureMap = db.prepare(`
          INSERT INTO car_feature_map (car_id, feature_id) VALUES (?, ?)
        `)

        features.forEach((featureId: number) => {
          insertFeatureMap.run(carId, featureId)
        })
      }

      return carId
    })

    const carId = transaction()

    return NextResponse.json({
      success: true,
      carId,
      message: 'Car created successfully'
    })

  } catch (error) {
    console.error('Error creating car:', error)
    return NextResponse.json(
      { error: 'Failed to create car' },
      { status: 500 }
    )
  }
}