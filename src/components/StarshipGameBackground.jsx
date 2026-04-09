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

      // 1. Engine Flame (Flickering)
      const flameHeight = 15 + Math.random() * 10;
      const gradient = ctx.createLinearGradient(0, 0, 0, flameHeight);
      gradient.addColorStop(0, "#00f2ff");
      gradient.addColorStop(1, "transparent");
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(-5, 15);
      ctx.lineTo(0, 15 + flameHeight);
      ctx.lineTo(5, 15);
      ctx.fill();

      // 2. Ship Wings (Back layer)
      ctx.fillStyle = "#006655";
      ctx.beginPath();
      ctx.moveTo(-PLAYER_SIZE, 15);
      ctx.lineTo(0, -5);
      ctx.lineTo(PLAYER_SIZE, 15);
      ctx.lineTo(0, 5);
      ctx.fill();

      // 3. Main Hull (Center)
      ctx.fillStyle = "#00ff6a";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#00ff6a";
      ctx.beginPath();
      ctx.moveTo(0, -PLAYER_SIZE);
      ctx.lineTo(-10, 10);
      ctx.lineTo(0, 5);
      ctx.lineTo(10, 10);
      ctx.closePath();
      ctx.fill();

      // 4. Cockpit (Detail)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(0, -5, 3, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
      ctx.shadowBlur = 0;
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
            for(let i=0; i<10; i++) particles.push(new Particle(en.x, en.y, en.color));
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