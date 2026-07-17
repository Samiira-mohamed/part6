import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`)
  }

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          {anecdote.content}
          <br />
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </li>
      ))}
    </ul>
  )
}

export default AnecdoteList