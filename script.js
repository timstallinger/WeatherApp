// get weather data from openweathermap.org according to search query
// and display it on the screen
// standard location is Frankfurt am Main, Germany
// if no location is given, the standard location is used
// if the location is not found, an error message is displayed
// if the location is found, the weather data is displayed
// the background image is changed according to the weather

let weather = {
    apiKey: "d2de5112c1c920676660f25c783993ff",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            + "&units=metric&appid="
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        console.log(data);
        var { name } = data;
        var { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // translate description into German with switch
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
        }
        document.querySelector(".location-place").innerText = "Wetter in " + name;
        document.querySelector(".current-temp").innerText = temp + "°C";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".current-weather").innerText = description;
        document.querySelector(".current-humidity").innerText =
            "Feuchtigkeit: " + humidity + "%";
        document.querySelector(".current-wind").innerText =
            "Wind: " + speed + " km/h";
        // make description api readable
        description = data.weather[0]["description"].replace(" ", ",");
        name = name.replace(" ", ",");
        // set background image according to weather and city from unsplash.com
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name +  "')";
    },
};
weather.fetchWeather("Frankfurt");