var dog, happyDog, database, foodStock;
var dogS, dogS2;
var foodS=20;
var foodButton, addButton;  
var fedTime, lastFed;
var foodObj;

function preload()
{
  dog=loadImage("images/dogImg.png");
  dog2=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dogS=createSprite(250, 250);
  dogS.addAnimation("dog", dog);
  dogS.addAnimation("happy dog", dog2);
  dogS.scale=0.1;
  database=firebase.database();

  foodObj=new Food;
  foodButton=createButton("Feed your Dog");
  foodButton.position(700, 95);
  fedTime.mousePressed(feedDog);
  addFood=createButton("Get more Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  });
  fill(255,255,254);
  textSixe(15);
  if(lastFed>=12){
    text("Your dog was last fed at  "+lastFed%12+"p.m.", 350, 30);
  }else if(lastFed===0){
    text("Your dog was last fed at 12 a.m.", 350, 30);
  }else{
    text("Your dog was last fed at "+lastFed+"a.m.", 350, 30);
  }
  drawSprites();
  foodObj.display();
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:FoodS
  })
}
function feedDog(){
  dog.addImage("sprites/dogImg1.png");
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  });
}
