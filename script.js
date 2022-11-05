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
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    translateDescription: function (description) {
        // translate the weather description into German
        switch (description) {
            case "clear sky":
                description = "klarer Himmel";
                break;
            case "few clouds":
                description = "leicht bewölkt";
                break;
            case "scattered clouds":
                description = "wolkig";
                break;
            case "broken clouds":
                description = "stark bewölkt";
                break;
            case "overcast clouds":
                description = "leicht bewölkt";
                break;c
            case "shower rain":
                description = "Regenschauer";
                break;
            case "rain":
                description = "Regen";
                break;
            case "thunderstorm":
                description = "Gewitter";
                break;
            case "snow":
                description = "Schnee";
                break;
            case "mist":
                description = "Nebel";
                break; 
            // default is the original description
        }
        return description;
    },
    displayWeather: function (data) {
        // display the weather data on the screen
        const { name } = data;
        var { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        description = this.translateDescription(description);
        
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

        // set background image according city from unsplash.com
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name +  "')";
    },
};
weather.fetchWeather("Alaska");