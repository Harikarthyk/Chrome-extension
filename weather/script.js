const API = "http://api.openweathermap.org";
const city = "delhi";
const API_ID = "131cd68909b623f5d5cfb417e05ee351";
const LOCATION_ENDPOINT = "/data/2.5/weather";
const LAT_LNG_ENDPOINT = "/geo/1.0/reverse";


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} else {
    const location_info = document.getElementById("location_info");
    const html = `
        It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.
    `
    location_info.innerHTML = html;
}
function errorFunction(){
    const location_info = document.getElementById("location_info")
    location_info.innerHTML = "Something went wrong in Lat and Long"     
}
function successFunction(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    const location_info = document.getElementById("location_info");
    fetch(`${API}${LAT_LNG_ENDPOINT}?lat=${lat}&lon=${long}&appid=${API_ID}`)
        .then(response => response.json())
        .then(data => {
            const name = data[0]?.name;
            const state = data[0]?.state;
            const html = `
                State: ${state}
            `
            location_info.innerHTML = html;

            fetch(`${API}${LOCATION_ENDPOINT}?q=${state}&units=metric&appid=${API_ID}`)
            .then(response => response.json())
            .then(data => {
                const wrapper = document.getElementById("weather_info");
                // var name = data.name + "," + data.sys.country;
                var degree = Math.round(data.main.temp);
                var description = data.weather[0].description;
                var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                const html = `
                    <h2 class="name">Your City: ${name}</h2>
                    <h3 class="degree">${degree} Degree Celsius</h3>
                    <img src=${icon} class="icon" />
                    <p class="description">${description}</p>
                `
                wrapper.innerHTML = html;
            }).catch(error => {
                const wrapper = document.getElementById("weather_info")
                wrapper.innerHTML = "Something went wrong."
            })
                }).catch(error => {
                    const wrapper = document.getElementById("location_info")
                    wrapper.innerHTML = "Something went wrong in Lat and Long"
                })

}
