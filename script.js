let weather = {
  apiKey: "0238f9837ff945e891a143140251307",
  fetchWeather: function (city) {
    fetch(
      "https://api.weatherapi.com/v1/current.json?key=" +
        this.apiKey +
        "&q=" +
        city
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { location, current } = data;
    document.querySelector(".city").innerText = "Weather in " + location.name;
    document.querySelector(".icon").src = current.condition.icon;
    document.querySelector(".description").innerText = current.condition.text;
    document.querySelector(".temp").innerText = current.temp_c + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + current.humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind: " + current.wind_kph + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + location.name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

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

weather.fetchWeather("Kano");
