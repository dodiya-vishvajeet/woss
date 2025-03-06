/*=============== SHOW MENU ===============*/
const navMenu =document.getElementById('nav-menu');
const navToggle =document.getElementById('nav-toggle');
const navClose =document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click',()=>{
        navMenu.classList.add('show-menu');
    });
}

if(navClose){
    navClose.addEventListener('click',()=>{
        navMenu.classList.remove('show-menu');
    });
}


/*=============== REMOVE MENU MOBILE ===============*/


const navLink =document.querySelectorAll('.nav__link');
 const linkction = ()=>{
    const navMenu =document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');


}
navLink.forEach(element => element.addEventListener('click', linkction));
    



/*=============== SHADOW HEADER ===============*/
const scrollHeader =() =>{
    const header = document.getElementById('header');
    this.scrollY >=50? header.classList.add('shadow-header'):header.classList.remove('shadow-header')
}
window.addEventListener('scroll', scrollHeader);



/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp =()=>{
    const scrollUp =document.getElementById('scroll-up')
    this.scrollY >= 350 ?scrollUp.classList.add('show-scroll')
    :scrollUp.classList.remove('show-scroll');
}

window.addEventListener('scroll',scrollUp)



/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections =document.getElementById('section[id]')
const scrollActive = () =>{
    const scrollDown =window.scrollY

    sections.forEach(current =>{
        const sectionHeight =current.offsetHeight,
            sectionTop = current.offsetTop =58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

            if(scrollDown >sectionTop && scrollDown <= sectionTop+sectionHeight){
                sectionsClass.classList.add('active-link')
            
            }else{
                sectionsClass.classList.remove('active-link')
            }
    })
}

/*=============== DARK LIGHT THEME ===============*/ 

 const themeButton =document.getElementById('theme-button')

 const darkTheme ='dark-theme'
 const iconTheme = 'ri-sun-line'

// // previously  selected topic (if user selected)

 const selectedTheme = localStorage.getItem('selected-theme')
 const selectedIcon = localStorage.getItem('selected-icon')

//e obtain  the currenct  theme that the interface has by valedathing the dark  theme classes

 const getcurrentTheme = () => document.body.classList.contains(darkTheme)? 'dark' : 'light';
 const getcurrentIcon = () => themeButton.classList.contains(iconTheme)? 'ri-moon-line' :'ri-sun-line'


 if(selectedTheme){
     document.body.classList[selectedTheme === 'dark' ? 'add': 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add': 'remove'](iconTheme)
 }


 themeButton.addEventListener('click', () =>{
     document.body.classList.toggle(darkTheme)
     themeButton.classList.toggle(iconTheme)


     localStorage.setItem(selectedTheme, getcurrentTheme())
    localStorage.setItem(selectedIcon, getcurrentIcon())
 })

const themeButtons =document.getElementById('theme-button');
const body =document.querySelector('body');

/*=============== SCROLL REVEAL ANIMATION ===============*/


themeButtons.addEventListener('click', function(){
    themeButtons.classList.toggle('ri-sun-line');

    if(themeButtons,this.classList.toggle('ri-moon-line')){
        body.style.background = 'white';
        body.style.color ='black';
        body.style.transition ='2s';
    }else{
        body.style.background = 'black';
        body.style.color ='White';
        body.style.transition ='2s';
    }
       
    
})
//! /*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin:'top',
   distance:'60px',
   duration:2000,
   delay:300,
//     // reset:true // Animation repeat 
})

sr.reveal(`.home__perfil ,.about__image, .contact__mail`, {origin:'right'})
sr.reveal(`.home__name, .home__info,
.about__container .section__title-1,.about__info`, {origin:'left'})
sr.reveal(`.home__perfil ,.about__image`, {origin:'right'})
sr.reveal(`.services__card ,.projects__card`, {interval:100})










// form validation ===================
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        let isValid = true;

        // Name Validation
        const name = document.getElementById("name").value.trim();
        if (name === "") {
            alert("First Name is required.");
            isValid = false;
        }

        // Email Validation
        const email = document.getElementById("email").value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Enter a valid email address.");
            isValid = false;
        }

        // Subject Validation
        const subject = document.getElementById("subject").value.trim();
        if (subject === "") {
            alert("Subject is required.");
            isValid = false;
        }

        // Contact Number Validation (Indian Format)
        const number = document.getElementById("number").value.trim();
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(number)) {
            alert("Enter a valid 10-digit Indian contact number.");
            isValid = false;
        }

        // Message Validation (Minimum 5 words)
        const message = document.getElementById("Message").value.trim();
        if (message.split(/\s+/).length < 5) {
            alert("Message must contain at least 5 words.");
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        }
    });
});
