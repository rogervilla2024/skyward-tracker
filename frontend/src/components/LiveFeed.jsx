import { getAltitudeClass, getAltitudeZone } from '../utils/formatters'

export default function LiveFeed({ rounds = [] }) {
  const displayRounds = rounds.slice(0, 20)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>☁️</span> Flight Log
        </h2>
        <span className="text-xs text-slate-400">{rounds.length} flights</span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto scrollbar-hide">
        {displayRounds.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2 animate-balloon">🎈</div>
            <p className="text-sm text-slate-500">Waiting for flights...</p>
          </div>
        ) : (
          displayRounds.map((round, idx) => {
            const zone = getAltitudeZone(round.crash_multiplier)
            return (
              <div
                key={round.round_id || idx}
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                  round.isNew ? 'bg-sky-500/20 animate-pulse' : 'bg-slate-800/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{zone.icon}</span>
                  <div>
                    <span className="text-xs text-slate-500 font-mono block">
                      #{round.round_id?.slice(-6) || idx}
                    </span>
                    <span className="text-xs text-slate-400">{zone.name}</span>
                  </div>
                </div>
                <span className={`font-bold font-mono text-lg ${getAltitudeClass(round.crash_multiplier)}`}>
                  {round.crash_multiplier?.toFixed(2)}x
                </span>
              </div>
            )
          })
        )}
      </div>

      {/* Altitude Legend */}
      <div className="mt-4 pt-3 border-t border-slate-700/30">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1 text-emerald-400">
            <span>🌱</span> Ground
          </span>
          <span className="flex items-center gap-1 text-lime-400">
            <span>🌲</span> Trees
          </span>
          <span className="flex items-center gap-1 text-sky-400">
            <span>☁️</span> Clouds
          </span>
          <span className="flex items-center gap-1 text-blue-400">
            <span>🌤️</span> Strato
          </span>
          <span className="flex items-center gap-1 text-violet-400">
            <span>✨</span> Beyond
          </span>
        </div>
      </div>
    </div>
  )
}
