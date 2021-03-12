import mapboxgl from 'mapbox-gl'
import * as THREE from 'three'

//console.log(mapboxgl)

mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW5wYXR0b24xIiwiYSI6ImNrbTZsa3NsdjBwNmoyb3FzYzJidmU3Y2MifQ.Mk2dd2jdoi4Hkij0utyJwg';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
});

console.log(map)
var mapDiv = document.getElementById('map');
console.log(mapDiv)


// const scene = new THREE.Scene()
// scene.add(map)

// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// const cubeMaterial = new THREE.MeshStandardMaterial({
//     color: '#ff0000'
// })
// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
// cubeMesh.rotation.y = Math.PI * 0.25
// scene.add(cubeMesh)

// const light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
// scene.add( light );
// // Camera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 3
// scene.add(camera)
// console.log(scene)

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)