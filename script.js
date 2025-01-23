let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");


let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");


let citySearch = document.querySelector(".weather_search")

city = "Guna"

citySearch.addEventListener('submit', (e)=>{
    e.preventDefault()

    let cityName = document.querySelector(".city_name")

    city = cityName.value

    getWeatherData()
    
    cityName.value = ""
})


// ! Getting country name using country code.
const getCountryName = (code)=>{
    return new Intl.DisplayNames([code], {type: "region"}).of(code)
}


// ! Getting date and time easily.
const getDateTime = (dt)=>{
    const date_time_ms = dt * 1000; // Convert Unix timestamp to milliseconds
        const dateObject = new Date(date_time_ms);

        // !One Way - 
        // const date = dateObject.toDateString();
        // dateTime.innerHTML = `${date} at ${dateObject.getHours()}:${dateObject.getMinutes()}`;

        // ! 2nd Way - 

        const options = {
            weekDay: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }

        const formatter = new Intl.DateTimeFormat("en-US", options)

        return formatter.format(dateObject)
}


const getWeatherData = async ()=>{
    const apiKey = "02d15ba9103525cb09527844883f0a3f";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`;


    // const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a0b06669a793506ae54060f7df8a5fb6`;

    try{
        const res = await fetch(weatherUrl)

        const data = await res.json()

        // console.log(data)

        const {main, name, weather, wind, sys, dt} = data //*destructuring


        // * city name---------------------------------------------
        cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`

        // * date time------------------------------------------------
        dateTime.innerHTML = getDateTime(dt)

        w_forecast.innerHTML = weather[0].main
        w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`

        //* http://openweathermap.org/img/wn/${weather[0].icon}@4x.png

        w_temperature.innerHTML = `${main.temp}&#176`

        w_minTem.innerHTML = `Min: ${main.temp_min.toFixed()}&#176`
        
        w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed()}&#176`



        w_feelsLike.innerHTML = `${main.feels_like.toFixed(2)}&#176`
        w_humidity.innerHTML = `${main.humidity}%`
        w_wind.innerHTML = `${wind.speed} m/s`
        w_pressure.innerHTML = `${main.pressure} hPa`


    }catch(error){
        console.log(error)
    }
}
window.addEventListener('load', getWeatherData)
