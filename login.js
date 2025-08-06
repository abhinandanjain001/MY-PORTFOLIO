const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const checkbox = document.getElementById("agree");
const rope = document.querySelector(".rope");
const weight = document.querySelector(".weight");
const hand = document.querySelector(".hand");
const button = document.getElementById("submitBtn");
const clickSound = document.getElementById("click-sound");

// Animate gears while typing
[nameInput, emailInput].forEach(input => {
  input.addEventListener("input", () => {
    document.querySelectorAll(".gear").forEach(g => g.style.animationPlayState = "running");
    setTimeout(() => {
      document.querySelectorAll(".gear").forEach(g => g.style.animationPlayState = "paused");
    }, 1000);
  });
});

// Pulley drop on checkbox
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    rope.style.height = "100px";
    weight.style.top = "100px";
    hand.style.transform = "translateX(-50%) translateY(30px)";
  } else {
    rope.style.height = "60px";
    weight.style.top = "60px";
    hand.style.transform = "translateX(-50%) translateY(0)";
  }
});

// Button click sound
button.addEventListener("click", (e) => {
  e.preventDefault();
  clickSound.currentTime = 0;
  clickSound.play();
  hand.style.transform = "translateX(-50%) translateY(60px)";
  setTimeout(() => {
    hand.style.transform = "translateX(-50%) translateY(0)";
  }, 300);
});
