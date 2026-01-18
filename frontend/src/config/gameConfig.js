/**
 * Skyward Tracker - Game Configuration
 * Provider: BGaming
 * Theme: Peaceful hot air balloon journey
 */

export const GAME_CONFIG = {
  // Basic Info
  id: 'skyward',
  name: 'Skyward',
  slug: 'skyward',
  provider: 'BGaming',
  providerWebsite: 'https://bgaming.com',

  // Game Math
  rtp: 97.0,
  houseEdge: 3.0,
  maxMultiplier: 10000,
  minBet: 0.10,
  maxBet: 100,

  // Branding
  domain: 'skywardtracker.com',
  trademark: 'Skyward is a trademark of BGaming.',
  description: 'A peaceful hot air balloon crash game with a calming atmosphere and altitude-based progression.',
  tagline: 'Rise with the winds',

  // Theme - Peaceful sky colors
  theme: {
    primary: '#0ea5e9',     // Sky blue
    secondary: '#0284c7',   // Deeper blue
    accent: '#f97316',      // Sunset orange
    light: '#7dd3fc',       // Light sky
    golden: '#fbbf24',      // Golden hour
    darkBg: '#0c1929',      // Night sky
    cardBg: '#1e3a5f',      // Deep blue
    gradient: 'from-sky-500 to-cyan-500',
    accentGradient: 'from-orange-500 to-amber-500',
  },

  // Altitude Zones (replaces multiplier ranges)
  altitudeZones: [
    { name: 'Ground Level', min: 1.00, max: 1.50, color: 'emerald', icon: '🌱' },
    { name: 'Tree Tops', min: 1.50, max: 2.00, color: 'lime', icon: '🌲' },
    { name: 'Cloud Base', min: 2.00, max: 5.00, color: 'sky', icon: '☁️' },
    { name: 'Stratosphere', min: 5.00, max: 50.00, color: 'blue', icon: '🌤️' },
    { name: 'Beyond', min: 50.00, max: 100.00, color: 'violet', icon: '✨' },
    { name: 'Deep Space', min: 100.00, max: 10000.00, color: 'purple', icon: '🌌' },
  ],

  // URLs
  demoUrl: 'https://bgaming.com/games/skyward',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8011',
  apiBaseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  gameId: 'skyward',

  // Features
  features: [
    'peaceful',         // Calm atmosphere
    'autoCashout',      // Auto cashout at target altitude
    'autoPlay',         // Auto betting
    'provablyFair',     // Verifiable fairness
    'mobileOptimized',  // Great mobile experience
  ],

  // Contact
  emails: {
    contact: 'contact@skywardtracker.com',
    business: 'business@skywardtracker.com',
    legal: 'legal@skywardtracker.com',
    privacy: 'privacy@skywardtracker.com',
  },

  // SEO
  seo: {
    title: 'Skyward Tracker - Live Statistics & Altitude Analysis',
    description: 'Real-time Skyward game statistics, RTP tracking, and altitude history analysis. Track the peaceful hot air balloon journey from BGaming.',
    keywords: ['skyward', 'skyward game', 'skyward statistics', 'skyward tracker', 'bgaming skyward', 'crash game', 'hot air balloon game'],
  },

  // Responsible gambling messages - Important for peaceful atmosphere
  responsibleGambling: {
    reminder: 'Remember: Skyward is a game of chance. Set limits and play responsibly.',
    warning: 'Gambling can be addictive. Please play within your means.',
    helpline: 'If you need help, visit BeGambleAware.org or call 1-800-522-4700',
  },

  // Social
  social: {
    twitter: '',
    discord: '',
  },
}

// Altitude thresholds for peaceful terminology
export const ALTITUDE_THRESHOLDS = {
  ground: 1.00,       // Just landed
  liftoff: 1.20,      // Beginning ascent
  treetops: 1.50,     // Clearing trees
  cloudBase: 2.00,    // Entering clouds
  cruising: 3.00,     // Comfortable altitude
  highAltitude: 5.00, // High up
  stratosphere: 10.00, // Very high
  mesosphere: 50.00,  // Extreme altitude
  space: 100.00,      // Into space
}

// Chart colors matching peaceful sky theme
export const CHART_COLORS = [
  '#0ea5e9', // Sky blue
  '#06b6d4', // Cyan
  '#22d3ee', // Light cyan
  '#7dd3fc', // Pale blue
  '#f97316', // Sunset orange
  '#fbbf24', // Golden
  '#a3e635', // Lime
  '#4ade80', // Green
  '#a78bfa', // Violet
]

export default GAME_CONFIG
