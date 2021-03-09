import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'
import { Vector3 } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

//console.log(gsap);
let pin
let loaded = 0
//loading manager
const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

};

manager.onLoad = function ( ) {

	console.log( 'Loading complete!');
    console.log(scene.getObjectByName('Sphere045'))
    pin = scene.getObjectByName('Sphere045')
    console.log(pin)
    loaded = 1
   // gui.add(pin, 'rotateX').min(-Math.PI).max(Math.PI * 2).step(0.001)
    
   animation()
    


};


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const fbxLoader = new FBXLoader(manager)

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
const floorColorTexture = textureLoader.load('/textures/MarbleTiles/floorColor.jpg')
const floorAOTexture = textureLoader.load('/textures/MarbleTiles/floorAO.jpg')
const floorHeightTexture = textureLoader.load('/textures/MarbleTiles/floorHeight.png')
const floorNormalTexture = textureLoader.load('/textures/MarbleTiles/floorNormal.jpg')
const floorRoughTexture = textureLoader.load('/textures/MarbleTiles/floorRough.jpg')

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

//board Textures

const boardColorTexture = textureLoader.load('/textures/board/boardColor.jpg')
const boardAOTexture = textureLoader.load('/textures/board/boardAO.jpg')
const boardHeightTexture = textureLoader.load('/textures/board/boardHeight.png')
const boardNormalTexture = textureLoader.load('/textures/board/boardNormal.jpg')
const boardRoughTexture = textureLoader.load('/textures/board/boardRough.jpg')

const boardPicElectricTheatre = textureLoader.load('/textures/board/pics/ElectricTheatre.png')
const boardPicLouisAustin = textureLoader.load('/textures/board/pics/LouisAustin.png')
const boardPicWatkins = textureLoader.load('/textures/board/pics/Watkins.png')
const boardPicWatkinsHouse = textureLoader.load('/textures/board/pics/WatkinsHouse.png')
const boardPicWonderlandTheater = textureLoader.load('/textures/board/pics/WonderlandTheater.png')

const boardNoteElectricTheatre = textureLoader.load('/textures/board/notes/ElectricTheatre.jpg')
const boardNoteLouisAustin = textureLoader.load('/textures/board/notes/LouisAustin.jpg')
const boardNoteWatkins = textureLoader.load('/textures/board/notes/Watkins.jpg')
const boardNoteWatkinsHouse = textureLoader.load('/textures/board/notes/WatkinsHouse.jpg')
const boardNoteWonderlandTheater = textureLoader.load('/textures/board/notes/WonderlandTheater.jpg')

const boardNoteElectricTheatreAlpha = textureLoader.load('/textures/board/notes/ElectricTheatreAlphaMap.jpg')
const boardNoteLouisAustinAlpha = textureLoader.load('/textures/board/notes/LouisAustinAlphaMap.jpg')
const boardNoteWatkinsAlpha = textureLoader.load('/textures/board/notes/WatkinsAlphaMap.jpg')
const boardNoteWatkinsHouseAlpha = textureLoader.load('/textures/board/notes/WatkinsHouseAlphaMap.jpg')
const boardNoteWonderlandTheaterAlpha = textureLoader.load('/textures/board/notes/WonderlandTheaterAlphaMap.jpg')

//************Models */



    fbxLoader.load(
            '/models/pin.fbx',
            (object) =>
            {
                const pin1 = object.children[15]
                pin1.scale.set(0.05,0.05,0.05)
                pin1.rotation.y = -1.5
                // pin1.rotation.x = 0.35
                pin1.position.x = boardNoteElectricTheatreMesh.position.x
                pin1.position.y = boardNoteElectricTheatreMesh.position.y
                pin1.position.z = 0.091

                const pin2 = pin1.clone()
                pin2.position.x = boardNoteLouisAustinMesh.position.x
                pin2.position.y = boardNoteLouisAustinMesh.position.y
                pin2.rotation.x = 0.4
                const pin3 = pin1.clone()
                pin3.position.x = boardNoteWatkinsMesh.position.x
                pin3.position.y = boardNoteWatkinsMesh.position.y
                const pin4 = pin1.clone()
                pin4.position.x = boardNoteWatkinsHouseMesh.position.x 
                pin4.position.y = boardNoteWatkinsHouseMesh.position.y 
                pin4.rotation.x = 0.4
                const pin5 = pin1.clone()
                pin5.position.x = boardNoteWonderlandTheaterMesh.position.x 
                pin5.position.y = boardNoteWonderlandTheaterMesh.position.y
                //need to add the pins to the board, rather than the scene
                //but need to reorient the position relative to the board

                board.add(pin1, pin2, pin3, pin4, pin5)

            
                
            
                
            }
        )
            
  
          




// console.log(pin)
    

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
//scene.add(directionalLightCameraHelper)

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
const legMaterial = new THREE.MeshStandardMaterial({ 
    // color: '#ff0000',
    map: legColorTexture,
    normalMap: legNormalTexture,
    roughnessMap: legRoughTexture
})

const legs = new THREE.Mesh(legGeometry, legMaterial)
legs.castShadow = true
legs.position.x = legPositionX
legs.position.y = 0.9
legs.position.z = legPositionz

const legs2 = new THREE.Mesh(legGeometry, legMaterial)
legs2.castShadow = true
legs2.position.x = -legPositionX
legs2.position.y = 0.9
legs2.position.z = -legPositionz

const legs3 = new THREE.Mesh(legGeometry, legMaterial)
legs3.castShadow = true
legs3.position.x = legPositionX
legs3.position.y = 0.9
legs3.position.z = -legPositionz

const legs4 = new THREE.Mesh(legGeometry, legMaterial)
legs4.castShadow = true
legs4.position.x = -legPositionX
legs4.position.y = 0.9
legs4.position.z = legPositionz

table1.add(legs, legs2, legs3, legs4)
table1.rotation.y = Math.PI * 0.5

let tables = []
for (let i=0;i<10;i++){
    tables[i]= new THREE.Group()
    tables[i] = table1.clone()
} 

tables[0].position.z = -4
scene.add(tables[0])

tables[1].position.z = 4
scene.add(tables[1])//

tables[2].position.x = 4
scene.add(tables[2])//

tables[3].position.x = 4
tables[3].position.z = -4
scene.add(tables[3])//

tables[4].position.x = 4
tables[4].position.z = 4
scene.add(tables[4])//

//console.log(tables)

//newspaper
const newsGeometry = new THREE.PlaneGeometry(0.381, 0.578, 2, 2)
const letterGeometry = new THREE.PlaneGeometry(0.215, 0.279, 2, 2) //215.9 by 279.4

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

const meachLetter2 = meachLetter.clone()
const meachNews2 = meachNews.clone()

tables[1].add(meachNews2, meachLetter2)
//tables[2].add(meachNews, meachLetter)
tables[0].add(meachNews, meachLetter)

console.log(tables);

//***************Investigation board */
const board = new THREE.Group()
const boardGeometry = new THREE.PlaneGeometry(1.828, 1.219)
const boardMaterial = new THREE.MeshStandardMaterial({
    map: boardColorTexture,
    aoMap: boardAOTexture,
    //displacementMap: boardHeightTexture,
    normalMap: boardNormalTexture,
    roughnessMap: boardRoughTexture,
    side: THREE.DoubleSide
    
})
const boardItself = new THREE.Mesh(boardGeometry,boardMaterial)

board.add(boardItself)
scene.add(board)

board.position.x = -4
board.position.y = 2
board.position.z = 3


const boardElectricTheatreGeometry = new THREE.PlaneGeometry(0.35 * 1.1486, 0.35 )
const boardLouisAustinGeometry = new THREE.PlaneGeometry(0.35 * 1.054, 0.35 )
const boardWatkinsGeometry = new THREE.PlaneGeometry(0.35 * 1.302, 0.35)
const boardWatkinsHouseGeometry = new THREE.PlaneGeometry(0.35 * 1.42, 0.35)
const boardWonderlandTheaterGeometry = new THREE.PlaneGeometry(0.35 * 1.1438, 0.35)

const boardElectricTheatreMaterial = new THREE.MeshStandardMaterial({
    map: boardPicElectricTheatre
})
const boardLouisAustinMaterial = new THREE.MeshStandardMaterial({
    map: boardPicLouisAustin
})
const boardWatkinsMaterial = new THREE.MeshStandardMaterial({
    map: boardPicWatkins
})
const boardWatkinsHouseMaterial = new THREE.MeshStandardMaterial({
    map: boardPicWatkinsHouse
})
const boardWonderlandTheaterMaterial = new THREE.MeshStandardMaterial({
    map: boardPicWonderlandTheater
})
const boardElectricTheatreMesh = new THREE.Mesh(boardElectricTheatreGeometry, boardElectricTheatreMaterial)
const boardLouisAustinMesh = new THREE.Mesh(boardLouisAustinGeometry, boardLouisAustinMaterial)
const boardWatkinsMesh = new THREE.Mesh(boardWatkinsGeometry, boardWatkinsMaterial)
const boardWatkinsHouseMesh = new THREE.Mesh(boardWatkinsHouseGeometry, boardWatkinsHouseMaterial)
const boardWonderlandTheaterMesh = new THREE.Mesh(boardWonderlandTheaterGeometry, boardWonderlandTheaterMaterial)

board.add(boardElectricTheatreMesh, boardLouisAustinMesh, boardWatkinsMesh,boardWatkinsHouseMesh, boardWonderlandTheaterMesh )

boardElectricTheatreMesh.position.z = 0.001
boardElectricTheatreMesh.position.x = 0.35
boardElectricTheatreMesh.position.y = -0.25
boardLouisAustinMesh.position.z = 0.001
boardLouisAustinMesh.position.x = -0.05
boardLouisAustinMesh.position.y = 0.1
boardWatkinsMesh.position.z = 0.001
boardWatkinsMesh.position.x = -0.5
boardWatkinsMesh.position.y = 0.4
boardWatkinsHouseMesh.position.z = 0.001
boardWatkinsHouseMesh.position.x = -0.3
boardWatkinsHouseMesh.position.y = -0.3
boardWonderlandTheaterMesh.position.z = 0.001
boardWonderlandTheaterMesh.position.x = 0.55
boardWonderlandTheaterMesh.position.y = 0.3

//NOTES
const boardNoteElectricTheatreGeometry = new THREE.PlaneGeometry(0.15, 0.15 )
const boardNoteLouisAustinGeometry = new THREE.PlaneGeometry(0.16 * 1.3, 0.16 )
const boardNoteWatkinsGeometry = new THREE.PlaneGeometry(0.15 * 1.3, 0.15)
const boardNoteWatkinsHouseGeometry = new THREE.PlaneGeometry(0.13 * 1.3, 0.13)
const boardNoteWonderlandTheaterGeometry = new THREE.PlaneGeometry(0.15, 0.15)

const boardNoteElectricTheatreMaterial = new THREE.MeshStandardMaterial({
    map: boardNoteElectricTheatre,
    alphaMap: boardNoteElectricTheatreAlpha,
    transparent: true
})
const boardNoteLouisAustinMaterial = new THREE.MeshStandardMaterial({
    map: boardNoteLouisAustin,
    alphaMap: boardNoteLouisAustinAlpha,
    transparent: true
})
const boardNoteWatkinsMaterial = new THREE.MeshStandardMaterial({
    map: boardNoteWatkins,
    alphaMap: boardNoteWatkinsAlpha,
    transparent: true
})
const boardNoteWatkinsHouseMaterial = new THREE.MeshStandardMaterial({
    map: boardNoteWatkinsHouse,
    alphaMap: boardNoteWatkinsHouseAlpha,
    transparent: true
})
const boardNoteWonderlandTheaterMaterial = new THREE.MeshStandardMaterial({
    map: boardNoteWonderlandTheater,
    alphaMap: boardNoteWonderlandTheaterAlpha,
    transparent: true
})
const boardNoteElectricTheatreMesh = new THREE.Mesh(boardNoteElectricTheatreGeometry, boardNoteElectricTheatreMaterial)
const boardNoteLouisAustinMesh = new THREE.Mesh(boardNoteLouisAustinGeometry, boardNoteLouisAustinMaterial)
const boardNoteWatkinsMesh = new THREE.Mesh(boardNoteWatkinsGeometry, boardNoteWatkinsMaterial)
const boardNoteWatkinsHouseMesh = new THREE.Mesh(boardNoteWatkinsHouseGeometry, boardNoteWatkinsHouseMaterial)
const boardNoteWonderlandTheaterMesh = new THREE.Mesh(boardNoteWonderlandTheaterGeometry, boardNoteWonderlandTheaterMaterial)

board.add(boardNoteElectricTheatreMesh, boardNoteLouisAustinMesh, boardNoteWatkinsMesh,boardNoteWatkinsHouseMesh, boardNoteWonderlandTheaterMesh )

boardNoteElectricTheatreMesh.position.z = 0.002
boardNoteElectricTheatreMesh.position.x = 0.35
boardNoteElectricTheatreMesh.position.y = -0.25
boardNoteLouisAustinMesh.position.z = 0.002
boardNoteLouisAustinMesh.position.x = -0.05
boardNoteLouisAustinMesh.position.y = 0.1
boardNoteWatkinsMesh.position.z = 0.002
boardNoteWatkinsMesh.position.x = -0.5
boardNoteWatkinsMesh.position.y = 0.2
boardNoteWatkinsHouseMesh.position.z = 0.002
boardNoteWatkinsHouseMesh.position.x = -0.35
boardNoteWatkinsHouseMesh.position.y = -0.3
boardNoteWonderlandTheaterMesh.position.z = 0.002
boardNoteWonderlandTheaterMesh.position.x = 0.55
boardNoteWonderlandTheaterMesh.position.y = 0.3


// string

const stringGeometry = new THREE.CylinderGeometry(0.001, 0.001,boardNoteElectricTheatreMesh.position.distanceTo(boardNoteLouisAustinMesh.position), 32 )
const stringMaterial = new THREE.MeshStandardMaterial({ color: '#ff0000' })
const stringMesh = new THREE.Mesh(stringGeometry, stringMaterial)
board.add(stringMesh)
stringMesh.position.z = 0.003
stringMesh.position.x = boardNoteElectricTheatreMesh.position.x
stringMesh.position.y = boardNoteLouisAustinMesh.position.y

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
            
            // gsap.to(camera.position, { duration: 3, x: 0, y: 3, z: -4})
            // // gsap.to(camera.rotation, { duration: 1, x: -1.5707953267504582, y: -1.4537220037501904e-10, z: -0.00014536573950488704})
            // camera.lookAt(tables[0].children[0])
            // camera.updateProjectionMatrix()
            //camera.rotation.set(new THREE.Vector3(-1.57, 0, 0))
            
            //console.log(tables[0].children[0]);
        } else if (currentIntersects.object === board.children[0]){
            console.log(camera)
            

            gsap.to(camera.position, { duration: 1, x: -4, y:2, z:4 })
            
            camera.setRotationFromQuaternion({
                w: 0.9999950499076224,
                x: -0.002454490139654982,
                y: -0.0019686581869151018,
                z: -0.000004832076027356882})
            //gsap.to(camera.rotatation, { duration: 5, y: Math.PI * 0.5})
            //camera.rotation.set(new THREE.Vector3(-4, 2, 0))
                camera.updateProjectionMatrix()


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

const animation = () =>
{
    const elapsedTime = clock.getElapsedTime()

    

    raycaster.setFromCamera(mouse, camera)

    const objectsToTest = [ table1.children[0], new1, tables[0].children[0], board.children[0] ]
    const intersects = raycaster.intersectObjects(objectsToTest)

    // pin.rotation.y +=  0.001
    // console.log(pin.rotation.y)

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
   // controls.update()
  
    // Render
    renderer.render(scene, camera)
    

    // Call tick again on the next frame
    window.requestAnimationFrame(animation)
}
// window.setTimeout(() =>
//         {
            

//             }

//         , 2000)
