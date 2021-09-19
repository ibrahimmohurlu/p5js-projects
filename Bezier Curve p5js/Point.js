class Point{
    constructor(x,y){
        this.x=x;
        this.y=y;
        this.r=6;
        this.move=false;
    }

    display(){
        if(this.move){
            fill(0,128,0,128);
        }else{
            fill(0,128);
        }
        ellipse(this.x,this.y,this.r*2);
        text('(' + str(this.x) + ',' + str(this.y) + ')' ,this.x+10, this.y);
    }
    update(){
        if(mouseIsPressed && mouseX>this.x-this.r && mouseX<this.x+this.r && mouseY>this.y-this.r && mouseY<this.y+this.r){
            this.move=true;
        }
    }

    mouseDragged(){
        if(this.move){
            this.x=mouseX;
            this.y=mouseY;
        }
    }
    mouseReleased(){
        this.move=false;
    }
}