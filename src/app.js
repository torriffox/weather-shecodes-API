function formatDate(timestamp) {
  let date = new Date(timestamp);
  let dayIndex = date.getDay();
  let daysText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = daysText[dayIndex];

  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${currentDay.bold()}, ${hours}:${minutes}`;
}

function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let dayIndex = date.getDay();
  let daysText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = daysText[dayIndex];
  return day;
}

//function to get forecast weather

function showForecast(response) {
  console.log(response.data);

  let forecastWeekArray = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecastWeekArray.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="forecast-date gray-style">${formatDayForecast(
              day.time
            )}</div>
            <img
              src=${day.condition.icon_url}
              class="image-weather-forecast"
              alt=${day.condition.icon}
              width="80px"
            />
            <div class="forecast-temperature blue-style">
              <span class="forecast-temperature-max">${Math.round(
                day.temperature.maximum
              )}°</span>
              <span class="forecast-temperature-min">${Math.round(
                day.temperature.minimum
              )}°</span>
            </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ac49tfd4a3a68b207d8do5734e42e190";
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;

  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

//search button
function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let elementDegree = document.querySelector("#temperature");
  elementDegree.innerHTML = temperature;

  celsiusTemperature = response.data.temperature.current;

  let descriptionWeather = response.data.condition.description;
  let elementDescription = document.querySelector("#description");
  elementDescription.innerHTML = descriptionWeather;

  let humidityPercentage = response.data.temperature.humidity;
  let elementHumidity = document.querySelector("#humidity");
  elementHumidity.innerHTML = `${humidityPercentage}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let elementWind = document.querySelector("#wind");
  elementWind.innerHTML = `${windSpeed} m/s`;

  let dayWeekHours = document.querySelector("#current-date-hours");
  dayWeekHours.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", descriptionWeather);

  getForecast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();

  let currentCity = document.querySelector("#city");
  let enteredCity = document.querySelector("#cityInput");

  if (enteredCity.value) {
    currentCity.innerHTML = enteredCity.value.trim();
  } else {
    alert("Enter a city ...");
    currentCity.innerHTML = null;
  }

  let apiKey = "ac49tfd4a3a68b207d8do5734e42e190";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${enteredCity.value.trim()}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let formEnterCity = document.querySelector("#search-btn");
formEnterCity.addEventListener("click", searchCity);

//current button
function showWeatherCurrent(response) {
  let temperature = Math.round(response.data.temperature.current);
  let elementDegree = document.querySelector("#temperature");
  elementDegree.innerHTML = temperature;

  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.city;

  let descriptionWeather = response.data.condition.description;
  let elementDescription = document.querySelector("#description");
  elementDescription.innerHTML = descriptionWeather;

  let humidityPercentage = response.data.temperature.humidity;
  let elementHumidity = document.querySelector("#humidity");
  elementHumidity.innerHTML = `${humidityPercentage}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let elementWind = document.querySelector("#wind");
  elementWind.innerHTML = `${windSpeed} m/s`;

  let dayWeekHours = document.querySelector("#current-date-hours");
  dayWeekHours.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", descriptionWeather);

  celsiusTemperature = response.data.temperature.current;

  getForecast(response.data.coordinates);
}

function determineLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "ac49tfd4a3a68b207d8do5734e42e190";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCurrent);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(determineLocation)
);

//unit convertions
function showFahrenheitDegree(event) {
  event.preventDefault();

  //remove the active class the celsius
  celsiusDegree.classList.remove("active");

  //add the active class the fahrenheit
  fahrenheitDegree.classList.add("active");

  let elementDegree = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  elementDegree.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusDegree(event) {
  event.preventDefault();

  fahrenheitDegree.classList.remove("active");
  celsiusDegree.classList.add("active");

  let elementDegree = document.querySelector("#temperature");
  elementDegree.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitDegree = document.querySelector("#fahrenheitDegree");
fahrenheitDegree.addEventListener("click", showFahrenheitDegree);

let celsiusDegree = document.querySelector("#celsiusDegree");
celsiusDegree.addEventListener("click", showCelsiusDegree);

function showWeatherKyiv() {
  let city = document.querySelector("#city");
  city.innerHTML = "Kyiv";

  let apiKey = "ac49tfd4a3a68b207d8do5734e42e190";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Kyiv&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let weatherKyiv = document.querySelector("#common-city-kyiv");
weatherKyiv.addEventListener("click", showWeatherKyiv);

function showWeatherLviv() {
  let city = document.querySelector("#city");
  city.innerHTML = "Lviv";

  let apiKey = "ac49tfd4a3a68b207d8do5734e42e190";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lviv&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let weatherLviv = document.querySelector("#common-city-lviv");
weatherLviv.addEventListener("click", showWeatherLviv);

function showWeatherKherson() {
  let city = document.querySelector("#city");
  city.innerHTML = "Kherson";

  let apiKey = "ac49tfd4a3a68b207d8do5734e42e190";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Kherson&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let weatherKherson = document.querySelector("#common-city-kherson");
weatherKherson.addEventListener("click", showWeatherKherson);
