const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width,
    });
  }
}

function drawStars() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (let i = 0; i < stars.length; i++) {
    const star = stars[i];
    star.z -= 1;
    if (star.z <= 0) {
      star.z = canvas.width;
    }
    const k = 128.0 / star.z;
    const px = star.x * k + canvas.width / 2;
    const py = star.y * k + canvas.height / 2;

    if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
      const size = (1 - star.z / canvas.width) * 3;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function animateBackground() {
  drawStars();
  requestAnimationFrame(animateBackground);
}

initStars();
animateBackground();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();
});
document.querySelectorAll('.click-animate').forEach(el => {
  el.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    this.appendChild(ripple);

    const size = Math.max(this.clientWidth, this.clientHeight);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - this.getBoundingClientRect().left - size / 2 + 'px';
    ripple.style.top = e.clientY - this.getBoundingClientRect().top - size / 2 + 'px';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '10';

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;
});

// Optional: hide cursor when not moving
let mouseTimeout;
document.addEventListener("mousemove", () => {
  clearTimeout(mouseTimeout);
  cursor.style.opacity = 1;
  mouseTimeout = setTimeout(() => {
    cursor.style.opacity = 0;
  }, 2000);
});
gsap.from(".slide-left", {
  x: -200,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".slide-left",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});
gsap.from(".scale-in", {
  scale: 0.5,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".scale-in",
    start: "top 90%",
    toggleActions: "play none none reverse"
  }
});

