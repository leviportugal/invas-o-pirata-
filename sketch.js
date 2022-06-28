const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;

var canvas, angle, tower, ground, cannon, ball;
var balls = [];
var boats = [];

var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;

var boatbrokenAnimation = [];
var boatbrokenSpriteData, boatbrokenSpriteSheet;


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");

  boatSpriteData =  loadJSON ("assets/boat/boat.json");
  boatSpriteSheet = loadImage ("assets/boat/boat.png");

  boatbrokenSpriteData = loadJSON ("assets/boat/brokenBoat.json")
  boatbrokenSpriteSheet = loadImage ("assets/boat/brokenBoat.png")
}

function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  angleMode (DEGREES);
  cannon = new Cannon(180, 110, 130, 100, 20);

  var boatFrames = boatSpriteData.frames;
  for (var i=0; i< boatFrames.length; i++){
    var pos = boatFrames[i].position;
    var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatAnimation.push (img);
  }

  var boatbrokenFrames = boatbrokenSpriteData.frames;
  for (var i=0; i< boatbrokenFrames.length; i++){
    var pos = boatbrokenFrames[i].position;
    var img = boatbrokenSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
    boatbrokenAnimation.push (img);
  }
 
}

function draw() {
  image(backgroundImg,0,0,1200,600)
  Engine.update(engine);

  rect(ground.position.x, ground.position.y, width * 2, 1);
  
  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

  cannon.show();
 //ball.show();
 for (var i=0; i< balls.length; i++){
  showCannonBalls(balls[i],i);
  collisionWithBoat(i);
 }
 showBoats();
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.show();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      ball.remove(index);
    }
  }
}

function collisionWithBoat(index) {
  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body);

      if (collision.collided) {
        boats[i].remove(i);

        Matter.World.remove(world, balls[index].body);
        delete balls[index];
      }
    }
  }
}

function keyReleased (){
  if (keyCode === DOWN_ARROW){
    balls[balls.length-1].lance ();
  }
}

function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var ball = new CannonBall(cannon.x, cannon.y); //Nova bala
    balls.push(ball); // colocando na matriz
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var boat = new Boat(width, height - 100, 170, 170, position, boatAnimation);
      boats.push(boat);
    }

    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0});

        boats[i].display();
        boats[i].animate();
      } else {
        boats[i];
      }
    }
   
  } else {
    var boat = new Boat(width, height - 60, 170, 170, -60, boatAnimation);
    boats.push(boat);
  }
}
