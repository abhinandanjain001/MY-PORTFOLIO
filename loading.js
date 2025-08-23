document.addEventListener("DOMContentLoaded", () => {
  const logs = [
    "[*] Booting system...",
    "[*] Initializing modules...",
    "[*] Connecting localhost:1337...",
    "[*] Access Granted ✔",
    ">>> Welcome, Abhinandan Jain <<<"
  ];

  let i = 0;
  const loadingLogs = document.getElementById("loading-logs");
  const bar = document.getElementById("bar");
  const loadingScreen = document.getElementById("loading-screen");

  function showLogs() {
    if (i < logs.length) {
      loadingLogs.innerHTML += logs[i] + "\n";
      bar.style.width = ((i + 1) / logs.length) * 100 + "%";
      i++;
      setTimeout(showLogs, 1000);
    } else {
      setTimeout(hideLoading, 1200);
    }
  }

  function hideLoading() {
    if (!loadingScreen.classList.contains("done")) {
      loadingScreen.classList.add("done");
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 600);
    }
  }

  // Run logs
  showLogs();

  // ESC to skip
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideLoading();
    }
  });
});
