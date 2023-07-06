class Character{
    constructor(ctx,canvas,x,y,size,sw,sh,img,defaultState,frameArray,frameRate){
        this.canvas = canvas;
        this.ctx = ctx;
        this.size = size;
        this.spriteHeight = sh;
        this.spriteWidth = sw;
        this.hitBoxWidth = null;
        this.hitBoxHeight = null;
        this.hitboxscale=null;
        this.height = this.spriteHeight;
        this.width = this.spriteWidth
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.hx=x;
        this.hy=y;
        this.img = img;
        this.frame=0;
        this.state=defaultState;
        this.spriteArray = [];
        this.options={};
        frameArray.forEach((frame,idx)=>{
            let loc = []
            for (let i = 0; i < frame.frames; i++) {
                let posx = i*this.spriteWidth;
                let posy = idx*this.spriteHeight;
                loc.push({x:posx,y:posy})
            }
            this.spriteArray[frame.name]=loc;
        })
        this.frameRate = frameRate;
        this.currentFrame=0;
        this.animate = true;
        this.loopAnimation = true;
        this.hitBoxType= null; //"squared"||"rounded"
    }
    update(){
        if (this.animate) {
            if (this.currentFrame%this.frameRate===0) {
                this.frame<this.spriteArray[this.state].length-1?this.frame++:
                this.loopAnimation?this.frame=0:null;
                this.currentFrame=0
            }
            this.currentFrame++
        }
    }
    draw(){
        this.ctx.drawImage(
            this.img,
            this.spriteArray[this.state][this.frame].x,
            this.spriteArray[this.state][this.frame].y,
            this.spriteWidth,
            this.spriteHeight,
            this.x - this.width*this.size/2,
            this.y - this.height*this.size/2,
            this.width*this.size,
            this.height*this.size
            )
    }
    drawHitBox(color,width){
        this.ctx.beginPath()
        this.ctx.lineWidth=width
        this.ctx.strokeStyle=color
        let x = this.hx - this.hitBoxWidth*this.hitboxscale/2;
        let y = this.hy - this.hitBoxHeight*this.hitboxscale/2;
        let radius;
        let height = radius = this.hitBoxHeight*this.hitboxscale;
        if (this.hitBoxType==="rounded") {
            radius=radius/2
            this.ctx.arc(this.hx,this.hy,radius,0,Math.PI*2)
        }
        else{
        this.ctx.rect(
            x,
            y,
            this.hitBoxWidth*this.hitboxscale,
            height
            )
        }
        this.ctx.stroke()
        this.ctx.closePath()
    }
    getHitBoxCord(){
        if (this.hitBoxType==="rounded") {
            return {
                type:"rounded",
                x:this.hx,
                y:this.hy,
                radius:this.hitBoxHeigh*this.hitboxscalet/2
            }
        }else{
            return {
                type:"squared",
                x:this.hx,
                y:this.hy,
                width:this.hitBoxWidth*this.hitboxscale,
                height:this.hitBoxHeight*this.hitboxscale
            }
        }
    }
    stop(){
        this.animate=false
        this.frame=0
        this.currentFrame=0
    }
    run(){
        this.animate=true
        this.frame=0
        this.currentFrame=0
    }
    dispatch(frame_name,looped=true){
        if (this.spriteArray[frame_name]) {
            if (!(this.state===frame_name)) {
                this.frame=0;
                this.currentFrame=0;
                this.state=frame_name;
                this.loopAnimation=looped
                return true
            }
        }
        return false
    }
    setAnimationSpeedMs(ms){
        this.frameRate=ms
    }
    adjustScale(scale){
        let percent = this.size/100
        let def = scale-this.size
        let final = def/percent;
        this.size=scale;
        this.hitboxscale=this.hitboxscale+(this.hitboxscale/100)*final;
    }
    createHitBox(x,y,width,height,scale,type="rounded"){
        this.hitboxscale=scale;
        this.hitBoxType=type;
        this.hitBoxHeight=height*scale;
        this.hitBoxWidth=width*scale;
        this.hy=y;
        this.hx=x;
    }
}
