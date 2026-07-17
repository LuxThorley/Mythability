
import { useEffect, useRef, useState } from 'react';
import * as AE from 'astronomy-engine';

const glyphMap = {
  Mercury: '☿',
  Venus: '♀',
  Mars: '♂',
  Jupiter: '♃',
  Saturn: '♄'
};

export default function PlanetaryOverlay() {
  const canvasRef = useRef(null);
  const [lat, setLat] = useState(51.5);
  const [lon, setLon] = useState(0);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(pos.coords.latitude);
          setLon(pos.coords.longitude);
        },
        () => console.warn("Geolocation not permitted. Using defaults.")
      );
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const planetNames = ['Mercury','Venus','Mars','Jupiter','Saturn'];

    const updatePositions = () => {
      const now = new Date();
      const observer = new AE.Observer(lat, lon, 0);
      const pos = planetNames.map(name => {
        try {
          const equ = AE.Equator(name, now, observer, true, true);
          const hor = AE.Horizon(now, observer, equ.ra, equ.dec, 'normal');
          return { name, glyph: glyphMap[name], az: hor.azimuth, alt: hor.altitude };
        } catch (err) {
          console.error("Error calculating position for", name, err);
          return { name, glyph: '?', az: 0, alt: -1 };
        }
      });
      setPositions(pos);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      positions.forEach(p => {
        if (p.alt > 0) {
          const x = (p.az / (2 * Math.PI)) * w;
          const y = h - (p.alt / (Math.PI/2)) * (h/2);
          const size = 6 + p.alt * 6;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, 2*Math.PI);
          ctx.fillStyle = 'rgba(255, 223, 100, 0.9)';
          ctx.fill();

          ctx.font = 'bold 16px serif';
          ctx.fillStyle = '#ffe';
          ctx.fillText(p.glyph, x - 5, y + 5);
        }
      });
    };

    updatePositions();
    const intervalId = setInterval(updatePositions, 60000);

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    });

    return () => clearInterval(intervalId);
  }, [lat, lon]);

  return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -3, pointerEvents: 'none' }} />;
}
