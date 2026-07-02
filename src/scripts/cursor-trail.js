const canUseTrail =
  window.matchMedia('(pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canUseTrail) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const points = [];
  const sparkles = [];
  const trailLife = 760;
  const sparkleLife = 620;
  let width = 0;
  let height = 0;
  let frameId = 0;

  canvas.className = 'cursor-trail-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const drawTrail = () => {
    context.clearRect(0, 0, width, height);

    const now = performance.now();
    while (points.length && now - points[0].time > trailLife) {
      points.shift();
    }

    while (sparkles.length && now - sparkles[0].time > sparkleLife) {
      sparkles.shift();
    }

    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      const age = now - current.time;
      const opacity = Math.max(0, 1 - age / trailLife);

      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(current.x, current.y);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 1.8 + opacity * 1.1;
      context.shadowBlur = 18 * opacity;
      context.shadowColor = `rgba(81, 190, 235, ${0.48 * opacity})`;
      context.strokeStyle = `rgba(78, 181, 230, ${0.32 * opacity})`;
      context.stroke();

      context.beginPath();
      context.moveTo(previous.x, previous.y);
      context.lineTo(current.x, current.y);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.lineWidth = 0.8 + opacity * 0.35;
      context.shadowBlur = 7 * opacity;
      context.shadowColor = `rgba(255, 255, 255, ${0.58 * opacity})`;
      context.strokeStyle = `rgba(255, 255, 255, ${0.72 * opacity})`;
      context.stroke();
    }

    for (const sparkle of sparkles) {
      const age = now - sparkle.time;
      const opacity = Math.max(0, 1 - age / sparkleLife);
      const size = sparkle.size * opacity;

      context.beginPath();
      context.arc(sparkle.x, sparkle.y, size, 0, Math.PI * 2);
      context.shadowBlur = 12 * opacity;
      context.shadowColor = `rgba(91, 196, 235, ${0.44 * opacity})`;
      context.fillStyle = `rgba(222, 248, 255, ${0.72 * opacity})`;
      context.fill();
    }

    frameId = requestAnimationFrame(drawTrail);
  };

  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('pointermove', (event) => {
    const now = performance.now();

    points.push({
      x: event.clientX,
      y: event.clientY,
      time: now,
    });

    if (Math.random() < 0.22) {
      sparkles.push({
        x: event.clientX + (Math.random() - 0.5) * 18,
        y: event.clientY + (Math.random() - 0.5) * 18,
        size: 0.8 + Math.random() * 1.3,
        time: now,
      });
    }
  }, { passive: true });

  resizeCanvas();
  frameId = requestAnimationFrame(drawTrail);

  window.addEventListener('pagehide', () => {
    cancelAnimationFrame(frameId);
  });
}
