import { gameData } from "./questions.js"
import { setMap } from "./map.js"
import { createPie, timeChart } from "./gcharts.js"
const startBtn = document.getElementById("startBtn");
var timer = document.getElementById("timer");
var time = 0;

const countryTemplate = document.getElementById("countryTemplate");
const cityTemplate = document.getElementById("cityTemplate");

const countryContainer = document.getElementById("countriesContainer");
const cityContainer = document.getElementById("citiesContainer");

var timerStarter;

var selectedCountriesCities = [];
var selectedCountries = [];
var selectedCities = [];

const numCountries = 7;
const numCities = 3;

const numCountriesElements = 5;

var numCorrect = 0;
var numOfGames = 0;
var gameDuration = 0;


startBtn.addEventListener("click", (e) => {
    clearNodes(countryContainer);
    clearNodes(cityContainer);

    time = 0;
    selectedCountriesCities = [];
    e.target.disabled = true;

    startGame();
})


function timerStart() {
    timer.innerHTML = time++ + "s";
}

function getCountriesCities(data) {
    do {
        var addCountry = true;

        var countryNum = Math.floor((Math.random() * numCountries));
        var country = data[countryNum];

        var cityNum = Math.floor((Math.random() * numCities));
        var city = country.cities[cityNum];


        selectedCountriesCities.forEach(entry => {
            if (entry.country.name == country.name) {
                addCountry = false;
            }
        });

        if (addCountry) {
            selectedCountriesCities.push({ city, country });
        }
    } while (selectedCountriesCities.length < numCountriesElements);

}

function createGameElements() {
    selectedCountriesCities.forEach(({ city, country }) => {

        var cityClone = cityTemplate.content.firstElementChild.cloneNode(true);

        cityClone.firstElementChild.textContent = city.name;
        cityClone.setAttribute("data-code", country.code);
        cityClone.setAttribute("data-location", city.location);

        var countryClone = countryTemplate.content.cloneNode(true);
        countryClone.firstElementChild.firstElementChild.firstElementChild.textContent = country.name;
        countryClone.firstElementChild.setAttribute("data-code", country.code);

        selectedCities.push(cityClone);
        selectedCountries.push(countryClone);


    });

    addNodes();
    dragDrop();

}
function addNodes() {
    while (selectedCities.length > 0) {
        var num = Math.floor(Math.random() * selectedCities.length);
        cityContainer.appendChild(selectedCities[num]);
        selectedCities.splice(num, 1);
    }
    while (selectedCountries.length > 0) {
        var num = Math.floor(Math.random() * selectedCountries.length);
        countryContainer.appendChild(selectedCountries[num]);
        selectedCountries.splice(num, 1);
    }
}
function clearNodes(container) {

    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild)
    }

}

function endGame() {
    numOfGames++;

    gameDuration = timer.innerHTML.split("s");
    clearInterval(timerStarter);
    timeChart(numOfGames, parseInt(gameDuration, 10));
    startBtn.disabled = false;
    numCorrect = 0;

}

function dragDrop() {

    $(".cityDiv").draggable({
        revert: true
    });

    $(".countryDropDiv").droppable({

        tolerance: "touch",
        drop: function (e, dropped) {
            if (dropped.draggable[0].dataset.code == this.dataset.code) {
                this.lastChild.previousSibling.style.backgroundColor = "lightgreen";
                $(dropped.draggable[0]).draggable({
                    revert: false
                });

                $(dropped.draggable[0]).draggable("destroy", true);
                $(this).droppable("destroy", true);

                var location = dropped.draggable[0].dataset.location.split(",");
                setMap(location, dropped.draggable[0].textContent);


                createPie(this.innerText);




                numCorrect++;


                if (numCorrect == 5) {
                    endGame();
                }

            }
        }
    });
}


function startGame() {
    timerStarter = setInterval(timerStart, 1000);
    getCountriesCities(gameData.countries);

    createGameElements();
}
