import { format, formatDistanceToNow } from 'date-fns'
import GAME_CONFIG from '../config/gameConfig'

/**
 * Get the altitude zone for a given multiplier
 * Uses peaceful, nature-inspired terminology
 */
export function getAltitudeZone(multiplier) {
  const zones = GAME_CONFIG.altitudeZones
  for (const zone of zones) {
    if (multiplier >= zone.min && multiplier < zone.max) {
      return zone
    }
  }
  // Default to last zone for very high multipliers
  return zones[zones.length - 1]
}

/**
 * Get CSS class for altitude coloring
 * Peaceful color progression from ground to sky
 */
export function getAltitudeClass(multiplier) {
  if (multiplier < 1.20) return 'text-rose-400'      // Early landing
  if (multiplier < 1.50) return 'text-emerald-400'   // Ground Level
  if (multiplier < 2.00) return 'text-lime-400'      // Tree Tops
  if (multiplier < 5.00) return 'text-sky-400'       // Cloud Base
  if (multiplier < 10.00) return 'text-cyan-400'     // High clouds
  if (multiplier < 50.00) return 'text-blue-400'     // Stratosphere
  if (multiplier < 100.00) return 'text-violet-400'  // Beyond
  return 'text-purple-400'                            // Deep Space
}

/**
 * Get background color class for altitude
 */
export function getAltitudeBackgroundClass(multiplier) {
  if (multiplier < 1.20) return 'bg-rose-900/30'
  if (multiplier < 1.50) return 'bg-emerald-900/30'
  if (multiplier < 2.00) return 'bg-lime-900/30'
  if (multiplier < 5.00) return 'bg-sky-900/30'
  if (multiplier < 10.00) return 'bg-cyan-900/30'
  if (multiplier < 50.00) return 'bg-blue-900/30'
  if (multiplier < 100.00) return 'bg-violet-900/30'
  return 'bg-purple-900/30'
}

/**
 * Get altitude description in peaceful terms
 */
export function getAltitudeDescription(multiplier) {
  if (multiplier < 1.20) return 'Gentle landing'
  if (multiplier < 1.50) return 'Ground level'
  if (multiplier < 2.00) return 'Clearing the treetops'
  if (multiplier < 3.00) return 'Entering the clouds'
  if (multiplier < 5.00) return 'Cruising peacefully'
  if (multiplier < 10.00) return 'High altitude'
  if (multiplier < 50.00) return 'Stratospheric heights'
  if (multiplier < 100.00) return 'Beyond the atmosphere'
  return 'Deep space journey'
}

/**
 * Legacy class for compatibility - maps to altitude class
 */
export function getMultiplierClass(multiplier) {
  return getAltitudeClass(multiplier)
}

/**
 * Get background color for multiplier (legacy compatibility)
 */
export function getMultiplierColor(multiplier) {
  return getAltitudeBackgroundClass(multiplier)
}

/**
 * Format relative time in a gentle way
 */
export function formatTime(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  return formatDistanceToNow(d, { addSuffix: true })
}

/**
 * Format date and time
 */
export function formatDateTime(date) {
  if (!date) return ''
  const d = date instanceof Date ? date : new Date(date)
  return format(d, 'MMM d, HH:mm:ss')
}

/**
 * Format number with locale
 */
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined) return '—'
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Format percentage
 */
export function formatPercent(num, decimals = 1) {
  if (num === null || num === undefined) return '—'
  return `${num.toFixed(decimals)}%`
}

/**
 * Format altitude (multiplier) with "x" suffix
 */
export function formatAltitude(multiplier, decimals = 2) {
  if (multiplier === null || multiplier === undefined) return '—'
  return `${multiplier.toFixed(decimals)}x`
}

/**
 * Get flight status message
 */
export function getFlightStatus(multiplier) {
  if (multiplier < 1.50) return 'Short flight'
  if (multiplier < 2.00) return 'Quick ascent'
  if (multiplier < 5.00) return 'Nice journey'
  if (multiplier < 10.00) return 'Great flight!'
  if (multiplier < 50.00) return 'Amazing altitude!'
  if (multiplier < 100.00) return 'Incredible journey!'
  return 'Legendary flight!'
}
