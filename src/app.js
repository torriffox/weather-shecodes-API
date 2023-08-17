//search button
function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  console.log(temperature);
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

//curent button
function showWeatherCurrent(response) {
  let temperature = Math.round(response.data.temperature.current);
  console.log(temperature);
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
