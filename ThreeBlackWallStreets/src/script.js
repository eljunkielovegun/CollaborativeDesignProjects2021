import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import * as dat from 'dat.gui'

const params = {
    exposure: 1.0,
    toneMapping: 'ACESFilmic'
};

const toneMappingOptions = {
    None: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
};

const gui = new dat.GUI()
let guiExposure = null

/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)
        console.log(durhamPostcardBW)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)
// const gltfLoader = new GLTFLoader(loadingManager)
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
const textureLoader = new THREE.TextureLoader(loadingManager)

// loading textures:

/**
 * postcard bw
 */
const durhamPostcardBW = textureLoader.load('/postcardBW/durham.png')
const richmondPostcardBW = textureLoader.load('/postcardBW/richmond.png')
const tulsaPostcardBW = textureLoader.load('/postcardBW/tulsa.png')
/**
 * postcard bw
 */
const durhamPostcardColor = textureLoader.load('/postcardColor/durham.jpg')
const richmondPostcardColor = textureLoader.load('/postcardColor/richmond.jpg')
const tulsaPostcardColor = textureLoader.load('/postcardColor/tulsa.jpg')



/**
 * Base
 */
// Debug
const debugObject = {}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

/**
 * City postcards
 */

const postcardGeometry = new THREE.PlaneBufferGeometry(5,3.5,1,1)

const postcardDurhamMaterial = new THREE.MeshStandardMaterial({ 
    map: durhamPostcardBW
})
const postcardDurhamMesh = new THREE.Mesh( postcardGeometry, postcardDurhamMaterial )

const postcardTulsaMaterial = new THREE.MeshStandardMaterial({ 
    map: tulsaPostcardBW
})
const postcardTulsaMesh = new THREE.Mesh( postcardGeometry, postcardTulsaMaterial )

const postcardRichmondMaterial = new THREE.MeshStandardMaterial({ 
    map: richmondPostcardBW
})
const postcardRichmondMesh = new THREE.Mesh( postcardGeometry, postcardRichmondMaterial )

postcardTulsaMesh.position.x = -7
postcardRichmondMesh.position.x = 7

scene.add(postcardDurhamMesh, postcardTulsaMesh, postcardRichmondMesh )


scene.background = new THREE.Color( 0x404040 )
/**
 * 
 * Update all materials
 */
// const updateAllMaterials = () =>
// {
//     scene.traverse((child) =>
//     {
//         if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
//         {
//             // child.material.envMap = environmentMap
//             child.material.envMapIntensity = debugObject.envMapIntensity
//             child.material.needsUpdate = true
//             child.castShadow = true
//             child.receiveShadow = true
//         }
//     })
// }

/**
 * Environment map
 */
// const environmentMap = cubeTextureLoader.load([
//     '/textures/environmentMaps/0/px.png',
//     '/textures/environmentMaps/0/nx.png',
//     '/textures/environmentMaps/0/py.png',
//     '/textures/environmentMaps/0/ny.png',
//     '/textures/environmentMaps/0/pz.png',
//     '/textures/environmentMaps/0/nz.png'
// ])

// environmentMap.encoding = THREE.sRGBEncoding

// scene.background = environmentMap
// scene.environment = environmentMap

// debugObject.envMapIntensity = 5

/**
 * Models
 */
// gltfLoader.load(
//     '/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(2.5, 2.5, 2.5)
//         gltf.scene.rotation.y = Math.PI * 0.5
//         scene.add(gltf.scene)

//         updateAllMaterials()
//     }
// )

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, - 2.25)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const raycaster = new THREE.Raycaster()

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 6)
scene.add(camera)

/**
 * MOUSE
 */
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX/sizes.width * 2 -1
    mouse.y = -(e.clientY/sizes.height * 2 -1)
    
})

window.addEventListener('click', () => {
  
    if(currentIntersects){
       // console.log(currentIntersects);
        if(currentIntersects.object === null){
            
           
        } else if (currentIntersects.object === null) {   
            // gsap.to(camera.position, { duration: 1, x: 0, y:1.85, z:0})
            
        } else if (currentIntersects.object === null){
            
        } else if (currentIntersects.object === null){

        }

    } else {
        // camera.lookAt(new Vector3(0,0,0))
        // camera.position.x = 4
        // camera.position.y = 2
        // camera.position.z = 5
    }
    

})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.LinearToneMapping
renderer.toneMappingExposure = 1.3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

let currentIntersects = null

// gui.add( params, 'toneMapping', Object.keys( toneMappingOptions )).onChange( function () {

//                 updateGUI();

//                 renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
//                 postcardDurhamMesh.material.needsUpdate = true;
//                 renderer.render(scene, camera);

//             } );

//             updateGUI();

//             gui.open();

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    raycaster.setFromCamera(mouse, camera)


    const objectsToTest = [ postcardDurhamMesh, postcardRichmondMesh, postcardTulsaMesh ]
    const intersects = raycaster.intersectObjects(objectsToTest)

    
   
    // for(const thing of objectsToTest){
    //     thing.material.color.set('#ffffff')
    // }
    // for(const intersect of intersects){
    //     intersect.object.material.color.set('#00ff00')
    // }

    if(intersects.length){
            
        if(currentIntersects === null){
            console.log('in');
            postcardDurhamMesh.material.map= durhamPostcardColor
            postcardRichmondMesh.material.map= richmondPostcardColor
            postcardTulsaMesh.material.map= tulsaPostcardColor
        }
        currentIntersects = intersects[0]
       //console.log(intersects.object);
    } else {
        if(currentIntersects){
            console.log('out');
            postcardDurhamMesh.material.map= durhamPostcardBW
            postcardRichmondMesh.material.map= richmondPostcardBW
            postcardTulsaMesh.material.map= tulsaPostcardBW
        }
        currentIntersects = null
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// function updateGUI() {

//     if ( guiExposure !== null ) {
//         gui.remove( guiExposure );
//         guiExposure = null;
//     }
//     if ( params.toneMapping !== 'None' ) {
//         guiExposure = gui.add( params, 'exposure', 0, 2 ).onChange( function () {
//                 renderer.toneMappingExposure = params.exposure;
//                 renderer.render(scene, camera)

//             } );
//     }
// }

tick()