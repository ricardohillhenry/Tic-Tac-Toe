
class Player{	
	constructor(playerIndex){
		Player.clicked = [];
		Player.boxes = Array.from(document.querySelector(".boxes").children);
		Player.clickedBoxIndexes = [];
		this.clicked = [];
		this.playerIndex = playerIndex; // 0 is O, 1 is X
		this.player = document.getElementsByClassName("players")[this.playerIndex];
		this.clickedBoxIndexes = [];
		this.playerOpponent = '';
		this.winnerStatus = false;
	}
	active(){
		//Adds the active class to the player's rectangle
		this.player.classList.add("active");
	}
	inactive(){
		//Removes the active class to the player's rectangle
		this.player.classList.remove("active");
	}
	choose(opponent, callback){
		let _this = this,
		clickedLength = Player.clicked.length;
		opponent.inactive();
		_this.active();
		_this.playerOpponent = opponent;
		for(let x = 0; x < Player.boxes.length; x++){
			//Goes through each box 
			if((_this.winStatus() === false && opponent.winStatus() === false) && (_this.drawStatus() === false || opponent.drawStatus() === false)){
				Player.boxes[x].addEventListener("mouseenter", function forMouseEnter(event){
					if(Player.clicked.length > clickedLength){
						//Player.boxes[x].removeEventListener("mouseenter", forMouseEnter);
					}else if(!(Player.boxes[x].classList.contains("box-filled-2")) && _this.playerIndex === 0){
						//if a box has been clicked by player O
						Player.boxes[x].classList.add("box-filled-1");	
						event.stopImmediatePropagation();
					}else if(!(Player.boxes[x].classList.contains("box-filled-1")) && _this.playerIndex === 1){
						//if a box has been clicked by player X
						Player.boxes[x].classList.add("box-filled-2");	
						event.stopImmediatePropagation();
					}
				});
				Player.boxes[x].addEventListener("mouseout",function forMouseOut(event){
					 if(!(Player.clicked.includes(Player.boxes[x]))){
					 	//If the box has been clicked, the background will not be removed
						Player.boxes[x].classList.remove("box-filled-1");
						Player.boxes[x].classList.remove("box-filled-2");
					}
				});
				Player.boxes[x].addEventListener('click', function forMouseClick(event){
					//try on click to check to see if drawStatus() is true
					if((_this.winStatus() === false && opponent.winStatus() === false) && (_this.drawStatus() === false || opponent.drawStatus() === false)){
						//If neither player has won
						if(!(Player.clicked.includes(Player.boxes[x])) && !(Player.boxes[x].classList.contains("box-filled-2")) && _this.playerIndex === 0){
							//If neither player has clicked on the box and the box doesn't contain an X and the player is player0 (O)
							_this.clickedBoxIndexes.push(Player.boxes.indexOf(Player.boxes[x]));
							Player.clickedBoxIndexes.push(Player.boxes.indexOf(Player.boxes[x]));
							Player.boxes[x].classList.add("box-filled-1");
							Player.clicked.push(Player.boxes[x]);
							_this.clicked.push(Player.boxes[x]);
							_this.inactive();
							opponent.active();
							opponent.choose(_this, callback);
						}else if(!(Player.clicked.includes(Player.boxes[x])) && !(Player.boxes[x].classList.contains("box-filled-1")) && _this.playerIndex === 1){
							//If neither player has clicked on the box and the box doesn't contain an O and the player is player1 (X)
							_this.clickedBoxIndexes.push(Player.boxes.indexOf(Player.boxes[x]));
							Player.clickedBoxIndexes.push(Player.boxes.indexOf(Player.boxes[x]));
							Player.boxes[x].classList.add("box-filled-2");
							Player.clicked.push(Player.boxes[x]);
							_this.clicked.push(Player.boxes[x]);
							_this.inactive();
							opponent.active();
							opponent.choose(_this, callback);
						}
					}
				});
			}else{
				callback(); // Game/ability to choose is over
				//callback2(); //!!!!!!callback@() is causing problems when a new game is created
				this.inactive();
				Player.reset();
				this.reset();
				break; //Keeps from calling callback 9 times
			}
		}
	}
	winStatus(){
		//Determines whether the game has ended or not
		if((this.clickedBoxIndexes.includes(0) && this.clickedBoxIndexes.includes(3) && this.clickedBoxIndexes.includes(6)) ||
			(this.clickedBoxIndexes.includes(0) && this.clickedBoxIndexes.includes(1) && this.clickedBoxIndexes.includes(2)) ||
			(this.clickedBoxIndexes.includes(0) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(8)) ||
			(this.clickedBoxIndexes.includes(3) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(5)) ||
			(this.clickedBoxIndexes.includes(6) && this.clickedBoxIndexes.includes(7) && this.clickedBoxIndexes.includes(8)) ||
			(this.clickedBoxIndexes.includes(1) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(7)) ||
			(this.clickedBoxIndexes.includes(2) && this.clickedBoxIndexes.includes(5) && this.clickedBoxIndexes.includes(8)) ||
			(this.clickedBoxIndexes.includes(2) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(6)))
		{
			this.winnerStatus = true;
			return this.winnerStatus; //This player won
		}else{
			this.winnerStatus = false;
			return this.winnerStatus; //This player did not win 
		}
	}
	drawStatus(){
		if(Player.clickedBoxIndexes.includes(0) && Player.clickedBoxIndexes.includes(1) && Player.clickedBoxIndexes.includes(2) &&
			Player.clickedBoxIndexes.includes(3) && Player.clickedBoxIndexes.includes(4) && Player.clickedBoxIndexes.includes(5) &&
			Player.clickedBoxIndexes.includes(6) && Player.clickedBoxIndexes.includes(7) && Player.clickedBoxIndexes.includes(8))
		{
			return true; //No player has gotten 3 in a row; game is a draw
		}else{
			return false; //All spaces have not been filled yet
		}
	}
	static reset(){
		//reset critical code that should be passed around between games
		Player.clicked = [];
		Player.clickedBoxIndexes = [];
		Player.boxes = Array.from(document.querySelector(".boxes").children);
		Player.boxes.forEach((box) => {
			//Empties boxes out after every game
			box.className = "box";
		});
	}
	reset(){
		this.winnerStatus = false;
		this.clickedBoxIndexes = [];
	}
}

