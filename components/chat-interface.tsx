'use client'

import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  initialMessages,
  suggestedPrompts,
  type ChatMessage,
} from '@/lib/kratos-data'
import { ArrowUp, Mic, Sparkles } from 'lucide-react'

function CoreOrb({ thinking }: { thinking: boolean }) {
  return (
    <div className="relative flex size-9 shrink-0 items-center justify-center">
      <span
        className={cn(
          'absolute inset-0 rounded-full bg-cyan/20',
          thinking && 'animate-ping',
        )}
      />
      <span className="glow-border flex size-9 items-center justify-center rounded-full bg-primary/15">
        <Sparkles className="size-4 text-cyan" strokeWidth={1.75} />
      </span>
    </div>
  )
}

function Bubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === 'assistant'
  return (
    <div
      className={cn(
        'flex w-full gap-3',
        isAssistant ? 'justify-start' : 'flex-row-reverse',
      )}
    >
      {isAssistant ? (
        <CoreOrb thinking={false} />
      ) : (
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-xs font-medium text-foreground">
          JR
        </span>
      )}
      <div
        className={cn(
          'max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isAssistant
            ? 'glass rounded-tl-sm text-card-foreground'
            : 'rounded-tr-sm bg-primary/15 text-foreground',
        )}
      >
        {isAssistant && (
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
            Kratos
          </p>
        )}
        <p className="text-pretty">{message.content}</p>
        <p className="mt-1.5 text-right font-mono text-[10px] text-muted-foreground">
          {message.time}
        </p>
      </div>
    </div>
  )
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, thinking])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: trimmed, time: now },
    ])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content:
            'Understood. I am processing that now and will surface the results across your task and goal panels in real time.',
          time: now,
        },
      ])
      setThinking(false)
    }, 1400)
  }

  return (
    <section className="glass relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-2xl">
      {/* ambient grid + scanline */}
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan to-transparent opacity-60 animate-scan" />

      {/* header */}
      <div className="relative flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <CoreOrb thinking={thinking} />
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Kratos Core
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {thinking ? 'Processing…' : 'Ready · Listening'}
            </p>
          </div>
        </div>
        <span className="hidden rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan sm:block">
          Neural Link Stable
        </span>
      </div>

      {/* messages */}
      <div
        ref={scrollRef}
        className="relative flex-1 space-y-5 overflow-y-auto px-5 py-6"
      >
        {messages.map((m) => (
          <Bubble key={m.id} message={m} />
        ))}
        {thinking && (
          <div className="flex items-center gap-3">
            <CoreOrb thinking />
            <div className="glass flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3">
              <span className="size-1.5 animate-bounce rounded-full bg-cyan [animation-delay:-0.3s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-cyan [animation-delay:-0.15s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-cyan" />
            </div>
          </div>
        )}
      </div>

      {/* composer */}
      <div className="relative border-t border-border p-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-cyan"
            >
              {p}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="glow-border flex items-center gap-2 rounded-xl bg-background/60 px-3 py-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Kratos anything…"
            aria-label="Message Kratos"
            className="flex-1 bg-transparent px-1 py-1.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Voice input"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-cyan"
          >
            <Mic className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="submit"
            aria-label="Send message"
            disabled={!input.trim()}
            className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <ArrowUp className="size-4" strokeWidth={2.25} />
          </button>
        </form>
      </div>
    </section>
  )
}
