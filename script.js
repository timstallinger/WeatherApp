// get weather data from openweathermap.org according to search query
// and display it on the screen
// the background image is changed according to the search location

let weather = {
    apiKey: "d2de5112c1c920676660f25c783993ff",
    fetchWeather: function (city) {
        // fetch weather data from openweathermap.org
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&lang=de&units=metric&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        // display the weather data on the screen
        var { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        
        // set text contents
        document.querySelector(".location-place").innerText = "Wetter in " + name;
        document.querySelector(".current-temp").innerText = temp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".current-weather").innerText = description;
        document.querySelector(".current-humidity").innerText = "Luftfeuchtigkeit: " + humidity + "%";
        document.querySelector(".current-wind").innerText = "Wind: " + speed + " km/h";

        // if the temperature is below 0°C, set label color to blue
        if (temp < 0) {
            document.querySelector(".current-temp").style.color = "blue";
        } else if (temp < 25) {
            document.querySelector(".current-temp").style.color = "white";
        } else {
            document.querySelector(".current-temp").style.color = "red";
        }
        
        // make description api readable for background image
        name = name.replace(" ", ",");

        document.querySelector(".wetter").classList.remove("laden");

        // set background image according city from unsplash.com
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name +  "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
      },
};


weather.fetchWeather("Frankfurt");

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });


  document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });