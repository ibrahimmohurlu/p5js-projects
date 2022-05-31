class Population{
    constructor(size){
        this.size=size;
        this.persons=[];
        this.deadPersons=[];
        this.sickPersons=[];
        this.player=new Player(mouseX,mouseY);

        for(let i=0;i<this.size;i++){
            this.persons[i]=new Person();
            if(i==5){
                this.persons[i].sick=true;
            }
        }
        
    }
    run(){
        for(let i=0;i<this.persons.length;i++){
            for(let j=0;j<this.persons.length;j++){
                this.persons[i].collision(this.persons[j]);
                this.player.interaction(this.persons[j]);
            }
            this.player.show();
            this.player.update();
            this.player.checkEdges();
            this.persons[i].update();
            

            for(let i=0;i<this.persons.length;i++){
                if(this.persons[i].lifespan<=0){
                    this.deadPersons.push(this.persons[i]);
                    this.persons.splice(i,1);
                }
            }
            
            
        }
        
        for(let k=0;k<this.deadPersons.length;k++){
            this.deadPersons[k].died();
        }
        for(let x=0;x<this.persons.length;x++){
            if(this.persons[x].sick==true){
                this.sickPersons.push(this.persons[x]);
            }
        }
        this.sickPersons=this.squash(this.sickPersons);
        this.deadPersons=this.squash(this.deadPersons);
        for(let k=0;k<this.sickPersons.length;k++){
            if(this.sickPersons[k].lifespan<=0){
                this.sickPersons.splice(k,1);
            }
        }
        for(let i=0;i<this.persons.length;i++){
            if((this.persons[i].pos.x)<0 || (this.persons[i].pos.x)>800){
                this.persons.splice(i,1);
            }
            if(this.persons[i].pos.y < 0 || (this.persons[i].pos.y)>600){
                this.persons.splice(i,1);
            }
        }
        
        for(let i=0;i<this.sickPersons.length;i++){
            if(this.sickPersons[i].pos.x < 0 || this.sickPersons[i].pos.x>800){
                this.sickPersons.splice(i,1);
            }
            if(this.sickPersons[i].pos.y<0 || (this.sickPersons[i].pos.y)>600){
                this.sickPersons.splice(i,1);
            }
        }
    }

    squash(arr){
        var tmp = [];
        for(var i = 0; i < arr.length; i++){
            if(tmp.indexOf(arr[i]) == -1){
            tmp.push(arr[i]);
            }
        }
        return tmp;
    }
}