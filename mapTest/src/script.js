import mapboxgl from 'mapbox-gl'
import * as THREE from 'three'
import Papa from 'papaparse'

//console.log(mapboxgl)
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5wYXR0b24xIiwiYSI6ImNrbTZsa3NsdjBwNmoyb3FzYzJidmU3Y2MifQ.Mk2dd2jdoi4Hkij0utyJwg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-95.7, 37.1], // starting position [lng, lat]
    zoom: 4 // starting zoom
});

map.on('load', function () {
    const mapContainer = document.getElementsByClassName("mapboxgl-canvas")
    
    mapContainer[0].style.height = '100vh'
    map.resize()
});
 
// const csv = Papa.parse('./WhiteMobViolence.csv', {
// 	complete: function(results) {
// 		console.log(results.data);
// 	}
// });

fetch('WhiteMobViolence.csv')
.then(response => response.text() )
.then(csvString => {
    console.log(csvString)
    //Split the csv into rows
    //const rows = csvString.split('\n');
    //for (const row of rows) {
    //Split the row into each of the comma separated values
        //console.log(row.split(","));
    }
});



const mapDiv = document.getElementById('map')
mapDiv.style.height = sizes.height
console.log(mapDiv)



//console.log(mapboxgl)
