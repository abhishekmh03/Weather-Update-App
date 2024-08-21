const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?q=adgaon&appid="your api key"&units=metric"
const cityName = document.querySelector(".city-name");
const btn = document.querySelector(".btn");
const cityNameShow = document.querySelector(".city_name");
const humidity = document.querySelector(".humidity_value");
const windSpeed = document.querySelector(".windSpeed_value")
const tempValue = document.querySelector(".temp");
const img = document.querySelector(".weather_img img");



btn.addEventListener("click", async ()=>{
    let city = cityName.value.trim();
    if(!city){
        alert("please enter a city name");
        return;
    }
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid="your api key"&units=metric`;

   try{
   let response = await fetch(url);
   if(!response.ok){
    throw new Error(`City not found:${response.statusText}`);
   }
   let data = await response.json();
   updateWeather(data);
   } catch(error){
    console.error("Error fetching weather data", error);
    alert("Could not fetch weather data. Please try again");

   }
});

function updateWeather(data){
   let temp = Math.round(data.main.temp);
   let name = data.name;
   let humi = data.main.humidity;
   let wind = Math.round(data.wind.speed);

   tempValue.innerText = `${temp} °C`;
   cityNameShow.innerText = `${name}`;
   humidity.innerText = `${humi} %`;
   windSpeed.innerText = `${wind} km/h`;

  updateWeatherIcon(data);
};

function updateWeatherIcon(data)  {
    let iconId = data.weather[0].icon;
    if(["01d", "02d", "03d",].includes(iconId)){
        img.src = "/images/sc4.png";
    }else  if([ "04d"].includes(iconId)){
        img.src = "/images/cloud.png";
    }else  if([ "09d"].includes(iconId)){
        img.src = "/images/cloud-rain2.webp";
    }else  if(["10d", "11d"].includes(iconId)){
        img.src = "/images/rain.png";
    }else  if(["13d", "50d"].includes(iconId)){
        img.src = "/images/mist.png";
    }else{
        img.src = "/images/sc4.png"
    }
    

}

