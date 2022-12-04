import React, { useState, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};

const INITIAL_COUNT = 10;

export default function Countdown({ contract, isDisconnected }) {

  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STARTED);
  const [percent, setPercent] = useState(100);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const AirdropClickHander = async () => {
    try {
      let res = await contract.claimRank(1);
      await res.wait();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
    const ClaimClickHander = async () => {
      try {
        let res = await contract.claimMintReward();
        await res.wait();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        let nowSecondsRemaining = secondsRemaining - 1;
        setSecondsRemaining(nowSecondsRemaining);
        setPercent(Math.round((nowSecondsRemaining / INITIAL_COUNT) * 100));
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
        onClick={AirdropClickHander}
        disabled={status !== STATUS.STOPPED || isDisconnected}
        className="w-2/3 p-2 mt-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 disabled:bg-gray-700 lg:w-full"
      >
        Airdrop
      </button>
      <button
        onClick={ClaimClickHander}
        disabled={status !== STATUS.STOPPED || isDisconnected}
        className="w-2/3 p-2 mt-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 disabled:bg-gray-700 lg:w-full"
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

const twoDigits = (num) => String(num).padStart(2, '0');
