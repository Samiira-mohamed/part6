import { useAnecdotes, useAnecdoteActions } from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes)
  const { vote } = useAnecdoteActions()

  const handleVote = (id) => {
    vote(id)
  }

  return (
    <ul>
      {anecdotes.map(anecdote => (
        <li key={anecdote.id}>
          {anecdote.content}
          <br />
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote.id)}>vote</button>
        </li>
      ))}
    </ul>
  )
}

export default AnecdoteList