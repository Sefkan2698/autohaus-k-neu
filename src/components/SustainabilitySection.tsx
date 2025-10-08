'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Leaf, Award, TreePine, Zap } from 'lucide-react'

const sustainabilityStats = [
  {
    icon: TreePine,
    number: '3.000+',
    unit: 'kg CO₂',
    label: 'eingespart 2021',
    description: 'Dank CleanAdvantage™'
  },
  {
    icon: Leaf,
    number: '30+',
    unit: 'Jahre',
    label: 'Umweltbewusstsein',
    description: 'Nachhaltiges Handeln'
  },
  {
    icon: Zap,
    number: '100%',
    unit: '',
    label: 'E-Mobilität',
    description: 'Citroën Elektrofahrzeuge'
  },
  {
    icon: Award,
    number: '2021',
    unit: '',
    label: 'Zertifiziert',
    description: 'FLEETCOR Partner'
  }
]

export default function SustainabilitySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-green-500"></div>
        <div className="absolute bottom-20 right-16 w-24 h-24 rounded-full bg-green-600"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-green-400"></div>
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
            <span style={{ color: '#16A34A', fontWeight: 700 }}>Nachhaltigkeit</span> wird bei uns{' '}
            <span style={{ color: '#DC2626', fontWeight: 700 }}>GROSS</span> geschrieben!
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Über <strong style={{ color: '#DC2626' }}>3.000 kg CO₂</strong> konnten wir zusammen mit{' '}
            <strong style={{ color: '#16A34A' }}>FLEETCOR</strong> und dem{' '}
            <strong style={{ color: '#16A34A' }}>CleanAdvantage™ Program</strong> im Jahr 2021 einsparen.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {sustainabilityStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-green-100">
                <stat.icon className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold mb-2 text-green-600">
                {stat.number}
                <span className="text-lg ml-1">{stat.unit}</span>
              </div>
              <div className="font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Unser Beitrag zur <span style={{ color: '#16A34A' }}>grünen Zukunft</span>
              </h3>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong style={{ color: '#16A34A' }}>Nachhaltigkeit</strong> und{' '}
                  <strong style={{ color: '#DC2626' }}>Umweltschutz</strong> sind uns sehr wichtige Anliegen.
                </p>

                <p>
                  Die Autoindustrie arbeitet durch die Weiterentwicklung der{' '}
                  <strong style={{ color: '#DC2626' }}>E-Mobilität</strong> und anderen{' '}
                  <strong style={{ color: '#16A34A' }}>nachhaltigen Antriebsmethoden</strong> an einem grünen Weg in die Zukunft.
                </p>

                <p>
                  <strong style={{ color: '#DC2626' }}>Wir beteiligen uns daran!</strong> Zusammen mit unserem Engagement und
                  besonders dank Ihrer Unterstützung leisten wir unseren Beitrag in eine{' '}
                  <strong style={{ color: '#16A34A' }}>GRÜNE Zukunft</strong>.
                </p>
              </div>

              {/* Action Items */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <strong style={{ color: '#DC2626' }}>Citroën Elektrofahrzeuge</strong> im Angebot
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <strong style={{ color: '#DC2626' }}>CO₂-neutrale Serviceprozesse</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-700">
                    <strong style={{ color: '#DC2626' }}>Recycling</strong> von Altteilen
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Certificate */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center mb-4">
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  <span style={{ color: '#16A34A' }}>Green Certificate</span> 2021
                </h4>
                <p className="text-gray-600 text-sm">
                  FLEETCOR CleanAdvantage™ Program
                </p>
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src="/images/greencertif.jpg"
                  alt="Green Certificate - FLEETCOR CleanAdvantage Program 2021"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                  style={{
                    filter: 'contrast(1.05) saturate(1.1) brightness(1.02)',
                  }}
                />
              </div>

              {/* Certificate Badge */}
              <motion.div
                className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
                style={{ backgroundColor: '#16A34A' }}
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                2021
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Interessiert an <span style={{ color: '#16A34A' }}>E-Mobilität</span>?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Entdecken Sie die <strong style={{ color: '#DC2626' }}>neuesten Citroën Elektrofahrzeuge</strong> und
              werden Sie Teil der grünen Zukunft. Wir beraten Sie gerne!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#16A34A' }}
              >
                E-Fahrzeuge entdecken
              </button>

              <button className="px-8 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 bg-white hover:shadow-lg"
                style={{
                  borderColor: '#16A34A',
                  color: '#16A34A'
                }}
              >
                Beratung vereinbaren
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}