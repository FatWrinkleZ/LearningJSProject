const target_fps = 7;
var canvas, context;
canvas = document.getElementById("snakeCanvas");
context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var amt_pieces = 1;
const blockSize = 10;

class Vector2{
    x = 0;
    y = 0;
    constructor(_x, _y){
        this.x = Math.floor(_x);
        this.y = Math.floor(_y);
    }
}
var pieces = [new Vector2(width/2, height/2)]; 
var food;
var direction;

start();

document.addEventListener('keydown', checkInput);
setInterval(update, 1000 / target_fps);

function addPiece(){
    pieces.push(new Vector2(pieces[amt_pieces-1].x, pieces[amt_pieces-1].y-blockSize));
    amt_pieces++;
    console.log("Array is now " + amt_pieces + " size");
    console.log("Most recent piece is at (" + pieces[amt_pieces-1].x,pieces[amt_pieces-1].y + ")");
}

function start(){
    pieces = [new Vector2(width/2, height/2)]; 
    direction = new Vector2(blockSize, 0);
    console.log(pieces[amt_pieces-1].x, pieces[amt_pieces-1].y);
    addPiece();
    addPiece();
    addPiece();
    food = new Vector2((Math.random() * width/blockSize), (Math.random()* height/blockSize));
    food.x *= blockSize;
    food.y*=blockSize;
    console.log(food.x, food.y);
}

function update(){
    context.fillStyle = "black";
    context.fillRect(0,0,width, height);
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, 10, 10);
    context.fillStyle = "yellow";
    pieces[0].x += direction.x;
    pieces[0].y += direction.y;
    if(pieces[0].x == food.x && pieces[0].y == food.y){
        food = new Vector2((Math.random() * width/blockSize), (Math.random()* height/blockSize));
        food.x *= blockSize;
        food.y*=blockSize;
        addPiece();
    }

    context.fillRect(pieces[0].x, pieces[0].y, 10, 10);
    var lastElement = new Vector2(pieces[0].x, pieces[0].y);
    for(var i = 1; i < amt_pieces; i++){
        var tempElement = new Vector2(pieces[i].x, pieces[i].y);
        pieces[i] = new Vector2(lastElement.x, lastElement.y);
        lastElement = new Vector2(tempElement.x, tempElement.y);
        context.fillRect(pieces[i].x, pieces[i].y, 10, 10);
        //console.log("This was called " + i + " times");
        /*if(pieces[0].x == pieces[i].x && pieces[0].y == pieces[i].y){
            start();
        }*/
    }
    /*if(pieces[0].x < 0 || pieces[0].x > width || pieces[0].y < 0 || pieces[0].y > height){
        start();
    }*/
}

function checkInput(event){
    switch(event.keyCode){
        case 65:
            if(direction.x == 0){
                direction.x = -blockSize;
                direction.y = 0;
            }
            break;
        case 83:
            if(direction.y == 0){
                direction.y = blockSize;
                direction.x = 0;
            }
            break;
        case 87:
            if(direction.y == 0){
                direction.y = -blockSize;
                direction.x = 0;
            }
            break;
        case 68:
            if(direction.x == 0){
                direction.y = 0;
                direction.x = blockSize;
            }
            break;
        default:
            break;
    }
    //console.log("Pressed " + event.keyCode);
}
