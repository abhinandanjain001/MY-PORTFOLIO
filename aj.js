// ===== DOM ELEMENTS =====
const canvas = document.getElementById("bg-canvas");
const ctx = canvas?.getContext("2d");

const matrixCanvas = document.getElementById("matrix-canvas");
const matrixCtx = matrixCanvas?.getContext("2d");

const preloader = document.getElementById("preloader");
const loadingScreen = document.getElementById("loading-screen");
const loadingLogs = document.getElementById("loading-logs");
const progressBar = document.getElementById("bar");
const cursor = document.querySelector(".custom-cursor");

// Exit if no canvas support
if (!ctx || !matrixCtx) {
  console.warn("Canvas not supported or elements missing.");
}

// ===== STARFIELD BACKGROUND =====
let stars = [];
const STAR_COUNT = 200;

function initStars() {
  stars = [];
  const w = canvas.width;
  const h = canvas.height;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * w,
    });
  }
}

function drawStars() {
  ctx.fillStyle = "#0d1117";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";

  for (const star of stars) {
    star.z -= 1;
    if (star.z <= 0) star.z = canvas.width;

    const k = 128 / star.z;
    const px = star.x * k + canvas.width / 2;
    const py = star.y * k + canvas.height / 2;
    const size = (1 - star.z / canvas.width) * 3;

    if (
      px >= 0 &&
      px <= canvas.width &&
      py >= 0 &&
      py <= canvas.height
    ) {
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function animateStars() {
  drawStars();
  requestAnimationFrame(animateStars);
}

// Logo with glow effect
function drawLogo() {
  ctx.save();
  ctx.font = "bold 100px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.shadowColor = "#00e5ff";
  ctx.shadowBlur = 25;
  ctx.fillStyle = "#00e5ff";
  ctx.fillText("AJ", canvas.width / 2, canvas.height / 2);

  ctx.restore();
}

// Resize handler
function handleResize() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initStars();
    drawLogo();
  }
  if (matrixCanvas) {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
  }
}

// ===== MATRIX RAIN EFFECT =====
const matrixChars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
let matrixDrops = [];

function initMatrix() {
  matrixDrops = Array(Math.ceil(matrixCanvas.width / fontSize))
    .fill(1);
}

function drawMatrix() {
  matrixCtx.fillStyle = 'rgba(13, 17, 23, 0.05)';
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

  matrixCtx.fillStyle = '#00ff9d';
  matrixCtx.font = `${fontSize}px monospace`;

  for (let i = 0; i < matrixDrops.length; i++) {
    const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    matrixCtx.fillText(char, i * fontSize, matrixDrops[i] * fontSize);

    if (matrixDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
      matrixDrops[i] = 0;
    }
    matrixDrops[i]++;
  }
}

// ===== RIPPLE EFFECT =====
document.querySelectorAll('button, .project-card a, .client-login').forEach(el => {
  el.style.position = 'relative';
  el.style.overflow = 'hidden';

  el.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(this.clientWidth, this.clientHeight);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: radial-gradient(circle, #00ff9d55 0%, transparent 70%);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out forwards;
      pointer-events: none;
      z-index: 1;
    `;
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation to head if not present
if (!document.getElementById("ripple-styles")) {
  const style = document.createElement("style");
  style.id = "ripple-styles";
  style.textContent = `
    @keyframes ripple-animation {
      to { transform: scale(4); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

// ===== CUSTOM CURSOR =====
if (cursor) {
  let mouseTimeout;

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    cursor.style.opacity = 1;
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
      cursor.style.opacity = 0;
    }, 2000);
  });

  // Prevent cursor on touch devices
  document.addEventListener("touchstart", () => {
    cursor.style.display = "none";
  });
}

// ===== LOADING SCREEN & PRELOADER =====
function initializeSite() {
  // Initialize Locomotive Scroll
  if (typeof LocomotiveScroll !== "undefined") {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true,
      smartphone: { smooth: true },
      tablet: { smooth: true }
    });

    // Update on load
    window.addEventListener("load", () => setTimeout(() => scroll.update(), 500));
    window.addEventListener("resize", () => setTimeout(() => scroll.update(), 100));

    // Expose to global scope if needed
    window.scroll = scroll;
  }

  // GSAP Integration (only if GSAP & ScrollTrigger are loaded)
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
      scrollTop: (value) => {
        return arguments.length
          ? window.scroll.scrollTo(value, 0, 0)
          : window.scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    // Example animations
    gsap.utils.toArray('.slide-left').forEach(el => {
      gsap.from(el, {
        x: -100, opacity: 0, duration: 1,
        scrollTrigger: { trigger: el, scroller: "[data-scroll-container]", start: "top 85%", toggleActions: "play none none reverse" }
      });
    });

    gsap.utils.toArray('.scale-in').forEach(el => {
      gsap.from(el, {
        scale: 0.7, opacity: 0, duration: 1,
        scrollTrigger: { trigger: el, scroller: "[data-scroll-container]", start: "top 90%", toggleActions: "play none none reverse" }
      });
    });

    // Sync Locomotive Scroll with ScrollTrigger
    window.addEventListener("load", () => {
      ScrollTrigger.addEventListener("refresh", () => window.scroll?.update());
      ScrollTrigger.refresh();
    });
  }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.navbar ul');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu on link click
  document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('active');
      menuToggle?.classList.remove('active');
    });
  });
}

// ===== MAIN INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  handleResize(); // Set canvas sizes
  initStars();
  initMatrix();

  // Start animations
  if (canvas) {
    drawLogo();
    animateStars();
  }
  if (matrixCanvas) {
    setInterval(drawMatrix, 35);
  }

  // Preloader logic
  if (sessionStorage.getItem("preloaderShown")) {
    preloader.style.display = "none";
    loadingScreen.style.display = "none";
    initializeSite();
  } else {
    let progress = 0;
    let currentMessage = 0;
    const logMessages = [
      "Initializing system...",
      "Loading components...",
      "Rendering interface...",
      "Compiling resources...",
      "Almost there..."
    ];

    const progressInterval = setInterval(() => {
      progress += 2;
      progressBar.style.width = `${progress}%`;

      if (progress % 20 === 0 && currentMessage < logMessages.length) {
        loadingLogs.textContent += logMessages[currentMessage] + "\n";
        loadingLogs.scrollTop = loadingLogs.scrollHeight;
        currentMessage++;
      }

      if (progress >= 100) {
        clearInterval(progressInterval);
        setTimeout(() => {
          preloader.style.opacity = "0";
          loadingScreen.style.opacity = "0";
          setTimeout(() => {
            preloader.style.display = "none";
            loadingScreen.style.display = "none";
            sessionStorage.setItem("preloaderShown", "true");
            initializeSite();
          }, 800);
        }, 500);
      }
    }, 50);

    // ESC to skip
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        clearInterval(progressInterval);
        preloader.style.opacity = "0";
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
          loadingScreen.style.display = "none";
          sessionStorage.setItem("preloaderShown", "true");
          initializeSite();
        }, 300);
      }
    });
  }
});

// ===== Optional: Responsive cleanup on load =====
window.addEventListener("load", () => {
  // Optional: Hide skeleton loaders or enable transitions
});