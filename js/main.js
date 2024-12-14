"use strict";
//Api Key 
// 0a21aac778c44fcbbaf71139241412
// q=auto:ip
// http://api.weatherapi.com/v1/forecast.json?key=0a21aac778c44fcbbaf71139241412&q=egypt&days=7

let search = document.getElementById('search');
let cardContainer = document.getElementById('nextdays');
let weatherData = [];
const apiKey = `0a21aac778c44fcbbaf71139241412`;
const daysNum = `3`;
const baseUrl = `https://api.weatherapi.com/v1/forecast.json?`;

let mainIcon = document.querySelector('.state1');
let mainTemp = document.querySelector('.degree-number');
let mainCity = document.querySelector('.city-name');
let mainDay = document.querySelector('.current-day');

async function fitchWeatherData(query) {
    const response = await fetch(`${baseUrl}key=${apiKey}&q=${query}&days=${daysNum}`);;
    return await response.json();
}

// Display weather data
function displayWeather(weatherData) {
    // weatherData = JSON.parse(weatherData);
    let name = weatherData.location.name;
    let temp = weatherData.current.temp_c;
    let icon = weatherData.current.condition.icon;
    let nexTwo = weatherData.forecast.forecastday;
    let currentDate = new Date(weatherData.current.last_updated);
    let currentDay = currentDate.toLocaleDateString('en-US', {
        weekday: 'long'
    });

    mainIcon.src = icon;
    mainTemp.textContent = temp;
    mainCity.textContent = name;
    mainDay.textContent = currentDay

    // mainDay.innerText = `hello, City is ${name} and current temp is ${temp} and current Day is ${currentDay}`

    let forecastHTML = '';
    // Loop through forecast days
    for (let i = 1; i < nexTwo.length; i++) {
        let date = nexTwo[i].date;
        let day = nexTwo[i].day;
        let condition = day.condition.text;
        let maxTemp = day.maxtemp_c;
        let minTemp = day.mintemp_c;
        let nextIcon = day.condition.icon;
        // let date = day.date;

        let dayName = new Date(date);
        let dayNameText = dayName.toLocaleDateString('en-US', { weekday: 'long' });
        // Create HTML for each forecast day
        forecastHTML += `
           <div class="col-12 col-md-4">
                    <div class="card border-0">
                        <div class="date text-center">
                            <h3 class="text-uppercase day1-name">${dayNameText}</h3>
                        </div>
                        <div class="temp text-center">
                            <div class="current">
                                <h4 class="text-capitalize">minimum</h>
                                    <h1><span class="minDay1">${minTemp}</span>&deg;C</h1>
                            </div>
                            <img src="./img/line-d.svg" alt="">
                            <div class="feel">
                                <h4 class="text-capitalize">maximum</h4>
                                <h1><span class="maxDay1">${maxTemp}</span>&deg;C</h1>
                            </div>
                        </div>
                        <div class="state">
                            <img src="${nextIcon}" class="state1">
                            <h4 class="stateDay1">${condition}</h4>
                        </div>
                    </div>
                </div>
        `;

        console.log(`Day ${i + 1} Condition: ${condition}`);
    }
    console.log("hi")
    // Update nextDay element with forecast HTML
    cardContainer.innerHTML = forecastHTML;

}

// Fetch data

async function getWeatherData() {
    let currentWeatherData = await fitchWeatherData('auto:ip');
    if (currentWeatherData) {
        displayWeather(currentWeatherData);
    }
    search.addEventListener('input', async function () {
        const query = search.value.trim();
        if (query.length < 2) {
            return
        }
        let searchtWeatherData = await fitchWeatherData(query);
        if (searchtWeatherData) {
            displayWeather(searchtWeatherData);
        }
    })
}
getWeatherData();