import { NextRequest, NextResponse } from 'next/server'
import db, { CarFeature } from '@/lib/database'

// GET /api/features - Get all available features
export async function GET() {
  try {
    const features = db.prepare(`
      SELECT * FROM car_features
      ORDER BY name ASC
    `).all() as CarFeature[]

    return NextResponse.json({ features })

  } catch (error) {
    console.error('Error fetching features:', error)
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    )
  }
}