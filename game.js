window.onload = init;
window.onmousemove = mouseMove;
window.onkeydown = keyDown;
var canvas ,cW ,cH,ctx;
var bg,ball,board;
var st;
var boardX,boardY,boardW,boardH;
var ballX,ballY;
boardX = 350;
boardY = 700;
boardW = 150;
boardH = 20;
ballX =350;
ballY = 300;
cW = 1000;
cH = 800;
var vx,vy;
vx = 15;
vy = 15;

var bricks = [];
var brickW,brickH;
brickW = 150;
brickH = 50;
//初始化游戏设置
function init(){
//	trace("游戏初始化完毕！");
	canvas = document.getElementById("canvas");
	cW = canvas.width;
	cH = canvas.height;
	
    ctx = canvas.getContext("2d");
	bg = addImg("img/bg.png");
	ball = addImg("img/22.png");
	board = addImg("img/board.png");
	creatBrick();
	st = setInterval(updateCanvas,1000/60);//60帧
}
//刷新画布
function updateCanvas(){
	ctx.clearRect(0,0,cW,cH);
	ctx.drawImage(bg,0,0);
	ctx.drawImage(ball,ballX,ballY);
	ctx.drawImage(board,boardX,boardY);
	
	ballMove();
	
	ballBoardHit();
	
	drawBricks();
	ballBricksHit();
}

function trace(msg){
	console.log(msg);
}

//生成砖块
function creatBrick(){
	for (var i = 0;i<6;i++) {
		for (var j = 0;j<4;j++) {
			var item = addImg("img/11.png");
			var x = i * (brickW+20);
			var y = j * (brickH+5)+30;
			var obj = {item:item,x:x,y:y}
			bricks.push(obj);
		}
	}
}

//绘制砖块
function drawBricks(){
	var l = bricks.length;
	for (var i = 0;i < l;i++) {
		var item = bricks[i];
//		bricks[i].style.background="red";
		ctx.drawImage(item.item,item.x,item.y);
	}
}
function ballBricksHit(){
	var l = bricks.length
	for (var i = 0;i<l;i++) {
		var item = bricks[i].item;
		var b = testObjectHit(bricks[i].x,bricks[i].y,item.width,item.height,ballX,ballY);
		if(b){
			bricks.splice(i,1);
			vy *= -1;
			i--;
			l--;
		}
		
		
	}
}
//碰撞检测
function testObjectHit(x1,y1,w,h,x2,y2){
	if(x2 > x1 && y2 > y1 && x2 < x1 + w && y2 < y1 + h){
		return true;
	}else{
		return false;
	}
}
//判断球与挡板的碰撞
function ballBoardHit(){
	var b = testObjectHit(boardX,boardY,boardW,boardH,ballX + 25,ballY +50);
	if(b){
		vy *= -1;
	}
}
//球移动
function ballMove(){
	ballX += vx;
	ballY += vy;
	if(ballX >= cW - ball.width){
		vx *= -1;
	}else if(ballX <= 0){
		vx *= -1;
	}
	if(ballY <= 0){
		vy *= -1;
	}else if(ballY >= cH - ball.height){
//		console.log("gg")
	}
	
}
//生成图片
function addImg(_src){
	var img = new Image();
	img.src = _src;
	return img;
}

function mouseMove(e){
	boardX = e.clientX - boardW/2;
}
function keyDown(e){
	if(e.keyCode == 37){
		boardX -= 50;
	}
	if(e.keyCode == 39){
		boardX += 50;
	}
}

