'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Users, Award, Clock, MapPin } from 'lucide-react'
import { CONTENT } from '@/lib/constants'
import { useRef } from 'react'

const teamMembers = [
  {
    id: 'ma1',
    name: 'Hans-Theo Küppers',
    position: 'Geschäftsführer',
    image: '/images/mitarbeiter/ma1.jpg',
    description: 'Leitet das Familienunternehmen seit über 30 Jahren mit Leidenschaft'
  },
  {
    id: 'ma2',
    name: 'Linda Küppers',
    position: 'Buchhaltung',
    image: '/images/mitarbeiter/ma2.jpg',
    description: 'Sorgt für ordentliche Finanzen und reibungslose Abläufe'
  },
  {
    id: 'ma3',
    name: 'Canan Cosgun',
    position: 'Serviceberaterin & Verkauf',
    image: '/images/mitarbeiter/ma3.jpg',
    description: 'Ihre erste Ansprechpartnerin für alle Verkaufsfragen'
  },
  {
    id: 'ma4',
    name: 'Andreas Kürbs',
    position: 'Serviceberater & Teile/Zubehör',
    image: '/images/mitarbeiter/ma4.jpg',
    description: 'Experte für Ersatzteile und Zubehör aller Art'
  },
  {
    id: 'ma5',
    name: 'Marc Baltes',
    position: 'Servicetechniker',
    image: '/images/mitarbeiter/ma5.jpg',
    description: 'Führt alle Wartungen und Reparaturen professionell durch'
  },
  {
    id: 'ma6',
    name: 'Ralf Leuven',
    position: 'Kfz-Mechatroniker',
    image: '/images/mitarbeiter/ma6.jpg',
    description: 'Meister seines Fachs mit jahrelanger Erfahrung'
  },
  {
    id: 'ma7',
    name: 'Mahsum Mogar',
    position: 'Auszubildender Automobilkaufmann',
    image: '/images/mitarbeiter/ma7.jpg',
    description: 'Bringt frischen Wind und neue Ideen ins Team'
  }
]

const companyStats = [
  {
    icon: Clock,
    number: '30+',
    label: 'Jahre Erfahrung',
    description: 'Seit 1993 in Goch'
  },
  {
    icon: Users,
    number: '7',
    label: 'Teammitglieder',
    description: 'Für Sie da'
  },
  {
    icon: Award,
    number: '100%',
    label: 'Citroën Partner',
    description: 'Autorisierter Händler'
  },
  {
    icon: MapPin,
    number: '1',
    label: 'Standort',
    description: 'Zentral in Goch'
  }
]

export default function TeamSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scrollTeam = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 300
      const newScrollPosition = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount
      
      container.scrollTo({ left: newScrollPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 right-20 w-40 h-40 rounded-full" style={{ backgroundColor: '#DC2626' }}></div>
        <div className="absolute bottom-32 left-16 w-32 h-32 rounded-full" style={{ backgroundColor: '#1E40AF' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Über uns Section */}
        <div className="mb-20">
          
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Über <span style={{ color: '#DC2626', fontWeight: 700 }}>uns</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Das <strong style={{ color: '#DC2626' }}>Autohaus Küppers</strong> ist seit über 
              <strong style={{ color: '#DC2626' }}> 30 Jahren</strong> Ihr vertrauensvoller 
              <strong style={{ color: '#DC2626' }}> Citroën Partner</strong> in Goch. 
              Als <strong style={{ color: '#DC2626' }}>Familienunternehmen</strong> stehen persönlicher Service 
              und langfristige Kundenbeziehungen bei uns an erster Stelle.
            </p>
          </motion.div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: '#FEF2F2' }}
                >
                  <stat.icon className="w-6 h-6" style={{ color: '#DC2626' }} />
                </div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#DC2626' }}>
                  {stat.number}
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
        </div>

        {/* Team Section */}
        <div>
          
          {/* Team Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Unser <span style={{ color: '#DC2626', fontWeight: 700 }}>Team</span>
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lernen Sie die <strong style={{ color: '#DC2626' }}>Menschen</strong> kennen, 
              die täglich für Ihre <strong style={{ color: '#DC2626' }}>Zufriedenheit</strong> arbeiten.
            </p>
          </motion.div>

          {/* Team Slider Controls */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <button
              onClick={() => scrollTeam('left')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ border: '2px solid #DC2626' }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: '#DC2626' }} />
            </button>
            
            <span className="text-gray-600 font-medium">Team durchblättern</span>
            
            <button
              onClick={() => scrollTeam('right')}
              className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{ border: '2px solid #DC2626' }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: '#DC2626' }} />
            </button>
          </div>

          {/* Team Members Slider */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ 
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 group"
                  style={{ scrollSnapAlign: 'start' }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Member Photo */}
                  <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-red-100 transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${member.position}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="128px"
                    />
                  </div>
                  
                  {/* Member Info */}
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h4>
                    <p className="font-semibold mb-3" style={{ color: '#DC2626' }}>
                      {member.position}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team CTA */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Lernen Sie uns <span style={{ color: '#DC2626' }}>persönlich</span> kennen
              </h4>
              <p className="text-gray-600 mb-6">
                Besuchen Sie uns in der <strong>{CONTENT.address.full}</strong> oder 
                vereinbaren Sie einen persönlichen Beratungstermin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`tel:${CONTENT.phone}`}
                  className="px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                  style={{ backgroundColor: '#DC2626' }}
                >
                  Jetzt anrufen: {CONTENT.phone}
                </a>
                
                <button className="px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 bg-white hover:shadow-lg"
                  style={{ 
                    borderColor: '#DC2626',
                    color: '#DC2626'
                  }}
                >
                  Standort anzeigen
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}