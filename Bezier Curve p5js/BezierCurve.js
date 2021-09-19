class BezierCurve{
    constructor(points){
        this.points=points;
    }
    displayCurve(){
        let n = this.points.length-1;
        for(let t=0;t<=1;t+=0.001){
            let px=0;
            let py=0;
            for(let i=0;i<this.points.length;i++){
                px+=this.points[i].x * this.J(n,i,t);
                py+=this.points[i].y * this.J(n,i,t);
            }
            point(px,py);
        }
    }
    J(n,i,t){
        return this.combinations(n,i) * pow(t,i) * pow((1-t),n-i);
    }

    combinations(n, i) {
        return this.factorial(n) / (this.factorial(i)*this.factorial(n-i));
    }

    factorial(n){
        let answer = 1;
        if (n == 0 || n == 1){
          return answer;
        }else{
          for(var i = n; i >= 1; i--){
            answer = answer * i;
          }
          return answer;
        }  
      }
}