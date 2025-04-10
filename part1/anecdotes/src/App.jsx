import { useState } from 'react'
import './App.css'

function App() {
  const [selected, setSelected] = useState(-1);
  const [votes, setVotes] =  useState([0,0,0,0,0,0,0,0]);
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  function getRandomNumber(selected){
    let anecdoteIndex = Math.floor(Math.random() * 8);
    if (anecdoteIndex !== selected){
      return anecdoteIndex;
    }
    else{
      return getRandomNumber(selected);
    }
      
  }
  const onClick = () => {
      let randomNumber = getRandomNumber(selected);
      setSelected(randomNumber);
  };

  const onClickVote = () => {
     if (selected !== -1) {
       const copyVotes = [...votes];
       copyVotes[selected] += 1;
       setVotes(copyVotes);
     }
  }

  const getMaxVoteIndex = (votes) => {
    if (votes.every(vote => vote === 0)) {
      return '';
    }
    else
      return votes.reduce((maxIndex, vote, index, array)=>{ return vote > array[maxIndex] ? index : maxIndex},0);
  }

  const maxVoteIndex = getMaxVoteIndex(votes);
  return (
    <>
      <div>
      <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
      </div>
      {
        selected !== -1 && (
          <div>has {votes[selected]} votes</div>
        )
      }
      <div>
        <button onClick={onClickVote}>vote</button>
        <button onClick={onClick} >next anecdote</button>        
      </div>
      <div>
      <h1>Anecdote with most votes</h1>
        {anecdotes[maxVoteIndex]}
      </div>
    </>
  )
}

export default App
