import React, { useState, useEffect, useRef } from 'react';



interface ProgressBarProps {
  onComplete: any;
}


const ProgressBar: React.FC<ProgressBarProps> = ({ onComplete }) => {


    const [progress, setProgress] = useState(0);
    const duration = 10;
    const animationFrameHandle = useRef(0);
    const prevTime = useRef(performance.now());
    const outputValueRange = 1;

    function ease(x: number): number {
      return x;
    }

    useEffect(() => {
      setProgress(0);

      function render(timestamp: DOMHighResTimeStamp) {
        setProgress(oldValue => {
          if (oldValue >= 1) {
            if (onComplete) onComplete();
            return 0;
          }
          const secondsElapsed = (timestamp - prevTime.current) / 1000;
          return oldValue + outputValueRange * secondsElapsed / duration;
        })
        prevTime.current = timestamp;
        animationFrameHandle.current = requestAnimationFrame(render);

      }

      render(performance.now());
      return () => cancelAnimationFrame(animationFrameHandle.current);
    }, [onComplete])


    return (
        <div className="word-bar">
          <div className="progress-bar" style={{ transform: `scaleX(${ease(progress)})` }} />
        </div>
    );
  };

export default ProgressBar;
  