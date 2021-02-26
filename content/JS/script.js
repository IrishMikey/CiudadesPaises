// import { map } from "./map.js";
import { gameData } from "./questions.js"

const startBtn = document.getElementById("startBtn");
var timer = document.getElementById("timer");
var time = 0;
var countryTemplate = document.getElementById("countryTemplate");
var cityTemplate = document.getElementById("cityTemplate");

var selectedCountries = [];
var selectedCities = [];

const numCountries = 5;
const numCities = 3;

startBtn.addEventListener("click", (e) => {
    startGame();
    e.target.disabled = true;
})

function startGame() {
    setInterval(timerStart, 1000);
    getCountriesCities(gameData.countries);
}
function timerStart() {
    timer.innerHTML = time++ + "s";
}

function getCountriesCities(data) {

    do {
        var countryNum = Math.floor(Math.random() * numCountries);
        var country = data[countryNum];

        var cityNum = Math.floor(Math.random() * numCities);
        var city = country.cities[cityNum];

        selectedCountries.push({ country, city });

    } while (selectedCountries.length < countryNum);

    console.log(selectedCountries);
}