import { useAnecdotes, useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, removeAnecdote } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    setNotification(`you voted '${anecdote.content}'`)
  }

  const handleDelete = (anecdote) => {
    if (window.confirm(`Remove anecdote '${anecdote.content}'?`)) {
      removeAnecdote(anecdote.id)
    }
  }

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          {anecdote.content}
          <br />
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
          {anecdote.votes === 0 &&
            <button onClick={() => handleDelete(anecdote)}>delete</button>
          }
        </li>
      ))}
    </ul>
  )
}

export default AnecdoteList