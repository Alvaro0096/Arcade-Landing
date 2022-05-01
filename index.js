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