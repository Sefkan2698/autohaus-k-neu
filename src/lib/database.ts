import Database from 'better-sqlite3'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'autohaus.db')
const db = new Database(dbPath)

// Enable WAL mode for better concurrency
db.pragma('journal_mode = WAL')

// Create tables
const initDB = () => {
  // Cars table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      variant TEXT,
      first_registration TEXT, -- YYYY-MM format
      mileage_km INTEGER,
      power_kw INTEGER,
      fuel_type TEXT,
      transmission TEXT,
      price_eur INTEGER NOT NULL, -- in cents to avoid floating point issues
      category TEXT NOT NULL CHECK (category IN ('gebraucht', 'vorfuehr')),
      warranty_months INTEGER,
      accident_free BOOLEAN DEFAULT 1,
      service_history TEXT,
      vin TEXT,
      slug TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Car images table
  db.exec(`
    CREATE TABLE IF NOT EXISTS car_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      car_id INTEGER NOT NULL,
      url TEXT NOT NULL,
      alt TEXT,
      sort_index INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE
    )
  `)

  // Car features table (predefined features)
  db.exec(`
    CREATE TABLE IF NOT EXISTS car_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      icon_key TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  // Car feature mapping table
  db.exec(`
    CREATE TABLE IF NOT EXISTS car_feature_map (
      car_id INTEGER NOT NULL,
      feature_id INTEGER NOT NULL,
      PRIMARY KEY (car_id, feature_id),
      FOREIGN KEY (car_id) REFERENCES cars (id) ON DELETE CASCADE,
      FOREIGN KEY (feature_id) REFERENCES car_features (id) ON DELETE CASCADE
    )
  `)

  // Create indexes for better performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_cars_category ON cars (category);
    CREATE INDEX IF NOT EXISTS idx_cars_status ON cars (status);
    CREATE INDEX IF NOT EXISTS idx_cars_make_model ON cars (make, model);
    CREATE INDEX IF NOT EXISTS idx_car_images_car_id ON car_images (car_id);
    CREATE INDEX IF NOT EXISTS idx_car_images_sort ON car_images (car_id, sort_index);
  `)

  // Insert default features
  const insertFeature = db.prepare(`
    INSERT OR IGNORE INTO car_features (name, icon_key) VALUES (?, ?)
  `)

  const defaultFeatures = [
    ['Sitzheizung', 'heating'],
    ['Navigationssystem', 'navigation'],
    ['Klimaautomatik', 'air-conditioning'],
    ['Parksensoren', 'parking-sensors'],
    ['Rückfahrkamera', 'camera'],
    ['LED-Scheinwerfer', 'led-lights'],
    ['Bluetooth', 'bluetooth'],
    ['USB-Anschluss', 'usb'],
    ['Tempomat', 'cruise-control'],
    ['Einparkhilfe', 'parking-assist'],
    ['Freisprecheinrichtung', 'hands-free'],
    ['Metallic-Lackierung', 'metallic-paint'],
    ['Alufelgen', 'alloy-wheels'],
    ['Elektr. Fensterheber', 'electric-windows'],
    ['Zentralverriegelung', 'central-locking'],
    ['ABS', 'abs'],
    ['ESP', 'esp'],
    ['Airbags', 'airbags'],
    ['Isofix', 'isofix'],
    ['Anhängerkupplung', 'trailer-hitch']
  ]

  defaultFeatures.forEach(([name, iconKey]) => {
    insertFeature.run(name, iconKey)
  })
}

// Initialize database
initDB()

export default db

// Helper types
export interface Car {
  id: number
  title: string
  make: string
  model: string
  variant?: string
  first_registration?: string
  mileage_km?: number
  power_kw?: number
  fuel_type?: string
  transmission?: string
  price_eur: number
  category: 'gebraucht' | 'vorfuehr'
  warranty_months?: number
  accident_free: boolean
  service_history?: string
  vin?: string
  slug: string
  status: 'published' | 'draft'
  created_at: string
  updated_at: string
}

export interface CarImage {
  id: number
  car_id: number
  url: string
  alt?: string
  sort_index: number
  created_at: string
}

export interface CarFeature {
  id: number
  name: string
  icon_key?: string
  created_at: string
}

export interface CarWithDetails extends Car {
  images: CarImage[]
  features: CarFeature[]
}