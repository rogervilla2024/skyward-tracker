import { useState } from 'react'
import { Link } from 'react-router-dom'
import GAME_CONFIG from '../config/gameConfig'
import LiveFeed from '../components/LiveFeed'
import StatsCard from '../components/StatsCard'
import DistributionChart from '../components/DistributionChart'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: '☁️' },
  { id: 'altitude', label: 'Altitude Zones', icon: '🎈' },
  { id: 'compare', label: 'Compare', icon: '⚖️' },
]

// Altitude zone component
function AltitudeZone({ zone, percentage }) {
  const colorClasses = {
    emerald: 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400',
    lime: 'from-lime-500/20 to-lime-600/20 border-lime-500/30 text-lime-400',
    sky: 'from-sky-500/20 to-sky-600/20 border-sky-500/30 text-sky-400',
    blue: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400',
    violet: 'from-violet-500/20 to-violet-600/20 border-violet-500/30 text-violet-400',
    purple: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400',
  }

  return (
    <div className={`p-4 rounded-xl bg-gradient-to-r ${colorClasses[zone.color]} border backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{zone.icon}</span>
          <span className="font-semibold text-white">{zone.name}</span>
        </div>
        <span className="text-sm opacity-80">{zone.min.toFixed(2)}x - {zone.max.toFixed(2)}x</span>
      </div>
      {percentage !== undefined && (
        <div className="mt-2">
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${colorClasses[zone.color].split(' ')[0].replace('/20', '')} ${colorClasses[zone.color].split(' ')[1].replace('/20', '')}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs opacity-60 mt-1 block">{percentage.toFixed(1)}% of flights</span>
        </div>
      )}
    </div>
  )
}

function HomePage({ rounds, summary, distribution, recentRounds, loading, refetch }) {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <>
      {/* Tabs */}
      <div className="border-b border-sky-500/10 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-sky-600/20 to-cyan-600/20 text-sky-400 border border-sky-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}

            <div className="w-px h-6 bg-slate-700/50 mx-2"></div>

            <Link
              to="/skyward-vs-aviator/"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all whitespace-nowrap"
            >
              <span>✈️</span>
              <span className="hidden md:inline">vs Aviator</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="sr-only">Skyward Statistics - Real-time Hot Air Balloon Game Analytics</h1>

        {activeTab === 'dashboard' && (
          <>
            {/* Stats */}
            <section className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                  <span>☁️</span> Flight Statistics
                </h2>
                <button onClick={refetch} disabled={loading} className="text-xs text-slate-400 hover:text-sky-400 transition-colors">
                  Refresh
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <StatsCard title="Total Flights" value={summary?.total_rounds?.toLocaleString() || '—'} icon="🎈" />
                <StatsCard title="Avg Altitude" value={summary?.avg_multiplier ? `${summary.avg_multiplier.toFixed(2)}x` : '—'} icon="📊" color="sky" />
                <StatsCard title="Median" value={summary?.median_multiplier ? `${summary.median_multiplier.toFixed(2)}x` : '—'} icon="⚖️" color="cyan" />
                <StatsCard title="Peak Altitude" value={summary?.max_multiplier ? `${summary.max_multiplier.toFixed(2)}x` : '—'} icon="🌌" color="purple" />
                <StatsCard title="Early Landings" value={summary?.under_2x_count?.toLocaleString() || '—'} icon="🌱" color="orange" subtitle="Under 2x" />
                <StatsCard title="High Flights" value={summary?.over_10x_count?.toLocaleString() || '—'} icon="✨" color="green" subtitle="Over 10x" />
              </div>
            </section>

            {/* Game + Live Feed */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <div className="card overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <span className="animate-balloon inline-block">🎈</span> Play Skyward
                    </h2>
                    <span className="px-2 py-1 text-xs bg-emerald-500/20 text-emerald-400 rounded">Free Demo</span>
                  </div>

                  <div className="relative w-full rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    {/* Peaceful sky background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-sky-700 to-amber-500/50">
                      {/* Clouds decoration */}
                      <div className="absolute top-10 left-10 text-6xl opacity-20 animate-cloud">☁️</div>
                      <div className="absolute top-20 right-20 text-4xl opacity-15 animate-cloud" style={{ animationDelay: '2s' }}>☁️</div>
                      <div className="absolute bottom-32 left-1/4 text-5xl opacity-10 animate-cloud" style={{ animationDelay: '4s' }}>☁️</div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <div className="text-8xl mb-4 animate-balloon">🎈</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Skyward by BGaming</h3>
                        <p className="text-sky-100 mb-6 max-w-md">
                          Rise peacefully through the skies. Cash out before the balloon descends. Up to {GAME_CONFIG.maxMultiplier.toLocaleString()}x altitude!
                        </p>

                        <a
                          href={GAME_CONFIG.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold text-lg rounded-xl shadow-2xl shadow-sky-500/30 transition-all hover:scale-105"
                        >
                          <span className="text-2xl">🎈</span>
                          <span>Start Your Journey</span>
                        </a>

                        <div className="flex flex-wrap justify-center gap-3 mt-6">
                          <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm text-sky-100">
                            {GAME_CONFIG.rtp}% RTP
                          </span>
                          <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm text-sky-100">
                            Up to {GAME_CONFIG.maxMultiplier.toLocaleString()}x
                          </span>
                          <span className="px-3 py-1 bg-white/10 backdrop-blur rounded-full text-sm text-sky-100">
                            Peaceful Gameplay
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-500 text-center">
                    Opens official BGaming demo in new tab | House edge: {GAME_CONFIG.houseEdge}%
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <LiveFeed rounds={rounds} />
              </div>
            </section>

            {/* Distribution Chart */}
            <section className="mb-6">
              <DistributionChart data={distribution} />
            </section>

            {/* Altitude Zones Preview */}
            <section className="card">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <span>🗺️</span> Altitude Zones
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {GAME_CONFIG.altitudeZones.map((zone, idx) => (
                  <AltitudeZone key={idx} zone={zone} />
                ))}
              </div>
            </section>
          </>
        )}

        {activeTab === 'altitude' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <span>🎈</span> Understanding Altitude Zones
              </h2>
              <p className="text-slate-400 mb-6">
                In Skyward, your balloon rises through different altitude zones. Each zone represents a multiplier range.
                The higher you go, the greater the reward - but also the risk of descending!
              </p>

              <div className="space-y-4">
                {GAME_CONFIG.altitudeZones.map((zone, idx) => (
                  <AltitudeZone key={idx} zone={zone} />
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                <span>💡</span> Peaceful Playing Tips
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">•</span>
                  <span>Start with small bets to enjoy the calm atmosphere without stress</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-400">•</span>
                  <span>Set auto-cashout at comfortable altitudes for consistent gameplay</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">•</span>
                  <span>Remember: past flights do not predict future altitudes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-violet-400">•</span>
                  <span>Take breaks and enjoy the journey, not just the destination</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Skyward vs Other Crash Games</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4">Game</th>
                    <th className="text-left py-3 px-4">Provider</th>
                    <th className="text-left py-3 px-4">RTP</th>
                    <th className="text-left py-3 px-4">Max Multi</th>
                    <th className="text-left py-3 px-4">Theme</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-700/50 bg-sky-500/10">
                    <td className="py-3 px-4 font-semibold">🎈 Skyward</td>
                    <td className="py-3 px-4">BGaming</td>
                    <td className="py-3 px-4 text-emerald-400">97.0%</td>
                    <td className="py-3 px-4">10,000x</td>
                    <td className="py-3 px-4">Peaceful Balloon</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">✈️ Aviator</td>
                    <td className="py-3 px-4">Spribe</td>
                    <td className="py-3 px-4 text-emerald-400">97.0%</td>
                    <td className="py-3 px-4">10,000x</td>
                    <td className="py-3 px-4">Fast Airplane</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">🚀 Spaceman</td>
                    <td className="py-3 px-4">Pragmatic Play</td>
                    <td className="py-3 px-4">96.5%</td>
                    <td className="py-3 px-4">5,000x</td>
                    <td className="py-3 px-4">Space Adventure</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">🛩️ JetX</td>
                    <td className="py-3 px-4">SmartSoft</td>
                    <td className="py-3 px-4 text-emerald-400">97.0%</td>
                    <td className="py-3 px-4">25,000x</td>
                    <td className="py-3 px-4">Jet Fighter</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4">🚁 Cash or Crash</td>
                    <td className="py-3 px-4">Evolution</td>
                    <td className="py-3 px-4 text-emerald-400">99.5%</td>
                    <td className="py-3 px-4">50,000x</td>
                    <td className="py-3 px-4">Blimp Journey</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Skyward offers a uniquely peaceful experience compared to high-intensity crash games.
              The calm hot air balloon theme creates a relaxing atmosphere while maintaining exciting gameplay.
            </p>
          </div>
        )}
      </main>
    </>
  )
}

export default HomePage
