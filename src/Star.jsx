import { useEffect, useRef } from 'react';

const Star = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 35; 
    let animationFrameId;

    // 1. 繪製五角星
    function drawStar(ctx, x, y, r, p, m, opacity, rotation) {
      ctx.save();
      ctx.beginPath();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.moveTo(0, 0 - r);
      for (let i = 0; i < p; i++) {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r * m);
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`;
      ctx.fill();
      ctx.restore();
    }

    // 2. 建立粒子屬性
    function createParticle() {
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 3 + 2,
        currentSize: 0.5,
        targetSize: Math.random() * 12 + 8,
        growth: Math.random() * 0.2 + 0.15,
        opacity: 1,
        fade: Math.random() * 0.015 + 0.01,
        rotation: Math.random() * Math.PI
      };
    }

    // 初始化粒子陣列
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }

    // 3. 主動畫循環
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;

        if (p.currentSize < p.targetSize) {
          p.currentSize += p.growth;
        }

        p.opacity -= p.fade;
        p.rotation += 0.05;

        if (p.opacity > 0) {
          drawStar(ctx, p.x, p.y, p.currentSize, 5, 0.5, p.opacity, p.rotation);
        } else {
          particles[i] = createParticle(); // 粒子消失後重置
        }
      }
      // 關鍵：將 ID 存起來以便清除
      animationFrameId = requestAnimationFrame(animate);
    }

    // 關鍵：啟動動畫！
    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className="particle-wrapper">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={800} 
        className="star-canvas" 
      />
    </div>
  );
};

export default Star;