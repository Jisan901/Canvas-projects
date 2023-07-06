function main() {
    /*const frameArray = [
    {
        name:"move_top",
        frames:9
    },
    {
        name:"move_left",
        frames:9
    },
    {
        name:"move_bottom",
        frames:9
    },
    {
        name:"move_right",
        frames:9
    }
    ]*/
    let gameOver = false;
const frameArray=[
    {
        name:"i1",
        frames:7
    },
    {
        name:"i2",
        frames:7
    },
    {
        name:"i3",
        frames:7
    },
    {
        name:"i4",
        frames:9
    },
    {
        name:"i5",
        frames:11
    },
    {
        name:"i6",
        frames:5
    },
    {
        name:"i7",
        frames:7
    },
    {
        name:"i8",
        frames:7,
    },
    {
        name:"i9",
        frames:12
    },
    {
        name:"i10",
        frames:4
    }
    ]
let plyer;
let background;
const canvas = document.getElementById('canvas');
canvas.height = 720;
canvas.width = 800;
const ctx = canvas.getContext('2d');

const img = new Image()
const img2 = new Image()
const img3 = new Image()
const img4 = new Image()
img.src="./a.png"
img2.src="./background.png"
img3.src="./enemy2.png"
img4.src="./enemy4.png"
window.onload = ()=>{
background = new Background(ctx,img2,2400,720,5)
let adjustY = 250;
plyer = new Character(
    ctx,
    canvas,
    192/2,
    canvas.height-adjustY/2,
    1,
    192,
    175,
    img,
    "i1",
    frameArray,
    3
    )
    
    let enemyArray=[];
    
    let event = null;
    let ids = ["btn_up","btn_left","btn_right","btn_down","btn_action"];
    ids.forEach((id)=>{
        document.getElementById(id).addEventListener("touchstart", ()=>{
            event=id
        })
        document.getElementById(id).addEventListener("touchend", ()=>{
            event=null
        })
    })
    plyer.options.speed = 0;
    plyer.options.vy = 0;
    plyer.options.weight = 1;
    let vy=0;
    let score = 0
    
    
    let lastTime=0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomInterval = Math.random()*500+1000
    
    function handleEnemy(deltaTime){
        
        if (enemyTimer > enemyInterval+randomInterval) {
            enemyArray.push(new Character(
        ctx,
        canvas,
        canvas.width+212/2,
        canvas.height-212/2,
        0.7,
        213,
        212,
        img4,
        "ip",
        [{name:"ip",frames:9}],
        5
        ))
            randomInterval=Math.random()*500+1000;
            enemyTimer=0
        }
        else{
            enemyTimer+=deltaTime
        }
        enemyArray.forEach(enemy=>{
        enemy.x-=Math.random()*8+5
        if (enemy.x<0-enemy.width*enemy.size*0.5) {
            enemy.options.markForDeletion = true;
            score++
            //console.log(score);
        }
        
            enemy.createHitBox(enemy.x,enemy.y,enemy.width,enemy.height,enemy.size)
            
            enemy.draw()
            enemy.update()
        })
        enemyArray=enemyArray.filter(enemy=>!enemy.options.markForDeletion)
    }
    
    
    function handlePlayer(player){
        
        if (event==="btn_left") {
            player.options.speed = -5;
            player.dispatch('i4')
            
        }else if(event==="btn_right"){
            player.dispatch('i4')
            background.speed=background.baseSpeed
            player.options.speed = 5;
        }else if(event==="btn_up"&&onGround(player)){
            player.options.vy-=30;
        }else if(event==="btn_down"&&onGround(player)){
            player.dispatch('i6')
            background.speed=0
        }else if(event==="btn_down"&&!onGround(player)){
            player.dispatch('i7')
            player.options.vy+=4
        }else if(event==="btn_action"){
            player.dispatch('i7')
        }
        else{
            player.options.speed=0;
            player.dispatch('i4')
            background.speed=background.baseSpeed
        }
        
        
        // horizontal move
        player.x += player.options.speed;
        if (player.x<player.baseX) {
            player.x=player.baseX
            
            
        } else if(player.x>player.canvas.width-player.baseX){
            player.x=player.canvas.width-player.baseX
            
        }
        // vertical move
        player.y+= player.options.vy
        if (!onGround(player)) {
            player.options.vy+=player.options.weight;
            
        }
        else{
            player.options.vy=0;
        }
        
        
        if (player.y>player.baseY) {
            player.y=player.baseY
        }
        
        
        //collision
        
        enemyArray.forEach((enemy)=>{
            let dx = enemy.x - player.x
            let dy = enemy.y - player.y
            
            
            
            
            
            
            
            let distance = Math.sqrt(dx*dx+dy*dy)
            
            if (distance<enemy.hitBoxHeight*enemy.hitboxscale/2+player.hitBoxHeight*player.hitboxscale/2) {
                if (player.state==='i7') {
                    enemy.options.markForDeletion=true
                    score++
                }
                else{
                    
                    player.ctx.font = "50px Aerial"
                    player.ctx.fillStyle="#fff"
                    player.ctx.fillText("game over ,score:"+score,canvas.width/2-300,200)
                    player.ctx.fill()
                    gameOver=true
                    
                }
            }
            
        })
        
        
    }
    function onGround(player){
        return player.y >= player.baseY;
    }
    
    function animate(timestamp){
        const deltaTime = timestamp - lastTime
        lastTime=timestamp
        ctx.clearRect(0,0,canvas.width,canvas.height)
        background.draw()
        background.update()
        plyer.createHitBox(plyer.x,plyer.y,plyer.width,plyer.height,plyer.size)
        plyer.draw()
        plyer.update()
        
        handlePlayer(plyer)
        handleEnemy(deltaTime)
       //plyer.drawHitBox("#ff0",5)
        !gameOver&&requestAnimationFrame(animate)
    }
    animate(0)
}


}
main()