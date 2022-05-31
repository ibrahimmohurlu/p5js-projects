class Player{
    constructor(){
        this.pos=createVector(mouseX,mouseY);
        this.sick=false;
        this.size=8;
    }
    show(){
        if(this.sick){
            fill(255,0,0);
        }
        fill(59, 59, 217);
        ellipse(this.pos.x,this.pos.y,this.size*2,this.size*2);
    }
    update(){
        this.pos.x=mouseX;
        this.pos.y=mouseY;
    }
    checkEdges(){
        if(this.pos.x>800){
            this.pos.x=800-this.size;
        }
        if(this.pos.x<0){
            this.pos.x=0+this.size;
        }
        if(this.pos.y>600){
            this.pos.y=600-this.size;
        }
        if(this.pos.y<0){
            this.pos.y=0+this.size;
        }
            
    }
    interaction(other){
        let minDistance=this.size+other.size;
        let d=dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
        if (d < minDistance && (this.sick || other.sick)){
            this.sick=true;
        }
    }
}