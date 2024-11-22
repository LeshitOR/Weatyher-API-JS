const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-button');


const notFoundSection = document.querySelector('.not-found');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const countryTxt = document.querySelector('.country-text');
const tempTxt = document.querySelector('.temp-txt');
const conditionTxt = document.querySelector('.condition-txt');
const humidityValue = document.querySelector('.humidity-value');
const windValue = document.querySelector('.wind-value-txt');
const weatherSummaryImg = document.querySelector('.weather-summary-img');
const currentDateTxt = document.querySelector('.current-date-txt');

const apiKey = '474dcba771a983c96f973714c8bf2507';

searchBtn.addEventListener('click', ()=>{
    if (cityInput.value.trim() != ''){
        updateWeatherInfo(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
})

cityInput.addEventListener('keydown', (event) =>{
if(event.key == 'Enter' && 
    cityInput.value.trim() != ''
){
        updateWeatherInfo(cityInput.value)
        cityInput.value = ''
        cityInput.blur()
    }
})

async function getFetchData(endPoint, city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(apiUrl);

    return response.json();
}

function getWeatherIcon(id){
    if(id <= 232) return 'thunderstorm.svg'
    if(id <= 321) return 'cloud whit.svg'
    if(id <= 531) return 'rainy.svg'
    if(id <= 622) return 'cloudy_snowing.svg'
    if(id <= 781) return 'atmosphere.svg'
    if(id <= 800) return 'cloudd.svg'
    else return 'cloud whit.svg'
}


function getCurrentDate(){
    const currentDate = new Date()
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }
}


async function updateWeatherInfo(city){
    const weatherData = await getFetchData('weather', city);

    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection)
        return
    }
    console.log(weatherData)

    const{
        name: country,
        main: {temp, humidity},
        weather: [{id, main}],
        wind: {speed}
    }= weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + '°C'
    conditionTxt.textContent = main
    humidityValue.textContent = humidity + '%'
    windValue.textContent = speed + 'M/s'

    currentDateTxt.textContent = getCurrentDate()
    weatherSummaryImg.src = `assets/${getWeatherIcon(id)}`

    showDisplaySection(weatherInfoSection)
}

function showDisplaySection(section){
    [weatherInfoSection, searchCitySection, notFoundSection]
    .forEach(section => section.style.display = 'none')

    section.style.display = 'flex'
}