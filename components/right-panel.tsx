'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  quickStats,
  activeTasks as initialTasks,
  goals,
  type Task,
} from '@/lib/kratos-data'
import { TrendingUp, TrendingDown, Check } from 'lucide-react'

const priorityColor: Record<Task['priority'], string> = {
  high: 'bg-destructive',
  medium: 'bg-cyan',
  low: 'bg-muted-foreground',
}

function GoalRing({ progress }: { progress: number }) {
  const r = 16
  const c = 2 * Math.PI * r
  return (
    <svg viewBox="0 0 40 40" className="size-10 -rotate-90">
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        strokeWidth="3"
        className="stroke-muted"
      />
      <circle
        cx="20"
        cy="20"
        r={r}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-cyan"
        strokeDasharray={c}
        strokeDashoffset={c - (c * progress) / 100}
      />
    </svg>
  )
}

export function RightPanel() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)

  function toggle(id: string) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    )
  }

  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 xl:w-80">
      {/* Quick stats */}
      <div className="glass rounded-2xl p-4">
        <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {quickStats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-border bg-secondary/40 p-3"
            >
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {s.value}
              </p>
              <div
                className={cn(
                  'mt-1 flex items-center gap-1 text-[11px]',
                  s.trend === 'up' ? 'text-cyan' : 'text-muted-foreground',
                )}
              >
                {s.trend === 'up' ? (
                  <TrendingUp className="size-3" />
                ) : (
                  <TrendingDown className="size-3" />
                )}
                {s.delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active tasks */}
      <div className="glass rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Active Tasks
          </h3>
          <span className="font-mono text-[10px] text-cyan">
            {tasks.filter((t) => !t.done).length} open
          </span>
        </div>
        <ul className="space-y-2">
          {tasks.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                onClick={() => toggle(t.id)}
                className="flex w-full items-start gap-3 rounded-xl border border-border bg-secondary/30 p-3 text-left transition-colors hover:border-ring"
              >
                <span
                  className={cn(
                    'mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-md border transition-colors',
                    t.done
                      ? 'border-cyan bg-cyan/20 text-cyan'
                      : 'border-border',
                  )}
                >
                  {t.done && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-sm leading-snug',
                      t.done
                        ? 'text-muted-foreground line-through'
                        : 'text-foreground',
                    )}
                  >
                    {t.title}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <span
                      className={cn(
                        'size-1.5 rounded-full',
                        priorityColor[t.priority],
                      )}
                    />
                    {t.meta}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Goal progress */}
      <div className="glass rounded-2xl p-4">
        <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Goal Progress
        </h3>
        <ul className="space-y-3">
          {goals.map((g) => (
            <li key={g.id} className="flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <GoalRing progress={g.progress} />
                <span className="absolute font-mono text-[9px] text-cyan">
                  {g.progress}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-foreground">{g.label}</p>
                <p className="text-[11px] text-muted-foreground">
                  {g.progress}% complete
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
