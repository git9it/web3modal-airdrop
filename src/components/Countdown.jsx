import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};

const INITIAL_COUNT = 200;

export default function Countdown() {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STARTED);
  const [percent, setPercent] = useState(100);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
        setPercent(Math.round((secondsRemaining / INITIAL_COUNT) * 100));
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  return (
    <>
      <div className="w-24 p-3 my-3 text-center text-white bg-gray-800 rounded-md">
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
        {twoDigits(secondsToDisplay)}
      </div>
      <ProgressBar percentage={percent} />
      <button
        // onClick={clickHander()}
        disabled={status !== STATUS.STOPPED}
        className="p-2 mt-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 disabled:bg-gray-700"
      >
        Airdrop
      </button>
      <button
        disabled={status !== STATUS.STOPPED}
        className="p-2 mt-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 disabled:bg-gray-700"
      >
        Claim
      </button>
    </>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, '0');
