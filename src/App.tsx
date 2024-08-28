import { useState, useEffect } from 'react';
import plate from './assets/plate.png';

// Define the App component
function App() {
  const [sign, setSign] = useState<string[]>(['A', 'B', 'C', '1', '2', '3']);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [speed, setSpeed] = useState<number>(1000); // Default speed (ms)
  const [progress, setProgress] = useState<number>(0);

  // Function to generate a new sign
  const generateSign = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    const newSign = [
      letters[Math.floor(Math.random() * 26)], // Position 1
      letters[Math.floor(Math.random() * 26)], // Position 2
      letters[Math.floor(Math.random() * 26)], // Position 3
      numbers[Math.floor(Math.random() * 10)], // Position 4
      numbers[Math.floor(Math.random() * 10)], // Position 5
      Math.random() < 0.5
        ? letters[Math.floor(Math.random() * 26)]
        : numbers[Math.floor(Math.random() * 10)], // Position 6
    ];

    setSign(newSign);
    setProgress(0); // Reset progress
  };

  // Function to handle speed change and start the auto-generation
  const handleSpeedChange = (newSpeed: number) => {
    if (intervalId) clearInterval(intervalId);
    setSpeed(newSpeed);

    // Immediately generate a new sign and set progress for immediate feedback
    generateSign();
    setProgress(100); // Trigger progress bar animation

    const newIntervalId = window.setInterval(() => {
      generateSign();
      setProgress(100); // Trigger progress bar animation
    }, newSpeed);
    setIntervalId(newIntervalId);
  };

  // Function to stop the auto-generation
  const stopAutoGeneration = () => {
    if (intervalId) clearInterval(intervalId);
    setIntervalId(null);
    setProgress(0); // Reset progress
  };

  // Effect to animate the progress bar
  useEffect(() => {
    if (progress === 100) {
      const progressInterval = setTimeout(() => {
        setProgress(0);
      }, speed);
      return () => clearTimeout(progressInterval);
    }
  }, [progress, speed]);

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className='w-full h-screen flex justify-center items-center' >
      <div className="w-fit flex flex-col">
        <div className="w-full h-8 px-2 my-1">
          <div
            className="h-full border border-black bg-gray-300"
            style={{
              transition: `width ${speed}ms linear`,
              width: `${progress}%`,
            }}
          ></div>
        </div>
        <div className="relative w-fit bg-white rounded-2xl">
          <img src={plate} alt="Plate" className="" />
          <div className="absolute top-0 w-full h-full flex justify-center items-center pl-[14.2%] pr-[1%] py-[1%]">
            {sign.map((char, index) => (
              <div
                key={index}
                className="w-full h-full flex justify-center items-center text-8xl"
              >
                {char}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-evenly mt-1">
          <button
            className="bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-md p-1 w-1/5"
            onClick={generateSign}
          >
            New Sign
          </button>
          <button
            className="bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-md p-1 w-1/5"
            onClick={() => handleSpeedChange(6000)}
          >
            Fast
          </button>
          <button
            className="bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-md p-1 w-1/5"
            onClick={() => handleSpeedChange(4000)}
          >
            Faster
          </button>
          <button
            className="bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-md p-1 w-1/5"
            onClick={() => handleSpeedChange(2000)}
          >
            Fastest
          </button>
          <button
            className="bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-md p-1 w-1/5"
            onClick={stopAutoGeneration}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;