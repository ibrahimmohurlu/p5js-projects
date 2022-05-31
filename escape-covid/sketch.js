let population;
function setup(){
  createCanvas(1200,600);
  population=new Population(100);
  
}

function draw(){
  background(51);
  textSize(12);
  fill(0);
  text("H.ibrahim Mohurlu",1090,590);
  population.run();
  textSize(24);
  fill(200);
  text("Escape from the sick(red) people",840,50);
  fill(0,255,0);
  text("Alive People :"+(population.persons.length+1),840,75);
  text("Dead People :"+population.deadPersons.length,840,100);
  text("Sick People :"+population.sickPersons.length,840,125);
  
  if(population.player.sick){
    fill(255,0,0);
    textSize(36);
    text("You Got Sick!",840,175);
    noLoop();
  }
  if(population.persons.length+1==1){
    fill(0,255,0);
    textSize(36);
    text("You Are The Only",840,175);
    text("Survivor!",840,205);
    noLoop();
  }
  if(population.sickPersons.length<=0){
    fill(0,255,0);
    textSize(36);
    text("Disease Disappeared!",840,230);
    noLoop();
  }
  
}