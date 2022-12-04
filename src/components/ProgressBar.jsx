import React from 'react';

function ProgressBar({ percentage, type, className, ...otherProps }) {
  return (
    <div
      {...otherProps}
      className={`${className} w-2/3  h-[15px] rounded-lg shadow-inner overflow-hidden bg-gray-300  lg:w-full`}
    >
      {(() => {
        switch (type) {
          case 'stripes':
            return (
              <div
                className="h-full bg-red-500 rounded-lg shadow-md"
                style={{
                  width: `${percentage}%`,
                  transition: 'width 0.3s ease-in-out',
                  backgroundSize: '2rem 2rem',
                  backgroundImage:
                    'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)',
                }}
              />
            );
          default:
            return (
              <div
                className="h-full bg-blue-500 rounded-lg shadow-xl"
                style={{
                  width: `${percentage}%`,
                  transition: 'width 0.3s ease-in-out',
                }}
              />
            );
        }
      })()}
    </div>
  );
}

export default ProgressBar;
