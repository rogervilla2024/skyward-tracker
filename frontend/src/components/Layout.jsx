import { Link } from 'react-router-dom'
import { Footer } from '../../../../shared-core/components/footer/Footer'
import GAME_CONFIG from '../config/gameConfig'
import { SchemaMarkup } from '../../../../shared-core/components/SchemaMarkup'


// Game configuration for SEO
const GAME_SEO = {
  name: 'Skyward',
  provider: 'BGaming',
  rtp: 97,
  domain: 'skywardtracker.com',
  maxMultiplier: '10,000x',
  description: 'Real-time Skyward statistics tracker with live multiplier data, RTP analysis, and historical patterns.'
}

function Layout({ children, connected, connectionStatus, summary }) {
  return (
    <div className="min-h-screen bg-skyward-darker cloud-overlay">
      {/* Schema.org SEO Markup */}
      <SchemaMarkup game={GAME_SEO} />

      {/* Header */}
      <header className="border-b border-sky-500/20 bg-skyward-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="text-3xl animate-balloon">🎈</div>
              <div>
                <span className="text-xl font-bold gradient-text block">Skyward Tracker</span>
                <span className="text-xs text-sky-400/70">Peaceful altitude analytics</span>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link to="/what-is-skyward/" className="text-slate-400 hover:text-sky-400 transition-colors">What is Skyward?</Link>
              <Link to="/skyward-statistics/" className="text-slate-400 hover:text-sky-400 transition-colors">Statistics</Link>
              <Link to="/skyward-strategies/" className="text-slate-400 hover:text-sky-400 transition-colors">Strategies</Link>
              <Link to="/altitude-guide/" className="text-slate-400 hover:text-sky-400 transition-colors">Altitude Guide</Link>
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Demo Button */}
              <a
                href={GAME_CONFIG.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-semibold text-sm transition-all btn-peaceful"
              >
                <span>🎈</span>
                <span>Play Demo</span>
              </a>

              {/* Status */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
                connected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                <span className="hidden sm:inline">{connectionStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Responsible Gambling Banner */}
      <div className="bg-amber-500/5 border-b border-amber-500/10">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <p className="text-xs text-amber-400/80 text-center">
            🌟 {GAME_CONFIG.responsibleGambling.reminder}
          </p>
        </div>
      </div>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <Footer
        gameName="Skyward"
        gameEmoji="🎈"
        domain="skywardtracker.com"
        primaryColor="#0ea5e9"
        botUsername="SkywardTrackerBot"
        rtp={97}
        provider="BGaming"
      />
    </div>
  )
}

export default Layout
