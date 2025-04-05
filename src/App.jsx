import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { IoPauseSharp, IoPlay } from "react-icons/io5";

const App = () => {
  const [number, setNumber] = useState(10);
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState(true);
  const [inTime, setInTime] = useState(1);
  const [outTime, setOutTime] = useState(1);
  const [flag, setFlag] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const startWithCountdown = () => {
    setCountdown(3);
    let count = 3;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        setCurrent(number);
        setFlag(false);
        setState(false);
      }
    }, 1000);
  };

  useEffect(() => {
    if (current > 0 && !flag) {
      const interval = setInterval(() => {
        setState((prev) => !prev);
      }, (state ? inTime : outTime) * 1000);
      return () => clearInterval(interval);
    }
  }, [current, state, inTime, outTime, flag]);

  useEffect(() => {
    if (!state && current > 0 && !flag) {
      setTimeout(() => {
        setTimeout(() => {
          setCurrent((prev) => (prev > 1 ? prev - 1 : 0));
          if (current === 1) confetti();
        }, outTime * 1000);
      }, 0);
    }
  }, [state, outTime, current, flag]);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      <div className="absolute top-4 right-4 flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <label className={`mb-1 ${darkMode ? "text-white" : "text-black"}`}>
        Number:
      </label>
      <input
        type="number"
        className={`mb-2 p-2 bg-white/15 border border-gray-400 rounded ${
          darkMode ? "text-white" : "text-black"
        }`}
        min={0}
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
      />

      <input
        type="number"
        className={`mb-2 p-2 bg-white/15 border border-gray-400 rounded ${
          darkMode ? "text-white" : "text-black"
        }`}
        placeholder="in"
        min={0}
        value={inTime}
        onChange={(e) => setInTime(Number(e.target.value))}
      />

      <input
        type="number"
        className={`mb-2 p-2 bg-white/15 border border-gray-400 rounded ${
          darkMode ? "text-white" : "text-black"
        }`}
        placeholder="out"
        min={0}
        value={outTime}
        onChange={(e) => setOutTime(Number(e.target.value))}
      />

      <div className="flex space-x-2 mb-5">
        {current === 0 && countdown === null && (
          <button
            className="w-24 px-4 py-2 bg-green-500 text-white rounded"
            onClick={startWithCountdown}
          >
            Start
          </button>
        )}
        {(current > 0 || countdown !== null) && (
          <>
            <button
              className="w-24 px-4 py-2 bg-yellow-500 text-white rounded flex items-center justify-center"
              onClick={() => setFlag(!flag)}
              disabled={countdown !== null}
            >
              {flag ? (
                <IoPlay className="w-6 h-6" />
              ) : (
                <IoPauseSharp className="w-6 h-6" />
              )}
            </button>
            <button
              className="w-24 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => {
                setCurrent(0);
                setFlag(false);
                setState(true);
                setCountdown(null);
              }}
              disabled={countdown !== null}
            >
              Reset
            </button>
          </>
        )}
      </div>

      <motion.div
        animate={{
          scale: state ? 1 : 1.25,
        }}
        transition={{ duration: state ? inTime : outTime, ease: "easeInOut" }}
        className={`w-32 h-32 mt-5 flex flex-col items-center justify-center text-white text-5xl font-semibold rounded-full transition-colors duration-500 ${
          state ? "bg-blue-400" : "bg-blue-500"
        }`}
      >
        {countdown !== null ? (
          <div className="text-xl text-black font-normal text-center">
            <div className="text-xs">Starting in</div>
            <div className="text-xl">{countdown}</div>
          </div>
        ) : current > 0 ? (
          current
        ) : (
          ""
        )}
      </motion.div>
    </div>
  );
};

export default App;
