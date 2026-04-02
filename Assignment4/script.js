let map = L.map('map').setView([20,78],4);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
attribution:'Map data © OpenStreetMap'
}).addTo(map);

let marker;

async function getWeather(){

let city=document.getElementById("city").value;

let apiKey="f05843fdf69ae10edd26f1f69811d300";

let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

let response=await fetch(url);
let data=await response.json();

document.getElementById("temp").innerHTML="Temperature: "+data.main.temp+" °C";

document.getElementById("weather").innerHTML="Weather: "+data.weather[0].main;

document.getElementById("humidity").innerHTML="Humidity: "+data.main.humidity+" %";

document.getElementById("wind").innerHTML="Wind Speed: "+data.wind.speed+" km/h";

let lat=data.coord.lat;
let lon=data.coord.lon;

map.setView([lat,lon],10);

if(marker){
map.removeLayer(marker);
}

marker=L.marker([lat,lon]).addTo(map)
.bindPopup(city)
.openPopup();

}