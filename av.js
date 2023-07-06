const canvas = document.getElementById('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
const ctx = canvas.getContext('2d');
ctx.strokeStyle = "#fff"
ctx.lineWidth = 5

let lineArray = [];

class Line{
    constructor(sx,sy,ex,ey,pitch){
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
        this.baseEx = ex;
        this.baseEy = ey;
        this.pitch = pitch;
    }
    update(){
        let dx = this.ex-this.sx
        let dy = this.ey-this.sy
        let distance = Math.sqrt(dx*dx+dy*dy)
        if (distance<150) {
            
        this.ex+=dx/60
        this.ey+=dy/60
        }
    }
    draw(){
        ctx.beginPath();
        ctx.moveTo(this.sx,this.sy)
        ctx.lineTo(this.ex,this.ey)
        ctx.stroke()
    }
}

function init(){
    let angle = 0;
    let radius = 30;
    for (let i = 0; i < 50; i++) {
        let x = Math.sin(angle)
        let y = Math.cos(angle)
        lineArray.push(new Line(
            x*30+(canvas.width/2),
            y*30+(canvas.height/2),
            x*100+(canvas.width/2),
            y*100+(canvas.height/2)
            ,5
        ))
        angle++
    }
}
init()

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for (let i = 0; i < lineArray.length; i++) {
        lineArray[i].draw()
        lineArray[i].update()
    }
    requestAnimationFrame(animate)
}
animate()