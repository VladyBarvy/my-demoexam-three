import React, { useEffect, useState } from 'react';

const Date_Time = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Очистка таймера при размонтировании компонента
    return () => clearInterval(timerId);
  }, []);

  return (
    <div>
      <h1>Текущее время</h1>
      <p>{currentTime.toLocaleString()}</p>
    </div>
  );
};

export default Date_Time;

