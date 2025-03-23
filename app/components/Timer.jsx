import { useState, useEffect, useRef } from 'react';

export default function Timer() {
  // Timer state
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSession, setCurrentSession] = useState('work');
  const [completedSessions, setCompletedSessions] = useState(0);
  
  // Settings state
  const [workTime, setWorkTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [sessionsUntilLongBreak, setSessionsUntilLongBreak] = useState(4);
  
  // Refs
  const timerRef = useRef(null);
  const alarmSound = useRef(null);
  
  // Format time for display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Update document title when timer changes
  useEffect(() => {
    document.title = `${formatTime(timeLeft)} - Pomodoro Timer`;
    return () => {
      document.title = 'Pomodoro Timer';
    };
  }, [timeLeft]);
  
  // Start timer function
  const startTimer = () => {
    if (isPaused) {
      setIsPaused(false);
    } else if (!isRunning) {
      setIsRunning(true);
    }
    
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          playAlarm();
          handleSessionComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Handle session completion
  const handleSessionComplete = () => {
    if (currentSession === 'work') {
      setCompletedSessions(prev => prev + 1);
      
      if ((completedSessions + 1) % sessionsUntilLongBreak === 0) {
        setCurrentSession('longBreak');
        setTimeLeft(longBreak * 60);
      } else {
        setCurrentSession('shortBreak');
        setTimeLeft(shortBreak * 60);
      }
    } else {
      setCurrentSession('work');
      setTimeLeft(workTime * 60);
    }
    
    // Auto-start next session
    setTimeout(startTimer, 500);
  };
  
  // Play alarm sound
  const playAlarm = () => {
    if (alarmSound.current) {
      alarmSound.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };
  
  // Pause timer function
  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
    setIsRunning(false);
  };
  
  // Reset timer function
  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsPaused(false);
    setCurrentSession('work');
    setTimeLeft(workTime * 60);
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  
  // Apply settings changes
  const handleSettingChange = (setter, value) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setter(numValue);
      if (!isRunning && currentSession === 'work' && setter === setWorkTime) {
        setTimeLeft(numValue * 60);
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white rounded-lg p-8 shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-6">Pomodoro Study Timer</h1>
        
        <div className="mb-6">
          <span className="font-bold text-red-600 text-lg">
            {currentSession === 'work' 
              ? 'Work Time' 
              : currentSession === 'shortBreak' 
                ? 'Short Break' 
                : 'Long Break'}
          </span>
        </div>
        
        <div className="text-6xl font-bold text-gray-800 my-4">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex justify-center gap-4 my-6">
          <button 
            onClick={startTimer}
            disabled={isRunning && !isPaused}
            className={`px-6 py-3 rounded text-white text-lg ${isRunning && !isPaused ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
          >
            {isPaused ? 'Resume' : 'Start'}
          </button>
          <button 
            onClick={pauseTimer}
            disabled={!isRunning || isPaused}
            className={`px-6 py-3 rounded text-white text-lg ${!isRunning || isPaused ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
          >
            Pause
          </button>
          <button 
            onClick={resetTimer}
            className="px-6 py-3 rounded bg-red-600 text-white text-lg hover:bg-red-700"
          >
            Reset
          </button>
        </div>
        
        <div className="text-lg mb-6">
          Completed Pomodoros: <span className="font-bold text-green-600">{completedSessions}</span>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-bold text-lg mb-4">Settings (minutes)</h3>
          
          <div className="flex justify-between items-center my-2">
            <label htmlFor="work-time">Work Time:</label>
            <input 
              type="number" 
              id="work-time" 
              min="1" 
              max="60" 
              value={workTime}
              onChange={(e) => handleSettingChange(setWorkTime, e.target.value)}
              className="w-16 p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="flex justify-between items-center my-2">
            <label htmlFor="short-break">Short Break:</label>
            <input 
              type="number" 
              id="short-break" 
              min="1" 
              max="30" 
              value={shortBreak}
              onChange={(e) => handleSettingChange(setShortBreak, e.target.value)}
              className="w-16 p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="flex justify-between items-center my-2">
            <label htmlFor="long-break">Long Break:</label>
            <input 
              type="number" 
              id="long-break" 
              min="1" 
              max="60" 
              value={longBreak}
              onChange={(e) => handleSettingChange(setLongBreak, e.target.value)}
              className="w-16 p-2 border border-gray-300 rounded"
            />
          </div>
          
          <div className="flex justify-between items-center my-2">
            <label htmlFor="sessions-until-long-break">Sessions until Long Break:</label>
            <input 
              type="number" 
              id="sessions-until-long-break" 
              min="1" 
              max="10" 
              value={sessionsUntilLongBreak}
              onChange={(e) => handleSettingChange(setSessionsUntilLongBreak, e.target.value)}
              className="w-16 p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        
        {/* Hidden audio element */}
        <audio 
          ref={alarmSound}
          src="data:audio/wav;base64,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" 
        />
      </div>
    </div>
  );
}