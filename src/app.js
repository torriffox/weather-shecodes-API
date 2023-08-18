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

function showForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  let days = ["Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="forecast-date gray-style">${day}</div>
            <img
              src="images/cloud.png"
              class="image-weather-forecast"
              alt="cloudy"
              width="80px"
            />
            <div class="forecast-temperature blue-style">
              <span class="forecast-temperature-max">18°</span>
              <span class="forecast-temperature-min">12°</span>
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
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

  console.log(response);
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

  console.log(response);
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

showForecast();
