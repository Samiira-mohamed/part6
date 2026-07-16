import { useAnecdotes, useAnecdoteActions } from './store'

const App = () => {
  const anecdotes = useAnecdotes()
  const { vote, addAnecdote } = useAnecdoteActions()

  const handleVote = (id) => {
    vote(id)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    addAnecdote(content)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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

      <h3>create new</h3>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App