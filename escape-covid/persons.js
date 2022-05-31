class Person{
    
    constructor(){
        this.pos=createVector(random(800),random(600));
        this.vel=p5.Vector.random2D();
        this.size=8;
        this.sick=false;
        this.m=1;
        this.lifespan=300;
        this.shouldDead=false;
    }
    


    update(){
        this.pos.add(this.vel);
        this.show();
        this.checkEdges();
        if(this.sick){
            this.lifespan--;
        }

        //if(this.sick && this.lifespan<=0){
        //    this.shouldDead=true;
        //}
        
    }

    show(){
        if(this.sick){
            fill(255,0,0);
        }else{
            fill(0,255,0);
        }
        ellipse(this.pos.x,this.pos.y,this.size*2,this.size*2);
    }

    checkEdges(){
        if(this.pos.y > 600 - this.size || this.pos.y < 0 + this.size){
            this.vel.y *= -1;
        }
        else if(this.pos.x > 800 - this.size || this.pos.x < 0 + this.size){
            this.vel.x *= -1;
        }
    }

    collision(other){
        let distanceVect=p5.Vector.sub(other.pos , this.pos);
        // Calculate magnitude of the vector separating the balls
        let distanceVectMag = distanceVect.mag();

        // Minimum distance before they are touching
        let minDistance = this.size + other.size;

        if (distanceVectMag < minDistance) {
        let distanceCorrection = (minDistance-distanceVectMag)/2.0;
        let d = distanceVect.copy();
        let correctionVector = d.normalize().mult(distanceCorrection);
        other.pos.add(correctionVector);
        this.pos.sub(correctionVector);

        // get angle of distanceVect
        let theta  = distanceVect.heading();
        // precalculate trig values
        let sine = sin(theta);
        let cosine = cos(theta);

        /* bTemp will hold rotated ball positions. You 
        just need to worry about bTemp[1] position*/
        let bTemp=[];
        bTemp[0]=createVector();
        bTemp[1]=createVector();

        /* this ball's position is relative to the other
        so you can use the vector between them (bVect) as the 
        reference point in the rotation expressions.
        bTemp[0].position.x and bTemp[0].position.y will initialize
        automatically to 0.0, which is what you want
        since b[1] will rotate around b[0] */
        bTemp[1].x  = cosine * distanceVect.x + sine * distanceVect.y;
        bTemp[1].y  = cosine * distanceVect.y - sine * distanceVect.x;

        // rotate Temporary velocities
        let vTemp=[];
        vTemp[0]=createVector();
        vTemp[1]=createVector();
        

        vTemp[0].x  = cosine * this.vel.x + sine * this.vel.y;
        vTemp[0].y  = cosine * this.vel.y - sine * this.vel.x;
        vTemp[1].x  = cosine * other.vel.x + sine * other.vel.y;
        vTemp[1].y  = cosine * other.vel.y - sine * other.vel.x;

        /* Now that velocities are rotated, you can use 1D
        conservation of momentum equations to calculate 
        the final velocity along the x-axis. */
        let vFinal=[];
        vFinal[0]=createVector();
        vFinal[1]=createVector();
        

        // final rotated velocity for b[0]
        vFinal[0].x = ((this.m - other.m) * vTemp[0].x + 2 * other.m * vTemp[1].x) / (this.m + other.m);
        vFinal[0].y = vTemp[0].y;

        // final rotated velocity for b[0]
        vFinal[1].x = ((other.m - this.m) * vTemp[1].x + 2 * this.m * vTemp[0].x) / (this.m + other.m);
        vFinal[1].y = vTemp[1].y;

        // hack to avoid clumping
        bTemp[0].x += vFinal[0].x;
        bTemp[1].x += vFinal[1].x;

        /* Rotate ball positions and velocities back
        Reverse signs in trig expressions to rotate 
        in the opposite direction */
        // rotate balls
        let bFinal=[];
        bFinal[0]=createVector();
        bFinal[1]=createVector();
        

        bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
        bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
        bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
        bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;

        // update balls to screen position
        other.pos.x = this.pos.x + bFinal[1].x;
        other.pos.y = this.pos.y + bFinal[1].y;

        this.pos.add(bFinal[0]);

        // update velocities
        this.vel.x = cosine * vFinal[0].x - sine * vFinal[0].y;
        this.vel.y = cosine * vFinal[0].y + sine * vFinal[0].x;
        other.vel.x = cosine * vFinal[1].x - sine * vFinal[1].y;
        other.vel.y = cosine * vFinal[1].y + sine * vFinal[1].x;
        //let d=dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
        if (distanceVectMag < minDistance && (this.sick || other.sick)){
            this.sick=true;
            other.sick=true;

        }
        }
    }

    
    died(){
        fill(165,6,6,127);
        ellipse(this.pos.x,this.pos.y,this.size*2,this.size*2);

    }

    
}