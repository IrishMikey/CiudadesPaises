// import { map } from "./map.js";
import { gameData } from "./questions.js"

const startBtn = document.getElementById("startBtn");
var timer = document.getElementById("timer");
var time = 0;

const countryTemplate = document.getElementById("countryTemplate");
const cityTemplate = document.getElementById("cityTemplate");

const countryContainer = document.getElementById("countriesContainer");
const cityContainer = document.getElementById("citiesContainer");

var selectedCountries = [];

const numCountries = 5;
const numCities = 3;

startBtn.addEventListener("click", (e) => {
    startGame();
    e.target.disabled = true;
})


function timerStart() {
    timer.innerHTML = time++ + "s";
}

function getCountriesCities(data) {

    do {
        var countryNum = Math.floor(Math.random() * numCountries);
        var country = data[countryNum];

        var cityNum = Math.floor(Math.random() * numCities);
        var city = country.cities[cityNum];

        selectedCountries.push({ city, country });

    } while (selectedCountries.length < numCountries);

    console.log(selectedCountries);
}

function createGameElements() {
    selectedCountries.forEach(({city, country}) =>{

        var cityClone = cityTemplate.content.firstElementChild.cloneNode(true);
        cityClone.firstElementChild.textContent = city.name;
        cityClone.setAttribute("data-location", city.location);

        var countryClone = countryTemplate.content.firstElementChild.cloneNode(true);
        countryClone.firstElementChild.textContent = country.name;
        countryClone.setAttribute("data-code", country.code);


        $(city).draggable({
            revert:true
        });

        

        cityContainer.appendChild(cityClone);
        countryContainer.appendChild(countryClone);
    });
}

function startGame() {
    setInterval(timerStart, 1000);
    getCountriesCities(gameData.countries);

    createGameElements();
}
