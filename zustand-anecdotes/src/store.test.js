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