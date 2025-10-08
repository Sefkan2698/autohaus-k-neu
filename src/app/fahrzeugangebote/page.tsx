'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import { Car, Clock, Phone } from 'lucide-react'
import { CONTENT } from '@/lib/constants'

export default function FahrzeugangebotePage() {
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
              <span style={{ color: '#DC2626' }}>Fahrzeugangebote</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Entdecken Sie unsere aktuellen <strong style={{ color: '#DC2626' }}>Citroën Fahrzeuge</strong> -
              Neuwagen, Gebrauchtwagen und E-Mobilität.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Coming Soon */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Car className="w-16 h-16 mx-auto mb-6" style={{ color: '#DC2626' }} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Seite in Bearbeitung
            </h2>
            <p className="text-gray-600 mb-8">
              Unsere Fahrzeugangebote-Seite wird gerade für Sie vorbereitet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${CONTENT.phone}`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#DC2626' }}
              >
                <Phone className="w-4 h-4" />
                Jetzt anrufen: {CONTENT.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}