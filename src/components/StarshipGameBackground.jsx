"use client";

import React, { useEffect, useRef } from "react";

const StarshipGameBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Mouse tracking with velocity for tilting
    const mouse = { x: width / 2, y: height - 100 };
    let lastMouseX = width / 2;
    let tilt = 0; // Current tilt angle
    let targetTilt = 0; // Desired tilt based on speed

    let bullets = [];
    let enemies = [];
    let particles = [];
    let stars = [];
    let score = 0;
    let lastEnemySpawn = 0;
    let lastShot = 0;

    const STAR_COUNT = 150;
    const ENEMY_SPAWN_RATE = 1000;
    const FIRE_RATE = 150;
    const PLAYER_SIZE = 25;

    // --- Classes ---

    class Star {
      constructor() {
        this.reset();
        this.y = Math.random() * height;
      }
      reset() {
        this.x = Math.random() * width;
        this.y = -10;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 3 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.y += this.speed;
        if (this.y > height) this.reset();
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Bullet {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 12;
        this.radius = 2;
      }
      update() { this.y -= this.speed; }
      draw() {
        ctx.fillStyle = "#00f2ff";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00f2ff";
        ctx.fillRect(this.x - 1, this.y, 2, 10);
        ctx.shadowBlur = 0;
      }
    }

    class Enemy {
      constructor() {
        this.radius = Math.random() * 12 + 8;
        this.x = Math.random() * (width - this.radius * 2) + this.radius;
        this.y = -this.radius;
        this.speed = Math.random() * 2 + 1;
        this.color = `hsl(${Math.random() * 50 + 340}, 80%, 60%)`;
      }
      update() { this.y += this.speed; }
      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.radius);
        ctx.lineTo(this.x - this.radius, this.y - this.radius);
        ctx.lineTo(this.x + this.radius, this.y - this.radius);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = { x: (Math.random() - 0.5) * 6, y: (Math.random() - 0.5) * 6 };
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }
      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= this.decay;
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // --- Drawing the "Cool" Ship ---

    const drawPlayer = (x, y, tiltAngle) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tiltAngle);

      const size = PLAYER_SIZE || 22; // Recommended: 20–25 for best detail

      // ============================================
      // 1. ENGINE FLAMES (Layered & Multi-Thruster)
      // ============================================
      const flameBaseY = 14;
      const mainFlameHeight = 16 + Math.random() * 11;
      const sideFlameHeight = 10 + Math.random() * 8;

      // Outer cyan glow (main engine)
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#00f2ff";
      ctx.fillStyle = "rgba(0, 242, 255, 0.35)";
      ctx.beginPath();
      ctx.moveTo(-6, flameBaseY);
      ctx.quadraticCurveTo(0, flameBaseY + mainFlameHeight * 0.6, 0, flameBaseY + mainFlameHeight);
      ctx.quadraticCurveTo(0, flameBaseY + mainFlameHeight * 0.6, 6, flameBaseY);
      ctx.fill();

      // Bright core flame
      const coreGradient = ctx.createLinearGradient(0, flameBaseY, 0, flameBaseY + mainFlameHeight);
      coreGradient.addColorStop(0, "#ffffff");
      coreGradient.addColorStop(0.3, "#00f2ff");
      coreGradient.addColorStop(1, "transparent");

      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.moveTo(-3.5, flameBaseY);
      ctx.quadraticCurveTo(0, flameBaseY + mainFlameHeight * 0.55, 0, flameBaseY + mainFlameHeight);
      ctx.quadraticCurveTo(0, flameBaseY + mainFlameHeight * 0.55, 3.5, flameBaseY);
      ctx.fill();

      // Left side thruster flame
      ctx.fillStyle = "rgba(0, 242, 255, 0.6)";
      ctx.beginPath();
      ctx.moveTo(-12, flameBaseY + 2);
      ctx.lineTo(-9, flameBaseY + sideFlameHeight + 4);
      ctx.lineTo(-6, flameBaseY + 2);
      ctx.fill();

      // Right side thruster flame
      ctx.beginPath();
      ctx.moveTo(12, flameBaseY + 2);
      ctx.lineTo(9, flameBaseY + sideFlameHeight + 4);
      ctx.lineTo(6, flameBaseY + 2);
      ctx.fill();

      ctx.shadowBlur = 0;

      // ============================================
      // 2. REAR WINGS (Detailed & Layered)
      // ============================================
      // Back wing layer (darker base)
      ctx.fillStyle = "#003322";
      ctx.beginPath();
      ctx.moveTo(-size * 1.1, 12);
      ctx.lineTo(-size * 0.35, -2);
      ctx.lineTo(0, 8);
      ctx.lineTo(size * 0.35, -2);
      ctx.lineTo(size * 1.1, 12);
      ctx.lineTo(0, 6);
      ctx.fill();

      // Wing inner highlight / bevel
      ctx.fillStyle = "#00aa77";
      ctx.beginPath();
      ctx.moveTo(-size * 0.9, 10);
      ctx.lineTo(-size * 0.3, 0);
      ctx.lineTo(0, 7);
      ctx.lineTo(size * 0.3, 0);
      ctx.lineTo(size * 0.9, 10);
      ctx.lineTo(0, 5);
      ctx.fill();

      // Wing edge glow lines
      ctx.strokeStyle = "#00f2ff";
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "#00f2ff";

      ctx.beginPath();
      ctx.moveTo(-size * 1.05, 11);
      ctx.lineTo(-size * 0.32, -1);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(size * 1.05, 11);
      ctx.lineTo(size * 0.32, -1);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;

      // ============================================
      // 3. MAIN HULL (Sleek Premium Fuselage)
      // ============================================
      // Base dark metallic hull
      ctx.fillStyle = "#0a1f18";
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(-size * 0.55, -size * 0.3, -10, 9);
      ctx.lineTo(10, 9);
      ctx.quadraticCurveTo(size * 0.55, -size * 0.3, 0, -size);
      ctx.fill();

      // Bright neon green main body with strong glow
      ctx.shadowBlur = 14;
      ctx.shadowColor = "#00ff9d";
      ctx.fillStyle = "#00ff6a";
      ctx.beginPath();
      ctx.moveTo(0, -size + 2);
      ctx.quadraticCurveTo(-8, -2, -7, 8);
      ctx.lineTo(7, 8);
      ctx.quadraticCurveTo(8, -2, 0, -size + 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Subtle panel lines (premium detail)
      ctx.strokeStyle = "rgba(0, 255, 106, 0.35)";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(-5, -size * 0.6);
      ctx.lineTo(-4, 6);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(5, -size * 0.6);
      ctx.lineTo(4, 6);
      ctx.stroke();

      // Energy accent line (center)
      ctx.strokeStyle = "#00f2ff";
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#00f2ff";
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.85);
      ctx.lineTo(0, 7);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;

      // ============================================
      // 4. COCKPIT (Glass with Depth)
      // ============================================
      // Cockpit base shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.beginPath();
      ctx.ellipse(0, -4, 5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glass cockpit
      const cockpitGradient = ctx.createLinearGradient(0, -10, 0, 2);
      cockpitGradient.addColorStop(0, "rgba(180, 240, 255, 0.9)");
      cockpitGradient.addColorStop(0.5, "rgba(100, 200, 255, 0.6)");
      cockpitGradient.addColorStop(1, "rgba(0, 150, 200, 0.3)");

      ctx.fillStyle = cockpitGradient;
      ctx.beginPath();
      ctx.ellipse(0, -4, 4.5, 6.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cockpit highlight / reflection
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(-1, -5.5, 2.5, 3.5, -0.4, 0, Math.PI * 1.6);
      ctx.stroke();

      ctx.lineWidth = 1;

      // ============================================
      // 5. NOSE & FRONT ACCENTS
      // ============================================
      // Sharp nose detail
      ctx.fillStyle = "#00ff9d";
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(-3, -size * 0.55);
      ctx.lineTo(3, -size * 0.55);
      ctx.fill();

      // Small front sensor lights
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(-4, -size * 0.35, 1.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4, -size * 0.35, 1.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // --- Initialization & Loop ---

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = Array.from({ length: STAR_COUNT }, () => new Star());
    };

    const animate = (timestamp) => {
      ctx.fillStyle = "rgba(6, 8, 12, 0.4)";
      ctx.fillRect(0, 0, width, height);

      stars.forEach(star => { star.update(); star.draw(); });

      // Update Tilt based on mouse movement speed
      const deltaX = mouse.x - lastMouseX;
      targetTilt = (deltaX * 0.05); // Sensitivity
      tilt += (targetTilt - tilt) * 0.1; // Smoothing
      lastMouseX = mouse.x;

      drawPlayer(mouse.x, mouse.y, tilt);

      if (timestamp - lastShot > FIRE_RATE) {
        bullets.push(new Bullet(mouse.x, mouse.y - 20));
        lastShot = timestamp;
      }

      bullets.forEach((b, i) => {
        b.update(); b.draw();
        if (b.y < 0) bullets.splice(i, 1);
      });

      if (timestamp - lastEnemySpawn > ENEMY_SPAWN_RATE) {
        enemies.push(new Enemy());
        lastEnemySpawn = timestamp;
      }

      enemies.forEach((en, ei) => {
        en.update(); en.draw();

        // Hit detection
        bullets.forEach((b, bi) => {
          if (Math.hypot(b.x - en.x, b.y - en.y) < en.radius + 5) {
            for (let i = 0; i < 10; i++) particles.push(new Particle(en.x, en.y, en.color));
            enemies.splice(ei, 1);
            bullets.splice(bi, 1);
            score += 10;
          }
        });

        if (en.y > height) enemies.splice(ei, 1);
      });

      particles.forEach((p, i) => {
        p.update(); p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
      });

      ctx.fillStyle = "white";
      ctx.font = "bold 18px monospace";
      ctx.fillText(`SCORE: ${score}`, 30, 40);

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    init();
    animate(0);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, background: "#06080c" }}
    />
  );
};

export default StarshipGameBackground;