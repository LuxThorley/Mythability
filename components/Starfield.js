
import { useEffect } from 'react';

export default function Starfield() {
  useEffect(() => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const stars = Array(200).fill().map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * w,
      size: Math.random() * 1.5,
    }));

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "white";
      for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        let k = 128.0 / star.z;
        let x = star.x * k + w / 2;
        let y = star.y * k + h / 2;
        if (x >= 0 && x < w && y >= 0 && y < h) {
          ctx.beginPath();
          ctx.arc(x, y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
        star.z -= 1;
        if (star.z <= 0) star.z = w;
      }
    }

    function animate() {
      draw();
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return <canvas id="starfield" style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }} />;
}
