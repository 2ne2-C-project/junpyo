const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hue = 0;
let particles = [];

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1; // 작게 (1 ~ 3)
    this.color = color;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = (Math.random() - 0.5) * 6;
    this.life = 60;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function explode(x, y, isInitial = false) {
  const sound = document.getElementById("boomSound");
  if (sound) {
    sound.currentTime = 0;
    sound.play();
  }

  const particleCount = isInitial ? 100 : 80;
  for (let i = 0; i < particleCount; i++) {
    let color;
    if (isInitial) {
      // 무지개 색 랜덤
      const randomHue = Math.random() * 360;
      color = `hsl(${randomHue}, 100%, 50%)`;
    } else {
      // 클릭 시 고정 hue
      color = `hsl(${hue}, 100%, 50%)`;
    }

    particles.push(new Particle(x, y, color));
  }

  // 다음 색으로 hue 증가
  if (!isInitial) {
    hue = (hue + 40) % 360;
  }
}

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter(p => p.life > 0);
  particles.forEach(p => {
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}

// ✅ 처음 한 번 무지개 폭발
window.addEventListener("load", () => {
  explode(canvas.width / 2, canvas.height / 2, true);
});

// ✅ 클릭할 때 고정 색 (다음 클릭 때 다른 색)
canvas.addEventListener("click", (e) => {
  explode(e.clientX, e.clientY, false);
});

animate();