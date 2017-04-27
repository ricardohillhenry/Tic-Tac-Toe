
var board = document.getElementById("board"),
body = document.querySelector("body"),
start_screen = "",
turn_o = document.getElementsByTagName("svg")[0],
turn_x = document.getElementsByTagName("svg")[1];

window.onload = () => {
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
		let boxes = Array.from(document.querySelector(".boxes").children);
		let click;
		//boxes.forEach((box) => {
		for(let x = 0; x < boxes.length; x++){
			
			boxes[x].addEventListener("mouseover",(event)=>{
				click = false;
				boxes[x].style.backgroundImage = "url(./img/o.svg)"; //file/letter should be retrieved from player object instance
				//console.log(box)
				
			});
			boxes[x].addEventListener("mouseout",(event)=>{
				
				if(click == true){
					event.stopImmediatePropagation();
				}else{
					boxes[x].style.backgroundImage = "";
				}
			});
			boxes[x].addEventListener('click', (event)=>{
				click = true;
				boxes[x].style.backgroundImage = "url(./img/o.svg)";
				//this.event.stopImmediatePropagation()
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
	}
}

var players = [player1, player2]
players.forEach((player) => {
	player.status
})

//console.log(boxes);
function mouseout(bool){

}

//Note to self:
//Move mouseout and click out of mouseover scope, then try to break out
//