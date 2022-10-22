import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({text, value, unit}) => <tr><td>{text}</td><td>{value}{unit}</td></tr>

const EmptyStats = () => <div>No feedbacks given</div>

const Statistics = ({good,bad,neutral}) => {
  if ((good+neutral+bad)<=0) {
    return <EmptyStats/>
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={good+neutral+bad}/>
        <StatisticLine text="average" value={(good-bad)/(good+neutral+bad)}/>
        <StatisticLine text="positive" value={good/(good+neutral+bad)} unit="%"/>
        </tbody>
    </table>
  )
}

const setValue = (value, setFunction) => {
  const f = () => {
    setFunction(value)
  }
  return f
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <Header text={"Give feedback"}/>
      <Button text={"good"} handleClick={setValue(good+1, setGood)}/>
      <Button text={"neutral"} handleClick={setValue(neutral+1, setNeutral)}/>
      <Button text={"bad"}handleClick={setValue(bad+1, setBad)}/>
      <Header text={"Statistics"}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App