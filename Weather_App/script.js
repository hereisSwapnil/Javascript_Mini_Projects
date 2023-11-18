async function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log(latitude, longitude);
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e25f3bf2e857a4c1069f2cfb4e6e84cb`)
                .then(async (response) => {
                    const data = await response.json()
                    console.log(response);
                    if (response.ok) {
                        displayWeather(data);
                    }
                }).catch(e => {
                    console.error(e);
                })
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function displayWeather(data) {
    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `
        <div class="mb-4">
            <h2 class="text-xl font-semibold mb-2">${data.name}, ${data.sys.country}</h2>
            <p class="text-lg">${data.weather[0].description}</p>
            <p class="text-4xl font-bold mt-2">${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
}