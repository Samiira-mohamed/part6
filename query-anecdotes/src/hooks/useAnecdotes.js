import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import NotificationContext from '../NotificationContext'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useContext(NotificationContext)

  const notify = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: (content) => {
      if (content.length < 5) {
        throw new Error('too short anecdote, must have length 5 or more')
      }
      return createAnecdote({ content, votes: 0 })
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notify(`you created '${newAnecdote.content}'`)
    },
    onError: (error) => {
      notify(error.message)
    }
  })

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote : a)
      )
      notify(`you voted '${updatedAnecdote.content}'`)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate(content),
    vote: (anecdote) => voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  }
}