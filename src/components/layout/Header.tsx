'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X, ChevronDown, Car, Users } from 'lucide-react'
import { CONTENT } from '@/lib/constants'
import { useState, useRef, useEffect } from 'react'

const navigationItems = [
  { name: 'Home', href: '/', id: 'home' },
  { name: 'Kundendienst', href: '/kundendienst', id: 'service' },
  {
    name: 'Fahrzeugangebote',
    href: '/fahrzeugangebote',
    id: 'offers',
    hasDropdown: true,
    dropdownItems: [
      {
        name: 'Gebrauchtfahrzeuge',
        href: '/fahrzeugangebote/gebraucht',
        icon: Car,
        description: 'Qualitätsgeprüfte Gebrauchtwagen'
      },
      {
        name: 'Vorführfahrzeuge',
        href: '/fahrzeugangebote/vorfuehr',
        icon: Users,
        description: 'Neuwertige Vorführmodelle'
      }
    ]
  },
  { name: 'Kontakt', href: '/kontakt', id: 'contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null)

  // Determine active nav item based on current pathname
  const getActiveNavItem = () => {
    const currentItem = navigationItems.find(item => {
      if (item.href === pathname) return true
      if (item.hasDropdown && item.dropdownItems) {
        return item.dropdownItems.some(dropdownItem => dropdownItem.href === pathname)
      }
      return false
    })
    return currentItem ? currentItem.id : 'home'
  }

  const activeNavItem = getActiveNavItem()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Autohaus Küppers Logo"
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
                style={{ width: '48px', height: '48px' }}
              />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-lg font-bold text-gray-900">{CONTENT.dealerName}</h2>
              <p className="text-xs" style={{ color: '#DC2626' }}>
                Ihr {CONTENT.brand} Partner
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center relative">
            <div className="flex items-center space-x-2 relative">
              {navigationItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setHoveredDropdown(item.id)}
                  onMouseLeave={() => item.hasDropdown && setHoveredDropdown(null)}
                >
                  {item.hasDropdown ? (
                    <motion.div
                      className={`font-medium transition-all duration-300 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-1 ${
                        activeNavItem === item.id
                          ? 'text-white'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: activeNavItem === item.id ? '#DC2626' : 'transparent'
                      }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        scale: activeNavItem === item.id ? 1 : 1.05
                      }}
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Link href={item.href}>
                      <motion.div
                        className={`font-medium transition-all duration-300 px-4 py-2 rounded-lg cursor-pointer ${
                          activeNavItem === item.id
                            ? 'text-white'
                            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                        style={{
                          backgroundColor: activeNavItem === item.id ? '#DC2626' : 'transparent'
                        }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{
                          scale: activeNavItem === item.id ? 1 : 1.05
                        }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {hoveredDropdown === item.id && (
                        <motion.div
                          className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                            <Link key={dropdownIndex} href={dropdownItem.href}>
                              <motion.div
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
                                whileHover={{ x: 4 }}
                              >
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                                  style={{ backgroundColor: '#FEF2F2' }}
                                >
                                  <dropdownItem.icon
                                    className="w-5 h-5"
                                    style={{ color: '#DC2626' }}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm">
                                    {dropdownItem.name}
                                  </h4>
                                  <p className="text-xs text-gray-600">
                                    {dropdownItem.description}
                                  </p>
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Call Button & Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Call Button - Always visible */}
            <motion.a
              href={`tel:${CONTENT.phone}`}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
              style={{ backgroundColor: '#DC2626' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#B91C1C'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#DC2626'
              }}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Anrufen</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menü öffnen"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-6 space-y-2">
              {navigationItems.map((item, index) => (
                <div key={item.id}>
                  {item.hasDropdown ? (
                    <>
                      <motion.div
                        className={`flex items-center justify-between font-medium py-3 border-b border-gray-100 transition-colors duration-200 cursor-pointer ${
                          activeNavItem === item.id
                            ? 'text-red-600'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => {
                          setExpandedMobileItem(
                            expandedMobileItem === item.id ? null : item.id
                          )
                        }}
                      >
                        <span className="flex items-center">
                          {item.name}
                          {activeNavItem === item.id && (
                            <motion.div
                              className="w-2 h-2 rounded-full inline-block ml-2"
                              style={{ backgroundColor: '#DC2626' }}
                              layoutId="mobile-indicator"
                            />
                          )}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedMobileItem === item.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      </motion.div>

                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {expandedMobileItem === item.id && (
                          <motion.div
                            className="pl-4 space-y-2 overflow-hidden"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.dropdownItems?.map((dropdownItem, dropdownIndex) => (
                              <Link key={dropdownIndex} href={dropdownItem.href}>
                                <motion.div
                                  className="flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.2, delay: dropdownIndex * 0.1 }}
                                  onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    setExpandedMobileItem(null)
                                  }}
                                >
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: '#FEF2F2' }}
                                  >
                                    <dropdownItem.icon
                                      className="w-4 h-4"
                                      style={{ color: '#DC2626' }}
                                    />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 text-sm">
                                      {dropdownItem.name}
                                    </h4>
                                    <p className="text-xs text-gray-600">
                                      {dropdownItem.description}
                                    </p>
                                  </div>
                                </motion.div>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href}>
                      <motion.div
                        className={`block font-medium py-3 border-b border-gray-100 transition-colors duration-200 cursor-pointer ${
                          activeNavItem === item.id
                            ? 'text-red-600'
                            : 'text-gray-700 hover:text-gray-900'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setExpandedMobileItem(null)
                        }}
                      >
                        {item.name}
                        {activeNavItem === item.id && (
                          <motion.div
                            className="w-2 h-2 rounded-full inline-block ml-2"
                            style={{ backgroundColor: '#DC2626' }}
                            layoutId="mobile-indicator"
                          />
                        )}
                      </motion.div>
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact Info */}
              <motion.div 
                className="pt-4 border-t border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-gray-900">{CONTENT.dealerName}</p>
                  <p>{CONTENT.address.full}</p>
                  <p className="mt-2">
                    <span className="font-medium">Verkauf:</span> {CONTENT.hours.sales.weekdays}
                  </p>
                  <p>
                    <span className="font-medium">Service:</span> {CONTENT.hours.service.weekdays}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}