// import { map } from "./map.js";
import { gameData } from "./questions.js"
import {setMap} from "./map.js"

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

var numOfGames = 0;
var gameDuration = 0;


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
    selectedCountries.forEach(({ city, country }) => {

        var cityClone = cityTemplate.content.firstElementChild.cloneNode(true);

        cityClone.firstElementChild.textContent = city.name;
        cityClone.setAttribute("data-code", country.code);
        cityClone.setAttribute("data-location", city.location);

        var countryClone = countryTemplate.content.cloneNode(true);
        countryClone.firstElementChild.firstElementChild.firstElementChild.textContent = country.name;
        countryClone.firstElementChild.setAttribute("data-code", country.code);

        cityContainer.appendChild(cityClone);
        countryContainer.appendChild(countryClone);
    });

    dragDrop();
}

function dragDrop(){

    $(".cityDiv").draggable({
        revert: true
    });

    $(".countryDropDiv").droppable({

        tolerance: "touch",
        drop: function(e, dropped){
            console.log(dropped.draggable[0]);
            if(dropped.draggable[0].dataset.code == this.dataset.code){
                this.lastChild.previousSibling.style.backgroundColor = "lightgreen"; 
                console.log()
                $(dropped.draggable[0]).draggable({
                    revert: false
                });
                $(dropped.draggable[0]).draggable("destroy",true);
                $(this).droppable("destroy",true);
                var location = dropped.draggable[0].dataset.location.split(",");
                setMap(location);
            }
        }
    });
}


function startGame() {
    setInterval(timerStart, 1000);
    getCountriesCities(gameData.countries);

    createGameElements();
}
