'use client'

import { motion } from 'framer-motion'
import Header from '@/components/layout/Header'
import { MapPin, Clock, Phone, Mail, Globe, Car, Wrench, Settings, Calendar } from 'lucide-react'
import { CONTENT } from '@/lib/constants'

export default function KontaktPage() {
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
              <span style={{ color: '#DC2626' }}>Kontakt</span> zu uns
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Besuchen Sie uns vor Ort oder nehmen Sie <strong style={{ color: '#DC2626' }}>Kontakt</strong> mit uns auf.
              Wir sind gerne für Sie da!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Map */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Company Info */}
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  <span style={{ color: '#DC2626' }}>{CONTENT.fullName}</span>
                </h2>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#DC2626' }} />
                    <div>
                      <p className="font-semibold text-gray-900">Adresse</p>
                      <p className="text-gray-700">{CONTENT.address.street}</p>
                      <p className="text-gray-700">{CONTENT.address.city}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#DC2626' }} />
                    <div>
                      <p className="font-semibold text-gray-900">Telefon</p>
                      <a href={`tel:${CONTENT.phone}`} className="text-gray-700 hover:text-red-600 transition-colors">
                        {CONTENT.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#DC2626' }} />
                    <div>
                      <p className="font-semibold text-gray-900">E-Mail</p>
                      <a href={`mailto:${CONTENT.email}`} className="text-gray-700 hover:text-red-600 transition-colors">
                        {CONTENT.email}
                      </a>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 mt-1 flex-shrink-0" style={{ color: '#DC2626' }} />
                    <div>
                      <p className="font-semibold text-gray-900">Website</p>
                      <a href={`https://${CONTENT.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-red-600 transition-colors">
                        {CONTENT.website}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-6 pt-6 border-t border-red-200">
                  <a
                    href={`tel:${CONTENT.phone}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    style={{ backgroundColor: '#DC2626' }}
                  >
                    <Phone className="w-4 h-4" />
                    Jetzt anrufen
                  </a>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Schneller <span style={{ color: '#DC2626' }}>Kontakt</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <a
                    href={`mailto:${CONTENT.email}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <Mail className="w-5 h-5" style={{ color: '#DC2626' }} />
                    <span className="text-sm font-medium text-gray-700">E-Mail senden</span>
                  </a>
                  <a
                    href={`tel:${CONTENT.phone}`}
                    className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <Phone className="w-5 h-5" style={{ color: '#DC2626' }} />
                    <span className="text-sm font-medium text-gray-700">Anrufen</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Google Maps */}
            <motion.div
              className="h-96 lg:h-full min-h-[400px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.123456789!2d6.1234567!3d51.6789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b7dc123456789a%3A0x123456789abcdef!2sAsperdener%20Str.%202-4%2C%2047574%20Goch!5e0!3m2!1sde!2sde!4v1640995200000!5m2!1sde!2sde"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Autohaus Küppers Standort"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Unsere <span style={{ color: '#DC2626' }}>Öffnungszeiten</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Besuchen Sie uns zu unseren Öffnungszeiten oder vereinbaren Sie einen individuellen Termin.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Verkauf */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: '#FEF2F2' }}
                >
                  <Car className="w-6 h-6" style={{ color: '#DC2626' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Verkauf</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Mo. - Do.</p>
                    <p className="text-gray-600">9-13.00 und 15-18.00 Uhr</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Fr.</p>
                    <p className="text-gray-600">9-13.00 und 15-17.00 Uhr</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Sa.</p>
                    <p className="text-gray-600">9-12.30 Uhr</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kundendienst */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: '#FEF2F2' }}
                >
                  <Wrench className="w-6 h-6" style={{ color: '#DC2626' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Kundendienst</h3>
                <p className="text-sm text-gray-600">Werkstatt</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Mo. - Fr.</p>
                    <p className="text-gray-600">7.30-12.00 und 13-17.00 Uhr</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Sa.</p>
                    <p className="text-gray-600">9-12.30 Uhr</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Ersatzteile */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-4">
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: '#FEF2F2' }}
                >
                  <Settings className="w-6 h-6" style={{ color: '#DC2626' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Ersatzteile</h3>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="font-medium text-gray-900">Mo. - Fr.</p>
                    <p className="text-gray-600">7.30-12.00 und 13-16.30 Uhr</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
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
              Haben Sie <span style={{ color: '#DC2626' }}>Fragen</span>?
            </h2>
            <p className="text-gray-600 mb-8">
              Zögern Sie nicht, uns zu kontaktieren. Unser Team steht Ihnen gerne zur Verfügung.
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

              <a
                href={`mailto:${CONTENT.email}`}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 bg-white hover:shadow-lg"
                style={{
                  borderColor: '#DC2626',
                  color: '#DC2626'
                }}
              >
                <Mail className="w-4 h-4" />
                E-Mail senden
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}