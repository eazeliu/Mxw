import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
    
    setDisplayValue(0);
    const duration = 4000; 
    const startTime = Date.now();
    const endValue = value;

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      if (progress < 1) {
        const baseValue = Math.floor(endValue * progress);
        const wiggle = Math.floor(Math.random() * (endValue * 0.1));
        setDisplayValue(Math.min(baseValue + wiggle, endValue));
      } else {
        setDisplayValue(endValue);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [value]);

  const digits = displayValue.toString().padStart(3, '0').split('');

  return (
    <div className={`banner-container ${shouldAnimate ? 'banner-show' : ''}`}>
      <div className="back-panel">
        <div className="maxwin-title-wrapper"></div>
        <div className="reel-bg">
          <div className="reels-wrapper">
            {digits.map((d, i) => (
              <div key={i} className="digit-unit" data-value={d}>
                {d}
              </div>
            ))}
            <div className="digit-unit digit-x" data-value="x">x</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;