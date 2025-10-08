import { NextRequest, NextResponse } from 'next/server'
import db, { CarWithDetails } from '@/lib/database'

// GET /api/cars/[slug] - Get single car by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Get car
    const car = db.prepare(`
      SELECT * FROM cars
      WHERE slug = ? AND status = 'published'
    `).get(slug)

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      )
    }

    // Get images
    const images = db.prepare(`
      SELECT * FROM car_images
      WHERE car_id = ?
      ORDER BY sort_index ASC
    `).all((car as any).id)

    // Get features
    const features = db.prepare(`
      SELECT cf.* FROM car_features cf
      JOIN car_feature_map cfm ON cf.id = cfm.feature_id
      WHERE cfm.car_id = ?
      ORDER BY cf.name ASC
    `).all((car as any).id)

    const carWithDetails: CarWithDetails = {
      ...(car as any),
      images,
      features
    }

    return NextResponse.json(carWithDetails)

  } catch (error) {
    console.error('Error fetching car:', error)
    return NextResponse.json(
      { error: 'Failed to fetch car' },
      { status: 500 }
    )
  }
}