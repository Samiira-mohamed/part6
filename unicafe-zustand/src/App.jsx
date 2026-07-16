import { useGood, useNeutral, useBad, useUnicafeActions } from './store'

const App = () => {
  const good = useGood()
  const neutral = useNeutral()
  const bad = useBad()
  const { good: addGood, neutral: addNeutral, bad: addBad, reset } = useUnicafeActions()

  const total = good + neutral + bad
  const average = total === 0 ? 0 : (good - bad) / total
  const positive = total === 0 ? 0 : (good / total) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>
      <button onClick={reset}>reset stats</button>

      <h1>statistics</h1>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <tr><td>good</td><td>{good}</td></tr>
            <tr><td>neutral</td><td>{neutral}</td></tr>
            <tr><td>bad</td><td>{bad}</td></tr>
            <tr><td>all</td><td>{total}</td></tr>
            <tr><td>average</td><td>{average}</td></tr>
            <tr><td>positive</td><td>{positive} %</td></tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

export default App