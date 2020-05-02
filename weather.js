const weatherContainer = document.querySelector(".js-weather");
const citySpan = document.querySelector(".city");
const tempSpan = document.querySelector(".temperature");
const weatherIconSpan = document.querySelector(".weather-icon");

const COORDS = "myLocation";
const API_KEY = "108e0234edd0c38f4861f615e7a937d1";
const weathers = [
  {
    main: "Thunderstorm",
    className: "fa-bolt",
  },
  {
    main: "Drizzle",
    className: "fa-smog",
  },
  {
    main: "Rain",
    className: "fa-umbrella",
  },
  {
    main: "Snow",
    className: "fa-snowflake",
  },
  {
    main: "Clear",
    className: "fa-sun",
  },
  {
    main: "Clouds",
    className: "fa-cloud",
  },
];

function saveLocation(coords) {
  localStorage.setItem(COORDS, JSON.stringify(coords));
}

function paintWeatherIcon(weatherStr) {
  const icon = weatherIconSpan.querySelector("i");
  weathers.forEach((weather) => {
    if (weather.main === weatherStr) {
      icon.classList.add(weather.className);
    }
  });
}

function paintWeatherInfo(data) {
  const {
    name,
    main: { temp },
    weather,
  } = data;
  paintWeatherIcon(weather[0].main);
  citySpan.innerText = `@${name}`;
  tempSpan.innerText = `${Math.round(temp)}°`;
}

function getWeatherInfo({ lat, lon }) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then(paintWeatherInfo);
}

function success(position) {
  const coordsObj = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };
  saveLocation(coordsObj);
  getWeatherInfo(coordsObj);
}

function error() {
  console.log("failed to get location");
}

function askForGeo() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function getLocation() {
  const coords = localStorage.getItem(COORDS);
  let coordsObj;
  if (coords === null) {
    askForGeo();
  } else {
    coordsObj = JSON.parse(coords);
    getWeatherInfo(coordsObj);
  }
}

function init() {
  getLocation();
}

init();
