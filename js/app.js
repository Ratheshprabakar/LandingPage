/* Global variables */
const navList = document.getElementById("items-nav");
const header = document.getElementById('header');
const navBar = document.querySelector("nav");
let navItems = null;
let isScrolling = false;


/* --- Function to create navbar items --- */
function createNavItems() {
    const items = document.querySelectorAll("section");

    for (const item of items) {
        const li = document.createElement("li");
        const itemId = item.getAttribute("id");
        const itemData = item.getAttribute("data-nav");

        li.innerHTML = `<a href="#${itemId}" class="links">${itemData}</a> | `;

        navList.appendChild(li);
    }

    navItems = document.querySelectorAll("a.links");
};

createNavItems();


/* --- Create header elements --- */
function createHeader() {

    /* create a title, 2 paragraphs and add they to header */

    const title = document.createElement('h1');
    title.textContent = 'What is Mobile phones';

    const paragraph = document.createElement('p');
    paragraph.textContent = 'A mobile phone (also known as a hand phone, cell phone, or cellular telephone) is a small portable radio telephone.  ' +
        'The mobile phone can be used to communicate over long distances without wires.';
    
    const paragraph2 = document.createElement('p');
    paragraph2.textContent = 'A mobilephones can also be available in different sizes.';

    header.appendChild(title);
    header.appendChild(paragraph);
    header.appendChild(paragraph2);

    /* style header */
    header.setAttribute(
        'style', 
        'display: flex; flex-direction: column; justify-content: center; text-align: center;'
    );
};

createHeader();


/* --- Create 4 sections about Mobile Phones--- */
function createSections() {

    /* array of objects to save the data of each Mobiles */
    const doc = [
        {
            info: 'Best Mobile Phone on the market <br/><br/> Positive points: Better battery than last generation, Multiple apps, Many sensors, ' +
            'Good quality OLED screen, 4G connection, Good fitness features <br/><br/> Negative points: Absurdly expensive, Compatible with iPhone only',
            image: './images/apple.png'
        },
        {
            info: 'Best Mobile phone with AI camera <br/><br/> Positive points: Affordable price, Good battery life, ' + 
            'Beautiful and flashy design <br/><br/> Negative points: NFC not included, Processing speed is low',
            image: './images/apple.png'
        },
        {
            info: 'Best Mobile phone with Fingerpoint Sensor <br/><br/> Positive points: Good battery life, Circular design, Durable'  +
            '<br/><br/> Negative points: Applications must be installed at your own risk, Operating system could be more complete',
            image: './images/apple.png'
        },
        {
            info: 'Best Gaming Mobile Phone with Face detection <br/><br/> Positive points: Great battery life, Good processor, Tizen OS, Very beautiful' +
            '<br/><br/> Negative points: Without Google Maps, Whatsapp or Facebook, Proprietary Wireless Charger',
            image: './images/apple.png'
        }
    ];

    /* Go through navItems */
    navItems.forEach((item, index) => {        
        const section = document.querySelector(item.getAttribute('href'));
        const MobileInfo = doc[index];

        /* create a div (to be styled) and add an image  */
        const div = document.createElement('div');

        const img = document.createElement('img');
        img.src = MobileInfo.image;
        img.alt = section.getAttribute('data-nav');

        div.appendChild(img);

        /* create an article and add a title and a paragraph */
        const article = document.createElement('article');

        const title = document.createElement('h2');
        title.textContent = section.getAttribute('data-nav');
        
        const info = document.createElement('div');
        info.innerHTML = MobileInfo.info;
        
        article.appendChild(title);
        article.appendChild(info);

        /* add div and article to section */
        section.appendChild(div);
        section.appendChild(article);
    });
};

createSections();


/* --- scroll to top when button (id = btn-scroll-top) is clicked --- */
document.getElementById("btn-scroll-top").addEventListener('click', function() {
    window.scrollTo(0, 0);
})


/* --- Show or hide button (id = btn-scroll-top) --- */
const showHideButton = () => {
    const btn = document.getElementById("btn-scroll-top");
    const showButton = window.scrollY > window.innerHeight / 3;

    if (showButton === true) {
        btn.style.visibility = "visible";
    } else {
        btn.style.visibility = "hidden";
    }
};

document.addEventListener("scroll", showHideButton);


/* --- Active the section that is in the viewport --- */
function showActiveSection() {
    const sections = document.querySelectorAll("section[data-nav]");

    sections.forEach(section => {
        navItems.forEach(item => {
            if (item.hash === ('#' + section.id)) {
                if (isInViewport(section)) {
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            }
        });
    });
}

/* verify if section is in viewport */
function isInViewport(section) {
    const bounding = section.getBoundingClientRect();
    const headerHeidght = header.getBoundingClientRect().height;
    
    return (
        ((bounding.top + headerHeidght) <= (document.documentElement.clientHeight, window.innerHeight || 0) &&
        (bounding.top + headerHeidght) - bounding.height >= -90)
    );
};

document.addEventListener("scroll", showActiveSection);

/* --- Show navBar and hide it after 1.5s --- */
function showNavBar() {
    if (!isScrolling) {
        isScrolling = true;
        navBar.classList.remove("hide");
    
        setTimeout(function() {
            isScrolling = false;
            navBar.classList.add("hide");
        }, 1500);
    }
};

document.addEventListener("scroll", showNavBar);