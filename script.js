// Add event listener to the 'Get Weather' button
document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('user-input').value.trim();

    // Check if the input is empty
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    // API key and endpoint
    const apiKey = 'c2c08467d56d57513607c7d9da7dfa24';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Check if the info area is empty before showing the loader
    const infoArea = document.getElementById('info-area');
    if (infoArea.innerText.trim() === '') {
        document.getElementById('loader').style.display = 'block'; // Show the loader only if no info is displayed
    }


    // Fetch the weather data from OpenWeatherMap API
    fetch(url)
        .then(response => {
            document.getElementById('loader').style.display = 'none';
            console.log(response);
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            // change the UI as per temperature
            const body = document.getElementById('body');
            // apply cold colors
            if(data.main.temp <= 20){
                body.style.backgroundColor = '#9294e6';
            }
            //apply hot colors
            if(data.main.temp >= 21){
                body.style.backgroundColor = '#ed95c1';
            }

            // Update the UI with the fetched data
            document.getElementById('city-name').innerText = `City: ${data.name}`;
            document.getElementById('temp').innerText = `Temperature: ${data.main.temp} °C feels like ${data.main.feels_like} °C`;
            document.getElementById('weather').innerText = `Weather: ${data.weather[0].description}`;
        })
        .catch(error => {
            // Handle any errors that occur during the fetch
            console.error('Error fetching data:', error);
            alert('An error occurred while fetching weather data. Please try again.');
        });
});
