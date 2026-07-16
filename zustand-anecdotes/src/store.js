import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create(set => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: (id) => set(state => ({
      anecdotes: state.anecdotes.map(anecdote =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    })),
    addAnecdote: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: (anecdotes) => set(() => ({ anecdotes })),
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)

  const filtered = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  return filtered.toSorted((a, b) => b.votes - a.votes)
}

export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)