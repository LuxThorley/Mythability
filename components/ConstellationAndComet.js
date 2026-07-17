
import { useEffect, useRef } from 'react';

export default function ConstellationAndComet() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const stars = Array(8).fill(0).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h
    }));

    const comets = [];

    function addComet() {
      comets.push({
        x: Math.random() * w,
        y: 0,
        speed: 2 + Math.random() * 3,
        trail: []
      });
    }

    let lastComet = 0;

    function draw() {
      ctx.fillStyle = 'rgba(5, 2, 32, 0.2)';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      for (let i = 0; i < stars.length - 1; i++) {
        const a = stars[i];
        const b = stars[i + 1];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });

      if (Date.now() - lastComet > 4000) {
        addComet();
        lastComet = Date.now();
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];
        c.y += c.speed;
        c.trail.push({ x: c.x, y: c.y });
        if (c.trail.length > 20) c.trail.shift();

        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        for (const t of c.trail) {
          ctx.lineTo(t.x, t.y);
        }
        ctx.strokeStyle = 'rgba(255,255,200,0.7)';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(c.x, c.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffdd';
        ctx.fill();

        if (c.y > h + 50) comets.splice(i, 1);
      }

      requestAnimationFrame(draw);
    }

    function syncInteraction(e) {
      const mx = e.clientX || (e.touches && e.touches[0].clientX);
      const my = e.clientY || (e.touches && e.touches[0].clientY);
      for (const s of stars) {
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,180,0.7)';
          ctx.fill();
        }
      }
    }

    draw();
    window.addEventListener('pointermove', syncInteraction);
    window.addEventListener('touchmove', syncInteraction);
    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });

    return () => {
      window.removeEventListener('pointermove', syncInteraction);
      window.removeEventListener('touchmove', syncInteraction);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top:0, left:0, zIndex: -2 }} />;
}
