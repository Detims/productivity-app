import React, { useState, useRef, useEffect } from "react"
import Countdown from "../Countdown"

function Timer() {
    const {
      targetTime,
      isRunning,
      remainingTime,
      startTime,
      setTargetTime,
      startTimer,
      pauseTimer,
      resetTimer,
    } = Countdown();
  
    const intervalRef = useRef(null); // Ref to store the interval ID
    const [currentTime, setCurrentTime] = useState(Date.now());
  
    useEffect(() => {
      if (targetTime && isRunning) {
        intervalRef.current = setInterval(() => {
          setCurrentTime(Date.now());
        }, 1000);
      }
  
      return () => {
        clearInterval(intervalRef.current);
      };
    }, [targetTime, isRunning]);
  
    useEffect(() => {
      if(startTime && isRunning){
        const newRemainingTime = targetTime - (currentTime - startTime);
        if(newRemainingTime <= 0){
          pauseTimer();
          resetTimer();
        } else {
          Countdown.setState({remainingTime: newRemainingTime});
        }
      }
    }, [currentTime, startTime, isRunning, targetTime, pauseTimer, resetTimer]);
  
    const handleStart = () => {
      startTimer();
    };
  
    const handlePause = () => {
      pauseTimer();
    };
  
    const handleReset = () => {
      resetTimer();
    };
  
    const handleSetTime = (e) => {
      const timeInSeconds = parseInt(e.target.value, 10) * 1000;
      setTargetTime(timeInSeconds);
    };
  
    // Format remaining time to display
    const formatTime = (timeInMilliseconds) => {
      const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
      const minutes = Math.floor((timeInMilliseconds / (1000 * 60)) % 60);
      const hours = Math.floor((timeInMilliseconds / (1000 * 60 * 60)) % 24);
  
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
  
    return (
      <div>
        <input type="number" onChange={handleSetTime} placeholder="Set time in seconds" />
        <button onClick={handleStart} disabled={!targetTime || isRunning}>Start</button>
        <button onClick={handlePause} disabled={!targetTime || !isRunning}>Pause</button>
        <button onClick={handleReset} disabled={!targetTime}>Reset</button>
        {targetTime && <div>Time Remaining: {formatTime(remainingTime)}</div>}
      </div>
    );
  }
  
  export default Timer;