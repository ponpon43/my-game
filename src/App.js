import React, { useEffect, useState } from "react";

function App() {
  const [playerY, setPlayerY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [obstacleX, setObstacleX] = useState(400);
  const [isGameOver, setIsGameOver] = useState(false);
  const gravity = 0.5;

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setVelocity((v) => v + gravity);
      setPlayerY((y) => {
        const newY = y + velocity;
        return newY > 200 ? 200 : newY;
      });

      setObstacleX((x) => {
        if (x < -50) return 400;
        return x - 4;
      });

      if (obstacleX < 70 && obstacleX > 30 && playerY > 160) {
        setIsGameOver(true);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [velocity, obstacleX, isGameOver]);

  const jump = () => {
    if (!isGameOver && playerY >= 200) {
      setVelocity(-10);
    }
  };

  const resetGame = () => {
    setIsGameOver(false);
    setPlayerY(200);
    setObstacleX(400);
    setVelocity(0);
  };

  const handleInput = () => {
    if (isGameOver) {
      resetGame();
    } else {
      jump();
    }
  };

  return (
    <div
      onTouchStart={handleInput}
      onClick={handleInput}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ccf",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        userSelect: "none",
      }}
    >
      {/* プレイヤー */}
      <div
        style={{
          position: "absolute",
          left: 50,
          top: playerY,
          width: 30,
          height: 30,
          backgroundColor: "tomato",
          borderRadius: "50%",
        }}
      ></div>

      {/* 障害物 */}
      <div
        style={{
          position: "absolute",
          top: 230,
          left: obstacleX,
          width: 20,
          height: 20,
          backgroundColor: "black",
        }}
      ></div>

      {/* 地面 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: 50,
          backgroundColor: "#444",
        }}
      ></div>

      {/* ゲームオーバー表示 */}
      {isGameOver && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            width: "100%",
            textAlign: "center",
            fontSize: 24,
            color: "red",
          }}
        >
          ゲームオーバー<br />
          タップ or クリックでリスタート
        </div>
      )}
    </div>
  );
}

export default App;


// import React, { useState } from 'react';
// import './App.css';

// function App() {
//   const [score, setScore] = useState(0);

//   const handleClick = () => {
//     setScore(score + 1);
//   };

//   return (
//     <div className="App">
//       <h1>クリックして得点をためよう！</h1>
//       <button onClick={handleClick}>クリック！</button>
//       <p>得点: {score}</p>
//     </div>
//   );
// }

// export default App;
