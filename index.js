// AOS INIT ANIMATION
AOS.init();

//Navbar Scroll Hide
let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
    let navbar_scroll = document.querySelector('.nav-header');
    let currentScrollPos = window.pageYOffset;
    if(prevScrollpos > currentScrollPos){
        navbar_scroll.style.top = '0';
    } else {
        navbar_scroll.style.top = '-400px';
    }
    prevScrollpos = currentScrollPos;
}

//Card blur && show info
const btn = document.querySelectorAll('.card-info');
const textDescription = document.querySelectorAll('.card-description');
const cardImg = document.querySelectorAll('.card-img');
const cardContent = document.querySelectorAll('.card-content');
const cardComplete = document.querySelectorAll('.card-arcade');

const handleClickCard = () => {
    for(let i = 0; i < btn.length; i++){
        btn[i].addEventListener('click', () => {
            cardImg[i].style.opacity = .2;
            cardContent[i].style.opacity = .2;
            textDescription[i].style.opacity = 1;
        })
    }
}

handleClickCard();

const handleLeaveCard = () => {
    for(let i = 0; i < cardComplete.length; i++){
        cardComplete[i].addEventListener('mouseleave', () => {
            cardImg[i].style.opacity = 1;
            cardContent[i].style.opacity = 1;
            textDescription[i].style.opacity = 0;
        })
    }
}

handleLeaveCard();