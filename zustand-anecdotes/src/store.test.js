import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', () => {
    const mockAnecdotes = [
      { id: 1, content: 'Test anecdote', votes: 0 }
    ]

    const { result } = renderHook(() => useAnecdoteActions())

    act(() => {
      result.current.initialize(mockAnecdotes)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('vote increases the votes of an anecdote', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(1)
  })
})

describe('useAnecdotes sorting', () => {
  it('returns anecdotes sorted by votes in descending order', () => {
    const anecdotes = [
      { id: 1, content: 'Low votes', votes: 1 },
      { id: 2, content: 'High votes', votes: 5 },
      { id: 3, content: 'Medium votes', votes: 3 },
    ]
    useAnecdoteStore.setState({ anecdotes })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current[0].content).toBe('High votes')
    expect(result.current[1].content).toBe('Medium votes')
    expect(result.current[2].content).toBe('Low votes')
  })
})

describe('useAnecdotes filtering', () => {
  const anecdotes = [
    { id: 1, content: 'JavaScript is fun', votes: 0 },
    { id: 2, content: 'Coding is hard', votes: 0 },
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes })
  })

  it('returns all anecdotes with no filter', () => {
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(2)
  })

  it('filters anecdotes matching the filter text', () => {
    useAnecdoteStore.setState({ anecdotes, filter: 'javascript' })
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(1)
    expect(result.current[0].content).toBe('JavaScript is fun')
  })
})