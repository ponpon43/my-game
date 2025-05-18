import React, { useEffect, useState } from "react";
import playerImg from './assets/player.png';
import obstacleImg from "./assets/obstacle.png";

const catchphrases = [
  "ジムに行ったらコロナになったね！",
  "僕の故郷は新潟の糸魚川だね！",
  "えっ、えっ、えっ、うぇっ！、聞こえないね！",
  "僕の作ったパエリアおいしいでしょ！",
  "いつかはげるよ！",
  "最近、不健康なんだよね！",
  "それはチャンスボール理論だね！",
  "今日はネットが高すぎるね！",
  "微分して！微分して！微分して！",
  "積分はどんどん飛ばすね！",
  "落ちるよ！",
  "北高の非常勤もうできないね！",
  "いっ！いでやぁ！！",
  "それは、首が、飛ぶね！",
  "やらしいね～でもできるよ！",
  "難しいね～でもできるよ！",
  "僕は女子は苦手だね！",
  "僕は昔、不登校の生徒の対応で苦労しましたね！",
  "朝生徒に怒鳴るとスッキリするね！",
];

function App() {
  const [playerY, setPlayerY] = useState(200);
  const [velocity, setVelocity] = useState(0);
  const [obstacleX, setObstacleX] = useState(400);
  const [obstacleY, setObstacleY] = useState(230);
  const [obstacleDY, setObstacleDY] = useState(1.5);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(4);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [gameStartTime, setGameStartTime] = useState(Date.now()); // ゲーム開始時間

  const gravity = 0.5;

  useEffect(() => {
    if (isGameOver) return;

    const interval = setInterval(() => {
      setVelocity((v) => v + gravity);
      setPlayerY((y) => {
        const newY = y + velocity;
        return newY > 200 ? 200 : newY;
      });

      setScore((prev) => prev + 1);
      if (score % 100 === 0 && score !== 0) {
        setSpeed((s) => Math.min(s + 1, 15));
      }

      setObstacleX((x) => {
        if (x < -50) return 400;
        return x - speed;
      });

      // ここで10秒経過後にのみ上下移動
      const now = Date.now();
      const elapsed = now - gameStartTime;
      if (elapsed >= 10000) {
        setObstacleY((y) => {
          let nextY = y + obstacleDY;
          if (nextY < 180 || nextY > 260) {
            setObstacleDY((dy) => -dy);
            nextY = y - obstacleDY;
          }
          return nextY;
        });
      }

      // 衝突判定
      if (
        obstacleX < 90 &&
        obstacleX > 30 &&
        playerY + 60 > obstacleY &&
        playerY < obstacleY + 20
      ) {
        setIsGameOver(true);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [velocity, obstacleX, obstacleY, isGameOver, score, speed, obstacleDY, gameStartTime]);

  useEffect(() => {
    if (isGameOver) return;

    const showPhrase = () => {
      const randomIndex = Math.floor(Math.random() * catchphrases.length);
      setCurrentPhrase(catchphrases[randomIndex]);
      setTimeout(() => {
        setCurrentPhrase("");
      }, 2000);
    };

    const randomInterval = () =>
      Math.random() * 4000 + 3000;

    let timeoutId;

    const schedulePhrase = () => {
      timeoutId = setTimeout(() => {
        showPhrase();
        schedulePhrase();
      }, randomInterval());
    };

    schedulePhrase();

    return () => clearTimeout(timeoutId);
  }, [isGameOver]);

  const jump = () => {
    if (!isGameOver && playerY >= 200) {
      setVelocity(-10);
    }
  };

  const resetGame = () => {
    setIsGameOver(false);
    setPlayerY(200);
    setObstacleX(400);
    setObstacleY(230);
    setObstacleDY(1.5);
    setVelocity(0);
    setScore(0);
    setSpeed(4);
    setCurrentPhrase("");
    setGameStartTime(Date.now()); // ゲーム再開時にリセット
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
        background: "white",
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
        userSelect: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "#333",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        得点: {score}
      </div>

      {currentPhrase && (
        <div
          style={{
            position: "absolute",
            top: "20%",
            width: "100%",
            textAlign: "center",
            fontSize: 24,
            color: "blue",
            fontWeight: "bold",
          }}
        >
          {currentPhrase}
        </div>
      )}

      <img
        src={obstacleImg}
        alt="obstacle"
        style={{
          position: "absolute",
          left: obstacleX,
          top: obstacleY,
          width: 20,
          height: 20,
        }}
      />

      <img
        src={playerImg}
        alt="player"
        style={{
          position: "absolute",
          left: 50,
          top: playerY,
          width: 80,
          height: 80,
          objectFit: "contain",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 250,
          left: 0,
          width: "100%",
          height: 50,
          background: "green",
        }}
      ></div>

      {isGameOver && (
        <div
          style={{
            position: "absolute",
            top: "10%",
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "red",
          }}
        >
          ゲームオーバー(うぇ！うぇ！うぇ！聞こえないね！)<br />
          タップ or クリックでリスタート
        </div>
      )}
    </div>
  );
}

export default App;
