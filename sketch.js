//Create variables here
var dog , dogImg , happydogImg , database , foodS , foodStock ;
var  feed ,addFood;
var fedTime , lastFed ;
var foodObj ;

function preload()
{
  //load images here
  dogImg = loadImage("images/Dog.png");
  happydogImg = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(800, 500);
  foodObj = new Food();

 
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(700,260,40,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  

  feed = createButton("Feed The Dog");
  feed.position(700,95);
feed.mousePressed(FeedDog);

addFood = createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(AddFood);


  
 
}


function draw() {  
background(46,139,87);

foodObj.display();

fedTime = database.ref('FeedTime');
  fedTime.on("value" , function(data){
    lastFed = data.val();
  })


fill(225,225,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed: " + lastFed%12 + "PM" ,350 , 30);
  }

  else if(lastFed===0){
    text("Last Feed: 12 AM" ,350,30 );
  }
  else{
    text("Last Feed: " + lastFed + " AM" ,350,30);
  }

 
  drawSprites();
}

//functions are here..

function readStock(){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

function FeedDog(){

  dog.addImage(happydogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
   FeedTime: hour()
  })
}

function AddFood(){

  foodS = foodS + 1;
  database.ref('/').update({
    Food: foodS
  
  })
 }

 function updateFedTime(){
  database.ref('/').update({
  lastFed  : FedTime
 })
 }