import { gameData } from "./questions.js";





// Load the Visualization API and the corechart package.
google.charts.load('current', { 'packages': ['corechart'] });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.


var pieOcurrencias;
const pieOptions = {
    'title': 'Paises Ocurrencias',
    'width': 400,
    'height': 300
};
var pieData;
var pieOcurrenciasDatos = [];
gameData.countries.forEach(country => {
    pieOcurrenciasDatos.push({
        "pais": country.name,
        "ocurrencias": 0
    });
});

var lineTiempo;
const lineOptions = {
    'title': 'Tiempos de Partidas',
    curveType: 'function',
    legend: { position: 'bottom' }
};
var lineData;
var lineDatos = [];


function drawChart() {

    // Create the data table.
    pieData = new google.visualization.DataTable();
    pieData.addColumn('string', 'Paises');
    pieData.addColumn('number', 'Ocurrencias');


    // Instantiate and draw our chart, passing in some options.
    pieOcurrencias = new google.visualization.PieChart(document.getElementById('pieChart'));
    pieOcurrencias.draw(pieData, pieOptions);

    lineData = new google.visualization.DataTable();

    lineData.addColumn("number","Intentos");
    lineData.addColumn("number","Tiempo");
    lineData.addRows([[0, 0]]);

    lineTiempo = new google.visualization.LineChart(document.getElementById('timeChart'));
    lineTiempo.draw(lineData, lineOptions);

}

export function createPie(countryCurrent) {
    pieData = new google.visualization.DataTable();

    pieData.addColumn('string', 'paises');
    pieData.addColumn('number', 'occurencias');

    pieOcurrenciasDatos.find(country => {
        if (country.pais == countryCurrent) {
            country.ocurrencias += 1;
        }
        pieData.addRows([[country.pais, country.ocurrencias]]);
    });

    pieOcurrencias.draw(pieData, pieOptions);

}

export function timeChart(rounds, time){
    lineData.addRows([
        [rounds, time]
    ]);
    lineTiempo.draw(lineData, lineOptions);
}