import React, { useState } from 'react';
import './App.css';

function App() {
  const [score, setScore] = useState(0);

  const handleClick = () => {
    setScore(score + 1);
  };

  return (
    <div className="App">
      <h1>クリックして得点をためよう！</h1>
      <button onClick={handleClick}>クリック！</button>
      <p>得点: {score}</p>
    </div>
  );
}

export default App;
