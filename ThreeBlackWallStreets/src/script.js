import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import * as dat from 'dat.gui'
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js'
import { AdditiveBlending, Texture } from 'three'



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
// const fontLoader = new THREE.FontLoader(loadingManager);

//loading fonts
// const roboto = fontLoader.load('/fonts/Roboto/Light_Regular.json')


// loading textures:

/**
 * postcard bw
 */
const durhamPostcardBW = textureLoader.load('/postcardBW/durham.png')
const richmondPostcardBW = textureLoader.load('/postcardBW/richmond.png')
const tulsaPostcardBW = textureLoader.load('/postcardBW/tulsa.png')
/**
 * postcard color
 */
const durhamPostcardColor = textureLoader.load('/postcardColor/durham.jpg')
const richmondPostcardColor = textureLoader.load('/postcardColor/richmond.jpg')
const tulsaPostcardColor = textureLoader.load('/postcardColor/tulsa.jpg')
/**
 * postcard Back
 */
const durhamPostcardBack = textureLoader.load('/postcardBack/durham.jpg')
const richmondPostcardBack = textureLoader.load('/postcardBack/richmond.jpg')
const tulsaPostcardBack = textureLoader.load('/postcardBack/tulsa.jpg')
/**
 * other postcard back
 */
const postcard1 = textureLoader.load('/postcardBack/1.jpg')
const postcard2 = textureLoader.load('/postcardBack/2.jpg')
const postcard3 = textureLoader.load('/postcardBack/3.jpg')
const postcard4 = textureLoader.load('/postcardBack/4.jpg')

/**
 * paper texture
 */
const paperColor = textureLoader.load('/textures/paper/linen.jpeg')
// const paperDisplacement = textureLoader.load('/textures/paper/DISP.jpg')
// const paperNorm = textureLoader.load('/textures/paper/NORM.jpg')
// const paperOcc = textureLoader.load('/textures/paper/OCC.jpg')
// const paperRough = textureLoader.load('/textures/paper/ROUGH.jpg')


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

const postcardDurhamMaterialFront = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("hsl(2, 100%, 90%)"),
    map: durhamPostcardBW,
    side: THREE.FrontSide
   
    
})
const postcardDurhamMaterialBack = new THREE.MeshStandardMaterial({ 
    map: durhamPostcardBack,
    side: THREE.BackSide
})

const postcardDurhamMaterial = [ postcardDurhamMaterialFront, postcardDurhamMaterialBack ]
var postcardDurhamMesh = new SceneUtils.createMultiMaterialObject( postcardGeometry, postcardDurhamMaterial );

postcardDurhamMesh.children[0].name = 'durhamPostcard'


const postcardTulsaMaterialFront = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("hsl(2, 100%, 90%)"),
    map: tulsaPostcardBW,
    side: THREE.FrontSide
   
    
})
const postcardTulsaMaterialBack = new THREE.MeshStandardMaterial({ 
    
    map: tulsaPostcardBack,
    side: THREE.BackSide
})

const postcardTulsaMaterial = [ postcardTulsaMaterialFront, postcardTulsaMaterialBack ]
var postcardTulsaMesh = new SceneUtils.createMultiMaterialObject( postcardGeometry, postcardTulsaMaterial );

postcardTulsaMesh.children[0].name = 'tulsaPostcard'


const postcardRichmondMaterialFront = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("hsl(2, 100%, 90%)"),
    map: richmondPostcardBW,
    side: THREE.FrontSide
})

const postcardRichmondMaterialBack = new THREE.MeshStandardMaterial({ 
    map: richmondPostcardBack,
    side: THREE.BackSide
})

const postcardRichmondMaterial = [ postcardRichmondMaterialFront, postcardRichmondMaterialBack ]
const postcardRichmondMesh = new SceneUtils.createMultiMaterialObject( postcardGeometry, postcardRichmondMaterial );
postcardRichmondMesh.children[0].name = 'richmondPostcard'

postcardTulsaMesh.position.x = -7
postcardRichmondMesh.position.x = 7

postcardTulsaMesh.castShadow =  true
postcardRichmondMesh.castShadow = true
postcardDurhamMesh.castShadow = true

scene.add( postcardDurhamMesh, postcardTulsaMesh, postcardRichmondMesh )

/**
 * other postcard meshes
 */

 const postcard1Material = new THREE.MeshStandardMaterial({ map: postcard1 })
 const postcard2Material = new THREE.MeshStandardMaterial({ map: postcard2 })
 const postcard3Material = new THREE.MeshStandardMaterial({ map: postcard3 })
 const postcard4Material = new THREE.MeshStandardMaterial({ map: postcard4 })

 const postcard1mesh = new THREE.Mesh( postcardGeometry, postcard1Material )
 const postcard2mesh = new THREE.Mesh( postcardGeometry, postcard2Material )
 const postcard3mesh = new THREE.Mesh( postcardGeometry, postcard3Material )
 const postcard4mesh = new THREE.Mesh( postcardGeometry, postcard4Material )

 postcard1mesh.position.set(-2, -2, -0.1 )
 postcard2mesh.position.set(2, -2, -0.05 )
 postcard3mesh.position.set(0, -2, -0.08 )
 postcard4mesh.position.set(1, -2, -0.03 )

 scene.add( postcard1mesh, postcard2mesh, postcard3mesh, postcard4mesh )

// const backgroundMaterial = new THREE.MeshStandardMaterial({
//     map: paperColor,
//     displacementMap: paperDisplacement,
//     normalMap: paperNorm,
//     aoMap:   paperOcc,
//     roughnessMap: paperRough

// })

scene.background = paperColor
scene.receiveShadow = true

console.log(scene.background)
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
// const directionalLight = new THREE.DirectionalLight('#f0f0f0', 1)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.normalBias = 0.05
// directionalLight.position.set(0.25, 3, 4)
// scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1.8)
 gui.add(ambientLight, 'intensity').min(0).max(5).step(0.001)
scene.add(ambientLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

console.log(sizes.height)

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
camera.position.set(0, 0, 5)
scene.add(camera)

/**
 * MOUSE
 */
const mouse = new THREE.Vector2(0,0)
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX/sizes.width * 2 -1
    mouse.y = -(e.clientY/sizes.height * 2 -1)
    
})

window.addEventListener('click', () => {
  
    if(currentIntersects){
       // console.log(currentIntersects);
        if(currentIntersects.object === postcardDurhamMesh.children[0]){
           
            gsap.to(postcardDurhamMesh.rotation, { duration: 1, y: -Math.PI})
           
        } else if (currentIntersects.object === postcardTulsaMesh.children[0]) {   
            gsap.to(postcardTulsaMesh.rotation, { duration: 1, y: -Math.PI})
            
        } else if (currentIntersects.object === postcardRichmondMesh.children[0]){
            gsap.to(postcardRichmondMesh.rotation, { duration: 1, y: -Math.PI})
        } else if (currentIntersects.object === postcardDurhamMesh.children[1]){
           
            gsap.to(postcardDurhamMesh.rotation, { duration: 1, y: 0})
           
        } else if (currentIntersects.object === postcardTulsaMesh.children[1]) {   
            gsap.to(postcardTulsaMesh.rotation, { duration: 1, y: 0})
            
        } else if (currentIntersects.object === postcardRichmondMesh.children[1]){
            gsap.to(postcardRichmondMesh.rotation, { duration: 1, y: 0})
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
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.88
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMapSoft = true;


let currentIntersects = null
let placeholder = new THREE.Object3D // this is a hack so that the default of the raycaster doesnt start trigered

gui.add( params, 'toneMapping', Object.keys( toneMappingOptions )).onChange( function () {

                updateGUI();

                renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
                postcardDurhamMesh.children[0].material.needsUpdate = true;
            
                postcardRichmondMesh.children[0].material.needsUpdate = true;
                postcardTulsaMesh.children[0].material.needsUpdate = true;
                
                
                renderer.render(scene, camera);

            } );

            updateGUI();

            gui.open();
function updateGUI() {

    if ( guiExposure !== null ) {
        gui.remove( guiExposure );
        guiExposure = null;
    }
    if ( params.toneMapping !== 'None' ) {
        guiExposure = gui.add( params, 'exposure', 0, 2 ).onChange( function () {
                renderer.toneMappingExposure = params.exposure;
                renderer.render(scene, camera)

            } );
    }
}

/**
 * Animate
 */
const tick = () =>
{
    // Update controls
    controls.update()

    raycaster.setFromCamera(mouse, camera)


    const objectsToTest = [ placeholder, postcardDurhamMesh.children[0],postcardDurhamMesh.children[1], postcardRichmondMesh.children[0] , postcardRichmondMesh.children[1], postcardTulsaMesh.children[0], postcardTulsaMesh.children[1] ]
    const intersects = raycaster.intersectObjects(objectsToTest)
    
    
   
    // for(const thing of objectsToTest){
    //     thing.material.color.set('#ffffff')
    // }

    // for(const intersect of intersects){
    //     intersect.object.material.color.set('#00ff00')
    // }
    

    if(intersects.length){
            
        if(currentIntersects === null){
            console.log('in')
            
            

            if(intersects[0].object.name === 'durhamPostcard') {
                postcardDurhamMesh.children[0].material.map = durhamPostcardColor
                gsap.to(postcardTulsaMesh.rotation, { duration: 1, y: 0})
                gsap.to(postcardRichmondMesh.rotation, { duration: 1, y: 0})
              
            } 
           
            if(intersects[0].object.name === 'richmondPostcard') {
                postcardRichmondMesh.children[0].material.map= richmondPostcardColor
                gsap.to(postcardDurhamMesh.rotation, { duration: 1, y: 0})
                gsap.to(postcardTulsaMesh.rotation, { duration: 1, y: 0})
                console.log(intersects[0])
            }
            if(intersects[0].object.name === 'tulsaPostcard') {
                postcardTulsaMesh.children[0].material.map= tulsaPostcardColor
                gsap.to(postcardDurhamMesh.rotation, { duration: 1, y: 0})
                gsap.to(postcardRichmondMesh.rotation, { duration: 1, y: 0})
            }
            
           
        }
        currentIntersects = intersects[0]
        
       //console.log(intersects.object);
    } else {
        if(currentIntersects){
            console.log('out');
            postcardDurhamMesh.children[0].material.map = durhamPostcardBW
            
            postcardRichmondMesh.children[0].material.map= richmondPostcardBW
            postcardTulsaMesh.children[0].material.map= tulsaPostcardBW
        }
        currentIntersects = null
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}



tick()