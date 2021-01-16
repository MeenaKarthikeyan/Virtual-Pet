var dog,happyDog,database;
var foodS,foodStock;


function preload(){
dogImage=loadImage("images/dogImg.png");
happyDogImage=loadImage("images/dogImg1.png");

}

function setup() {
  database=firebase.database();
  createCanvas(400,500);
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(200,400,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;
}

function draw() {
  background("white");
  text("Food:"+foodS,200,20);
  if(keyDown(DOWN_ARROW)){
    foodS = foodS-1
    writeStock(foodS);
    dog.addImage(happyDogImage)
  } else {
    dog.addImage(dogImage)
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  
}
function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}