const target_fps = 1;
var canvas, context;
canvas = document.getElementById("snakeCanvas");
context = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var amt_pieces = 1;

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
setInterval(update, 1000 / target_fps);

function addPiece(){
    pieces.push(new Vector2(pieces[amt_pieces-1].x, pieces[amt_pieces-1].y-1));
    amt_pieces++;
    console.log("Array is now " + amt_pieces + " size");
    console.log("Most recent piece is at (" + pieces[amt_pieces-1].x,pieces[amt_pieces-1].y + ")");
}

function start(){
    direction = new Vector2(1, 0);
    console.log(pieces[amt_pieces-1].x, pieces[amt_pieces-1].y);
    addPiece();
    addPiece();
    addPiece();
    food = new Vector2(Math.floor(Math.random * width), Math.floor(Math.random* height));
}

function update(){
    context.fillStyle = "black";
    context.fillRect(0,0,width, height);
    context.fillStyle = "yellow";
    pieces[0].x += direction.x;
    pieces[0].y += direction.y;
    if(pieces[0].x == food.x && pieces[0].y == food.y){
        food = new Vector2(Math.random * width, Math.random* height);
    }
    context.fillRect([pieces[0].x, pieces[0].y], 10, 10);
    var lastElement = new Vector2(pieces[0].x, pieces[0].y);
    for(var i = 1; i < amt_pieces; i++){
        var tempElement = new Vector2(pieces[i].x, pieces[i].y);
        pieces[i] = new Vector2(lastElement.x, lastElement.y);
        lastElement = new Vector2(tempElement.x, tempElement.y);
        context.fillRect(pieces[i].x, pieces[i].y, 10, 10);
        lastInd++;
        console.log("This was called " + i + " times");
    }

}