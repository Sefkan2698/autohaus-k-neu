'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Users,
  Phone,
  Mail,
  MapPin,
  Star,
  Check,
  Euro,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { CONTENT } from '@/lib/constants'
import { useState, useEffect, use } from 'react'
import { Car, CarWithDetails } from '@/lib/database'

interface CarDetailPageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default function CarDetailPage({ params }: CarDetailPageProps) {
  const { category, slug } = use(params)
  const [car, setCar] = useState<CarWithDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`/api/cars/${slug}`)
        if (response.ok) {
          const carData = await response.json()
          setCar(carData)
        }
      } catch (error) {
        console.error('Error fetching car:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCar()
  }, [slug])

  const nextImage = () => {
    if (car?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length)
    }
  }

  const prevImage = () => {
    if (car?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length)
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#DC2626' }}></div>
        </div>
      </>
    )
  }

  if (!car) {
    return (
      <>
        <Header />
        <div className="pt-24 pb-12 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Fahrzeug nicht gefunden</h1>
            <Link href="/fahrzeugangebote" className="text-red-600 hover:text-red-700">
              Zurück zu den Angeboten
            </Link>
          </div>
        </div>
      </>
    )
  }

  const categoryDisplayNames = {
    'gebraucht': 'Gebrauchtwagen',
    'vorfuehr': 'Vorführwagen'
  }

  return (
    <>
      <Header />

      {/* Breadcrumb */}
      <section className="pt-24 pb-6 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/fahrzeugangebote" className="hover:text-red-600 transition-colors">Fahrzeugangebote</Link>
            <span>/</span>
            <Link href={`/fahrzeugangebote/${category}`} className="hover:text-red-600 transition-colors">
              {categoryDisplayNames[category as keyof typeof categoryDisplayNames]}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{car.make} {car.model}</span>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-8">

              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={`/fahrzeugangebote/${category}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Zurück zur Übersicht
                </Link>
              </motion.div>

              {/* Car Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {car.make} {car.model}
                </h1>
                <p className="text-xl text-gray-600">{car.variant}</p>
              </motion.div>

              {/* Image Gallery */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden bg-gray-100">
                  {car.images && car.images.length > 0 ? (
                    <>
                      <Image
                        src={car.images[currentImageIndex].url}
                        alt={`${car.make} ${car.model} - Bild ${currentImageIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                        className="object-cover"
                        priority
                      />

                      {car.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                          >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
                          >
                            <ChevronRight className="w-5 h-5 text-gray-700" />
                          </button>

                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {car.images.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-500">Kein Bild verfügbar</span>
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {car.images && car.images.length > 1 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-4">
                    {car.images.slice(0, 6).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex ? 'border-red-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image.url}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Key Specifications */}
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: '#DC2626' }} />
                  <p className="text-sm text-gray-600 mb-1">Erstzulassung</p>
                  <p className="font-semibold text-gray-900">
                    {car.first_registration ? new Date(car.first_registration).toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' }) : 'N/A'}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Gauge className="w-6 h-6 mx-auto mb-2" style={{ color: '#DC2626' }} />
                  <p className="text-sm text-gray-600 mb-1">Kilometerstand</p>
                  <p className="font-semibold text-gray-900">{car.mileage_km?.toLocaleString('de-DE')} km</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Fuel className="w-6 h-6 mx-auto mb-2" style={{ color: '#DC2626' }} />
                  <p className="text-sm text-gray-600 mb-1">Kraftstoff</p>
                  <p className="font-semibold text-gray-900">{car.fuel_type}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Settings className="w-6 h-6 mx-auto mb-2" style={{ color: '#DC2626' }} />
                  <p className="text-sm text-gray-600 mb-1">Getriebe</p>
                  <p className="font-semibold text-gray-900">{car.transmission}</p>
                </div>
              </motion.div>

              {/* Features */}
              {car.features && car.features.length > 0 && (
                <motion.div
                  className="bg-gray-50 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Ausstattung</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#DC2626' }} />
                        <span className="text-gray-700">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Description */}
              {car.description && (
                <motion.div
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Beschreibung</h3>
                  <p className="text-gray-700 leading-relaxed">{car.description}</p>
                </motion.div>
              )}
            </div>

            {/* Right Column - Price and Contact */}
            <div className="space-y-6">

              {/* Price Card */}
              <motion.div
                className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border-2 border-red-200 sticky top-24"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Euro className="w-6 h-6" style={{ color: '#DC2626' }} />
                    <span className="text-3xl font-bold text-gray-900">
                      {car.price?.toLocaleString('de-DE')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {car.category === 'vorfuehr' ? 'Vorführwagen' : 'Gebrauchtwagen'}
                  </p>
                </div>

                {/* Quick Facts */}
                <div className="space-y-3 mb-6 border-t border-red-200 pt-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Marke:</span>
                    <span className="font-medium text-gray-900">{car.make}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Modell:</span>
                    <span className="font-medium text-gray-900">{car.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Leistung:</span>
                    <span className="font-medium text-gray-900">{car.power_kw} kW ({car.power_kw ? Math.round(car.power_kw * 1.36) : '-'} PS)</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="space-y-3">
                  <a
                    href={`tel:${CONTENT.phone}`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: '#DC2626' }}
                  >
                    <Phone className="w-4 h-4" />
                    Jetzt anrufen
                  </a>

                  <a
                    href={`mailto:${CONTENT.email}?subject=Interesse an ${car.make} ${car.model}&body=Sehr geehrte Damen und Herren,%0D%0A%0D%0Aich interessiere mich für Ihren ${car.make} ${car.model} (${car.variant}).%0D%0A%0D%0ABitte kontaktieren Sie mich für weitere Informationen.%0D%0A%0D%0AVielen Dank!`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 bg-white hover:shadow-lg"
                    style={{
                      borderColor: '#DC2626',
                      color: '#DC2626'
                    }}
                  >
                    <Mail className="w-4 h-4" />
                    E-Mail senden
                  </a>
                </div>

                {/* Dealer Info */}
                <div className="mt-6 pt-6 border-t border-red-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: '#DC2626' }}
                    >
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{CONTENT.dealerName}</h4>
                      <p className="text-sm text-gray-600">Ihr {CONTENT.brand} Partner</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{CONTENT.address.full}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}