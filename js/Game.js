class Game{
	constructor(PlayerObject){
		Game.board = document.getElementById("board"); //static property that represents the game board
		this.boxes = Array.from(document.querySelector(".boxes").children); //array property that represents each box on the game board
		this.body = document.querySelector("body");
		this.screen = ""
		PlayerObject.reset();
		this.player1 = new PlayerObject(0);
		this.player2 = new PlayerObject(1);
		this.winner = undefined;
	}
	start(){
		//Method to start the first game
		window.onload = () => {			
			this.screen = this.displayStartScreen();
			this.hideStartScreen();
			this.player1.choose(this.player2, () => {this.displayWinnerScreen()}, () => {this.displayTieScreen()});
		}
	}
	displayStartScreen(){
		let start_screen = document.createElement("div");
		Game.board.style.display = "none";
		start_screen.className = "screen screen-start";
		start_screen.id = "start";
		document.body.insertBefore(start_screen, Game.board);
		start_screen.innerHTML = "<header><h1>Tic Tac Toe</h1><a href=\"#\" class=\"button\">Start game</a></header>";
		return start_screen;
	}
	hideStartScreen(){
		let start_button = document.querySelector(".button");
		start_button.onclick = (e) => {
			this.screen.style.display = "none";
			this.body.removeChild(this.screen);
			Game.board.style.display = "block";
			this.player2.inactive();
		}
	}
	displayWinnerScreen(){
		let winner_screen = document.createElement("div");
		Game.board.style.display = "none";
		winner_screen.className = "screen screen-win";
		winner_screen.id = "finish";
		if(this.player1.winStatus() === true){ //if player1 won
			this.display(winner_screen, 'one');
			console.log(Player.clicked.length)
		}else if(this.player2.winStatus() === true){ //if player2 won
			this.display(winner_screen, 'two');
		}else if(Player.clicked.length === 9){
			this.displayTieScreen();
		}
	}
	displayTieScreen(){
		console.log("Hi")
		if ((this.player1.drawStatus() === true) || (this.player2.drawStatus() === true)){
			let tie_screen = document.createElement("div");
			Game.board.style.display = "none";
			tie_screen.className = "screen screen-win";
			tie_screen.id = "finish";
			this.display(tie_screen, 'tie');
		}
	}
	static startNewGame(button){
		//Creates a new game when the button passed in is clicked
		button.onclick = (e) => {
			let winner_screen = document.querySelector("#finish"),
			body = document.querySelector("body");
			winner_screen.style.display = "none";
			body.removeChild(winner_screen);		
			Game.board.style.display = "block";
			Player.reset();
			let newGame = new Game(Player);
			return newGame.player1.choose(newGame.player2, () => {newGame.displayWinnerScreen()}, () => {newGame.displayTieScreen()});	
		}
	}
	display(screen, classEnding){
		//Reusuable function/method for displaying the end screen
		screen.classList.add(`screen-win-${classEnding}`); 
		document.body.appendChild(screen);
		screen.innerHTML = "<header><h1>Tic Tac Toe</h1><p class=\"message\"></p><a href=\"#\" class=\"button\">New game</a></header>";
		let start_button = document.querySelector(".button");
		this.player1.active();
		Game.startNewGame(start_button);
	}
}

