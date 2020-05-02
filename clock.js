const clock_container = document.querySelector(".js-clock");
const clock_title = clock_container.querySelector("div");

function paintClock() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hours_str = hours < 10 ? `0${hours}` : `${hours}`;
  const minutes_str = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds_str = seconds < 10 ? `0${seconds}` : `${seconds}`;

  clock_title.innerText = `${hours_str}:${minutes_str}:${seconds_str}`;
}

function clockInit() {
  paintClock();
  setInterval(paintClock, "1000");
}

clockInit();
