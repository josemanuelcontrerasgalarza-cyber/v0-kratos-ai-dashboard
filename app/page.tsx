'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/top-bar'
import { ChatInterface } from '@/components/chat-interface'
import { RightPanel } from '@/components/right-panel'
import { navItems } from '@/lib/kratos-data'

export default function Page() {
  const [active, setActive] = useState('chat')
  const activeLabel =
    navItems.find((n) => n.id === active)?.label ?? 'Dashboard'

  return (
    <main className="relative flex h-screen w-full gap-4 overflow-hidden bg-background p-3 md:p-4">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 size-[32rem] rounded-full bg-primary/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-[28rem] rounded-full bg-cyan/5 blur-[120px]"
      />

      <Sidebar active={active} onSelect={setActive} />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <TopBar activeLabel={activeLabel} />

        <div className="flex min-h-0 flex-1 flex-col gap-4 xl:flex-row">
          <ChatInterface />
          <RightPanel />
        </div>
      </div>
    </main>
  )
}
