const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var star_body, star_sprite, star_image;
var fairy_body, fairy_sprite, fairy_animation;
var sky, sky_image;

function preload() {
  //preload the images here
  star_image = loadImage("images/star.png");
  fairy_animation = loadAnimation("images/fairy1.png","images/fairy2.png");
  sky_image = loadImage("images/starnight.png");
}

function setup() {
  createCanvas(800, 750);

  //creating the background
  sky = createSprite(400,375,800,750);
  sky.addImage(sky_image);
  
  //creating the engine and the world
  engine = Engine.create();
  world = engine.world;

  //creating the star body
  var star_options = {
    isStatic: true
  }
  star_body = Bodies.rectangle(700,25,10,10,star_options);
  World.add(world,star_body);
  //creating the star sprite
  star_sprite = createSprite(star_body.position.x, star_body.position.y,10,10);
  star_sprite.addImage(star_image);
  star_sprite.scale = 0.25;

  //creating the fairy body
  var fairy_options = {
    isStatic: true
  }
  fairy_body = Bodies.rectangle(200,500,10,10,fairy_options);
  World.add(world,fairy_body);
  //creating the fairy sprite
  fairy_sprite = createSprite(fairy_body.position.x,fairy_body.position.y,10,10);
  fairy_sprite.addAnimation("flying",fairy_animation);
  fairy_sprite.scale = 0.25;
  fairy_sprite.setCollider("rectangle",500,-50,100,100);
}


function draw() {
  background("black");

  //syncing the bodies to the sprites
  star_sprite.x = star_body.position.x;
  //star_sprite.x = star_body.position.x;
  star_body.position.x = star_sprite.x;
  fairy_sprite.x = fairy_body.position.x;
  fairy_sprite.y = fairy_body.position.y;

  if (star_sprite.x > 490 && star_sprite.isTouching(fairy_sprite)){
    //Matter.Body.setStatic(star_body,true);
    star_sprite.velocityY = 0;
  }

  drawSprites();
}

function keyPressed(){
  if (keyCode === LEFT_ARROW){
    fairy_body.position.x = fairy_body.position.x - 10;
  }
  if (keyCode === RIGHT_ARROW){
    fairy_body.position.x = fairy_body.position.x + 10;
  }
  if (keyCode === DOWN_ARROW){
    //Matter.Body.setStatic(star_body,false);
    star_sprite.velocityY = 2.5;
  }
}