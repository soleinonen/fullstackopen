import { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Title = ({text}) => <h2>{text}</h2>

const pickRandomListIndex = (list) => Math.floor(Math.random()*list.length)

const setRandomListItem = (func, list) => {
  const f = () => {
    func(pickRandomListIndex(list))
  }
  return f
}

const updatePoints = (selected, points, setFunc) => {
  const p = [...points]
  p[selected] +=1
  const f = () => {
    setFunc(p)
  }
  return f
}

const Stats = ({n}) => <div>has {n} votes</div>

const indexOfMaxValue = (list) => list.indexOf(Math.max(...list))

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(pickRandomListIndex(anecdotes))
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <Title text="Anecdote of the day"/>
      {anecdotes[selected]}
      <Stats n={points[selected]}/>
      <Button text="Vote this anecdote" handleClick={updatePoints(selected, points, setPoints)}/>
      <Button text="Next anecdote" handleClick={setRandomListItem(setSelected, anecdotes)}/>
      <Title text="Anecdote with most votes"/>
      {anecdotes[indexOfMaxValue(points)]}
      <Stats n={points[indexOfMaxValue(points)]}/>
    </div>
  )
}
export default App