// setup canvas
const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');

// positions

const position = {
    x:30,
    y:30
}

// start drawing

let angel = 1;
let size = 1;
let delay = 1;

ctx.strokeWidth = 6;
ctx.strokeStyle = "#3a0090";
ctx.fillStyle="#ff0";
let initialX = (canvas.width/2)+position.x*Math.sin(1)
let x = (canvas.width/2)+position.x*Math.sin(angel)
let y = (canvas.height/2)+position.y*Math.cos(angel)

function draw(){
    ctx.beginPath();
    
   // ctx.arc(x,y,10,0,Math.PI*2)
    ctx.rect((canvas.width/2)+position.x*Math.sin(angel),(canvas.height/2)+position.y*Math.cos(angel),20,20)
    ctx.fill()
    ctx.stroke()
}


function animate() {
    draw()
    size += 0.1
    //console.log(angel);
    angel+=1
    
    // x = (canvas.width/2)+position.x*Math.sin(angel)
    // y = (canvas.height/2)+position.y*Math.cos(angel)
     
    if (Math.round(initialX)===Math.round(x)) {
        console.log('hhe');
    }
    
    position.x+=1
    position.y+=1
    requestAnimationFrame(animate)
}

animate()
 setInterval(function() {
     ctx.clearRect(0,0,canvas.width,canvas.height)
     delay+=0.1
     angel = 0
     position.x=0
     position.y=0
 }, 4000);