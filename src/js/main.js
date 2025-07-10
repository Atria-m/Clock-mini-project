const header = document.querySelector(".header");
const starCount = 50;
const stars = [];

function isFarEnough(x, y, size) {
  for (const star of stars) {
    const dx = star.x - x;
    const dy = star.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < (star.size + size) * 0.85) {
      return false;
    }
  }
  return true;
}

for (let i = 0; i < starCount; i++) {
  const star = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  star.setAttribute("viewBox", "0 0 20 20");
  star.classList.add("star");
  star.innerHTML = `<path d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z"></path>`;

  const size = Math.random() * 15 + 5;
  star.style.width = size + "px";
  star.style.height = size + "px";
  star.style.position = "absolute";

  let x, y;
  let attempts = 0;
  do {
    x = Math.random() * 100;
    y = Math.random() * 100;
    attempts++;
    if (attempts > 100) break;
  } while (!isFarEnough(x, y, size));

  star.style.left = x + "%";
  star.style.top = y + "%";

  const duration = Math.random() * 3 + 1.5;
  const delay = Math.random() * 3;
  star.style.animation = `star-twinkle ${duration}s infinite`;
  star.style.animationDelay = delay + "s";

  const brightness = 1 + Math.random();
  star.style.filter = `brightness(${brightness})`;

  header.appendChild(star);
  stars.push({ x, y, size });
}

window.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

  themeToggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const selectMenu = document.querySelectorAll("select");
  const timeBox = document.querySelector(".time");
  const setAlarmBtn = document.querySelector(".btn");
  const content = document.querySelector(".content");

  let alarmTime = "";
  let alarmState = "noset";
  let isAlarmPlaying = false;

  const ringtone = new Audio("/Clock-mini-project/public/music/ring.mp3");
  ringtone.loop = true;

  for (let i = 23; i >= 0; i--) {
    let val = i < 10 ? "0" + i : i;
    let option = `<option value="${val}" class="text-gray-700 font-semibold">${val}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  for (let i = 59; i >= 0; i--) {
    let val = i < 10 ? "0" + i : i;
    let option = `<option value="${val}" class="text-gray-700 font-semibold">${val}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
  }

  setAlarmBtn.addEventListener("click", () => {
    if (alarmState === "noset") {
      alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;
      if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
        alert("زمان هشدار را به درستی مشخص کنید!");
        return;
      }
      ringtone.load();
      content.classList.add("disable");
      setAlarmBtn.innerText = "clear Alarm";
      alarmState = "set";
    } else {
      content.classList.remove("disable");
      alarmTime = "";
      ringtone.pause();
      isAlarmPlaying = false;
      setAlarmBtn.innerText = "set Alarm";
      alarmState = "noset";
    }
  });

  setInterval(() => {
    const date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    timeBox.innerHTML = `${h}:${m}:${s}`;

    if (`${h}:${m}` === alarmTime && !isAlarmPlaying) {
      ringtone.play().catch((e) => console.log("Error playing sound:", e));
      isAlarmPlaying = true;
    }
  }, 1000);
});
fetch("/audio/ringtone.mp3")
  .then((res) => {
    if (res.ok) console.log("فایل صوتی وجود دارد و قابل بارگذاری است.");
    else console.error("فایل صوتی پیدا نشد یا قابل دسترسی نیست.");
  })
  .catch((e) => console.error("خطا در دسترسی به فایل صوتی:", e));
