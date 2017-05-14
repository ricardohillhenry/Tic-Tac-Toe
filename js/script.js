
var board = document.getElementById("board"),
body = document.querySelector("body"),
start_screen = "",
turn_o = document.getElementsByTagName("svg")[0],
turn_x = document.getElementsByTagName("svg")[1];
//spit = body.children["div"];

window.onload = () => {
	console.log(body)
	start_screen = showStart();
	hideStart();

	turn_x.onclick = (e) => {
		player1.inactive();
		player2.active();
	}
};



//=========== Functions ============
function showStart(){
	let start_screen = document.createElement("div");

	board.style.display = "none";

	start_screen.className = "screen screen-start";
	start_screen.id = "start";
	document.body.insertBefore(start_screen,board);
	start_screen.innerHTML = "<header><h1>Tic Tac Toe</h1><a href=\"#\" class=\"button\">Start game</a></header>";
	player1.active();
 	player1.choose()
	return start_screen;
}

function hideStart(){
	let start_button = document.querySelector(".button");
	start_button.onclick = (e) => {
		start_screen.style.display = "none";
		body.removeChild(start_screen);
		board.style.display = "block";
	}
}
let boxes = Array.from(document.querySelector(".boxes").children),
clickedBoxes = [];

var player1 = {
	//player: document.getElementsByClassName("players")[0],
	active: () => {
		this.player = document.getElementsByClassName("players")[0];
		this.status = "active"
		this.player.className += " active";
	},
	inactive: () => {
		this.player.className = "players"
	},
	choose: () => {
		let clicked;
		for(let x = 0; x < boxes.length; x++){
			
			boxes[x].addEventListener("mouseenter",(event)=>{
				clicked = false;
				if(clickedBoxes[x] == boxes[x]){
					event.stopImmediatePropagation();
				}else{
					boxes[x].style.backgroundImage = "url(./img/o.svg)"; //file/letter should be retrieved from player object instance	
				}
			});
			boxes[x].addEventListener("mouseout",(event)=>{
				
				if(clickedBoxes[x] == boxes[x]){
					event.stopImmediatePropagation();
				}else{
					boxes[x].style.backgroundImage = "";
				}
			});
			boxes[x].addEventListener('click', (event)=>{
				clicked = true;
				boxes[x].style.backgroundImage = "url(./img/o.svg)";
				clickedBoxes[x] = boxes[x];
				player1.inactive();
				player2.active();
				player2.choose();
			});
		}
	}
}

var player2 = {
	//player: document.getElementsByClassName("players")[0],
	active: () => {
		this.player = document.getElementsByClassName("players")[1];
		this.player.className += " active";
	},
	inactive: () => {
		this.player.className = "players";
	},
	choose: () => {
		let clickedBoxes = []; //empty clickedBoxes at start of new game
		let click;
		for(let x = 0; x < boxes.length; x++){
			
			boxes[x].addEventListener("mouseenter",(event)=>{
				click = false;
				if(clickedBoxes[x] == boxes[x]){
					event.stopImmediatePropagation();
				}else{
					boxes[x].style.backgroundImage = "url(./img/x.svg)"; //file/letter should be retrieved from player object instance	
				}
			});
			boxes[x].addEventListener("mouseout",(event)=>{
				
				if(clickedBoxes[x] == boxes[x]){
					event.stopImmediatePropagation();
				}else{
					boxes[x].style.backgroundImage = "";
				}
			});
			boxes[x].addEventListener('click', (event)=>{
				click = true;
				boxes[x].style.backgroundImage = "url(./img/x.svg)";
				clickedBoxes[x] = boxes[x];
				player2.inactive();
				player1.active();
				player1.choose();
			});
		}
	},
	checkStatus: () => {
		for(let x = 0; x < boxes.length; x++){
			if(clickedBoxes){

			}
		}
	}
}

// var Box = {
// 	addEvents: () => {
// 		boxes.forEach(box) => {
// 			box.addEventListener("mouseenter",(e) => {
// 				if(clickedBoxes == boxes[x]){
// 					e.stopImmediatePropagation();
// 				}else{
// 					box.style.backgroundImage = "url(./img/o.svg)";
// 				}
// 			})
// 		}
// 	}
// }



// Next to do:
// 1) Alternate X and O after click
// 2) Switch top active on click to indicate who's turn it is
//012, 345, 678, 036, 147, 258, 048, 246