import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import GAME_CONFIG, { CHART_COLORS } from '../config/gameConfig'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 border border-sky-500/30 rounded-lg p-3 shadow-xl">
        <p className="text-sky-400 font-semibold">{label}</p>
        <p className="text-white">{payload[0].value.toLocaleString()} flights</p>
        <p className="text-xs text-slate-400">
          {((payload[0].value / payload[0].payload.total) * 100).toFixed(1)}% of all flights
        </p>
      </div>
    )
  }
  return null
}

export default function DistributionChart({ data = [] }) {
  // Transform distribution data for chart
  const chartData = data.length > 0 ? data.map((item, idx) => ({
    ...item,
    name: item.range || item.label || `Range ${idx + 1}`,
    count: item.count || item.value || 0,
    total: data.reduce((sum, d) => sum + (d.count || d.value || 0), 0)
  })) : [
    { name: 'Ground (1.0-1.5x)', count: 0, total: 0 },
    { name: 'Trees (1.5-2.0x)', count: 0, total: 0 },
    { name: 'Clouds (2.0-5.0x)', count: 0, total: 0 },
    { name: 'Strato (5.0-10x)', count: 0, total: 0 },
    { name: 'High (10x-50x)', count: 0, total: 0 },
    { name: 'Beyond (50x+)', count: 0, total: 0 },
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <span>📊</span> Altitude Distribution
        </h2>
        <span className="text-xs text-slate-400">Based on recent flights</span>
      </div>

      <div className="h-64">
        {chartData.some(d => d.count > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <XAxis
                dataKey="name"
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
              />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 11 }}
                axisLine={{ stroke: '#334155' }}
                tickLine={{ stroke: '#334155' }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(14, 165, 233, 0.1)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <div className="text-4xl mb-2 animate-float">🎈</div>
            <p className="text-sm">Collecting flight data...</p>
            <p className="text-xs mt-1">Distribution chart will appear soon</p>
          </div>
        )}
      </div>

      {/* Altitude Zone Legend */}
      <div className="mt-4 pt-4 border-t border-slate-700/30">
        <div className="grid grid-cols-3 gap-2 text-xs">
          {GAME_CONFIG.altitudeZones.slice(0, 6).map((zone, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: CHART_COLORS[idx] }}
              />
              <span className="text-slate-400">{zone.icon} {zone.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
