import { create } from 'zustand';

const Countdown = create((set) => ({
  targetTime: null, // Store the target time in milliseconds
  isRunning: false,
  remainingTime: 0, // Store the remaining time in milliseconds
  startTime: null, // Store the start time in milliseconds

  setTargetTime: (time) => set({ targetTime: time, startTime: null, remainingTime: time, isRunning: false }),
  startTimer: () => {
    set({ isRunning: true, startTime: Date.now() });
  },
  pauseTimer: () => set({ isRunning: false }),
  resetTimer: () => set({ targetTime: null, isRunning: false, remainingTime: 0, startTime: null }),
}));

export default Countdown;