/* ==========================================================================
   KRISHA TECH - Dynamic Interactive Particle Background Canvas Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const particleCount = Math.floor(Math.min(width, height) / 18);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw(isLight) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(37, 99, 235, ${this.alpha * 0.7})`
        : `rgba(0, 243, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function drawConnections(isLight) {
    const maxDistance = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const alpha = (1 - dist / maxDistance) * (isLight ? 0.12 : 0.2);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isLight
            ? `rgba(37, 99, 235, ${alpha})`
            : `rgba(0, 243, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update();
      p.draw(isLight);
    });

    drawConnections(isLight);
    requestAnimationFrame(animate);
  }

  animate();
});
