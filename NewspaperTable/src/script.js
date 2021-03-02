import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import { Vector3 } from 'three'

/**
 * Base
 */
// Debug
//const gui = new dat.GUI()

//console.log(gsap);
let tables = []
for (let i=0;i<10;i++){
    tables[i]= new THREE.Group()
} 

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
//newpaper textures
const news1Texture = textureLoader.load('/textures/newspaper/3-newspaper.jpg')
const news1Alpha = textureLoader.load('/textures/newspaper/3-newspaperAlpha.jpg')
const news1Height = textureLoader.load('/textures/newspaper/3-newspaperHeight.jpg')


const MeachamNews = textureLoader.load('/textures/newspaper/MeachamNewsMark.jpg')
const MeachamLetter = textureLoader.load('/textures/newspaper/MeachamLetter.jpg')

const news2Texture = textureLoader.load('/textures/newspaper/1-newspaper.jpg')
const news3Texture = textureLoader.load('/textures/newspaper/2-newspaper.jpg')
const news4Texture = textureLoader.load('/textures/newspaper/4-newspaper.jpg')
const news5Texture = textureLoader.load('/textures/newspaper/5-newspaper.jpg')
//tabletop textures
const tableColorTexture = textureLoader.load('/textures/Table/tableColor.jpg')
// const tableAOTexture = textureLoader.load('/textures/Table/tableAO.jpg')
// const tableHeightTexture = textureLoader.load('/textures/Table/tableHeight.png')
const tableNormalTexture = textureLoader.load('/textures/Table/tableNormal.jpg')
const tableRoughTexture = textureLoader.load('/textures/Table/tableRough.jpg')
//leg textures
const legColorTexture = textureLoader.load('/textures/Legs/legsColor.jpg')
// const legAOTexture = textureLoader.load('/textures/Legs/legsAO.jpg')
// const legHeightTexture = textureLoader.load('/textures/Legs/legsHeight.png')
const legNormalTexture = textureLoader.load('/textures/Legs/legsNormal.jpg')
const legRoughTexture = textureLoader.load('/textures/Legs/legsRough.jpg')

//floorTextures
const floorColorTexture = textureLoader.load('/textures/Floor/floorColor.jpg')
const floorAOTexture = textureLoader.load('/textures/Floor/floorAO.jpg')
const floorHeightTexture = textureLoader.load('/textures/Floor/floorHeight.png')
const floorNormalTexture = textureLoader.load('/textures/Floor/floorNormal.jpg')
const floorRoughTexture = textureLoader.load('/textures/Floor/floorRough.jpg')

floorColorTexture.repeat.set(8,8)
floorAOTexture.repeat.set(8,8)
floorHeightTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)
floorRoughTexture.repeat.set(8,8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorAOTexture.wrapS = THREE.RepeatWrapping
floorHeightTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorRoughTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorAOTexture.wrapT = THREE.RepeatWrapping
floorHeightTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorRoughTexture.wrapT = THREE.RepeatWrapping


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.castShadow = true

directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024

directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6

directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = - 2
directionalLight.shadow.camera.left = - 2

directionalLight.position.set(2, 2, - 1)
// gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
// gui.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
// gui.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
// gui.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightCameraHelper.visible = false
scene.add(directionalLightCameraHelper)

// Groups

const table1 = new THREE.Group()
scene.add(table1)
let table2 = new THREE.Group()
let newspapers = new THREE.Group()

/**
 * Objects
 */

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map: floorColorTexture,
        aoMap: floorAOTexture,
        displacementMap: floorHeightTexture,
        normalMap: floorNormalTexture,
        roughnessMap: floorRoughTexture
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5

scene.add(floor)

//tabletop
const tableTop = new THREE.Mesh(
    new THREE.BoxBufferGeometry(1.3,0.1,3),
    new THREE.MeshStandardMaterial({ 
        //color: '#ff0000'
        map: tableColorTexture,
        normalMap: tableNormalTexture,
        roughnessMap: tableRoughTexture,
        name: 'tableTop'
    })
)
tableTop.receiveShadow = true
tableTop.position.y = 1.5
tableTop.castShadow = true

table1.add(tableTop)

const legPositionX = 1.3/2 - 0.2
const legPositionz = 3/2 - 0.2

const legGeometry = new THREE.BoxBufferGeometry(0.1,1.1,0.1)

const legs = new THREE.Mesh(
    legGeometry,
    new THREE.MeshStandardMaterial({ 
        // color: '#ff0000',
        map: legColorTexture,
        normalMap: legNormalTexture,
        roughnessMap: legRoughTexture
    })
)
legs.castShadow = true
legs.position.x = legPositionX
legs.position.y = 0.9
legs.position.z = legPositionz

const legs2 = new THREE.Mesh(
    legGeometry,
    new THREE.MeshStandardMaterial({ 
        // color: '#ff0000',
        map: legColorTexture,
        normalMap: legNormalTexture,
        roughnessMap: legRoughTexture
    })
)
legs2.castShadow = true
legs2.position.x = -legPositionX
legs2.position.y = 0.9
legs2.position.z = -legPositionz

const legs3 = new THREE.Mesh(
    legGeometry,
    new THREE.MeshStandardMaterial({ 
        // color: '#ff0000',
        map: legColorTexture,
        normalMap: legNormalTexture,
        roughnessMap: legRoughTexture
    })
)
legs3.castShadow = true
legs3.position.x = legPositionX
legs3.position.y = 0.9
legs3.position.z = -legPositionz

const legs4 = new THREE.Mesh(
    legGeometry,
    new THREE.MeshStandardMaterial({ 
        // color: '#ff0000',
        map: legColorTexture,
        normalMap: legNormalTexture,
        roughnessMap: legRoughTexture
    })
)
legs4.castShadow = true
legs4.position.x = -legPositionX
legs4.position.y = 0.9
legs4.position.z = legPositionz

table1.add(legs, legs2, legs3, legs4)
table1.rotation.y = Math.PI * 0.5
tables[0] = table1.clone()
tables[0].position.z = -4
scene.add(tables[0])

//newspaper
const newsGeometry = new THREE.PlaneGeometry(.381, .578, 2, 2)
const letterGeometry = new THREE.PlaneGeometry(.215, .279, 2, 2) //215.9 by 279.4

const new1 = new THREE.Mesh(
    newsGeometry,
    new THREE.MeshStandardMaterial({ 
        map: news1Texture,
        name: 'new1',
        transparent: true
    })
)
new1.rotation.x = - Math.PI * 0.5
new1.rotation.z = - Math.PI * 0.5
new1.position.y = 1.551



const new2 = new THREE.Mesh(
    newsGeometry,
    new THREE.MeshStandardMaterial({ 
        map: news2Texture,
        name: 'new2'
  
    })
)
new2.rotation.x = - Math.PI * 0.5
new2.rotation.z = - Math.PI * 0.5
new2.position.y = 1.551
new2.position.z = .5

const new3 = new THREE.Mesh(
    newsGeometry,
    new THREE.MeshStandardMaterial({ 
        map: news3Texture,
        name: 'new3'
    })
)
new3.rotation.x = - Math.PI * 0.5
new3.rotation.z = - Math.PI * 0.5
new3.position.y = 1.551
new3.position.z = -0.5

const new4 = new THREE.Mesh(
    newsGeometry,
    new THREE.MeshStandardMaterial({ 
        map: news4Texture,
        name: 'new4'
    })
)
new4.rotation.x = - Math.PI * 0.5
new4.rotation.z = - Math.PI * 0.5
new4.position.y = 1.551
new4.position.z = -1

const new5 = new THREE.Mesh(
    newsGeometry,
    new THREE.MeshStandardMaterial({ 
        map: news5Texture,
  
    })
)
new5.rotation.x = - Math.PI * 0.5
new5.rotation.z = - Math.PI * 0.5
new5.position.y = 1.551
new5.position.z = 1

newspapers.add(new1, new2, new3, new4, new5)
table1.add(newspapers)

const meachNews = new THREE.Mesh(
    newsGeometry,
    new THREE.MeshStandardMaterial({ 
        map: MeachamNews,
        // name: 'new1',
        // transparent: true
    })
)
meachNews.rotation.x = - Math.PI * 0.5
meachNews.rotation.z = - Math.PI * 0.5
meachNews.position.y = 1.551
meachNews.position.z = 0.5

const meachLetter = new THREE.Mesh(
    letterGeometry,
    new THREE.MeshStandardMaterial({ 
        map: MeachamLetter,
        // name: 'new1',
        // transparent: true
    })
)
meachLetter.rotation.x = - Math.PI * 0.5
meachLetter.rotation.z = - Math.PI * 0.5
meachLetter.position.y = 1.551
meachLetter.position.z = 0

tables[0].add(meachNews, meachLetter)

console.log(meachNews);



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

//mouse
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX/sizes.width * 2 -1
    mouse.y = -(e.clientY/sizes.height * 2 -1)
    
})



window.addEventListener('click', () => {
  
    if(currentIntersects){
       // console.log(currentIntersects);
        if(currentIntersects.object === table1.children[0]){
            
            camera.position.x = 0 
            camera.position.y = 3 
            camera.position.z = 0

            //camera.rotation.set(new THREE.Vector3( -1.58,0,0 ))
            camera.lookAt(table1.children[0].position)
            camera.updateProjectionMatrix()

            console.log(camera)
        } else if (currentIntersects.object === newspapers.children[0]) {   
            gsap.to(camera.position, { duration: 1, x: 0, y:1.85, z:0})
            
        } else if (currentIntersects.object === tables[0].children[0]){
            //camera.rotation.set(new THREE.Vector3( 0,0,0 ))
            
            // gsap.to(camera.position, { duration: 1, x: -0.07395607030251031, y: 3.0000040370923107, z: -4.036922484469257})
            // gsap.to(camera.rotation, { duration: 1, x: -1.5707953267504582, y: -1.4537220037501904e-10, z: -0.00014536573950488704})
            //  camera.lookAt(tables[0].children[0])
            // camera.updateProjectionMatrix()
            //camera.rotation.set(new THREE.Vector3(-1.57, 0, 0))
            
            console.log(tables[0].children[0]);
        } 

    } else {
        // camera.lookAt(new Vector3(0,0,0))
        // camera.position.x = 4
        // camera.position.y = 2
        // camera.position.z = 5
    }
    

})
window.addEventListener('dblclick', () => {
  
    if(currentIntersects){
       // console.log(currentIntersects);
        if(currentIntersects.object === newspapers.children[0]){
            
            new1.material.alphaMap = news1Alpha
            // new1.material.displacementMap = news1Alpha
            // new1.material.displacementScale  = .1
            new1.material.needsUpdate = true
                
          }
    } 
    

})


//console.log('contributions from Dr. Michelle Stefano')
//raycaster
const raycaster = new THREE.Raycaster()



//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersects = null

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [table1.children[0], new1, tables[0].children[0] ]
    const intersects = raycaster.intersectObjects(objectsToTest)

    //console.log(camera);

    // if(intersects){
    //     console.log(intersects);
    // }
   
    // for(const thing of objectsToTest){
    //     thing.material.color.set('#ffffff')
    // }
    // for(const intersect of intersects){
    //     intersect.object.material.color.set('#00ff00')
    // }

    if(intersects.length){
        if(currentIntersects === null){
            console.log('in');
        }
        currentIntersects = intersects[0]
       //console.log(intersects.object);
    } else {
        if(currentIntersects){
            console.log('out');
        }
        currentIntersects = null
    }
    
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()