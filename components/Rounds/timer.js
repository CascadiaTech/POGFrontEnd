import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ initialHours = 18, initialMinutes = 30 }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const intervalRef = useRef(null);

  // Helper function to calculate time left based on stored or new deadline.
  const calculateTimeLeft = () => {
    const endTime = parseInt(localStorage.getItem('timerEndTime') || '0', 10);
    const now = new Date().getTime();
    const total = endTime - now;

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
      total,
      hours: Math.max(0, hours),
      minutes: Math.max(0, minutes),
      seconds: Math.max(0, seconds),
    };
  };

  // Format time values for display (e.g., 08:05:12).
  const formatTime = (value) => (value < 10 ? `0${value}` : value);

  // Set or reset the timer deadline in localStorage.
  const setNewDeadline = () => {
    const deadline = new Date().getTime() + (initialHours * 60 + initialMinutes) * 60 * 1000;
    localStorage.setItem('timerEndTime', deadline.toString());
    setTimeLeft(calculateTimeLeft()); // Immediately update the state
  };

  // Start the countdown interval.
  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current); // Clear any existing interval

    intervalRef.current = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.total <= 0) {
        clearInterval(intervalRef.current);
        localStorage.removeItem('timerEndTime'); // Remove expired deadline
      }
    }, 1000);
  };

  // Initialize the timer when the component mounts.
  useEffect(() => {
    const storedEndTime = localStorage.getItem('timerEndTime');
    if (!storedEndTime) {
      setNewDeadline(); // Set a new deadline if none exists
    }
    startTimer(); // Start the timer

    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>Countdown Timer</h1>
      <div style={{ fontSize: '2rem' }}>
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
        {formatTime(timeLeft.seconds)}
      </div>
      <button onClick={setNewDeadline}>Reset</button>
    </div>
  );
};

export default Timer;
