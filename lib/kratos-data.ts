import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  MessageSquare,
  ListChecks,
  FolderKanban,
  Target,
  Focus,
  BarChart3,
} from 'lucide-react'

export type NavItem = {
  id: string
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'tasks', label: 'Tasks', icon: ListChecks },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'focus', label: 'Focus Mode', icon: Focus },
  { id: 'stats', label: 'Stats', icon: BarChart3 },
]

export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
  time: string
}

export const initialMessages: ChatMessage[] = [
  {
    id: 'm1',
    role: 'assistant',
    content:
      'Good morning, Jose. Systems are nominal. You have 3 priority tasks and a strategy review at 11:00. Where would you like to begin?',
    time: '08:42',
  },
  {
    id: 'm2',
    role: 'user',
    content: 'Give me a rundown of today and flag anything at risk.',
    time: '08:43',
  },
  {
    id: 'm3',
    role: 'assistant',
    content:
      'Tracking. The Q3 launch deck is 80% complete but blocked on legal review — I would recommend escalating that first. Engineering sync is on schedule, and your focus window for deep work is reserved from 14:00 to 16:00.',
    time: '08:43',
  },
]

export const suggestedPrompts: string[] = [
  'Summarize my day',
  'Draft the launch update',
  'What is blocking the Q3 deck?',
  'Plan a focus session',
]

export type StatItem = {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down'
}

export const quickStats: StatItem[] = [
  { label: 'Focus Time', value: '4.2h', delta: '+18%', trend: 'up' },
  { label: 'Tasks Done', value: '12', delta: '+4', trend: 'up' },
  { label: 'Response', value: '0.3s', delta: '-12%', trend: 'down' },
  { label: 'Efficiency', value: '94%', delta: '+6%', trend: 'up' },
]

export type Task = {
  id: string
  title: string
  meta: string
  priority: 'high' | 'medium' | 'low'
  done: boolean
}

export const activeTasks: Task[] = [
  {
    id: 't1',
    title: 'Finalize Q3 launch deck',
    meta: 'Blocked · Legal review',
    priority: 'high',
    done: false,
  },
  {
    id: 't2',
    title: 'Review engineering sprint',
    meta: 'Due 11:00',
    priority: 'medium',
    done: false,
  },
  {
    id: 't3',
    title: 'Approve design system v2',
    meta: 'Awaiting your sign-off',
    priority: 'medium',
    done: false,
  },
  {
    id: 't4',
    title: 'Send investor update',
    meta: 'Completed 08:10',
    priority: 'low',
    done: true,
  },
]

export type Goal = {
  id: string
  label: string
  progress: number
}

export const goals: Goal[] = [
  { id: 'g1', label: 'Ship Kratos v1.0', progress: 78 },
  { id: 'g2', label: 'Reach 10k users', progress: 52 },
  { id: 'g3', label: 'Series A close', progress: 35 },
]

export type SystemStat = {
  label: string
  value: number
}

export const systemStats: SystemStat[] = [
  { label: 'CPU', value: 42 },
  { label: 'Memory', value: 61 },
  { label: 'Neural', value: 88 },
]
