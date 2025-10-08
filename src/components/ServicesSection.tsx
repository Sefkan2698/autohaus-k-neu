'use client'

import { motion } from 'framer-motion'
import { ChevronUp, ChevronDown, Settings, UserCheck, Cog } from 'lucide-react'
import { CONTENT } from '@/lib/constants'

const services = [
  {
    id: 'werkstatt',
    title: 'Professionelle Werkstatt',
    icon: Settings,
    description: 'Moderne Hebebühnen und Diagnosegeräte für alle Reparaturen',
    highlights: [
      'Meisterbetrieb seit über 30 Jahren',
      'Modernste Werkstattausstattung', 
      'Schnelle Terminvergabe',
      'Faire und transparente Preise'
    ]
  },
  {
    id: 'inspektion',
    title: 'Service & Inspektion',
    icon: UserCheck,
    description: 'Regelmäßige Wartung hält Ihr Fahrzeug in Bestform',
    highlights: [
      'HU/AU direkt vor Ort',
      'Citroën Servicepläne',
      'Kostenlose Fahrzeugchecks',
      'Erinnerungsservice per E-Mail'
    ]
  },
  {
    id: 'ersatzteile',
    title: 'Original Ersatzteile',
    icon: Cog,
    description: 'Nur beste Qualität für maximale Sicherheit und Langlebigkeit',
    highlights: [
      'Citroën Originalteile',
      'Schnelle Bestellabwicklung',
      'Herstellergarantie inklusive',
      'Kompetente Beratung'
    ]
  }
]

const RedArrows = () => (
  <div className="flex flex-col items-center justify-center ml-3">
    <ChevronUp className="w-3 h-3" style={{ color: '#DC2626' }} />
    <ChevronDown className="w-3 h-3 -mt-1" style={{ color: '#DC2626' }} />
  </div>
)

export default function ServicesSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
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
            Unsere <span style={{ color: '#DC2626', fontWeight: 700 }}>Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Von der <strong style={{ color: '#DC2626' }}>professionellen Wartung</strong> bis zur 
            <strong style={{ color: '#DC2626' }}> kompletten Reparatur</strong> – 
            wir sind Ihr vertrauensvoller Partner rund um Ihr Fahrzeug.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Service Icon Circle */}
              <motion.div 
                className="relative mx-auto mb-8 w-40 h-40 rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500"
                style={{ 
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                  border: '3px solid #f1f5f9'
                }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 5,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Icon */}
                <service.icon 
                  className="w-16 h-16 group-hover:scale-110 transition-transform duration-300" 
                  style={{ color: '#DC2626' }}
                />
                
                {/* Floating accent */}
                <motion.div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full"
                  style={{ backgroundColor: '#DC2626' }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Service Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="space-y-3">
                  {service.highlights.map((highlight, highlightIndex) => (
                    <motion.div
                      key={highlightIndex}
                      className="flex items-center justify-start text-left"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.2) + (highlightIndex * 0.1) }}
                      viewport={{ once: true }}
                    >
                      <RedArrows />
                      <span className="text-gray-700 font-medium">
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  className="mt-6 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: '#DC2626' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#B91C1C'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#DC2626'
                  }}
                >
                  Mehr erfahren
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Haben Sie <span style={{ color: '#DC2626' }}>Fragen</span> zu unseren Services?
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              <strong>Mo-Fr: {CONTENT.hours.service.weekdays}</strong> - Rufen Sie uns an oder vereinbaren Sie einen Termin
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={`tel:${CONTENT.phone}`}
                className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#DC2626' }}
              >
                {CONTENT.phone}
              </a>
              
              <span className="text-gray-400 hidden sm:inline">oder</span>
              
              <button className="px-8 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 bg-white hover:shadow-lg"
                style={{ 
                  borderColor: '#DC2626',
                  color: '#DC2626'
                }}
              >
                Online Termin buchen
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}