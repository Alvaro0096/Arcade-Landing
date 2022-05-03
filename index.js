const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//Mouse Position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

//Create Particle
class Particle{
    constructor(x, y, directionX, directionY, size, color){
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    //Method to draw individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#4607A9';
        ctx.fill();
    }
    //Check particle position, Chech mouse position, move the particle, draw the particel
    update(){
        //Check if particle is stillwithin canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        //Check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 2) {
                this.x += 2;
            }
            if (mouse.x > this.x && this.x > this.size * 2) {
                this.x -= 2;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 2) {
                this.y += 2;
            }
            if (mouse.y > this.y && this.y > this.size * 2) {
                this.y -= 2;
            }
        }
        //Move particle
        this.x += this.directionX;
        this.y += this.directionY;
        //Draw particle
        this.draw();
    }
}

//Create particle array
function init(){
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#4607A9';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        
    }
}

//Animation loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
    }
    connect();
}

//Check if particles are close enough to draw line between them
function connect(){
    let opacityValue = 1;
    for(let a = 0; a < particlesArray.length; a++){
        for(let b = a; b < particlesArray.length; b++){
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(70, 7, 169,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
                ctx.stroke();
            }
        }
    }
}

//Resize event
window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
);

//Mouse out event
window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    }    
);

init();
animate();
//End of canvas

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