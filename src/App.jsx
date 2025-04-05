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
  const [bgImage, setBgImage] = useState("");

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
    <div className="dark min-h-screen w-full">
      <div
        className="flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 bg-gray-900 text-white"
        style={
          bgImage
            ? {
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
      >
        <input
          type="text"
          placeholder="BackGround image"
          className="mb-4 p-2 border border-gray-700 rounded w-full max-w-md bg-gray-800/50 text-white placeholder-gray-400"
          value={bgImage}
          onChange={(e) => setBgImage(e.target.value)}
        />

        <label className="mb-1">Number:</label>
        <input
          type="number"
          className="mb-4 p-2 border border-gray-700 rounded w-60 bg-gray-800/50 text-white placeholder-gray-400"
          min={0}
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
        />

        <input
          type="number"
          className="mb-4 p-2 border border-gray-700 rounded w-60 bg-gray-800/50 text-white placeholder-gray-400"
          placeholder="In time"
          min={0}
          value={inTime}
          onChange={(e) => setInTime(Number(e.target.value))}
        />

        <input
          type="number"
          className="mb-4 p-2 border border-gray-700 rounded w-60 bg-gray-800/50 text-white placeholder-gray-400"
          placeholder="Out time"
          min={0}
          value={outTime}
          onChange={(e) => setOutTime(Number(e.target.value))}
        />

        <div className="flex space-x-2 mb-5">
          {current === 0 && countdown === null && (
            <button
              className="w-24 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              onClick={startWithCountdown}
            >
              Start
            </button>
          )}
          {(current > 0 || countdown !== null) && (
            <>
              <button
                className="w-24 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded flex items-center justify-center"
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
                className="w-24 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
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
          transition={{
            duration: state ? inTime : outTime,
            ease: "easeInOut",
          }}
          className={`w-32 h-32 mt-5 flex flex-col items-center justify-center text-white text-5xl font-semibold rounded-full transition-colors duration-500 ${
            state ? "bg-blue-600" : "bg-blue-800"
          }`}
        >
          {countdown !== null ? (
            <div className="text-xl font-normal text-center">
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
    </div>
  );
};

export default App;
