import clsx from 'clsx'

const colorClasses = {
  default: 'from-slate-600/20 to-slate-700/20 border-slate-600/30',
  sky: 'from-sky-600/20 to-sky-700/20 border-sky-500/30',
  cyan: 'from-cyan-600/20 to-cyan-700/20 border-cyan-500/30',
  purple: 'from-purple-600/20 to-purple-700/20 border-purple-500/30',
  green: 'from-emerald-600/20 to-emerald-700/20 border-emerald-500/30',
  orange: 'from-orange-600/20 to-orange-700/20 border-orange-500/30',
  amber: 'from-amber-600/20 to-amber-700/20 border-amber-500/30',
  blue: 'from-blue-600/20 to-blue-700/20 border-blue-500/30',
  violet: 'from-violet-600/20 to-violet-700/20 border-violet-500/30',
}

export default function StatsCard({ title, value, subtitle, icon, color = 'default', loading }) {
  return (
    <div className={clsx(
      'p-4 rounded-xl bg-gradient-to-br border backdrop-blur-sm transition-all hover:scale-105',
      colorClasses[color]
    )}>
      <div className="flex items-center gap-2 mb-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-xs text-slate-400 uppercase tracking-wide">{title}</span>
      </div>

      {loading ? (
        <div className="h-8 bg-slate-700/50 rounded animate-pulse"></div>
      ) : (
        <>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </>
      )}
    </div>
  )
}
