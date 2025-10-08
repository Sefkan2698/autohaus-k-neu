export const COLORS = {
  primary: '#DC2626',
  primaryHover: '#B91C1C',
  primaryLight: '#FEF2F2',
  secondary: '#F8FAFC',
  accent: '#EF4444',
} as const;

export const CONTENT = {
  brand: 'Citroën',
  dealerName: 'Autohaus Küppers',
  fullName: 'Autohaus Küppers GmbH',
  phone: '+49 (0)2823 3143',
  fax: '+49 (0)2823 1263', 
  email: 'info@auto-kueppers.de',
  address: {
    street: 'Asperdener Straße 2-4',
    city: '47574 Goch',
    full: 'Asperdener Straße 2-4, 47574 Goch'
  },
  hours: {
    sales: {
      weekdays: 'Mo. - Do. 9-13.00 Uhr und 15-18.00 Uhr',
      friday: 'Fr. 9-13.00 und 15-17.00 Uhr',
      saturday: 'Sa. 9-12.30 Uhr'
    },
    service: {
      weekdays: 'Mo. - Fr. 7.30-12.00 Uhr und 13-17.00 Uhr',
      saturday: 'Sa. 9-12.30 Uhr'
    },
    parts: 'Mo. - Fr. 7.30-12.00 Uhr und 13-16.30 Uhr'
  },
  website: 'www.auto-kueppers.de',
  tagline: 'Ihr vertrauensvoller Citroën Partner in Goch',
} as const;

export const CAR_IMAGES = [
  '/images/cars/auto1.png',
  '/images/cars/auto2.png', 
  '/images/cars/auto3.png',
  '/images/cars/auto4.png',
] as const;

export const ANIMATIONS = {
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up', 
  float: 'animate-float',
  carDrive: 'animate-car-drive',
} as const;