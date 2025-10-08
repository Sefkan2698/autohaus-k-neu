'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import { Car, Clock, Phone, Fuel, Gauge, Calendar, CheckCircle } from 'lucide-react'
import { CONTENT } from '@/lib/constants'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Car {
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
  slug: string
  images: Array<{
    id: number
    url: string
    alt?: string
    sort_index: number
  }>
  features: Array<{
    id: number
    name: string
    icon_key?: string
  }>
}

export default function GebrauchtfahrzeugePage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/cars?category=gebraucht')
      if (!response.ok) {
        throw new Error('Failed to fetch cars')
      }
      const data = await response.json()
      setCars(data.cars)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(priceInCents / 100)
  }

  const formatMileage = (km?: number) => {
    if (!km) return '-'
    return new Intl.NumberFormat('de-DE').format(km) + ' km'
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-24 pb-12 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Car className="w-12 h-12 mx-auto mb-4 animate-pulse" style={{ color: '#DC2626' }} />
            <p className="text-gray-600">Fahrzeuge werden geladen...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="pt-24 pb-12 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-600 mb-4">Fehler beim Laden der Fahrzeuge: {error}</p>
            <button
              onClick={fetchCars}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Erneut versuchen
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span style={{ color: '#DC2626' }}>Gebrauchtfahrzeuge</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Qualitätsgeprüfte <strong style={{ color: '#DC2626' }}>Citroën Gebrauchtwagen</strong> mit
              Herstellergarantie und transparenter Fahrzeughistorie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cars.length === 0 ? (
            <div className="text-center py-12">
              <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Derzeit keine Gebrauchtfahrzeuge verfügbar
              </h3>
              <p className="text-gray-600 mb-6">
                Schauen Sie bald wieder vorbei oder kontaktieren Sie uns direkt.
              </p>
              <a
                href={`tel:${CONTENT.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#DC2626' }}
              >
                <Phone className="w-4 h-4" />
                {CONTENT.phone}
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cars.map((car, index) => (
                <Link key={car.id} href={`/fahrzeugangebote/gebraucht/${car.slug}`}>
                  <motion.div
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                  {/* Car Image */}
                  <div className="relative h-48 bg-gray-100">
                    {car.images.length > 0 ? (
                      <Image
                        src={car.images[0].url}
                        alt={car.images[0].alt || car.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain"
                        priority={index < 2}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="font-bold text-lg" style={{ color: '#DC2626' }}>
                        {formatPrice(car.price_eur)}
                      </span>
                    </div>

                    {/* Accident Free Badge */}
                    {car.accident_free && (
                      <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Unfallfrei
                      </div>
                    )}
                  </div>

                  {/* Car Details */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {car.title}
                    </h3>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {car.first_registration ? car.first_registration.replace('-', '/') : '-'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {formatMileage(car.mileage_km)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Fuel className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{car.fuel_type || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{car.power_kw || '-'} kW</span>
                      </div>
                    </div>

                    {/* Features */}
                    {car.features.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Ausstattung:</p>
                        <div className="flex flex-wrap gap-1">
                          {car.features.slice(0, 3).map((feature) => (
                            <span
                              key={feature.id}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                            >
                              {feature.name}
                            </span>
                          ))}
                          {car.features.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{car.features.length - 3} weitere
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Warranty */}
                    {car.warranty_months && (
                      <div className="mb-4 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-800">
                            {car.warranty_months} Monate Garantie
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="w-full px-4 py-3 rounded-xl font-semibold text-white text-center transition-all duration-300"
                      style={{ backgroundColor: '#DC2626' }}
                    >
                      Details ansehen
                    </div>
                  </div>
                </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-gradient-to-r from-red-50 to-red-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Interesse an einem <span style={{ color: '#DC2626' }}>Fahrzeug</span>?
            </h2>
            <p className="text-gray-600 mb-8">
              Vereinbaren Sie eine Probefahrt oder lassen Sie sich persönlich beraten.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTENT.phone}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#DC2626' }}
              >
                <Phone className="w-4 h-4" />
                Jetzt anrufen
              </a>

              <button className="px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 bg-white hover:shadow-lg"
                style={{
                  borderColor: '#DC2626',
                  color: '#DC2626'
                }}
              >
                Probefahrt vereinbaren
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}