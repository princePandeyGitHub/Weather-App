// Add event listener to the 'Get Weather' button
document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('user-input').value.trim();

    // Check if the input is empty
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    // API key and endpoint
    const apiKey = 'fcc8de7015bbb202209bbf0261babf4c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    // Fetch the weather data from OpenWeatherMap API
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // Update the UI with the fetched data
            document.getElementById('city-name').innerText = `City: ${data.name}`;
            document.getElementById('temp').innerText = `Temperature: ${data.main.temp} °C`;
            document.getElementById('weather').innerText = `Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
        });
});
