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
            .then((data) => console.log(data));
    },
};
weather.fetchWeather("Frankfurt");