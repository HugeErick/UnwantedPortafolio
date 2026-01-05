// electricCursor.ts

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

class ElectricCursor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouseX: number = 0;
  private mouseY: number = 0;
  private isInside: boolean = false;
  private animationId: number | null = null;
  private element: HTMLElement;
  private bounds: DOMRect;
  private debugg: boolean = true;

  constructor(element: HTMLElement) {
    this.element = element;
    this.bounds = element.getBoundingClientRect();

    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';

    this.ctx = this.canvas.getContext('2d')!;

    // Make element position relative if it isn't already
    const position = window.getComputedStyle(element).position;
    if (position === 'static') {
      element.style.position = 'relative';
    }

    element.appendChild(this.canvas);

    this.resize();
    this.setupListeners();
    this.animate();
  }

  private resize = () => {
    this.bounds = this.element.getBoundingClientRect();
    this.canvas.width = this.bounds.width;
    this.canvas.height = this.bounds.height;
  };

  private setupListeners() {
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
    this.element.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('resize', this.resize);
  }

  private handleMouseEnter = () => {
    this.isInside = true;
  };

  private handleMouseLeave = () => {
    this.isInside = false;
  };

  private handleMouseMove = (e: MouseEvent) => {
    const rect = this.element.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;

    if (this.isInside) {
      this.createParticles();
    }
  };

  private createParticles() {
    const MIN_PARTICLE_LIFETIME = 20;
    const LIFETIME_VARIANCE = 30;

    // Create multiple particles per frame for a denser effect
    for (let i = 0; i < 1; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;

      this.particles.push({
        x: this.mouseX,
        y: this.mouseY,
        // horizontal speed
        vx: Math.cos(angle) * speed,
        // vertical speed
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * LIFETIME_VARIANCE + MIN_PARTICLE_LIFETIME,
        size: Math.random() * 3 + 1
      });
    }

    // Limit particle count
    if (this.particles.length > 200) {
      this.particles = this.particles.slice(-200);
    }
  }

  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;
      p.life++;

      // Apply some friction
      p.vx *= 0.98;
      p.vy *= 0.98;

      let alpha = 1 - (p.life / p.maxLife);

      // Distance from edge where fade starts
      const fadeDistance = 60;
      const edgeFade = Math.min(
        p.x / fadeDistance, // left edge
        (this.canvas.width - p.x) / fadeDistance, // right edge
        p.y / fadeDistance, // top edge
        (this.canvas.height - p.y) / fadeDistance, // bottom edge
        1 // max opacity
      );

      alpha *= edgeFade; // Apply edge fade to alpha

      if (p.life >= p.maxLife || alpha <= 0.01) {
        this.particles.splice(i, 1);
        continue;
      }
      let customWhite = `rgba(245, 245, 230, ${alpha})`
      let customGold = `rgba(250, 214, 67, ${alpha})`
      const ligterGold = customGold.replace(/[\d.]+(?=\))/, (match) =>
        (parseFloat(match) * 0.8).toString()
      );


      const evenLigterGold = customGold.replace(/[\d.]+(?=\))/, (match) =>
        (parseFloat(match) * 0.4).toString()
      );

      const zeroAlphaGold = customGold.replace(/[\d.]+(?=\))/, (match) =>
        (parseFloat(match) * 0).toString()
      );

      // Draw electric glow
      const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      // light blue
      gradient.addColorStop(0, ligterGold);
      // even lighter blue
      gradient.addColorStop(0.5, evenLigterGold);
      // turquesa light blue 
      gradient.addColorStop(1, zeroAlphaGold);

      //this draws a circle lmao
      // this.ctx.fillStyle = gradient;
      // this.ctx.beginPath();
      // this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      // this.ctx.fill();

      // Draw core particle
      // this.ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      // this.ctx.beginPath();
      // this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      // this.ctx.fill();

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(p.x - p.size * 3, p.y - p.size * 3, p.size * 8, p.size * 5);

      // core particle
      this.ctx.fillStyle = customWhite;
      this.ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 4, p.size * 1);
    }

    this.animationId = requestAnimationFrame(this.animate);
  };

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.element.removeEventListener('mouseenter', this.handleMouseEnter);
    this.element.removeEventListener('mouseleave', this.handleMouseLeave);
    this.element.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('resize', this.resize);
    this.canvas.remove();
  }
}

// Initialize electric cursor on all elements with data-electric-cursor
export function initElectricCursor() {
  const elements = document.querySelectorAll('[data-electric-cursor]');
  const instances: ElectricCursor[] = [];

  elements.forEach((el) => {
    if (el instanceof HTMLElement) {
      instances.push(new ElectricCursor(el));
    }
  });

  return () => {
    instances.forEach(instance => instance.destroy());
  };
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initElectricCursor);
  } else {
    initElectricCursor();
  }
}


