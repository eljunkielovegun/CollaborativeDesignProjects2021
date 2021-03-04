


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes

const sizes = {
    width: 1000,
    height: 300,
    key: 'just something to demonstrate how to access key value pairs'
}

console.log(sizes.key)

// Scene
const scene = new THREE.Scene()

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshStandardMaterial({
    color: '#ff0000',
    wireframe: true
})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
cubeMesh.rotation.y = Math.PI * 0.25
scene.add(cubeMesh)
console.log(cubeMesh)


const light = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
scene.add( light );
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)
console.log(scene)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)