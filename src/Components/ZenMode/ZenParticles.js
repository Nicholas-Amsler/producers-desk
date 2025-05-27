// src/Components/ZenMode/ZenParticles.js
import React, { useEffect, useRef } from 'react';

const ZenParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = 40; // Increased from 30

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 4 + 2; // Slightly bigger particles
        this.opacity = Math.random() * 0.6 + 0.3; // More visible
        
        // Beautiful yellow and teal colors
        const colors = [
          '#FFD700', // Gold yellow
          '#FFEB3B', // Bright yellow
          '#FFF59D', // Light yellow
          '#00BCD4', // Cyan/teal
          '#26C6DA', // Light cyan
          '#4DD0E1', // Lighter teal
          '#FFCC02', // Sunny yellow
          '#00ACC1'  // Deep teal
        ];
        
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.glowIntensity = Math.random() * 0.5 + 0.5; // Glow variation
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Gentle floating effect with more movement
        this.y += Math.sin(Date.now() * 0.001 + this.x * 0.01) * 0.3;
        this.x += Math.cos(Date.now() * 0.0008 + this.y * 0.008) * 0.2;

        // Gentle pulsing glow effect
        this.glowIntensity = 0.5 + Math.sin(Date.now() * 0.003 + this.x * 0.01) * 0.3;
      }

      draw() {
        ctx.save();
        
        // Create beautiful glow effect
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.radius * 4
        );
        
        // Inner bright color
        gradient.addColorStop(0, this.color + Math.floor(this.opacity * 255).toString(16).padStart(2, '0'));
        // Outer glow
        gradient.addColorStop(0.3, this.color + Math.floor(this.opacity * 0.6 * 255).toString(16).padStart(2, '0'));
        // Fade to transparent
        gradient.addColorStop(1, this.color + '00');
        
        // Draw the glow
        ctx.globalCompositeOperation = 'lighter'; // Makes colors blend beautifully
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 4 * this.glowIntensity, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw the core particle
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a bright center highlight
        ctx.globalAlpha = this.opacity * 0.8;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      // Slight fade trail effect instead of complete clear
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ background: 'transparent' }}
    />
  );
};

export default ZenParticles;