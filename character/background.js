class Background{
    constructor(ctx,img,width,height,speed){
        this.ctx = ctx;
        this.img=img;
        this.speed = speed;
        this.baseSpeed = speed;
        this.x=0;
        this.y=0;
        this.width=width;
        this.height=height;
    }
    update(){
        if (this.x<0-this.width) {
            this.x=0;
        }
        this.x-=this.speed;
    }
    draw(){
        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
        this.ctx.drawImage(this.img, this.x + this.width-this.speed, this.y, this.width, this.height)
    }
    stop(){
        this.speed=0;
    }
    run(){
        this.speed=this.baseSpeed
    }
    adjust(speed){
        this.speed = speed;
        this.baseSpeed = speed;
    }
}