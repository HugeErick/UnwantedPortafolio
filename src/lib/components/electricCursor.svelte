<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let canvas: HTMLCanvasElement | undefined = $state();
	let ctx: CanvasRenderingContext2D;
	let particles: Particle[] = [];
	let mouse = { x: 0, y: 0 };
	let isActive = false;
	let animationId: number;

	class Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		life: number;
		maxLife: number;
		size: number;
		color: string;

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.vx = (Math.random() - 0.5) * 4;
			this.vy = (Math.random() - 0.5) * 4;
			this.life = 1;
			this.maxLife = Math.random() * 30 + 20;
			this.size = Math.random() * 3 + 1;
			
			// Electric blue/cyan colors
			const colors = ['#00ffff', '#0080ff', '#4040ff', '#8080ff', '#ffffff'];
			this.color = colors[Math.floor(Math.random() * colors.length)];
		}

		update() {
			this.x += this.vx;
			this.y += this.vy;
			this.life -= 1;
			this.vx *= 0.98;
			this.vy *= 0.98;
		}

		draw() {
			if (!ctx) return;
			
			const alpha = this.life / this.maxLife;
			ctx.save();
			ctx.globalAlpha = alpha;
			
			// Create electric glow effect
			ctx.shadowBlur = 10;
			ctx.shadowColor = this.color;
			
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
			ctx.fill();
			
			// Add inner bright core
			ctx.shadowBlur = 5;
			ctx.fillStyle = '#ffffff';
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.size * 0.3, 0, Math.PI * 2);
			ctx.fill();
			
			ctx.restore();
		}

		isDead() {
			return this.life <= 0;
		}
	}

	function resizeCanvas() {
		if (!canvas || !browser) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

	function addParticles(x: number, y: number) {
		// Add 2-4 particles per frame when active
		const count = Math.random() * 3 + 2;
		for (let i = 0; i < count; i++) {
			particles.push(new Particle(x, y));
		}
	}

	function animate() {
		if (!ctx || !canvas) return;
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		// Update and draw particles
		particles = particles.filter(particle => {
			particle.update();
			particle.draw();
			return !particle.isDead();
		});
		
		// Add new particles if cursor is active
		if (isActive && particles.length < 50) {
			addParticles(mouse.x, mouse.y);
		}
		
		animationId = requestAnimationFrame(animate);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!browser) return;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	}

	function handleMouseEnter() {
		isActive = true;
	}

	function handleMouseLeave() {
		isActive = false;
	}

	onMount(() => {
		if (!browser) return;
		
		// Check if device supports hover (not touch-only)
		const hasHover = window.matchMedia('(hover: hover)').matches;
		if (!hasHover) return; // Skip on touch devices
		
        if (!canvas) return;
		ctx = canvas.getContext('2d')!;
		resizeCanvas();
		
		window.addEventListener('resize', resizeCanvas);
		window.addEventListener('mousemove', handleMouseMove);
		
		// Set up event listeners for specific elements
		const targetElements = document.querySelectorAll('[data-electric-cursor]');
		targetElements.forEach(element => {
			element.addEventListener('mouseenter', handleMouseEnter);
			element.addEventListener('mouseleave', handleMouseLeave);
		});
		
		animate();
		
		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId);
			}
			window.removeEventListener('resize', resizeCanvas);
			window.removeEventListener('mousemove', handleMouseMove);
			
			targetElements.forEach(element => {
				element.removeEventListener('mouseenter', handleMouseEnter);
				element.removeEventListener('mouseleave', handleMouseLeave);
			});
		};
	});
</script>

<!-- Only render on devices with hover support -->
{#if browser && window.matchMedia('(hover: hover)').matches}
	<canvas
		bind:this={canvas}
		class="pointer-events-none fixed inset-0 z-50"
		style="mix-blend-mode: screen;"
	></canvas>
{/if}
