/**
 * Corner Museum - Tech Particle System
 * Creates a dynamic, interactive particle network overlay
 */
(function() {
  'use strict';

  class TechParticles {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: null, y: null, radius: 150 };
      this.animationId = null;
      this.resizeTimeout = null;

      this.init();
    }

    init() {
      this.resize();
      this.createParticles();

      this.canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.canvas.parentElement.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      });

      window.addEventListener('resize', () => {
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
          this.resize();
          this.createParticles();
        }, 200);
      });

      this.animate();
    }

    resize() {
      const parent = this.canvas.parentElement;
      this.canvas.width = parent.offsetWidth;
      this.canvas.height = parent.offsetHeight;
    }

    createParticles() {
      this.particles = [];
      const area = this.canvas.width * this.canvas.height;
      const count = Math.min(Math.floor(area / 8000), 120);

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          size: Math.random() * 2 + 0.3,
          speedX: (Math.random() - 0.5) * 0.6,
          speedY: (Math.random() - 0.5) * 0.6,
          density: Math.random() * 30 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Move
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x > this.canvas.width) p.x = 0;
        if (p.x < 0) p.x = this.canvas.width;
        if (p.y > this.canvas.height) p.y = 0;
        if (p.y < 0) p.y = this.canvas.height;

        // Mouse repulsion
        if (this.mouse.x !== null && this.mouse.y !== null) {
          const dx = this.mouse.x - p.x;
          const dy = this.mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < this.mouse.radius) {
            const force = (this.mouse.radius - dist) / this.mouse.radius;
            p.x -= (dx / dist) * force * p.density * 0.4;
            p.y -= (dy / dist) * force * p.density * 0.4;
          }
        }

        // Draw particle glow
        this.ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw connections
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            const alpha = 0.08 * (1 - dist / 120);
            this.ctx.strokeStyle = `rgba(197, 160, 89, ${alpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }

      this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }

  // Initialize all particle canvases
  function initParticles() {
    document.querySelectorAll('.particle-canvas').forEach((canvas) => {
      if (!canvas.dataset.initialized) {
        new TechParticles(canvas);
        canvas.dataset.initialized = 'true';
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
  } else {
    initParticles();
  }

  // Also handle Shopify theme editor events
  document.addEventListener('shopify:section:load', initParticles);
})();
