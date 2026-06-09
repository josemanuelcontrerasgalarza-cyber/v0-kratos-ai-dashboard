'use client'

import { cn } from '@/lib/utils'
import { navItems } from '@/lib/kratos-data'
import { Settings, Power } from 'lucide-react'

export function Sidebar({
  active,
  onSelect,
}: {
  active: string
  onSelect: (id: string) => void
}) {
  return (
    <aside className="glass flex w-16 shrink-0 flex-col items-center gap-1 rounded-2xl py-4 lg:w-20">
      {/* Brand mark */}
      <button
        type="button"
        onClick={() => onSelect('dashboard')}
        className="glow-border mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10"
        aria-label="Kratos home"
      >
        <span className="font-mono text-lg font-bold text-cyan">K</span>
      </button>

      <nav className="flex flex-1 flex-col items-center gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              title={item.label}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex size-11 items-center justify-center rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-primary/15 text-cyan glow-border'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              {isActive && (
                <span className="absolute left-0 h-5 w-0.5 -translate-x-2 rounded-full bg-cyan animate-border-flow" />
              )}
              <Icon className="size-5" strokeWidth={1.75} />
              <span className="pointer-events-none absolute left-full z-20 ml-3 hidden whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-xs text-popover-foreground shadow-lg group-hover:block lg:group-hover:hidden">
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-1.5">
        <button
          type="button"
          title="Settings"
          aria-label="Settings"
          className="flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Settings className="size-5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          title="Power"
          aria-label="Power"
          className="flex size-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
        >
          <Power className="size-5" strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  )
}
