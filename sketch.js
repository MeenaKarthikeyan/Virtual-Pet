var dog,happyDog,database;
var foodS = 0,foodStock;


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
    
  if(keyDown(DOWN_ARROW)){
    
    writeStock(foodS);
    dog.addImage(happyDogImage)
  } else {
    dog.addImage(dogImage)
  }
  text("Food:" + foodS,200,20);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  console.log("read" + foodS)  
  
}
function writeStock(x){
  if(x<=0){
    x=20;
  }else{
    x=x-1
  }
  console.log("write" + x)  
  database.ref('/').update({
    Food:x
  })
}