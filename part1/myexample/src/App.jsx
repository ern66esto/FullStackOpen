import { useState } from 'react'
import Hello from "./Hello";
import Display from './Display';
import Button from './Button';
import History from './History';

const App =() => {
  
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const [total, setTotal] = useState(0);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'));
    const updateLeft = left + 1;
    setLeft(updateLeft);
    setTotal(updateLeft + right);
  }
  //debugger

  const handleRightClick = () => {
    setAll(allClicks.concat('R'));
    const updateRight = right + 1;
    setRight(updateRight);
    setTotal(left + updateRight);
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks}/>
      <p>Total {total}</p>
    </div>
  )
}
export default App
