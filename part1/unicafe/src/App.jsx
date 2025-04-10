import { useState } from 'react'
import Hello from "./Hello";
import Display from './Display';
import Button from './Button';
import History from './History';
import Statistics from './Statistics';

const App =() => {
  
  const [good, setsetGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodtClick = () => {
    const updateGood = good + 1;
    setsetGood(updateGood);
    setTotal(updateGood + neutral + bad);
  }
  //debugger

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1;
    setNeutral(updateNeutral);
    setTotal(updateNeutral + good + bad);
  }

  const handleBadClick = () => {
    const updateBad = bad + 1;
    setBad(updateBad);
    setTotal(updateBad + good + neutral);
  }

  return (
    <>
    <h1>give feedback</h1>
    <div>
      <Button handleClick={handleGoodtClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics  good={good} neutral={neutral} bad={bad} total={total}/>
    </div>
    </>
  )
}
export default App
