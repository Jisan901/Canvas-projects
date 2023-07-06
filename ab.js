const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');
ctx.fillStyle='white'
ctx.font="20px Aerial"
ctx.fillText("Jisan",10,30)
ctx.fill()
// ctx.lineWidth = 3
// ctx.strokeStyle='#f0f'
// ctx.rect(0,0,40,40)
// ctx.stroke()

let hue = 0;

const pixels = ctx.getImageData(0,0,70,50)

ctx.clearRect(0,0,canvas.width, canvas.height)

const mouse = {
    x:null,
    y:null
}

const particleArray = [];


class Particle{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = 1;
        this.density = (Math.random()*23)+7;
        this.baseX = this.x;
        this.baseY = this.y;
    }
    update(){
        
        let dx = mouse.x-this.x;
        let dy = mouse.y-this.y;
        let distance = Math.sqrt(dx*dx+dy*dy)
        let forceDX =dx/distance
        let forceDY = dy/distance
        let maxDistance = 100;
        let force = (maxDistance-distance)/maxDistance
        let directionX = forceDX*force*this.density
        let directionY = forceDY*force*this.density
        if (distance<maxDistance) {
            this.x-=directionX
            this.y-=directionY
        }
        else{
            if (this.baseX!==this.x) {
                let dx = this.x-this.baseX
                this.x -= dx/10
            }
            if (this.baseY!==this.Y) {
                let dy = this.y-this.baseY
                this.y -= dy/10
            }
        }
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = `#000`
        ctx.font = '10px Aerial'
       ctx.fillText('•'||generateRandomAscii(),this.x,this.y)
        //ctx.arc(this.x,this.y,this.size,0,Math.PI*2)
        ctx.fill()
    }
}



function init(){
    
    for (let y = 0; y < pixels.height; y++) {
        for (let x = 0; x < pixels.width; x++) {
            if (pixels.data[(y*4*pixels.width)+(x*4)+3]>128) {
                let poseX = x-8;
                let poseY = y+2;
                particleArray.push(new Particle(poseX*7,poseY*7))
            }
        }
    }
    
    
    // for (let i = 0; i < 1000; i++) {
    //     particleArray.push(new Particle(Math.random()*canvas.width,Math.random()*canvas.height))
    // }
}
init()

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw()
        particleArray[i].update()
    }

    connect(particleArray)
    requestAnimationFrame(animate);
}
animate()

window.ontouchmove=(e)=>{
    //console.log(e);
    mouse.x=e.touches[0].clientX
    mouse.y=e.touches[0].clientY
}



function connect(particles){
            let opacity = 1
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let dx = particles[a].x- particles[b].x
                    let dy = particles[a].y - particles[b].y
                    let distance = Math.sqrt(dx*dx+dy*dy);
                    if (distance<20) {
                        opacity = 1-(distance/20)
                        ctx.beginPath()
                        ctx.lineWidth = 2
                        ctx.strokeStyle = `hsla(${particles[a].y-particles[b].x},100%,50%,${opacity})`
                        ctx.moveTo(particles[a].x,particles[a].y)
                        ctx.lineTo(particles[b].x,particles[b].y)
                        ctx.stroke()
                    }
                }
            }
        }
        

function generateRandomAscii(){
    let letters = 'abcdefghijklmnopqrstuvwxyz123456789'
    let index = Math.floor(Math.random()*(letters.length-1)+1);
    return letters[index]
}


function generateRandomColor(){
    let red = Math.round(Math.random()*254+1)
    let green = Math.round(Math.random()*254+1)
    let blue = Math.round(Math.random()*9+1)
    return `rgb(${red},${blue},${green})`
}