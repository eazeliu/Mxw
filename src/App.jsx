import { useState } from 'react';
import Star from './Star';
import Banner from './Banner';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");      // 輸入框的值
  const [displayValue, setDisplayValue] = useState(0);    // 傳給 Banner 的數字
  const [showEffect, setShowEffect] = useState(false);    // 控制特效顯隱
  const [triggerLog, setTriggerLog] = useState(0);        // 動畫觸發計數器

  const handleTrigger = () => {
    const val = parseInt(inputValue);
    
    if (!isNaN(val)) {
      // 1. 更新數值
      setDisplayValue(val);
      setTriggerLog(prev => prev + 1);
      setShowEffect(false); 
      setTimeout(() => {
        setShowEffect(true);
      }, 50); 
    } else {
      alert("請輸入有效的數字");
    }
  };

  return (
    <div className="mxw-main-container">
      {}
      {showEffect && (
        <div className="animation-layer">
          <Star />
          <Banner value={displayValue} triggerLog={triggerLog} />
        </div>
      )}

      <div className="control-panel">
        <input 
          type="number" 
          placeholder="輸入數字 (例如 500)" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleTrigger()} 
        />
        <button onClick={handleTrigger}>trigger</button>
      </div>
    </div>
  );
}

export default App;