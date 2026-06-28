export interface World {
  id: string
  icon: string
  color: string
  glow: string
  border: string
  level: 1 | 2
  missionCount: number
}

export const worlds: World[] = [
  {
    id: 'html',
    icon: '🏗️',
    color: 'from-orange-500 to-amber-400',
    glow: 'shadow-orange-500/50',
    border: 'border-orange-400',
    level: 1,
    missionCount: 8,
  },
  {
    id: 'css',
    icon: '🎨',
    color: 'from-purple-600 to-pink-500',
    glow: 'shadow-purple-500/50',
    border: 'border-purple-400',
    level: 1,
    missionCount: 8,
  },
  {
    id: 'javascript',
    icon: '⚡',
    color: 'from-yellow-400 to-amber-300',
    glow: 'shadow-yellow-400/50',
    border: 'border-yellow-300',
    level: 1,
    missionCount: 8,
  },
  {
    id: 'react',
    icon: '⚛️',
    color: 'from-cyan-500 to-blue-400',
    glow: 'shadow-cyan-400/50',
    border: 'border-cyan-400',
    level: 2,
    missionCount: 8,
  },
  {
    id: 'nextjs',
    icon: '🚀',
    color: 'from-slate-400 to-slate-200',
    glow: 'shadow-slate-300/50',
    border: 'border-slate-300',
    level: 2,
    missionCount: 8,
  },
]
