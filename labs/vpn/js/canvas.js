(function() {
  const canvas = document.getElementById('network-bg');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId = null;

  const mouse = {
    x: null,
    y: null,
    radius: 120
  };

  // Настройка размеров холста
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }

  // Класс частицы (сетевого узла)
  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.random() * 1.8 + 1;
      this.baseSpeedX = (Math.random() * 0.4 - 0.2);
      this.baseSpeedY = (Math.random() * 0.4 - 0.2);
      this.vx = this.baseSpeedX;
      this.vy = this.baseSpeedY;
      
      // Выбираем цвет (фиолетовый или голубой с разной яркостью)
      const randColor = Math.random();
      if (randColor > 0.6) {
        this.color = 'rgba(138, 43, 226, '; // purple
      } else if (randColor > 0.2) {
        this.color = 'rgba(0, 191, 255, '; // blue
      } else {
        this.color = 'rgba(255, 0, 127, '; // pink
      }
      this.alpha = Math.random() * 0.4 + 0.3;
    }

    update() {
      // Отскок от краев экрана
      if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
      if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

      // Притяжение/взаимодействие с мышью
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          // Плавно сдвигаем к курсору
          this.vx += (dx / distance) * force * 0.03;
          this.vy += (dy / distance) * force * 0.03;
        } else {
          // Возвращаем базовую скорость
          this.vx += (this.baseSpeedX - this.vx) * 0.02;
          this.vy += (this.baseSpeedY - this.vy) * 0.02;
        }
      } else {
        this.vx += (this.baseSpeedX - this.vx) * 0.02;
        this.vy += (this.baseSpeedY - this.vy) * 0.02;
      }

      // Лимит максимальной скорости
      const speed = Math.hypot(this.vx, this.vy);
      const maxSpeed = 1.2;
      if (speed > maxSpeed) {
        this.vx = (this.vx / speed) * maxSpeed;
        this.vy = (this.vy / speed) * maxSpeed;
      }

      this.x += this.vx;
      this.y += this.vy;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  // Создание массива точек
  function initParticles() {
    particles = [];
    // Плотность точек зависит от площади экрана
    const area = canvas.width * canvas.height;
    const density = 18000; // пикселей на одну частицу
    const count = Math.min(100, Math.max(30, Math.floor(area / density)));

    for (let i = 0; i < count; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new Particle(x, y));
    }
  }

  // Соединение близких точек линиями
  function connectParticles() {
    const maxDistance = 150;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          const alpha = (1 - (distance / maxDistance)) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // Цвет линии - средний градиент между точками
          ctx.strokeStyle = `rgba(100, 160, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  // Цикл анимации
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Рисуем сетку на заднем плане
    drawGrid();

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();
    animationId = requestAnimationFrame(animate);
  }

  // Рисование тонкой фоновой технологичной сетки
  function drawGrid() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.012)';
    ctx.lineWidth = 0.5;
    const size = 60;
    
    // Вертикальные линии
    for (let x = 0; x < canvas.width; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    // Горизонтальные линии
    for (let y = 0; y < canvas.height; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  }

  // Слушатели мыши
  window.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', function() {
    mouse.x = null;
    mouse.y = null;
  });

  // Инициализация при загрузке
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animate();
})();
