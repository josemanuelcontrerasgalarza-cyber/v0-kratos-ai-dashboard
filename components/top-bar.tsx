'use client'

import { systemStats } from '@/lib/kratos-data'
import { Activity, Wifi, ShieldCheck } from 'lucide-react'

export function TopBar({ activeLabel }: { activeLabel: string }) {
  return (
    <header className="glass flex flex-col gap-4 rounded-2xl px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-2 rounded-full bg-cyan animate-pulse-dot" />
          </span>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
            {activeLabel} · Online
          </p>
        </div>
        <h1 className="text-balance text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Good morning, <span className="text-cyan">Jose</span>
        </h1>
      </div>

      <div className="flex items-center gap-2.5">
        {systemStats.map((s) => (
          <div
            key={s.label}
            className="hidden min-w-20 flex-col gap-1.5 rounded-xl border border-border bg-secondary/40 px-3 py-2 sm:flex"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
              <span className="font-mono text-[10px] text-cyan">
                {s.value}%
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-cyan transition-all"
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center gap-1 rounded-xl border border-border bg-secondary/40 px-3 py-2.5">
          <ShieldCheck className="size-4 text-cyan" strokeWidth={1.75} />
          <Wifi className="size-4 text-muted-foreground" strokeWidth={1.75} />
          <Activity className="size-4 text-muted-foreground" strokeWidth={1.75} />
        </div>
      </div>
    </header>
  )
}
