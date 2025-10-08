'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Shield, Award, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const trustElements = [
  {
    icon: Shield,
    title: 'Autorisierter Citroën Partner',
    description: 'Offizieller Händler und Servicepartner',
    highlight: 'Seit 1993'
  },
  {
    icon: Award,
    title: 'Meisterbetrieb',
    description: 'Qualifizierte Handwerksleistung',
    highlight: '30+ Jahre'
  },
  {
    icon: Star,
    title: 'Google Bewertungen',
    description: 'Echte Kundenmeinungen',
    highlight: '4.8★'
  },
  {
    icon: Users,
    title: 'Familienbetrieb',
    description: 'Persönliche Betreuung',
    highlight: '2. Generation'
  }
]

const reviews = [
  '/images/rezensionen/rezension1.png',
  '/images/rezensionen/rezension2.png',
  '/images/rezensionen/rezension3.png',
  '/images/rezensionen/rezension4.png',
  '/images/rezensionen/rezension5.png',
  '/images/rezensionen/rezension6.png',
  '/images/rezensionen/rezension7.png'
]

export default function TrustSection() {
  const [currentReview, setCurrentReview] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length)
    }, 4000) // 4 seconds per review

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length)
    setIsAutoPlaying(false) // Stop auto-play when user manually navigates
    setTimeout(() => setIsAutoPlaying(true), 10000) // Resume after 10 seconds
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToReview = (index: number) => {
    setCurrentReview(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: '#DC2626' }}></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 rounded-full" style={{ backgroundColor: '#1E40AF' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Warum uns <span style={{ color: '#DC2626', fontWeight: 700 }}>Kunden vertrauen</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Über <strong style={{ color: '#DC2626' }}>30 Jahre Erfahrung</strong> und
            <strong style={{ color: '#DC2626' }}> hunderte zufriedene Kunden</strong> sprechen für sich.
            Lesen Sie selbst, was unsere Kunden über uns sagen.
          </p>
        </motion.div>

        {/* Trust Elements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustElements.map((element, index) => (
            <motion.div
              key={index}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  border: '2px solid #e2e8f0'
                }}
                whileHover={{ scale: 1.05 }}
              >
                <element.icon
                  className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
                  style={{ color: '#DC2626' }}
                />

                {/* Highlight Badge */}
                <motion.div
                  className="absolute -top-2 -right-2 text-xs font-bold text-white px-2 py-1 rounded-full"
                  style={{ backgroundColor: '#DC2626' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {element.highlight}
                </motion.div>
              </motion.div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {element.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {element.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Was unsere <span style={{ color: '#DC2626' }}>Kunden sagen</span>
            </h3>
            <p className="text-gray-600">
              Echte Bewertungen von echten Kunden auf Google
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">

            {/* Main Review Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative w-full h-80 flex items-center justify-center"
              >
                <Image
                  src={reviews[currentReview]}
                  alt={`Google Bewertung ${currentReview + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-contain rounded-xl drop-shadow-lg"
                  priority={currentReview === 0}
                  style={{
                    filter: 'contrast(1.1) saturate(1.1) brightness(1.05)',
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevReview}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-20"
              style={{ border: '2px solid #DC2626' }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#DC2626' }} />
            </button>

            <button
              onClick={nextReview}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-20"
              style={{ border: '2px solid #DC2626' }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#DC2626' }} />
            </button>

            {/* Auto-play indicator */}
            {isAutoPlaying && (
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-600 shadow-md z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: '#DC2626' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                Auto-Wiedergabe
              </motion.div>
            )}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center items-center mt-8 gap-3">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToReview(index)}
                className={`transition-all duration-300 rounded-full shadow-sm ${
                  currentReview === index ? 'w-10 h-3' : 'w-3 h-3'
                }`}
                style={{
                  backgroundColor: currentReview === index ? '#DC2626' : '#D1D5DB'
                }}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          {/* Review Counter */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 font-medium">
              Bewertung {currentReview + 1} von {reviews.length}
            </p>
          </div>
        </motion.div>

        {/* Customer Promise */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Unser <span style={{ color: '#DC2626' }}>Qualitätsversprechen</span>
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                "Bei uns erhalten Sie nicht nur ein Fahrzeug – Sie werden Teil der Familie.
                Persönlicher Service, faire Preise und langfristige Betreuung sind unser Anspruch
                an uns selbst, seit über 30 Jahren."
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <Image
                    src="/images/mitarbeiter/ma1.jpg"
                    alt="Hans-Theo Küppers"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Hans-Theo Küppers</p>
                  <p className="text-sm text-gray-600">Geschäftsführer</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}