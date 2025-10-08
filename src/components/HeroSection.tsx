'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Clock, ChevronRight } from 'lucide-react'
import { CONTENT, CAR_IMAGES } from '@/lib/constants'
import { useState } from 'react'

export default function HeroSection() {
  const [selectedCarIndex, setSelectedCarIndex] = useState(0)

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden pt-16">
      
      {/* Minimal geometric accents */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-32 right-20 w-px h-40 bg-gradient-to-b from-red-200 to-transparent"></div>
        <div className="absolute bottom-40 left-16 w-40 h-px bg-gradient-to-r from-red-200 to-transparent"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8" style={{ zIndex: 5 }}>

        {/* Main Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <motion.h1 
                className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Ihr 
                <span className="block font-bold" style={{ color: '#DC2626' }}>{CONTENT.brand}</span>
                <span className="text-3xl lg:text-4xl text-gray-600 font-medium">Spezialist in Goch</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mt-6 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {CONTENT.tagline}. Neuwagen, Gebrauchtwagen, Service und Originalteile – 
                alles aus einer Hand.
              </motion.p>
            </div>

            {/* Service Features */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DC2626' }}>
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Schneller Service</p>
                  <p className="text-sm text-gray-600">Mo-Fr geöffnet</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/70 p-4 rounded-lg backdrop-blur-sm">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#DC2626' }}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Zentral gelegen</p>
                  <p className="text-sm text-gray-600">Mitten in Goch</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-4"
              style={{ position: 'relative', zIndex: 10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <button 
                className="px-8 py-4 rounded-xl font-semibold text-lg text-white flex items-center justify-center gap-2 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#DC2626', border: 'none', outline: 'none' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#B91C1C'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#DC2626'
                }}
              >
                Termin vereinbaren
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <button 
                className="border-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 bg-white"
                style={{ 
                  borderColor: '#DC2626',
                  color: '#DC2626',
                  backgroundColor: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#B91C1C'
                  e.currentTarget.style.color = '#B91C1C'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#DC2626'
                  e.currentTarget.style.color = '#DC2626'
                }}
              >
                Fahrzeuge ansehen
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Car Gallery */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main Featured Car */}
            <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100" style={{ zIndex: 5 }}>
              <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCarIndex}
                    initial={{ opacity: 0, x: 100, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.8 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative"
                  >
                    <Image
                      src={CAR_IMAGES[selectedCarIndex]}
                      alt={`Citroën Fahrzeug ${selectedCarIndex + 1}`}
                      width={600}
                      height={400}
                      className="w-full h-auto object-contain car-float"
                      priority
                    />
                    
                    {/* Floating Badge */}
                    <motion.div
                      className="absolute top-4 right-4 text-white px-4 py-2 rounded-full font-semibold shadow-lg"
                      style={{ backgroundColor: '#DC2626' }}
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      Modell {selectedCarIndex + 1}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Car Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-4 mt-6" style={{ zIndex: 5 }}>
              {CAR_IMAGES.map((carImage, index) => (
                <motion.button
                  key={index}
                  className={`rounded-xl p-3 shadow-lg transition-all duration-300 border-none outline-none ${
                    selectedCarIndex === index 
                      ? 'bg-white shadow-xl' 
                      : 'bg-white/80 hover:bg-white hover:shadow-xl'
                  }`}
                  style={{ 
                    border: selectedCarIndex === index ? '2px solid #DC2626' : '2px solid transparent'
                  }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCarIndex(index)}
                >
                  <Image
                    src={carImage}
                    alt={`Citroën Fahrzeug ${index + 1}`}
                    width={150}
                    height={100}
                    className="w-full h-auto object-contain"
                  />
                </motion.button>
              ))}
            </div>

            {/* Car Selection Indicator */}
            <motion.div 
              className="flex justify-center mt-4 space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {CAR_IMAGES.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedCarIndex === index ? 'w-8' : 'w-2'
                  }`}
                  style={{ 
                    backgroundColor: selectedCarIndex === index ? '#DC2626' : '#D1D5DB'
                  }}
                  onClick={() => setSelectedCarIndex(index)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0" style={{ zIndex: 1 }}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}