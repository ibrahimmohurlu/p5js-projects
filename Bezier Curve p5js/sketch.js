let points=[];
let resetBtn;
function setup(){
    createCanvas(800,600);
    resetBtn=select("#btnReset")
    resetBtn.mousePressed(()=>points=[]);
}

function draw(){
    background(180);
    for(let i=0;i<points.length;i++){
        points[i].update();
        points[i].display();
    }
    let curve=new BezierCurve(points);
    curve.displayCurve();
}

function doubleClicked(){
    let pt=new Point(mouseX,mouseY);
    points.push(pt);
}

function mouseDragged(){
    for(let i=0;i<points.length;i++){
        points[i].mouseDragged();
    }
    
}

function mouseReleased(){
    for(let i=0;i<points.length;i++){
        points[i].mouseReleased();
    }
}