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

let data =[]

const formData = new FormData()

fetch('WhiteMobViolence.json')
.then(response => response.json() )
.then(result => {
    // console.log('Success:', result);
    data = result
    makeMarkers()
    
  })
.catch((error) => {
    console.error('Error:', error);
  });

//console.log(data)

function makeMarkers() {
    for(let obj in data){
        obj = data[obj]
        
        console.log(obj.Name)
    }
    
}

//console.log(mapboxgl)
