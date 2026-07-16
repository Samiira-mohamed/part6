import { create } from 'zustand'

const getId = () => (100000 * Math.random()).toFixed(0)

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
    addAnecdote: (content) => set(state => ({
      anecdotes: state.anecdotes.concat({
        content,
        id: getId(),
        votes: 0,
      })
    })),
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