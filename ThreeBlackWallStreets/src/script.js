import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import * as dat from 'dat.gui'
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js'
import { AdditiveBlending, Texture } from 'three'


/**
 * get dom/ html stuff  **************************************************************
 */
let tulsaExperience = false
let durhamExperience = false
let richmondExperience = false
let landingPage = true




const titleText = document.getElementsByClassName("titleText")[0]
 const paulText = document.getElementsByClassName("paulText")[0]
//  console.log(titleText[0])

const menu = document.querySelector('#nav-icon')
const aboutDiv = document.querySelector('.aboutDiv')

const aboutText = document.getElementsByClassName('aboutText')[0]
const paulDiv = document.getElementsByClassName('paulImage')[0]
const kpDiv = document.getElementsByClassName('kpImage')[0]
const designTeamDiv = document.getElementsByClassName('designTeam')[0]
const researchTeamDiv = document.getElementsByClassName('researchTeam')[0]

//experience buttons
const tulsaButton = document.getElementsByClassName('tulsaButton')[0]
const durhamButton = document.getElementsByClassName('durhamButton')[0]
const richmondButton = document.getElementsByClassName('richmondButton')[0]

//buttonBack city

const cityButton = document.querySelector('.cityButton')

//get story div elements 
const storyDiv = document.querySelector('.storyDiv')
const storyTitle = document.querySelector('.storyTitle')
const storyGraphOne = document.querySelector('.storyGraphOne')
const imageDiv = document.querySelector('.imageDiv')
const storyImageDiv = document.querySelector('.storyImageDiv')

const arrowUp = document.getElementsByClassName('arrowUp')[0]
const arrowDown = document.getElementsByClassName('arrowDown')[0]

const audioDiv = document.querySelector('.audioDiv')





const audioOnImage = document.createElement('img')
audioOnImage.src = '/assets/speaker.svg'
audioOnImage.width = 100
audioOnImage.height = 100
// audioDiv.appendChild(audioOnImage)

const audioOffImage = document.createElement('img')
audioOffImage.src = '/assets/speaker-off.svg'
audioOffImage.width = 100
audioOffImage.height = 100
audioDiv.appendChild(audioOffImage)




const kpImage = document.createElement('img')
kpImage.src = '/assets/kevin.jpg'
kpImage.width = 70
kpImage.height = 100
kpDiv.appendChild(kpImage)

const paulImage = document.createElement('img')
paulImage.src = '/assets/paul.jpg'
paulImage.width = 70
paulImage.height = 100
paulDiv.appendChild(paulImage)

// console.log(kpImage)



const designTeamArray = [ "Iman Ibrahim", "Isabelle Bryson", "Jamie Horowitz", "Jing Mu", "Kaitlin Santiago", "Lauren Wedderburn", "Yixuan Chen", "Youran Wu" ]
let designTeamImg = []

for(let i =0; i < designTeamArray.length; i++){
    designTeamImg[i] = document.createElement('img')
    designTeamImg[i].src = '/assets/designTeam/'+ i +'.jpg'
    designTeamImg[i].width = 70
    designTeamImg[i].height = 100
    designTeamDiv.appendChild( designTeamImg[i] )
}

const researchTeamArray = [ "Iman Ibrahim", "Isabelle Bryson", "Jamie Horowitz", "Jing Mu", "Kaitlin Santiago", "Lauren Wedderburn", "Yixuan Chen", "Youran Wu" ]
let researchTeamImg = []

for(let i =0; i < researchTeamArray.length; i++){
    researchTeamImg[i] = document.createElement('img')
    researchTeamImg[i].src = '/assets/researchTeam/'+ i +'.jpg'
    researchTeamImg[i].width = 70
    researchTeamImg[i].height = 100
    researchTeamDiv.appendChild( researchTeamImg[i] )
}

const durhamStoriesArray = []
const tulsaStoriesArray = []// name of folder, number of items/img

//richmond stories stuff
const richmondTitleText = ["Bill 'Bojangles' Robinson", "George O. Brown", "The Hippodrome", "Independent Order of St Luke","John Mitchell Jr.", "Maggie Walker","Miller’s/Eggleston Hotel", "The Richmond Planet", "Sixth Mount Zion Baptist Church", "True Reformers", "William Washington Browne"]
const richmondStoriesArray = [["bbrobinson", 3],["georgeobrownstudio", 2], ["hippodrome", 2], ["independentorderofstlukes",5], ["jmitchell", 2], ["maggiewalker", 4], ["millersegglestonhotel", 3], ["richmondplanet", 3], ["sixmountzionbaptistchurch", 3], ["truereformers", 4], ["wwbrowne", 4]]
const richmondStoriesTextArray = [["Born in Richmond, VA,  Bill Robinson, nicknamed Bojangles was an American tap dancer, actor, and singer who performed for audiences in the 1920s and '30s. He was the best known and the most highly paid Black American entertainer in America during the first half of the 20th century.", "Modern day monument for Bill 'Bojangles' Robinson, the pioneer tap dancer and occasional singer who performed for audiences in the 1920s and '30s.", "Bill Robinson, byname Bojangles, original name Luther Robinson, (born May 25, 1878, Richmond, Virginia, U.S.—died November 25, 1949, New York, New York). According to dance critic Marshall Stearns, 'Robinson's contribution to tap dance is exact and specific. He brought it up on its toes, dancing upright and swinging', adding a 'hitherto-unknown lightness and presence'"],["George O. Brown was born in 1852 in Orange County, Virginia to a family that was believed to be enslaved. Sometime after the Civil War, his family moved to Richmond and in 1872 got a job working at a photo studio.", "By 1899, he opened his own studio called Old Dominion Gallery. As his two children got older, they joined the family business and the name evovled to Browns Photo Studio. Their slogan was 'Makers of Portraits That Please.' The studio became prolific in documenting Jackson Ward in the early 20th century, providing a visual archive of what was known as the 'Harlem of the South'. Brown's studio photographed studio portraits, schools, events, fratnernal organizations, etc. Brown's daughter, Bessie Gwendola Brown, operated the studio until 1969. "], [" In the heart of Jackson Ward was the Deuce on 2nd Street, the home of the Hippodrome Theater. Originally in 1914, it was built as a vaudeville and movie theater for 1,050 people. It is located in the Jackson Ward district and attracted a mainly African-American audience. An entertainment mecca, the Deuce saw such people as Cab Calloway, Duke Ellington, Ella Fitzgerald and native Richmonder Bill 'Bojangles' Robinson grace its sidewalks and its clubs.", "The Hippodrome Theater was opened in 1914 by Charles A. Somma as a vaudeville and movie theater. The theater played a major role in the entertainment of Richmond's African-American community during the early 20th century. The Hippodrome Theater was a stop on the Chitlin' Circuit of places considered safe and acceptable for African American entertainers in the era of racial segregation in the United States.", " The Hippodrome is located on Second Street in Richmond, which was once known as The Deuce. The Deuce was a famous center of black commerce in Richmond and the street was lined with stores, restaurants, banks, and theaters. Essentially, The Deuce was the esteemed location in Richmond for black nightlife and The Hippodrome Theater was one of The Deuce's leading attractions from the 1920s to the 1940s. During this period, Richmond's African-American community was heavily influenced by New York City's Harlem Renaissance and the theater attracted big performers who were prominent in the cultural movement's performance scene"], ["'A trip to Richmond and a failure to visit the St. Luke Hall...would be like going to Washington D.C...and not seeing the Capitol.' - Washington Bee, June 27, 1914. In 1867, former slave Mary Prout, founded the Independent Order of St. Luke in Baltimore as a burial society and organization to tend to the elderly. The Richmond chapter was established in 1869 when members of the United Order of the True Reformers split off to establish another local organization. IOSL membership dwindled with William M.T. Forrester as the leader. The organization was headed towards collapse in 1899 when Maggie L. Walker took over. ", "Walker made it a priority to increase membership and bring in money to reinvest in financially supporting the African-American community both locally and nationally. In 1902 a printing department was established and thus the IOSL’s publication, the St. Luke Herald, was created in order to spread the word nationally about the organization. ", "In 1903, the St. Luke Penny Savings Bank was opened, making Maggie Walker the first women of any race to own a bank. She said of it's creation: “Let us put our moneys together; let us use our moneys; let us put our money out at usury among ourselves, and reap the benefit ourselves … Let us have a bank that will take the nickels and turn them into dollars.” In 1905 the St. Luke Emporium was opened. ","Since its creation, women had always played an important role in the operation of the IOSL. Walker prioritized hiring women to work in the national headquarters as she wanted to help meet the needs of working class black women. In fact, over half of the national advisory council was made up of women. ","In 1910, the Commonwealth of Virginia mandated that fraternal organizations and financial institutions had to be seperate from one another. This meant the Penny Savings Bank had to become independent of the IOSL. In 1930 greater competition with other black owned banks led the St. Luke bank to merge with Second Street Savings Bank and later the Commercial Bank and Trust to form the Consolidated Bank. In 2005, Abigail Adams purchased Consolidated Bank ending it's historic run as the oldest continuously black owned bank. In 2009 it merged with Premier Bank and continues to operate today at the corner of 1st and Marshall Streets in Jackson Ward. "],["John Mitchell, Jr. was born a slave in Richmond, Virginia in 1863, shortly before the end of the American Civil War and of slavery. ", "Mitchell served as editor of the Richmond Planet, an African American newspaper. He used the Planet to promote civil rights, racial justice, and racial pride. As an editor and an activist, he became a key figure in the antilynching movement and played an instrumental role in organizing the Richmond streetcar boycott of 1904."], ["Maggie Lena Walker was born Maggie Draper in Richmond, Virginia in 1864 to a mother who was a former slave. When she was 14 she began working at the Independent Order of St. Luke where she would eventually take over as President, significantly growing the membership and financial assets of the organization.", "In 1965, she left her teaching career and became grant matron of the Juvenile Branch of IOSL. Walker encouraged confidence and a sense of community to it's young members while also stressing the importance of education and service, particualrly for young black women. ", "In 1903 Walker became the first woman in the US, regardless of race, to charter a bank when she opened the St. Luke Penny Savings Bank as a part of the IOSL. Walker stated, 'Let us put our moneys together; let us use our moneys; let us put our money out at usury among ourselves, and reap the benefit ourselves … Let us have a bank that will take the nickels and turn them into dollars.'", "Maggie Walker's accomplishments went beyond her success with the IOSL. An avid civil rights advocate, she was cofounder of the Richmond National Association for the Advancement of Colored People chapter and the Council of Colored Women. She was also a leader in the anti-lynching movement. "], ["Miller’s/Eggleston hotel became a travel destination for black people from all over the country and a favorite stop-off of the stars. For decades, the Miller's/Eggleston Hotel was one of only three hotels in the city that permitted black guests. Its restaurant became a popular dining and gathering place.", "The hotel was built in 1904 by William “Buck” Miller and initially known as Miller’s Hotel. Neverett Eggleston Sr. bought it in the late 1930s and owned it until it was demolished in 2009 to make way for new development. The hotel was one of a handful in Richmond to offer African-Americans accommodations, a rarity in the segregated South.","Miller’s/Eggleston Hotel, the former Jackson Ward hotel that once welcomed such noted celebrities as Louis Armstrong, Count Basie and Redd Foxx is being honored with a state historical marker in Richmond."], ["Richmond Planet was an African-American owned and operated newspaper in Richmond Virginia, founded in 1882. It was founded by 13 former slaves in Richmond, with the first editor Edwin Archer Randolph, then John Mitchell Jr.  Edwin Archer Randolph was the first African-American graduate from Yale Law School, and John Mitchell was the editor for 45 years until his death in 1929. ","Richmond Plant reached a weekly circulation of 4200 and it had a reputation in the African-American community with the local, national and international news it covers. The Planet covers news especially with a focus on topics including segregation, voting rights, lynching, and depredation of the KKK. ", "The Planet continued after Mitchell's death in 1929 and merged with the Afro-Amerian in 1938. The Afro-American/Planet continued to report and ceased publication in 1996, as 'the longest running weekly Black newspaper in American' ended its legacy."], ["In 1867, Reverend John Jasper formed the Sixth Mount Zion Baptist Church in Richmond, Virginia. Two years later, the congregation moved to its current location on Duval Street in Jackson Ward. It is credited for being the first church in Richmond to be organized by a Black preacher.", "Though John Jasper passed away in 1901, the Sixth Mount Zion Baptist Church continued to grow. In 1925 the church was renovated and enlarged by black architect, Charles T. Russell. In the 1950's planners had designed the construction of Interstate 95 to cut through the Jackson Ward neighborhood which would require the demolition of the church as well as 700 homes. Rev. A.W. Brown rallied local organizations and universities to support the church's fight in demanding the interstate be built around them. In 1957, the Sixth Mount Zion Church was victorious as the building was spared in the construction. ", "I-95 significantly disrupted the Jackson Ward neighborhood by cutting it in half. After it's construction, the Sixth Mount Zion church congregation was reduced to only 125 people. In 2005, when Rev. Tyrone E. Nelson became pastor, he invigorated the community. Today, the congregation sits at just under 1000 members and remains a symbol of resilience in the community. "],["The Grand United Order of True Reformers was a national American American fraternal organization that began in 1873 in Alabama and Kentucky. It was managed by the all-white pro-temperance organization which was called the Independent Order of Good Templars. When William Washington Browne tried to apply for a membership at the Good Templar, he was denied because of his race. However, they agreed to form a separate charter under the name Grand United Order of Ture Reformers as an all-black affiliated group. ","In 1874 WW Browne quit his teaching job and focused on the United Order of True Reformers. Browne founded fifty local chapters, which met the requirements of the Good Templar for a state organization. He expanded and looked to the Colored Methodist Episcopal Church Conference of Alabama and was licensed to preach, and they ordained Browne in August 1876. In the same year, the Good Templars of Virginia invited Browne to start a new branch in Richmond. ","The plan to start the Reformers in Richmond was a challenge and Browne returned to Alabama shortly after to transform his society into a business organization, which include a bank and an insurance company. He moved back to Richmond and continued to work on the True Reformers. In 1881, Browne founded enough local chapters to form a “Grand Fountain”, and this sets the foundation for the largest and most successful black business enterprise in the United States between 1881 and 1910.", "With the help of Giles B Jackson, a member of the order, the Saving’s Bank of the Grand Fountain of the United Order of True Reformers was established on March 2, 1888. In 1889, the Bank became the first black-owned, black-operated financial institution in the country. In 1893, the True Reformers started a bi-monthly newspaper, the Reformer, which had a circulation of 8000 within a decade. William Washington Browne’s business was a model for other organizations, including Maggie’ Lena Walker’s Independent Order of Saint Luke."], ["William Washington Browne was born as a slave on October 20, 1849 in Habersham County Georgia to both of his slave parents Joseph Browne and Mariah Browne. He joined the Union army during Civil War after escaping from his owner, and became a teacher after discharging from the service. ","In January 1881, William Washington Browne founded the Grand Fountain in Richmond, Virginia. As the founder and the leader, Browne worked on helping the African American communities and the neighborhood to live independently from the white community and white-owned businesses. He believed in the thriving of the post-Civil War African American community. With the Grand Fountain, he established an insurance company that provides health care for sick people, as well as for land and property to encourage purchasing and investment.", "In 1888, the order received a state charter for a nation’s first black-owned and black-operated bank, which is the True Reformer’s bank. In May 1891, the Reformers moved to a building that houses all of the operations of the True Reformer’s order. The building contained a bank, a concert hall, a few offices, three stores, and four large meeting rooms. It was the largest black-owned building in Richmond that was also built by all African Americans.","The True Reformer’s bank was the only bank in Richmond that was able to survive and have continued business during the 1893 economic depression. W.W. Browne died in 1897, and the True Reformers band continued to prosper until the bank failed in 1910."]]


/**
 * **************** THIS FUNCTION IS TO LOAD THE STORIES AND FILL THE SOTRYDIV************************
 */

function storyDivLoader(city, i){
    let storiesArray = null
    let titleText = null
    let storiesTextArray = null

    // storyDiv.style.display = "block"

    if (city == 'richmond'){
        storiesArray = richmondStoriesArray
        titleText = richmondTitleText
        storiesTextArray = richmondStoriesTextArray
    } else if (city == 'tulsa'){

    }else if (city == 'durham'){

    }

    if (imageDiv.hasChildNodes()){
        imageDiv.removeChild(imageDiv.childNodes[0])
    }

let staticImage = document.createElement('img')
staticImage.src = '/stories/' + city + '/'+storiesArray[i][0]+'/1.jpg'
staticImage.height = 250
imageDiv.appendChild(staticImage)
imageDiv.style.opacity =1


//setting the text
storyTitle.innerHTML = titleText[i]
storyGraphOne.innerHTML = storiesTextArray[i][0]

if (storyImageDiv.hasChildNodes()){
    storyImageDiv.removeChild(storyImageDiv.childNodes[0])
}

let firstStoryImage = document.createElement('img')
firstStoryImage.src = '/stories/' + city + '/'+storiesArray[i][0]+'/1.jpg'
firstStoryImage.height = 300
firstStoryImage.style.right = "0"
storyImageDiv.appendChild(firstStoryImage)
storyImageDiv.style.opacity =1


let storyInnerIndex = 0
arrowDown.onclick = () => {
    storyImageDiv.style.opacity ="0"
    firstStoryImage.style.opacity ="0"
    storyInnerIndex++
    storyInnerIndex = storyInnerIndex%storiesArray[i][1]
   storyGraphOne.innerHTML = storiesTextArray[i][storyInnerIndex]
   firstStoryImage.src = '/stories/' + city + '/'+storiesArray[i][0]+'/' + (storyInnerIndex+1) +'.jpg'
   storyImageDiv.style.opacity ="1"
   firstStoryImage.style.opacity ="1"
  // console.log(i)
}
arrowUp.onclick = () => {
    storyImageDiv.style.opacity =0
    firstStoryImage.style.opacity =0
    storyInnerIndex--
   
      if(storyInnerIndex < 0){ storyInnerIndex = 0}
      storyInnerIndex = Math.abs(-storyInnerIndex%storiesArray[i][1])
   storyGraphOne.innerHTML = storiesTextArray[i][storyInnerIndex]
   firstStoryImage.src = '/stories/' + city + '/'+storiesArray[i][0]+'/' + (storyInnerIndex+1) +'.jpg'
   storyImageDiv.style.opacity =1
   firstStoryImage.style.opacity =1
}

}
/**
 *   **************** MANAGING ALL THE DIV ELEMENTS CLICK FUNCTIONS ************************
 */


/**
 * menu animation
 */
menu.onclick = () => {
    menu.classList.toggle('open')
    aboutDiv.classList.toggle('open')
    
}

storyGraphOne.onclick = () => {
    storyDiv.style.opacity = "0"
}

let storyImageLarge = false
storyImageDiv.onclick = () => {
    storyImageDiv.classList.toggle('open')
    window.setTimeout(() => {storyImageLarge = !storyImageLarge}, 50) //because dom level events fire before the js ones....
   
}

let audioOn = false
audioDiv.onclick = () => {
    
    audioOn = !audioOn
    if (audioDiv.hasChildNodes()){
        audioDiv.removeChild(audioDiv.childNodes[0])
    }
    

    if (audioOn == true) {
        audioDiv.appendChild(audioOnImage)
        landingPageSound.play();
        landingPageSound.setVolume(0.8)
        
    }
    if (audioOn == false) {
        audioDiv.appendChild(audioOffImage)
        landingPageSound.setVolume(0.0)
      
        
}


}

/**
 * ************************* CITY BUTTONS TO EXPERIENCE **********************************
 */
 let orbPositionsX = []
 let orbPositionsZ = []

tulsaButton.onclick = () => {
    tulsaExperience = true
    landingPage = false
    tulsaButton.style.opacity = 0.0
}
durhamButton.onclick = () => {
    durhamExperience = true
    landingPage = false
    durhamButton.style.visibility = "hidden"
}
richmondButton.onclick = () => {
    richmondExperience = true
    landingPage = false
    richmondButton.style.visibility = "hidden"

   gsap.to(camera.rotation, { duration: 2,  y: Math.PI * 0.5 })
   gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})

   // ******************* ADDING MESHES TO THE SCENE ****************
   orbPositionsX = []
   orbPositionsZ = []
    for (let i = 0; i < richmondOrbMeshes.length; i++){
        scene.add(richmondOrbMeshes[i])
        
        richmondOrbMeshes[i].position.x = (60/richmondOrbMeshes.length)*i-30
        let zCircleFactor = richmondOrbMeshes.length
        zCircleFactor -= i
        zCircleFactor = Math.abs(zCircleFactor - i) * 0.9
        console.log(zCircleFactor)
        console.log(i)
        if (i%2!=0)  {
            richmondOrbMeshes[i].position.z = -15 + zCircleFactor
        } else {
            richmondOrbMeshes[i].position.z = 15 - zCircleFactor
        }

        orbPositionsX.push(richmondOrbMeshes[i].position.x)
        orbPositionsZ.push(richmondOrbMeshes[i].position.z)
        
        
    }
     console.log(orbPositionsX)
   
 
    objectsToTest = []
     for (let i = 0; i <richmondOrbMeshes.length; i++){
        objectsToTest.push(richmondOrbMeshes[i])
        
    }

    if (cityButton.hasChildNodes()){
        cityButton.removeChild(cityButton.childNodes[0])
    }
    const richmondButtonImage = document.createElement('img')
        richmondButtonImage.src = '/assets/richmondButton.png'
        richmondButtonImage.width = 110
        richmondButtonImage.height = 80
        cityButton.appendChild(richmondButtonImage)
    
    cityButton.style.visibility = "visible"

    

    scene.remove( landingPageGroup )
    controls.enabled = true
    menu.style.visibility = "hidden"
   

}

cityButton.onclick = () => {
    richmondExperience = false
    durhamExperience = false
    tulsaExperience = false
    landingPage = true

    storyDiv.style.visibility = "hidden"

    scene.add( landingPageGroup )
    for (let i = 0; i < richmondOrbMeshes.length; i++){
        scene.remove(richmondOrbMeshes[i])
    }
    //need to remove for tulsa and durham

    objectsToTest = []
    objectsToTest = [ placeholder, postcardDurhamMesh.children[0],postcardDurhamMesh.children[1], postcardRichmondMesh.children[0] , postcardRichmondMesh.children[1], postcardTulsaMesh.children[0], postcardTulsaMesh.children[1] ]

    gsap.to(camera.rotation, { duration: 0,  y: 0 })
    gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})

    controls.enabled = false
    cityButton.style.visibility = "hidden"

    gsap.to(postcardRichmondMesh.rotation, { duration: 2, y: 0, z: 0.399})
    gsap.to(postcardRichmondMesh.position, { duration: 2, z: -0.01})

    titleText.style.visibility = "visible"
    paulText.style.visibility = "visible"
    menu.style.visibility = "visible"


}


/**
 * Loaders ***********************************************************************
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
const audioLoader = new THREE.AudioLoader(loadingManager);





// loading postcard textures**********************************

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
const paperColor = textureLoader.load('/textures/paper/COLOR.jpg')
const paperDisplacement = textureLoader.load('/textures/paper/DISP.jpg')
const paperNorm = textureLoader.load('/textures/paper/NORM.jpg')
const paperOcc = textureLoader.load('/textures/paper/OCC.jpg')
const paperRough = textureLoader.load('/textures/paper/ROUGH.jpg')

/**
 *  loading pictures for orbs
 */

 
const maggieWalker = textureLoader.load('/stories/richmond/maggiewalker/2.jpg')
// '/stories/richmond/'+richmondStoriesArray[5][0]+'/1.jpg'
// 


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
 * City postcards geometry, materials and meshes LANDING PAGE***********************************************************
 */
const landingPageGroup = new THREE.Group()
/**
 * backgroundplane
 */

 const backgroundPlaneGeometry = new THREE.PlaneBufferGeometry(20,20,1,1)
 const backgroundMaterial = new THREE.MeshStandardMaterial({
            map: paperColor,
            normalMap: paperNorm,
            displacementMap: paperDisplacement,
            aoMap: paperOcc,
            roughnessMap: paperRough,
            transparent: true,
            opacity: 1.0

})
const backgroundMesh = new THREE.Mesh(backgroundPlaneGeometry, backgroundMaterial)
// landingPageGroup.add(backgroundMesh)
landingPageGroup.add(backgroundMesh)
backgroundMesh.position.set(0,0, -1.5)

const postcardWidth = 4
const postcardHeight = postcardWidth * 0.6363
const postcardGeometry = new THREE.PlaneBufferGeometry(postcardWidth,postcardHeight,1,1)

/**
 * DURHAM POSTCARD *********************
 */

const postcardDurhamMaterialFront = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("hsl(2, 100%, 90%)"),
    map: durhamPostcardBW,
    side: THREE.FrontSide,
    // transparent: true,
    // opacity: 1.0
   
})
const postcardDurhamMaterialBack = new THREE.MeshStandardMaterial({ 
    map: durhamPostcardBack,
    side: THREE.BackSide,
    // transparent: true,
    // opacity: 1.0
})

const postcardDurhamMaterial = [ postcardDurhamMaterialFront, postcardDurhamMaterialBack ]
var postcardDurhamMesh = new SceneUtils.createMultiMaterialObject( postcardGeometry, postcardDurhamMaterial );

postcardDurhamMesh.children[0].name = 'durhamPostcard'

/**
 * TULS POSTCARD *********************
 */

const postcardTulsaMaterialFront = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("hsl(2, 100%, 90%)"),
    map: tulsaPostcardBW,
    side: THREE.FrontSide,
    // transparent: true
})
const postcardTulsaMaterialBack = new THREE.MeshStandardMaterial({ 
    map: tulsaPostcardBack,
    side: THREE.BackSide,
    // transparent: true
})

const postcardTulsaMaterial = [ postcardTulsaMaterialFront, postcardTulsaMaterialBack ]
var postcardTulsaMesh = new SceneUtils.createMultiMaterialObject( postcardGeometry, postcardTulsaMaterial );

postcardTulsaMesh.children[0].name = 'tulsaPostcard'
/**
 * RICHMOND POSTCARD *********************
 */

const postcardRichmondMaterialFront = new THREE.MeshStandardMaterial({ 
    color: new THREE.Color("hsl(2, 100%, 90%)"),
    map: richmondPostcardBW,
    side: THREE.FrontSide,
    // transparent: true
})

const postcardRichmondMaterialBack = new THREE.MeshStandardMaterial({ 
    map: richmondPostcardBack,
    side: THREE.BackSide,
    // transparent: true
})

const postcardRichmondMaterial = [ postcardRichmondMaterialFront, postcardRichmondMaterialBack ]
const postcardRichmondMesh = new SceneUtils.createMultiMaterialObject( postcardGeometry, postcardRichmondMaterial );
postcardRichmondMesh.children[0].name = 'richmondPostcard'

landingPageGroup.add( postcardDurhamMesh, postcardTulsaMesh, postcardRichmondMesh )

/**
 * other postcard meshes ***********************************
 */

 const postcard1Material = new THREE.MeshStandardMaterial({ map: postcard1, transparent: true })
 const postcard2Material = new THREE.MeshStandardMaterial({ map: postcard2, transparent: true })
 const postcard3Material = new THREE.MeshStandardMaterial({ map: postcard3, transparent: true })
 const postcard4Material = new THREE.MeshStandardMaterial({ map: postcard4, transparent: true })

 const postcard1mesh = new THREE.Mesh( postcardGeometry, postcard1Material )
 const postcard2mesh = new THREE.Mesh( postcardGeometry, postcard2Material )
 const postcard3mesh = new THREE.Mesh( postcardGeometry, postcard3Material )
 const postcard4mesh = new THREE.Mesh( postcardGeometry, postcard4Material )

//  landingPageGroup.add( postcard1mesh, postcard2mesh, postcard3mesh, postcard4mesh )
landingPageGroup.add( postcard1mesh, postcard2mesh, postcard3mesh, postcard4mesh )

scene.add(landingPageGroup)

 let landingMaterialArray =  [postcardRichmondMaterialFront, postcardRichmondMaterialBack, postcardTulsaMaterialFront, postcardTulsaMaterialBack , postcardDurhamMaterialFront, postcardDurhamMaterialBack, postcard1Material, postcard2Material, postcard3Material, postcard4Material]
 /**
 * postcard positions ***********************
 */

postcardDurhamMesh.position.set(3.542,0.182,0.02)
postcardTulsaMesh.position.set(0,-1,0)
postcardRichmondMesh.position.set(-3.18,0.3,-0.02)

postcardDurhamMesh.rotation.z = -0.035
postcardTulsaMesh.rotation.z = 0.182
postcardRichmondMesh.rotation.z = 0.399

// gui.add(postcardDurhamMesh.position, 'x').min(-5).max(5).step(0.001).name("postcardDurhamMesh.position.x")

postcard1mesh.position.set(-4.045, -2, -0.21 )
postcard2mesh.position.set(3.759, -1.01, -0.205 )
postcard3mesh.position.set(-0.902, -1.986, -0.208 )
postcard4mesh.position.set(4.517, -2.5, -0.203 )

postcard1mesh.rotation.z = -0.577
postcard2mesh.rotation.z = 0.182
postcard3mesh.rotation.z = 0.074
postcard4mesh.rotation.z = -0.36

postcardTulsaMesh.children[1].castShadow =  true
postcardRichmondMesh.children[1].castShadow = true
postcardDurhamMesh.children[1].castShadow = true

// postcardTulsaMesh.children[0].receiveShadow =  true
// postcardRichmondMesh.children[0].receiveShadow = true
// postcardDurhamMesh.children[0].receiveShadow = true

postcard1mesh.receiveShadow =  true
postcard2mesh.receiveShadow =  true
postcard3mesh.receiveShadow =  true
postcard4mesh.receiveShadow =  true

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap
scene.receiveShadow = true

debugObject.envMapIntensity = 5

/**
 *  ORB ORJECT GEOMETRY AND MATERIALS AND MESH
 */


 let richmondOrbTextures = []
 let richmondOrbMaterials = []
 let richmondOrbMeshes = []
 const orbGeometry = new THREE.SphereGeometry(3, 32, 32 )
 for(let i = 0; i < richmondStoriesArray.length; i++){
     richmondOrbTextures[i] = textureLoader.load('/stories/richmond/'+richmondStoriesArray[i][0]+'/2.jpg')
     richmondOrbMaterials[i] = new THREE.MeshStandardMaterial( { map: richmondOrbTextures[i] } )
     richmondOrbMeshes[i] = new THREE.Mesh( orbGeometry, richmondOrbMaterials[i] )
     richmondOrbMeshes[i].name = richmondStoriesArray[i][0]
 }




// for(let i = 0; i < richmondStoriesArray.length; i++){
//     richmondOrbMaterials[i] = new THREE.MeshStandardMaterial( { map: richmondOrbTextures[i] } )

// }


// for(let i = 0; i < richmondStoriesArray.length; i++){
//     richmondOrbMeshes[i] = new THREE.Mesh( orbGeometry, richmondOrbMaterials[i] )
// }
// richmondOrbMaterials = new THREE.MeshStandardMaterial( { map: richmondOrbTextures[5] } )

// sphere.position.set(-18.5, 0, 8)
// sphere.rotation.set(0, 0.25, -0.26)
// gui.add(sphere.position, 'x').min(-25).max(25).step(0.001).name("spherePOS.x")
// gui.add(sphere.position, 'y').min(-5).max(5).step(0.001).name("spherePOS.y")
// gui.add(sphere.position, 'z').min(-10).max(10).step(0.001).name("spherePOS.z")
// gui.add(sphere.rotation, 'x').min(-3.14).max(3.14).step(0.001).name("spherePOS.x")
// gui.add(sphere.rotation, 'y').min(-3.14).max(3.14).step(0.001).name("spherePOS.y")
// gui.add(sphere.rotation, 'z').min(-3.14).max(3.14).step(0.001).name("spherePOS.z")
/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#f0f0f0', 2)
directionalLight.castShadow = true
directionalLight.shadow.camera.far = 15
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(6, 3.18, 2)
scene.add(directionalLight)



const ambientLight = new THREE.AmbientLight(0xffffff, 1)

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
camera.position.set(0, 0, 3.867)
scene.add(camera)

// gui.add(camera.position, 'x').min(-5).max(5).step(0.001).name("camPOS.x")
// gui.add(camera.position, 'y').min(-5).max(5).step(0.001).name("camPOS.y")
// gui.add(camera.position, 'z').min(-5).max(5).step(0.001).name("camPOS.z")
// gui.add(camera.rotation, 'x').min(-5).max(5).step(0.001).name("camROT.x")
// gui.add(camera.rotation, 'y').min(-5).max(5).step(0.001).name("camROT.y")
// gui.add(camera.rotation, 'z').min(-5).max(5).step(0.001).name("camROT.z")


// *********************** loading AUDIO FILES

const audioListener = new THREE.AudioListener();
camera.add( audioListener );
const landingPageSound = new THREE.Audio( audioListener );
scene.add(landingPageSound)

audioLoader.load( '/audio/landingPage.ogg', ( audioBuffer ) => {landingPageSound.setBuffer( audioBuffer ) ;   landingPageSound.setLoop(true) })

//landingPageSound.play()

/**
 * MOUSE
 */
const mouse = new THREE.Vector2(0,0)
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX/sizes.width * 2 -1
    mouse.y = -(e.clientY/sizes.height * 2 -1)
    
})

let currentObject = null //variable to set to see if we are clicking the same object
let clickFlag = 0 // to keep track of the clicks
window.addEventListener('click', () => {
  
    if(currentIntersects){
       
/**
 * *************************** LANDING PAGE OBJECTS TO TEST *********************************************
 */
        if(landingPage) {
            if(currentIntersects.object === postcardDurhamMesh.children[0]){
           
            gsap.to(postcardDurhamMesh.rotation, { duration: 1, y: -Math.PI, z: 0})
            gsap.to(camera.position, { duration: 1, x: 3.542, y: 0.182, z: 1.7})
            titleText.style.visibility = "hidden"
            paulText.style.visibility = "hidden"

            durhamButton.style.visibility = "visible"
            
        } else if (currentIntersects.object === postcardTulsaMesh.children[0]) {   
            gsap.to(postcardTulsaMesh.rotation, { duration: 1, y: -Math.PI, z: 0})
            gsap.to(postcardTulsaMesh.position, { duration: 1, z: 0.1})
             gsap.to(camera.position, { duration: 1, x: 0, y: -1.01, z: 1.7})
            titleText.style.visibility = "hidden"
            paulText.style.visibility = "hidden"
            
            tulsaButton.style.visibility = "visible"
            
        } else if (currentIntersects.object === postcardRichmondMesh.children[0]){
            gsap.to(postcardRichmondMesh.rotation, { duration: 1, y: -Math.PI, z: 0})
            gsap.to(postcardRichmondMesh.position, { duration: 1, z: 0.1})
            gsap.to(camera.position, { duration: 1, x: -2.96, y: 0.29, z: 1.7})
            titleText.style.visibility = "hidden"
            paulText.style.visibility = "hidden"
            
            richmondButton.style.visibility = "visible"

            //BACK SIDE ****************
        } else if (currentIntersects.object === postcardDurhamMesh.children[1]){
           
            gsap.to(postcardDurhamMesh.rotation, { duration: 1, y: 0, z:-0.035})
            gsap.to(camera.position, { duration: 1, x: 0, y: 0, z: 3.867})
            durhamButton.style.visibility = "hidden"
            window.setTimeout(() =>
                {
                    titleText.style.visibility = "visible"
                    paulText.style.visibility = "visible"
                }, 1000)
           
        } else if (currentIntersects.object === postcardTulsaMesh.children[1]) {   
            gsap.to(postcardTulsaMesh.rotation, { duration: 1, y: 0, z: 0.182 })
            gsap.to(postcardTulsaMesh.position, { duration: 1, z: 0})
            gsap.to(camera.position, { duration: 1, x: 0, y: 0, z: 3.867})
            tulsaButton.style.visibility = "hidden"
            window.setTimeout(() =>
                {
                    titleText.style.visibility = "visible"
                    paulText.style.visibility = "visible"
                }, 1000)
            
        } else if (currentIntersects.object === postcardRichmondMesh.children[1]){
            gsap.to(postcardRichmondMesh.rotation, { duration: 1, y: 0, z: 0.399})
            gsap.to(postcardRichmondMesh.position, { duration: 1, z: -0.01})
            gsap.to(camera.position, { duration: 1, x: 0, y: 0, z: 3.867})
            richmondButton.style.visibility = "hidden"
            window.setTimeout(() =>
                {
                    titleText.style.visibility = "visible"
                    paulText.style.visibility = "visible"
                }, 1000)
        }
    }
/**
 * *************************** RICHMOND  OBJECTS TO TEST *********************************************
 */
 if(richmondExperience) {
    
    for (let i = 0; i <richmondOrbMeshes.length; i++){
        
        if (currentIntersects.object === richmondOrbMeshes[i]){
            // console.log(orbPositions)
            
            // storyDiv.style.opacity = "1"
            //
            let originalPosition = richmondOrbMeshes[i].position
            console.log(storyImageLarge)

             if( !storyImageLarge ) {
            if (currentObject === richmondOrbMeshes[i] && clickFlag == 1){
                gsap.to(richmondOrbMeshes[i].position, {  duration: 2, x: orbPositionsX[i],  z: orbPositionsZ[i], ease: "circ"})
                clickFlag = 0
                storyDiv.style.opacity = "0"
                window.setTimeout(() => {storyDiv.style.visibility = "hidden"}, 500)
            } else { 
                storyDivLoader("richmond", i)
                storyDiv.style.opacity = "1"
                storyDiv.style.visibility = "visible"
                gsap.to(richmondOrbMeshes[i].position, {  duration: 2, x:-5, z: 5, ease: "circ"})
                gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})
                gsap.to(camera.rotation, { duration: 2,  x: 0, z: 0, y: Math.PI * 0.5 })
                
                clickFlag = 1
            }
            
            // window.setTimeout(() => {console.log(richmondOrbMeshes[i].position)}, 2000)
            currentObject = richmondOrbMeshes[i]
        
        }
            

        }
    }
 

}

/**
 * *************************** DURHAM  OBJECTS TO TEST *********************************************
 */
 else if (currentIntersects.object === null){
    
}
/**
 * *************************** TULSA  OBJECTS TO TEST *********************************************
 */
 else if (currentIntersects.object === null){

    
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
controls.enabled = false

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


/**
 * Animate
 */
 const clock = new THREE.Clock()

 let objectsToTest = []
 
 if(landingPage){
    objectsToTest = []
 objectsToTest = [ placeholder, postcardDurhamMesh.children[0],postcardDurhamMesh.children[1], postcardRichmondMesh.children[0] , postcardRichmondMesh.children[1], postcardTulsaMesh.children[0], postcardTulsaMesh.children[1] ]}

 

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    
    // console.log(1 - (elapsedTime * 0.5))
    // Update controls

   

    raycaster.setFromCamera(mouse, camera)

   if(!landingPage){
   // controls.update()
    // console.log('not landing')
   }

    const intersects = raycaster.intersectObjects(objectsToTest)
    

    if(intersects.length){
        // currentIntersects === null

        if(currentIntersects === null){
            console.log('in')
            
        if(landingPage){
            
                if(intersects[0].object.name === 'durhamPostcard') {
                postcardDurhamMesh.children[0].material.map = durhamPostcardColor
                console.log(intersects)
                
            } 
            if(intersects[0].object.name === 'richmondPostcard') {
                postcardRichmondMesh.children[0].material.map= richmondPostcardColor
                console.log(intersects)
            }
            if(intersects[0].object.name === 'tulsaPostcard') {
                postcardTulsaMesh.children[0].material.map= tulsaPostcardColor
                // gsap.to(postcardDurhamMesh.rotation, { duration: 1, y: 0})
              
            }
        }

        if(richmondExperience){
   
            for (let i = 0; i <richmondOrbMeshes.length; i++){
                if(intersects[0].object.name === richmondStoriesArray[i][0]){
                    console.log(richmondStoriesArray[i][0])
                }
            }
        }
        currentIntersects = intersects[0] 
        }
        
    } else {
        if(landingPage){
             if(currentIntersects){
                console.log('out');
                postcardDurhamMesh.children[0].material.map = durhamPostcardBW
                postcardRichmondMesh.children[0].material.map= richmondPostcardBW
                postcardTulsaMesh.children[0].material.map= tulsaPostcardBW
            }
        }
        currentIntersects = null
    
    if(richmondExperience){
        if(currentIntersects){
            console.log('out');
    }
    currentIntersects = null
    }
}
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}



tick()


/**
 *  JUNK REPOSITORY
 *
 */


// gui.add( params, 'toneMapping', Object.keys( toneMappingOptions )).onChange( function () {

//                 updateGUI();

//                 renderer.toneMapping = toneMappingOptions[ params.toneMapping ];
//                 postcardDurhamMesh.children[0].material.needsUpdate = true;
            
//                 postcardRichmondMesh.children[0].material.needsUpdate = true;
//                 postcardTulsaMesh.children[0].material.needsUpdate = true;
                
                
//                 renderer.render(scene, camera);

//             } );

//             updateGUI();

//             gui.open();
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