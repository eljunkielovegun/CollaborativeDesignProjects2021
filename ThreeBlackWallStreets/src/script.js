import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { gsap } from 'gsap'
import * as dat from 'dat.gui'
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js'


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

const backButton = document.querySelector('.backButton')
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
const orbInstruction = document.querySelector('.orbInstruction')

const timeline = document.querySelector('.timeline')





const audioOnImage = document.createElement('img')
audioOnImage.src = '/assets/speaker.svg'
audioOnImage.width = 50
audioOnImage.height = 50
// audioDiv.appendChild(audioOnImage)

const audioOffImage = document.createElement('img')
audioOffImage.src = '/assets/speaker-off.svg'
audioOffImage.width = 50
audioOffImage.height = 50
audioDiv.appendChild(audioOffImage)

const backButtonImage = document.createElement('img')
backButtonImage.src = '/assets/back.svg'
backButtonImage.width = 55
backButtonImage.height = 40
backButton.appendChild(backButtonImage)


const kpImage = document.createElement('img')
kpImage.src = '/assets/kevin.jpg'
kpImage.width = 128
kpImage.height = 162.5
kpDiv.appendChild(kpImage)

const paulImage = document.createElement('img')
paulImage.src = '/assets/paul.jpg'
paulImage.width = 128
paulImage.height = 162.5
paulDiv.appendChild(paulImage)

// console.log(kpImage)



const designTeamNamesArray = [ "Iman Ibrahim", "Isabelle Bryson", "Jamie Horowitz", "Jing Mu", "Kaitlin Santiago", "Lauren Wedderburn", "Yixuan Chen", "Youran Wu" ]
let designTeamImg = []
let designTeamNameDiv = []
let designImageWrapperDiv = []


for(let i =0; i < designTeamNamesArray.length; i++){
    designImageWrapperDiv[i] = document.createElement('figure')
    designImageWrapperDiv[i].width = 128
    designImageWrapperDiv[i].height = 162.5
    designImageWrapperDiv[i].style.float = "left"
    designTeamDiv.appendChild( designImageWrapperDiv[i] )
    designTeamImg[i] = document.createElement('img')
    designTeamImg[i].src = '/assets/designTeam/'+ i +'.jpg'
    designTeamImg[i].width = 128
    designTeamImg[i].height = 162.5
    designImageWrapperDiv[i].appendChild( designTeamImg[i] )
    designTeamNameDiv[i] = document.createElement('figcaption')
    designTeamNameDiv[i].classList.add("designNames")
    designTeamNameDiv[i].innerHTML = designTeamNamesArray[i]
    designImageWrapperDiv[i].appendChild( designTeamNameDiv[i] )

    designTeamImg[i].onmouseover = () => {
        designTeamNameDiv[i].style.visibility = "visible"
        designTeamNameDiv[i].style.display = "block"
    }
    designTeamImg[i].onmouseout = () => {
        designTeamNameDiv[i].style.visibility = "invisible"
        designTeamNameDiv[i].style.display = "none"
    }
}

const researchTeamNamesArray = ["Maren (Pepper) Magyar", "Maeve Curran","Deja Nycole","Malin Hillemann","Alexis Emerson","Nora Neely","Maggie Walsh","Andrew Kastner" ]
let researchTeamImg = []
let researchTeamNameDiv = []
let researchImageWrapperDiv = []


for(let i =0; i < researchTeamNamesArray.length; i++){
    researchImageWrapperDiv[i] = document.createElement('figure')
    researchImageWrapperDiv[i].width = 128
    researchImageWrapperDiv[i].height = 162.5
    researchImageWrapperDiv[i].style.float = "left"
    researchTeamDiv.appendChild( researchImageWrapperDiv[i] )
    researchTeamImg[i] = document.createElement('img')
    researchTeamImg[i].src = '/assets/researchTeam/'+ i +'.jpg'
    researchTeamImg[i].width = 128
    researchTeamImg[i].height = 162.5
    researchImageWrapperDiv[i].appendChild( researchTeamImg[i] )
    researchTeamNameDiv[i] = document.createElement('figcaption')
    researchTeamNameDiv[i].classList.add("designNames")
    researchTeamNameDiv[i].innerHTML = researchTeamNamesArray[i]
    researchImageWrapperDiv[i].appendChild( researchTeamNameDiv[i])

    researchTeamImg[i].onmouseover = () => {
        researchTeamNameDiv[i].style.visibility = "visible"
        researchTeamNameDiv[i].style.display = "block"
    }
    researchTeamImg[i].onmouseout = () => {
        researchTeamNameDiv[i].style.visibility = "invisible"
        researchTeamNameDiv[i].style.display = "none"
    }
}


const durhamTitleText = ["Dr. Aaron McDuffie","Charles Clinton Spaulding","The Durham Colored Library","James Shepard","John Henry Merrick","The Lincoln Hospital","Louis Austin","The Mechanics and Farmers Bank","The North Carolina Mutual Life Insurance Company","Anna Pauline Murray","Richard B. Fitzgerald","Scarborough Funeral Home","The Hayti Cultural Center","Viola Turner","The Wonderland Theater"]
const durhamStoriesArray = [["aaronmoore",3],["ccspaulding",3],["durhamcoloredlibrary",2],["jamesshepard",2],["johnmerrick",3],["lincolnhospital",4],["louisaustin",4],["mfbank",2],["ncmutual",1],["paulimurray",3],["richardfitzgerald",3],["scarboroughfuneralhome",2],["stjoesphsame_hayticulturalcenter",3],["violaturner",3],["wonderlandtheater",5]]
const durhamStoriesTextArray = [["Dr. Aaron McDuffie Moore graduated from Shaw University in 1888 as a member of the second class of medical students from the Leonard Medical School. Afterwards he chose to move to Durham, NC, becoming its first Black doctor. John Merrick, a friend of Moore’s who he had met during his time at Shaw convinced him that choosing Durham to begin his practice was the right choice.","The relationship between Merrick and Moore proved to be a very fruitful one as the two along with six others went on to found North Carolina Mutual and Provident Association in 1898. Which grew to become the North Carolina Mutual Life Insurance Company, one of the largest Black owned businesses in the 20th century.","Moore had his hand in many other endeavours though. On top of running his own medical practice and acting as the secretary of the NC Mutual and Provident Association. Moore also invested in the Durham Drug Company, helped create the Lincoln Hospital, organized the Lincoln Hospital Training School of Nursing, chaired the board of deacons at the White Rock Baptist Church, founded the Durham Colored Library, and led an effort to build over 80 rural schools in North Carolina through the Rosenwald Foundation."],["A key figure in the beginnings of Durham's black wall street was Charles Clinton Spaulding. He was a businessman, philanthropist, and active member of many civic, educational and social organizations. Spaulding was born in 1874 in Columbus county North Carolina to the landowner's and farmer's Benjamin McIver and Margaret Moore Spaulding. He moved from the farming community he grew up in to join his uncle Aaron McDuffie Moore in Durham in 1894 where he received his high school diploma and became the manager at a black owned grocery stored before being hired as a part time agent at his uncle's recently established North Carolina Mutual and Provident Association, later known as North Carolina Mutual Life Insurance company.","Spaulding immediately started growing the company by rapidly expanding NC Mutual's market, mostly with schoolteachers and ministers, and through saturation advertising. He flooded local businesses with promotional items bearing the NC Mutual name. He became the general manager of NC Mutual in 1900 and the president in 1923 after the death of his uncle. Also In 1900 he married John Merrick's half sister Fannie Jones until her death in 1919, after which he married Beatrice Steven Garner. NC Mutual was at the brink of failure before he revived it as its general manager and brought it to 3 million dollars in policies by 1916, which is 80 million today. He was the president until his death in 1952, bringing the company through the Great Depression and recovery post-WWII and leaving it with a worth of about 40 million dollars, around a billion dollars today.","Not only was Spaulding the president of NC Mutual but he led the Mechanics and Farmers Bank, the Mutual Building and Loan Association, and he was the vice president of the Bankers Fire Insurance Company and the Southern Fidelity Mutual Insurance Company. He was not only involved in insurance but he also played a role in black higher education and politics. Spaulding was a trustee of North Carolina Central University, Shaw University, and Howard University. He also had an influential role in politics as the secretary of the North Carolina Commission on Interracial Cooperation and the national chairman of the Emergency Advisory Council of the Urban League. In the urban league he obtained jobs for black people and fought against discrimination in New Deal programs. His influence as a businessman helped grow and preserve Durham's black wall street throughout his life."],["The Durham Colored Library was formed in 1913 as a sunday school library in the basement of the White Rock Baptist Church. The effort was spearheaded by Dr. Aaron McDuffie Moore. In 1916, Dr. Moore partnered with his long time collaborator John Merrick to establish the library in one of Merrick’s rental properties. One year later in 1917, the Durham Colored Library decided to buy the building from Merrick. Merrick in turn took a quarter of his profits and donated it back to the library.","Although a new building had been needed since the 1920’s the Durham Colored Library got a newly minted building in 1940. Named the Stanford L. Warren Library after the long time board president and donor. Today the library is still standing, twice renovated, and the founding organization, The Durham Colored Library, Inc. is still in operation as Durham’s longest running non-profit. Chaired by Dr. Moore’s great granddaughter, C. Eileen Watts Welch."],["In 1898 Shepard along with John Merrick established the North Carolina Mutual and Provident Association in Durham to “relieve the distress of Negroes.” It was later renamed North Carolina Mutual Insurance Company. In 1908, Shepard founded The Mechanics & Farmers Bank, saving more than 500 African American farms and residences. ","From 1899 to 1900 as a Federal appointee of President William McKinley in the Recorder of Deeds office in Washington, D.C. He was later an advisor to President Theodore Roosevelt and supported President Herbert Hoover’s controversial nominee to the U.S. Supreme Court, Judge John J. Parker of Charlotte, North Carolina. Shepard continued advising prominent Republicans until his death."],["John Henry Merrick was born a slave in Clinton, NC in 1859. With the signing of the Emancipation Proclamation, Merrick, his mother and younger brother gained their freedom in 1863. After moving to Chapel Hill, he became a brick mason and helped construct Shaw University in Raleigh as a teenager. He eventually learned to barber and worked his way to becoming a business partner to the owner of the shop in Raleigh. In 1892, he acquired full ownership of the shop and expanded to Durham, where he established five barber shops– three for whites and two for Blacks.","With the encouragement of the Duke family and other white business leaders, he had begun a real estate business devoted largely to constructing housing for the waves of black migrants seeking employment in Durham's growing tobacco industry.","More significantly for his future, Merrick had become an organizer for a fraternal insurance society, the Royal Knights of King David. In 1898, Merrick founded North Carolina Mutual and Provident Association, which became the largest black business in the United States. He served as president from its founding until his death."],["The Lincoln Hospital was established in 1901 to serve the Black community in Durham, which was also one of the earliest Black health facilities in the nation. Dr. Aaron McDuffie Moore, John Merrick, W.H Armstrong, and Addie Evans worked together to convince the extremely wealthy Washington Duke Family to donate the money to make the hospital a reality.","The main goal of the Hospital was to create better health outcomes for the Black community, but it also served as a place for education and job training.","In 1903, the Lincoln Hospital School of Nursing was organized and in 1925 the hospital was accredited by the American Medical Association to train resident physicians.","The Lincoln Hospital closed in 1976, but its legacy lives on today through the Lincoln Community Health Center. An outpatient facility founded by Dr. Charles DeWitt Watts, the husband of Constance Merrick Watts. Her grandfathers were Dr. Aaron McDuffie Moore and John Merrick."],["Louis Austin was born in 1898 in Enfield, a town outside of Durham. After graduating highschool in Edgecombe county he moved to Durham to attend North Carolina Central University. After graduating college, Austin worked for the North Carolina Mutual Life Insurance Company before becoming a journalist. ","Austin was the editor and publisher of Durham’s historically black newspaper, The Carolina Times. Austin bought the controlling share of Durham’s Standard Advertiser newspaper and remade it into a social commentary paper. As an editor he “illuminated racial discrimnation”, advocated for “black voter registration and equal educational opportunity”, and “directly challenged racial segregation”. (Gershenhorn, 2) Merrick took an active role in fighting against racial discrimination and segregation, not only through his writing but also by assisting lawyers Cecil McCoy and Conrad Pearsons in their fight against segregation in higher education, staging protests, and through his involvement in Durham public service. He was politically active in Durham, becoming the first black justices of peace in Durham with Frederick K. Watkins as well as directing public relations for the first black member of the Durham city council, Rencher N. Harris.","Austin worked with attorneys Conrad Person and Cecil McCoy to challenge Jim Crow in higher education. UNC had the only pharmacy program in the state. Thomas Raymond Hocutt was looking to become a pharmacist after studying at Durham’s North Carolina College for Negroes so he applied to UNC. However UNC was an all-white university and Hocutt was denied admission because of his race. Louis Austin, Conrad Pearson and Cecil McCoy helped Hocutt sue UNC for this injustice, but their case was unsuccessful in state court. Efforts of civil rights activists like Louis, Pearson, and McCoy led up to Brown v. Board of Education in 1954.","In 1979, the Carolina Times lost many of its records to a fire that was suspected to be arson but was never solved. But the paper lives on and continues to be published by Austin’s grandson Kenneth Edmonds."],["The Mechanics and Farmers Bank was formed in 1907 by some of the same minds behind the North Carolina Mutual and Provident Association, like John Merrick, William Gatson Pearson, Dr. Aaron McDuffie Moore, James E. Shepard, as well as other prominent local businessmen. The formation of the bank was a knock-on effect of the growth of the Black community in Durham and it’s founders made the important distinction that they provide 'no large loans... to a few profiteers, but rather conservative sums to needy farmers and laborers.'","The Mechanics and Farmers Bank was one of the one of about a dozen of Black owned banks to make it out of the Great Depression in the 1920’s and 30’s, which ensured the survival of many Black-owned businesses in Durham, NC as well. It continues to operate today as a subsidiary of M&F Bancorp, Inc. making it the second oldest Black Bank in the U.S."],["The North Carolina Mutual Life Insurance Company is the first black-owned insurance company in North Carolina and the largest in the nation. It was founded February 28, 1898. The founding members were active in Durham’s business, education, medical and civic life. The company's stated purpose was 'the relief of the distress of Negroes' in North Carolina. In the first year, all of the founding members left except Merrick and Moore. Charles C. Spaulding was hired and named general manager. These three men carried the company to unprecedented success. North Carolina Mutual grew as a company by acquiring failing insurance companies and brought into Mechanics and Farmers Bank."],["Anna Pauline Murray was an inspirational and dedicated civil rights activist and leader who struggled with gender identity their entire life.","Pauli grew up in Durham with her aunt and grandparents and would go on to study at prestigious universities such as Howard University and Yale Law School, and was faculty at Brandeis University. Pauli wrote several books, poems, and fought for racial and gender equality.","S/he* became the first African American woman in the US to become an Episcopal priest after the church changed its policy in 1977 and died of cancer in Pittsburgh on July 1, 1985."],["Richard B. Fitzgerald was a prominent entrepreneur and businessman in Durham. Fitzgerald moved to Durham in 1879 and his first successful business was a brick factory in the Hayti Neighborhood in 1879. By 1912, his brick making profits were estimated at $100,000, about $1.5 million in today’s dollars.","Fitzgerald was also a founder of the Mechanics and Farmers bank, an outgrowth of the North Carolina Mutual Insurance Company, along with J. A. Dodson, J. R. Hawkins, John Merrick, Aaron M. Moore, W.G. Pearson, James E. Shepard, G. W. Stephens, and Stanford L. Warren. Fitzgerald had a hand in many other businesses. In 1895, he helped start the Durham Drug Company. Three years later, he became Coleman Manufacturing’s first president. The Coleman Manufacturing Company was the first black owned and operated cotton mill in the United States. In 1899, he became the president of the Durham Real Estate, Mercantile, and Manufacturing Company. In 1901, he took on the role of treasurer for Lincoln Hospital, which was created to serve the black community of Durham.","Richard Fitzgerald was born in 1843 in Delaware. Twelve years later his family moved to Pennsylvania, after the Fugitive Slave Act of 1850 to avoid the risk of their children being kidnapped by slave catchers. RB Fitzgerald moved with his brother Robert to Durham where they each established brickyards. RB’s brother later became a teacher and political activist in Durham. Richard’s brother Robert was the grandfather of the activist, author, lawyer, and priest, Pauli Murray. Richard Fitzgerald met his wife Sarah Ann Fitzgerald nearby Durham in Orange County, North Carolina. They married in 1870 and had twelve children together. One of their sons, Samuel, continued his father’s brickmaking business after his father’s death."],["John Clarence Scarborough established his funeral home in Durham, N.C. in 1905 with the help of J.C. Hargett, to form one of the oldest black owned funeral homes in the United States. Scarborough attended the Reounard Training School for Embalmers in New York City and was the only Black student.","The success of the funeral home allowed for John Clarence Scarborough and his wife Daisy E. Scarborough to take on more philanthropic endeavours like opening the Daisy E. Scarborough Nursery School. Which was positioned as a place for women to enter the workforce."],["In 1868 Edian Markham, an African Methodist Episcopal (AME) missionary and former slave, came into Durham and with five others established an AME church, Union Bethel AME, purchasing property currently occupied by the present-day Hayti Heritage Center from Minerva Fowler","John Merrick was a significant contributor to the fund-raising efforts for the building of St. Joseph’s AME, cir. 1891.","Today, the Hayti Cultural Center is an agent of social change with a long-term commitment to utilizing the arts as a tool to bring communities together and establishing common ground among diverse cultures. The St. Joseph’s Foundation is committed to providing the local community and patrons-at-large with core programs and other events throughout the year."],["1900-1988 The first woman member of the board of directors and Vice President of the North Carolina Mutual Insurance Company. She was hired by the North Carolina Mutual Insurance Company in 1920 when they were setting up a branch office in Mississippi. In 1924 she moved to a position at the headquarters in Durham, where she worked as Charles C. Spaulsing’s personal secretary. In 1957 she was appointed Treasurer of North Carolina Mutual Insurance Company. In 1960 Turner became the first woman Vice President of NCMI and joined the board of directors until her retirement in 1965.","As a woman she had to move slowly through the ranks at NCMI, but she was eventually “placed in charge of the company investment portfolio of mortgages and government bonds.(Partin, 2011) She added significantly to the 20 million dollars in assets the company had in the 1940s, through stock investments that her male colleague at the time condescendingly called 'her little pet project'. (Partin, 2011)", "Quotes from Viola Turner: 'Our men were not too happy about your being too intelligent...sometimes I was a whole lot smarter than they were. But I was also smart enough not to have acted like I was smarter than they were.' -Viola Mitchell Turner (Brown, 2008, pg.131) 'Men started off geared for top management,' Turner complained. 'Women were geared to be somebody’s secretary.' (Brown, 2008, pg. 132) "],["The movie theater of Durham’s Hayti Neighborhood was owned and operated by Frederick K. Watkins, the “movie king” of North Carolina. The theater was built in 1920 on the southwest corner of East Pettigrew and Ramsay streets. When the theater first started, they showed silent films with musical accompaniment by pianist Hattie Shriver Livas.","Before his most successful Durham theater, the Wonderland Theater, F.K. Watkins started the Electric Theater at 701 Fayetteville in 1913. This was the first black owned theater in Durham.","“Movie King” is inscribed at the entrance to this house on Fayetteville St.","Watkins established himself as the most prolific theater owner in North Carolina. He owned the Dunbar Theater in Winston-Salem, Palace Theater in Apex, Dixie Theater in High Point, Majestic Theater in Martinsville, and more throughout North Carolina, South Carolina, and Virginia. He was also active in trying to develop the theater and film industry in the region, by organizing the first national theater corporation to finance theater construction and film production in 1926.","Frederick K. Watkins was not only involved in the theater and film industry but also in the politics of Durham. He won an election with journalist Louis Austin in 1934 to be a justice of peace in Durham. A black owned newspaper, the Pittsburgh courier worte at the time, “for the first time in the history of the south, two colored men were elected to office on the Democratic ticket.” This election victory came after efforts by the white southern democratic party leaders efforts to suppress black voter registration in 1932 after a big push by the party at large to register thousands of new black voters as democrats earlier that year."]]

//tulsa story stuff
const tulsaTitleText = ["Dr. Andrew Cheesten (AC) Jackson","A.J. Smitherman","Buck Colbert (BC) Franklin","Booker Taliaferro Washington","Ellis Walker (EW) Woods","J.B. Stradford","John Williams","Loula Williams","Mabel Little","O.B. Mann & McKinley Mann","Dr. Olivia Hooker","Ottawa (OW) Gurley","Reverend R.A. Whitaker","Simon Berry","S.M. Jackson"]
const tulsaStoriesArray = [["acjackson",2],["ajsmitherman", 2],["bcfranklin",3],["bookertwashington",2],["ewwoods",2],["jbstradford",2],["johnwilliams",2],["loulawilliams",2],["mabellittle",3],["mannbrothers",2],["oliviahooker",3],["owgurley",4],["revrawhitaker",2],["simonberry",3],["smjackson",1]]
const tulsaStoriesTextArray = [["At 42 years of age, Dr. Andrew Cheesten (AC) Jackson was one of the most successful and talented doctors in the United States, acclaimed by the Mayo Clinic brothers. ", "In 1918, Dr. Jackson established the Booker T. Washington Hospital for Negros, on the corner of Boston Ave. and Archer St. Dr. Jackson was also on the board of directors of the Colored Orphan Home for Tulsa, serving his community in all aspects of his life. "],["A.J. Smitherman was a publisher who founded the Tulsa Star, a Black newspaper headquartered in Greenwood, which was instrumental in establishing the district’s socially-conscious mindset.","Before the Massacre, Smitherman’s properties were valued at more than $40,000. After the Massacre, Smitherman left Tulsa with his family, ending up in Buffalo, New York. In Buffalo, he started a new newspaper, the Buffalo/Empire Star, which ran until shortly after his death in 1961."],["Buck Colbert (BC) Franklin was a lawyer whose career focused on defending the survivors of the Tulsa Race Massacre of 1921 in the rebuilding of Greenwood.","After the Massacre, The Tulsa City Council at first passed a law which prevented the Black Greenwood community to rebuild what had been destroyed. Because of BC Franklin, who led the legal battle before the Oklahoma Supreme Court, Tulsa residents were able to rebuild their community.","Today, the BC Franklin Park stands in honor of the life of this resilient and diligent Black man, and his legacy of working for his community. "],["Booker Taliaferro Washington was the successful business man credited with coining the term 'Negro Wall Street', which would come to be known as Black Wall Street. His work as an author was popular and influential to people of many different ideologies. ","The original Booker T. Washington High School was a four-room building located at 507 E. Easton St. built in 1913. This building sustained burns, but is one of few to still stand in survival of the 1921 Race Massacre. "],["Ellis Walker (EW) Woods was the first principal of Greenwood's Booker T. Washington High School. His dedication saw the school through thirty-five years, from 1913 to 1948.","As an activist for equitable, integrated education, Woods built this high school to hold high standard, even accredited by the North Central Association. In 1946 the Governor of Oklahoma even consulted with Woods to plan academic integration in Oklahoma."],["J.B. Stradford was an Indiana University educated lawyer and activist in Greenwood. He built a 55-room luxury hotel bearing his name, the largest Black-owned hotel in the country.","The Stradford Hotel at 301 N. Greenwood was JB’s most well-known business. In the early 1900s, it was the largest Black-owned, Black-operated and Black-guest-only hotel in America, housing fifty-four 'modern living rooms,' a gambling hall, dining room, saloon and pool hall. The hotel had a jazz scene with the Commodore Cotton Club across the street, bringing joy into Greenwood residents’ lives."],["John and Loula Williams were some of Greenwood’s earliest residents, moving to Tulsa in 1903 from Arkansas. In 1912, John opened an auto-repair shop called Williams’ One Stop Garage, at 420 E. Archer St., providing services for both Black and white Tulsa citizens. Here, John, Loula, and their son, Bill, take a ride through Greenwood past local businesses. John was the first in the Greenwood community to own a car. The car, a Chalmers “Thirty Pony Tonneau,” was named because of its 30 horsepower and inline four-cylinder engine. The value of the car was $1,600 in 1911, which would be $53,000 today. The car had a three-speed manual transmission, comfortable leather seats, and a maximum speed of 50 miles per hour.","John was the first in the Greenwood community to own a car. The car, a Chalmers “Thirty Pony Tonneau,” was named because of its 30 horsepower and inline four-cylinder engine. The value of the car was $1,600 in 1911, which would be $53,000 today. The car had a three-speed manual transmission, comfortable leather seats, and a maximum speed of 50 miles per hour."],["From the profits of Williams’ One Stop Garage, the Williams family bought a three-story building, at 102 N. Greenwood Ave. In this building, Loula Williams opened and managed the Williams’ Confectionery on the first floor. The family lived on the second floor, and they rented office space on the third. The confectionery store, a popular hang-out spot, sold candy, ice cream, and featured a fully-stocked soda fountain. In 1914, Loula Williams opened the family-owned movie theatre, Dreamland Theatre, at 127 N. Greenwood St., with an impressive 750 seats. The movie theatre quickly succeeded, with many Greenwood residents regularly showing up to purchase 15-cent tickets.","Loula Williams was an incredibly savvy businesswoman, and not at all under her husband's shadow. An issue of the Tulsa Star in 1914 profiling Greenwood business leaders dedicated separate sections to John and Loula. In 1919, she signed an affidavit declaring sole ownership of the movie theater. She also owned the confectionery herself, having bought the business using her maiden name."],["Mabel Little was a beacon of Black power and resilience, and, after moving to the district in 1913, became known as the 'Matriarch' of Greenwood. With her husband, Pressley, she owned a three-room shotgun house, and ran businesses, such as Little Café and Little Rose Salon, which opened in 1917.","After the Massacre, Mabel Little was instrumental in rebuilding organizations that had been destroyed, such as the Mt. Zion Baptist Church, where she and her husband had been married. 'Life is too short not to be used to help others,' Little said.","At 104 years old, Mabel Little passed away in 2020. Today, the Mabel Little Heritage House, built by the Sam and Lucy Mackey family, stands in honor of her legacy of Black resilience and community."],["O.B. Mann (1923-1997) was the owner of Mann Brothers Grocery alongside his brother, McKinley Mann, and a veteran of the First World War. Mann’s grocery store was a popular gathering place for Greenwood residents. The store was rebuilt following the Massacre, and was in business through the 1950s. In this picture of the market's staff, O.B. Mann can be seen on the far left, standing out from the crowd by his height.","McKinley Mann, pictured on this post card from the Grocery with his wife, Augusta, was a founding member of the Greenwood Chamber of Commerce in 1938. Augusta served on the state Pardon and Parole Board, the first Black woman to do so."],["Dr. Olivia Hooker was born in Oklahoma in 1915. She was one of the oldest known survivors of the Massacre in 1921, and was six years old at the time. Her father owned a clothing store in the Greenwood District. Her family left Tulsa shortly thereafter.","Dr. Hooker joined the U.S. Coast Guard in 1945 as part of the women's reserve unit, 'Spars.' She is credited as the first Black woman in the U.S. Coast Guard.","Dr. Hooker earned a Masters in Psychological Services at Columbia University, and a Doctorate in Psychology at the University of Rochester. She began teaching at Fordham University two years after receiving her doctorate, and remained on the faculty for 22 years, specializing in developmental and intellectual disabilities."],["Ottawa (OW) Gurley was a wealthy Black landowner from Arkansas who purchased 40 acres of land in Tulsa, Oklahoma in 1906. Gurley named this area Greenwood, and founded the district that would become the most successful Black Wall Street in America, of its time.","Gurley provided financial and entrepreneurial opportunities to Black Tulsans, selling his property exclusively within the Black community. Thanks to Gurley, Greenwood, Tulsa became home to 600 businesses, 21 churches, 21 restaurants, 30 grocery stores, 2 movie theatres, 6 private airplanes, a hospital, a bank, a post office, schools, libraries, law offices, and even a bus system. ","Ottawa (OW) Gurley was a wealthy Black landowner from Arkansas who purchased 40 acres of land in Tulsa, Oklahoma in 1906. Gurley named this area Greenwood, and founded the district that would become the most successful Black Wall Street in America, of its time.","Gurley provided financial and entrepreneurial opportunities to Black Tulsans, selling his property exclusively within the Black community. Thanks to Gurley, Greenwood, Tulsa became home to 600 businesses, 21 churches, 21 restaurants, 30 grocery stores, 2 movie theatres, 6 private airplanes, a hospital, a bank, a post office, schools, libraries, law offices, and even a bus system. "],["Reverend R.A. Whitaker became the pastor of Mount Zion Baptist Church after the previous pastor, Reverend White, recommended him to the congregation in 1914. In the Spring of 1921, the church was the newest building on the block after a $92,000 investment to move it from its prior location on North Hartford Avenue to N. Elgin Avenue. The church was burned and looted during the massacre less than two months after its first service in the new building. ","Reverend Whitaker and his family worked to aid their community after the 1921 Massacre by distributing aid. The remains of the Mount  Zion Baptist Church are in the background of the photograph. Reverend Whitaker left his position at the church five years later. "],["Simon Berry was born in 1890 in Granada, Mississippi, and moved to Tulsa around 1915, the same year he got married to Alma Pitman in Tulsa.","In 1919, only white people were permitted to use Tulsa’s taxi service. Berry realized that he could make a profit from starting his own transportation service in the Greenwood neighborhood. Berry started with just his own car, but quickly expanded to a service with multiple vehicles. With the profits from the taxi service, Berry bought an auto garage, through which he taught other Black residents about cars and mechanics. Meanwhile, Berry also invested significantly in other Greenwood businesses, and started to buy buses in addition to the jitney service. Many of his students at the auto repair shop became bus drivers in Greenwood.","Berry was one of the first Black citizens of Oklahoma to earn his pilot’s license and he bought a biplane in 1925 with his business partner. Berry had a huge passion for flying. Between the jitneys, buses, eventual air charter service, and mechanic school, Berry employed more Black people than any other person or business in Tulsa."],["S.M. Jackson, originally from Mississippi, opened the Jackson Undertaking Company in Greenwood in 1917 when he was just 23 years old. After the massacre, Jackson Undertaking filed a lawsuit against Tulsa and several prominent figures, such as Tulsa's Mayor and Chief of Police. Wanting to make sure the world knew about the Massacre, Jackson hired Mary E. Jones Parrish to write 'The Events of the Tulsa Disaster' in 1923."]]


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
        storiesArray = tulsaStoriesArray
        titleText = tulsaTitleText
        storiesTextArray = tulsaStoriesTextArray
    }else if (city == 'durham'){
        storiesArray = durhamStoriesArray
        titleText = durhamTitleText
        storiesTextArray = durhamStoriesTextArray
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
 * making timeline to show orb titles
 */


// let comp = window.getComputedStyle(li,pseudoElement)

function timelineCreate(city)
{
    timeline.style.display = "block"
    let TitleText = null
    let OrbMeshes = null

    if(city === 'richmond') {
        TitleText = richmondTitleText
        OrbMeshes = richmondOrbMeshes
    } else if (city === 'durham'){
        TitleText = durhamTitleText
        OrbMeshes = durhamOrbMeshes
    } else if (city === 'tulsa'){
        TitleText = tulsaTitleText
        OrbMeshes = tulsaOrbMeshes
    }

    while (timeline.hasChildNodes()) {
        timeline.removeChild(timeline.lastChild);
    }

    const ul = document.createElement('ul')
    timeline.appendChild(ul)
    let li =[]

    for (let i = TitleText.length-1; i >= 0 ; i--){
        li[i] = document.createElement('li')
        ul.appendChild(li[i])
        li[i].setAttribute("orbNames", TitleText[i])
        
        li[i].onmouseover = () => {
            timeline.children[0].children[TitleText.length-1-i].style.background = "black"
            gsap.to(OrbMeshes[i].position, {  duration: 2, x:-10, y: 0, z: 5, ease: "circ"})
            
        }
        li[i].onmouseout = () => {
            timeline.children[0].children[TitleText.length-1-i].style.background = "white"
            gsap.to(OrbMeshes[i].position, {  duration: 2, x: orbPositionsX[i], y:orbPositionsY[i],  z: orbPositionsZ[i], ease: "circ"})
            //console.log(timeline.children[0].children[i].attributes)
        }

        if(city === 'richmond'){
            timeline.children[0].children[TitleText.length-1-i].style.marginLeft = "100px"
        } else {
            (timeline.children[0].children[TitleText.length-1-i].style.marginLeft = "70px")
        } 
       
        
    }
    // console.log(timeline.children[0].children)
    
}

// console.log(timeline)


/**
 *   **************** MANAGING ALL THE DIV ELEMENTS CLICK FUNCTIONS ************************
 */


/**
 * menu animation
 */
 
 let aboutDivOpen = false
menu.onclick = () => {
    menu.classList.toggle('open')
    aboutDiv.classList.toggle('open')
    aboutDivOpen = !aboutDivOpen
    //console.log(aboutDivOpen)
}




// storyGraphOne.onclick = () => {
//     storyDiv.style.opacity = "0"
// }

let storyImageLarge = false
storyImageDiv.onclick = () => {
    storyImageDiv.classList.toggle('open')
    window.setTimeout(() => {storyImageLarge = !storyImageLarge}, 50) //because dom level events fire before the js ones....
   
}
let storyImageMouseover = false
storyDiv.onmouseover = () => {
   
    window.setTimeout(() => {storyImageMouseover = true}, 50)
}
storyDiv.onmouseout = () => {
    
    window.setTimeout(() => {storyImageMouseover = false}, 50)
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
 let orbPositionsY = []
 let orbPositionsZ = []

tulsaButton.onclick = () => {
    tulsaExperience = true
    landingPage = false
    tulsaButton.style.visibility = "hidden"

    orbInstruction.style.visibility = "visible"

    orbInstruction.innerHTML = "Welcome to Greenwood, Tulsa, Oklahoma. <br> Click on an Orb to learn more about this thriving community"

    timelineCreate('tulsa')

   gsap.to(camera.rotation, { duration: 2,  y: Math.PI * 0.5 })
   gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})

   // ******************* ADDING MESHES TO THE SCENE ****************
   orbPositionsX = []
   orbPositionsY = []
   orbPositionsZ = []
    for (let i = 0; i < tulsaOrbMeshes.length; i++){
        scene.add(tulsaOrbMeshes[i])
        
        tulsaOrbMeshes[i].position.x = -18
        
        tulsaOrbMeshes[i].position.z = (50/tulsaOrbMeshes.length)*i -20
        let zCircleFactor = tulsaOrbMeshes.length
        zCircleFactor -= i
        zCircleFactor = Math.abs(zCircleFactor - i) * 0.9
        //console.log(zCircleFactor)
        //console.log(i)

        if (i%2!=0)  {
            
        tulsaOrbMeshes[i].position.y = 4
        } else {
           
            tulsaOrbMeshes[i].position.y = -4

        }

        orbPositionsX.push(tulsaOrbMeshes[i].position.x)
        orbPositionsY.push(tulsaOrbMeshes[i].position.y)
        orbPositionsZ.push(tulsaOrbMeshes[i].position.z)
        
        
    }
     //console.log(orbPositionsX)
   
 
    objectsToTest = []
     for (let i = 0; i <tulsaOrbMeshes.length; i++){
        objectsToTest.push(tulsaOrbMeshes[i])
        
    }

    if (cityButton.hasChildNodes()){
        cityButton.removeChild(cityButton.childNodes[0])
    }

    const tulsaCityImage = document.createElement('img')
    tulsaCityImage.src = '/assets/tulsaButton.png'
    tulsaCityImage.width = 110
    tulsaCityImage.height = 80
    cityButton.appendChild(tulsaCityImage)


    
    backButton.style.visibility = "visible"
    cityButton.style.visibility = "visible"
    titleText.style.visibility = "hidden"

    

    scene.remove( landingPageGroup )
    // controls.enabled = true
    menu.style.visibility = "hidden"

    //dispose all landingpage materials, textures, geometries

    postcardGeometry.dispose()
    for (let i; i < landingPageTexturesArray.length; i++){
        landingPageTexturesArray[i].dispose()
    }
    for (let i; i < landingMaterialArray.length; i++){
        landingMaterialArray[i].dispose()
    }
    

}
durhamButton.onclick = () => {
    durhamExperience = true
    landingPage = false
    durhamButton.style.visibility = "hidden"

    orbInstruction.style.visibility = "visible"

    orbInstruction.innerHTML = "Welcome to Hayti, Durham, North Carolina. <br> Click on an Orb to learn more about this thriving community"

    timeline.style.display= "block"
    timelineCreate('durham')

   gsap.to(camera.rotation, { duration: 2,  y: Math.PI * 0.5 })
   gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})

   // ******************* ADDING MESHES TO THE SCENE ****************
   orbPositionsX = []
   orbPositionsY = []
   orbPositionsZ = []
    for (let i = 0; i < durhamOrbMeshes.length; i++){
        scene.add(durhamOrbMeshes[i])
        
        durhamOrbMeshes[i].position.x = -18
        
        durhamOrbMeshes[i].position.z = (50/durhamOrbMeshes.length)*i -20
        let zCircleFactor = durhamOrbMeshes.length
        zCircleFactor -= i
        zCircleFactor = Math.abs(zCircleFactor - i) * 0.9
        //console.log(zCircleFactor)
        //console.log(i)

        if (i%2!=0)  {
            
        durhamOrbMeshes[i].position.y = 4
        } else {
           
            durhamOrbMeshes[i].position.y = -4

        }

        orbPositionsX.push(durhamOrbMeshes[i].position.x)
        orbPositionsY.push(durhamOrbMeshes[i].position.y)
        orbPositionsZ.push(durhamOrbMeshes[i].position.z)
        
        
    }
     //console.log(orbPositionsX)
   
 
    objectsToTest = []
     for (let i = 0; i <durhamOrbMeshes.length; i++){
        objectsToTest.push(durhamOrbMeshes[i])
        
    }

    if (cityButton.hasChildNodes()){
        cityButton.removeChild(cityButton.childNodes[0])
    }

    const durhamCityImage = document.createElement('img')
    durhamCityImage.src = '/assets/durhamButton.png'
    durhamCityImage.width = 110
    durhamCityImage.height = 80
    cityButton.appendChild(durhamCityImage)


    
    backButton.style.visibility = "visible"
    cityButton.style.visibility = "visible"
    titleText.style.visibility = "hidden"

    

    scene.remove( landingPageGroup )
    // controls.enabled = true
    menu.style.visibility = "hidden"

    //dispose all landingpage materials, textures, geometries

    postcardGeometry.dispose()
    for (let i; i < landingPageTexturesArray.length; i++){
        landingPageTexturesArray[i].dispose()
    }
    for (let i; i < landingMaterialArray.length; i++){
        landingMaterialArray[i].dispose()
    }


}


richmondButton.onclick = () => {
    richmondExperience = true
    landingPage = false
    richmondButton.style.visibility = "hidden"
    orbInstruction.style.visibility = "visible"

    orbInstruction.innerHTML = "Welcome to Jackson Ward, Richmond, Virginia. <br> Click on an Orb to learn more about this thriving community"


    timeline.style.display= "block"
    timelineCreate('richmond')

   gsap.to(camera.rotation, { duration: 2,  y: Math.PI * 0.5 })
   gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})

   // ******************* ADDING MESHES TO THE SCENE ****************
   orbPositionsX = []
   orbPositionsY = []
   orbPositionsZ = []
    for (let i = 0; i < richmondOrbMeshes.length; i++){
        scene.add(richmondOrbMeshes[i])
        
        richmondOrbMeshes[i].position.x = -18
        
        richmondOrbMeshes[i].position.z = (50/richmondOrbMeshes.length)*i -20
        let zCircleFactor = richmondOrbMeshes.length
        zCircleFactor -= i
        zCircleFactor = Math.abs(zCircleFactor - i) * 0.9
        //console.log(zCircleFactor)
        //console.log(i)

        if (i%2!=0)  {
            
        richmondOrbMeshes[i].position.y = 4
        } else {
           
            richmondOrbMeshes[i].position.y = -4

        }

        orbPositionsX.push(richmondOrbMeshes[i].position.x)
        orbPositionsY.push(richmondOrbMeshes[i].position.y)
        orbPositionsZ.push(richmondOrbMeshes[i].position.z)
        
        
    }
     //console.log(orbPositionsX)
   
 
    objectsToTest = []
     for (let i = 0; i <richmondOrbMeshes.length; i++){
        objectsToTest.push(richmondOrbMeshes[i])
        
    }

    if (cityButton.hasChildNodes()){
        cityButton.removeChild(cityButton.childNodes[0])
    }

    const richmondCityImage = document.createElement('img')
    richmondCityImage.src = '/assets/richmondButton.png'
    richmondCityImage.width = 110
    richmondCityImage.height = 80
    cityButton.appendChild(richmondCityImage)


    
    backButton.style.visibility = "visible"
    cityButton.style.visibility = "visible"
    titleText.style.visibility = "hidden"

    

    scene.remove( landingPageGroup )
    // controls.enabled = true
    menu.style.visibility = "hidden"

    //dispose all landingpage materials, textures, geometries

    postcardGeometry.dispose()
    for (let i; i < landingPageTexturesArray.length; i++){
        landingPageTexturesArray[i].dispose()
    }
    for (let i; i < landingMaterialArray.length; i++){
        landingMaterialArray[i].dispose()
    }


    console.log(renderer.info)

}

backButton.onclick = () => {
    richmondExperience = false
    durhamExperience = false
    tulsaExperience = false
    landingPage = true
    orbInstruction.style.visibility = "hidden"
    cityButton.style.visibility = "hidden"
    timeline.style.display = "none"
    
    if(storyImageLarge){
        storyImageDiv.classList.toggle('open')
        storyImageLarge = false
    }

    storyDiv.style.visibility = "hidden"

    scene.add( landingPageGroup )
    for (let i = 0; i < richmondOrbMeshes.length; i++){
        scene.remove(richmondOrbMeshes[i])
        scene.remove(durhamOrbMeshes[i])
        scene.remove(tulsaOrbMeshes[i])
    }
    //need to remove for tulsa and durham

    objectsToTest = []
    objectsToTest = [ placeholder, postcardDurhamMesh.children[0],postcardDurhamMesh.children[1], postcardRichmondMesh.children[0] , postcardRichmondMesh.children[1], postcardTulsaMesh.children[0], postcardTulsaMesh.children[1] ]

    gsap.to(camera.rotation, { duration: 0,  y: 0 })
    gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})

    controls.enabled = false
    backButton.style.visibility = "hidden"

    gsap.to(postcardRichmondMesh.rotation, { duration: 2, y: 0, z: 0.399})
    gsap.to(postcardRichmondMesh.position, { duration: 2, z: -0.01})

    gsap.to(postcardDurhamMesh.rotation, { duration: 2, y: 0, z:-0.035})
    gsap.to(postcardDurhamMesh.position, { duration: 2, z: 0.01})

    gsap.to(postcardTulsaMesh.rotation, { duration: 1, y: 0, z: 0.182 })
    gsap.to(postcardTulsaMesh.position, { duration: 2, z: 0.00})

    titleText.style.visibility = "visible"
    paulText.style.visibility = "visible"
    menu.style.visibility = "visible"

    //dispose 
    orbGeometry.dispose()
    for (let i = 0; i < richmondOrbMeshes.length; i++){
        scene.remove(richmondOrbMeshes[i])
        richmondOrbTextures[i].dispose()
        richmondOrbMaterials[i].dispose()
    }
    for (let i = 0; i < durhamOrbMeshes.length; i++){
        scene.remove(durhamOrbMeshes[i])
        durhamOrbTextures[i].dispose()
        durhamOrbMaterials[i].dispose()
    }
    for (let i = 0; i < tulsaOrbMeshes.length; i++){
        scene.remove(tulsaOrbMeshes[i])
        tulsaOrbTextures[i].dispose()
        tulsaOrbMaterials[i].dispose()
    }


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
        console.log(renderer.info)
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

const landingPageTexturesArray = [durhamPostcardBW, richmondPostcardBW, tulsaPostcardBW, durhamPostcardColor, richmondPostcardColor, tulsaPostcardColor, durhamPostcardBack, richmondPostcardBack, tulsaPostcardBack, postcard1, postcard2, postcard3, postcard4,paperColor, paperDisplacement, paperNorm, paperOcc, paperRough]


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

 let landingMaterialArray =  [postcardRichmondMaterialFront, postcardRichmondMaterialBack, postcardTulsaMaterialFront, postcardTulsaMaterialBack , postcardDurhamMaterialFront, postcardDurhamMaterialBack, postcard1Material, postcard2Material, postcard3Material, postcard4Material, backgroundMaterial, backgroundPlaneGeometry ]
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
 const orbGeometry = new THREE.SphereGeometry(3, 32, 32 )

let  tulsaOrbTextures = []
let  tulsaOrbMaterials = []
 let tulsaOrbMeshes = []
 for(let i = 0; i < tulsaStoriesArray.length; i++){
    tulsaOrbTextures[i] = textureLoader.load('/stories/tulsa/'+tulsaStoriesArray[i][0]+'/1.jpg')
    tulsaOrbMaterials[i] = new THREE.MeshStandardMaterial( { map: tulsaOrbTextures[i] } )
    tulsaOrbMeshes[i] = new THREE.Mesh( orbGeometry, tulsaOrbMaterials[i] )
    tulsaOrbMeshes[i].name = tulsaStoriesArray[i][0]
}

 let durhamOrbTextures = []
 let durhamOrbMaterials = []
 let durhamOrbMeshes = []
 for(let i = 0; i < durhamStoriesArray.length; i++){
    durhamOrbTextures[i] = textureLoader.load('/stories/durham/'+durhamStoriesArray[i][0]+'/1.jpg')
    durhamOrbMaterials[i] = new THREE.MeshStandardMaterial( { map: durhamOrbTextures[i] } )
    durhamOrbMeshes[i] = new THREE.Mesh( orbGeometry, durhamOrbMaterials[i] )
    durhamOrbMeshes[i].name = durhamStoriesArray[i][0]
}

 let richmondOrbTextures = []
 let richmondOrbMaterials = []
 let richmondOrbMeshes = []
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
        if(landingPage && !aboutDivOpen) {
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
            
            
            
            let originalPosition = richmondOrbMeshes[i].position
           
            
             if( !storyImageLarge && !storyImageMouseover ) {
                if (currentObject === richmondOrbMeshes[i] && clickFlag == 1){
                    gsap.to(richmondOrbMeshes[i].position, {  duration: 2, x: orbPositionsX[i], y:orbPositionsY[i],  z: orbPositionsZ[i], ease: "circ"})
                    clickFlag = 0
                    storyDiv.style.opacity = "0"
                    window.setTimeout(() => {storyDiv.style.visibility = "hidden"; storyDiv.style.display = "none"}, 550)
                    orbInstruction.innerHTML = "Welcome to Jackson Ward, Richmond, Virginia. <br> Click on an Orb to learn more about this thriving community"
                    timeline.style.display = "block"
                } else if(clickFlag == 0 ) { 
                    storyDivLoader("richmond", i)
                    storyDiv.style.display = "block"
                    window.setTimeout(() => {storyDiv.style.opacity = "1"; storyDiv.style.visibility = "visible"}, 550)
                
                    
                    gsap.to(richmondOrbMeshes[i].position, {  duration: 2, x:-5, y: 0, z: 5, ease: "circ"})
                    gsap.to(richmondOrbMeshes[i].rotation, {  duration: 2, x:0, y: Math.PI * 2, z: 0, ease: "circ"})
                    gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})
                    gsap.to(camera.rotation, { duration: 2,  x: 0, z: 0, y: Math.PI * 0.5 })

                    
                    orbInstruction.innerHTML = " click on the orb to return to the gallery"
                    timeline.style.display = "none"
    
                    
                    clickFlag = 1
                }
            
                currentObject = richmondOrbMeshes[i]
            // window.setTimeout(() => {console.log(richmondOrbMeshes[i].position)}, 2000)
            
            
        }
            

        }
    }
 

}

/**
 * *************************** DURHAM  OBJECTS TO TEST *********************************************
 */
 if(durhamExperience) {
    
    for (let i = 0; i <durhamOrbMeshes.length; i++){
        
        if (currentIntersects.object === durhamOrbMeshes[i]){
            
            
            
            let originalPosition = durhamOrbMeshes[i].position
           
            
             if( !storyImageLarge && !storyImageMouseover ) {
                if (currentObject === durhamOrbMeshes[i] && clickFlag == 1){
                    gsap.to(durhamOrbMeshes[i].position, {  duration: 2, x: orbPositionsX[i], y:orbPositionsY[i],  z: orbPositionsZ[i], ease: "circ"})
                    clickFlag = 0
                    storyDiv.style.opacity = "0"
                    window.setTimeout(() => {storyDiv.style.visibility = "hidden"; storyDiv.style.display = "none"}, 550)
                    orbInstruction.innerHTML = "Welcome to Hayti, Durham, North Carolina. <br> Click on an Orb to learn more about this thriving community"
                    timeline.style.display = "block"
                } 
                else if(clickFlag == 0 ) 
                { 
                    storyDivLoader("durham", i)
                    storyDiv.style.display = "block"
                    window.setTimeout(() => {storyDiv.style.opacity = "1"; storyDiv.style.visibility = "visible"}, 550)
                
                    
                    gsap.to(durhamOrbMeshes[i].position, {  duration: 2, x:-5, y: 0, z: 5, ease: "circ"})
                    gsap.to(durhamOrbMeshes[i].rotation, {  duration: 2, x:0, y: Math.PI * 2, z: 0, ease: "circ"})
                    gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})
                    gsap.to(camera.rotation, { duration: 2,  x: 0, z: 0, y: Math.PI * 0.5 })

                    orbInstruction.innerHTML = " click on the orb to return to the gallery"
                    timeline.style.display = "none"
                    
                    clickFlag = 1
                }
            
                currentObject = durhamOrbMeshes[i]
            // window.setTimeout(() => {console.log(richmondOrbMeshes[i].position)}, 2000)
            
            
        }
            

        }
    }
 

}
/**
 * *************************** TULSA  OBJECTS TO TEST *********************************************
 */
 if(tulsaExperience) {
    
    for (let i = 0; i <tulsaOrbMeshes.length; i++){
        
        if (currentIntersects.object === tulsaOrbMeshes[i]){
            
            
            
            let originalPosition = tulsaOrbMeshes[i].position
           
            
             if( !storyImageLarge && !storyImageMouseover ) {
                if (currentObject === tulsaOrbMeshes[i] && clickFlag == 1){
                    gsap.to(tulsaOrbMeshes[i].position, {  duration: 2, x: orbPositionsX[i], y:orbPositionsY[i],  z: orbPositionsZ[i], ease: "circ"})
                    clickFlag = 0
                    storyDiv.style.opacity = "0"
                    window.setTimeout(() => {storyDiv.style.visibility = "hidden"; storyDiv.style.display = "none"}, 550)

                    orbInstruction.innerHTML = "Welcome to Greenwood, Tulsa, Oklahoma. <br> Click on an Orb to learn more about this thriving community"
                    timeline.style.display = "block"
                } 
                else if(clickFlag == 0 ) 
                { 
                    storyDivLoader("tulsa", i)
                    storyDiv.style.display = "block"
                    window.setTimeout(() => {storyDiv.style.opacity = "1"; storyDiv.style.visibility = "visible"}, 550)
                
                    
                    gsap.to(tulsaOrbMeshes[i].position, {  duration: 2, x:-5, y: 0, z: 5, ease: "circ"})
                    gsap.to(tulsaOrbMeshes[i].rotation, {  duration: 2, x:0, y: Math.PI * 2, z: 0, ease: "circ"})
                    gsap.to(camera.position, { duration: 2,  x: 0, y: 0, z: 3.867})
                    gsap.to(camera.rotation, { duration: 2,  x: 0, z: 0, y: Math.PI * 0.5 })

                    orbInstruction.innerHTML = " click on the orb to return to the gallery"
                    timeline.style.display = "none"
                    
                    clickFlag = 1
                }
            
                currentObject = tulsaOrbMeshes[i]
            // window.setTimeout(() => {console.log(richmondOrbMeshes[i].position)}, 2000)
            
            
        }
            

        }
    }
 

}

    } else {
        // camera.lookAt(new Vector3(0,0,0))
        // camera.position.x = 4
        // camera.position.y = 2
        // camera.position.z = 5
    }
    

})

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

// Controls
const controls = new OrbitControls(camera, canvas, renderer.domElement)
controls.enableDamping = true
controls.enabled = false


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
    
    let durhamHover = false
    let richmondHover = false
    let tulsaHover = false

    if(intersects.length){
        canvas.style.cursor = "pointer"
        // currentIntersects === null
        
        // console.log(intersects)
        // if(currentIntersects === null ){
            //console.log('in')
            
        if(landingPage && !aboutDivOpen){
            
                if(intersects[0].object.name === 'durhamPostcard') {
                postcardDurhamMesh.children[0].material.map = durhamPostcardColor
                // console.log(intersects)
            //     postcardRichmondMesh.children[0].material.map= richmondPostcardBW
            // postcardTulsaMesh.children[0].material.map= tulsaPostcardBW
                
                } else { postcardDurhamMesh.children[0].material.map = durhamPostcardBW     }
            
                if(intersects[0].object.name === 'richmondPostcard') {
                postcardRichmondMesh.children[0].material.map= richmondPostcardColor
            
                } else { postcardRichmondMesh.children[0].material.map= richmondPostcardBW}
                
                if(intersects[0].object.name === 'tulsaPostcard') {
                postcardTulsaMesh.children[0].material.map= tulsaPostcardColor
                } else { postcardTulsaMesh.children[0].material.map= tulsaPostcardBW }

        } 

        if(richmondExperience){
            for (let i = 0; i <richmondOrbMeshes.length; i++){
                if(intersects[0].object.name === richmondStoriesArray[i][0]){
                    // console.log(richmondStoriesArray[i][0])
                }
            }
        }
        if(durhamExperience){
            for (let i = 0; i <durhamOrbMeshes.length; i++){
                if(intersects[0].object.name === durhamStoriesArray[i][0]){
                    // console.log(durhamStoriesArray[i][0])
                }
            }
        }
        if(tulsaExperience){
            for (let i = 0; i <tulsaOrbMeshes.length; i++){
                if(intersects[0].object.name === tulsaStoriesArray[i][0]){
                    // console.log(durhamStoriesArray[i][0])
                }
            }
        }
        currentIntersects = intersects[0] 

        } else {
            canvas.style.cursor = "default"
        if(landingPage && !aboutDivOpen){
             if(currentIntersects){
                //console.log('out');
                postcardDurhamMesh.children[0].material.map = durhamPostcardBW
                postcardRichmondMesh.children[0].material.map= richmondPostcardBW
                postcardTulsaMesh.children[0].material.map= tulsaPostcardBW
            }
        }
        currentIntersects = null
    
    if(richmondExperience){
        if(currentIntersects){
            //console.log('out');
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