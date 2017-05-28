export default class{
		
		constructor(playerIndex){
			Player.clicked = [];
			this.playerIndex = playerIndex; // 0 is O, 1 is X
			this.player = document.getElementsByClassName("players")[this.playerIndex];
			Player.boxes = Array.from(document.querySelector(".boxes").children);
			this.clicked = [];
			this.clickedBoxIndexes = [];
		}
		active(){
			this.player.classList.add("active");
		}
		inactive(){
			this.player.classList.remove("active");
		}
		choose(opponent){
			let _this = this,
			clickedLength = Player.clicked.length;
			_this.active();
			console.log(clickedLength)
			Player.boxes.forEach((box) => {
				if(_this.status() !== true && opponent.status() !== true){
					box.addEventListener("mouseenter", function forMouseEnter(event){
						if(Player.clicked.length > clickedLength){
							box.removeEventListener("mouseenter", forMouseEnter);
						}else if(!(box.classList.contains("box-filled-2")) && _this.playerIndex === 0){
							box.classList.add("box-filled-1");	
							event.stopImmediatePropagation();
						}else if(!(box.classList.contains("box-filled-1")) && _this.playerIndex === 1){
							box.classList.add("box-filled-2");	
							event.stopImmediatePropagation();
						}
					});
					box.addEventListener("mouseout",function forMouseOut(event){
						if(Player.clicked.length > clickedLength){
							box.removeEventListener("mouseout", forMouseOut);
						}else if(!(Player.clicked.includes(box))){
							box.classList.remove("box-filled-1");
							box.classList.remove("box-filled-2")
						}
					});
					box.addEventListener('click', function forMouseClick(event){
						//_this.status();
						if(Player.clicked.length > clickedLength){
							box.removeEventListener("click", forMouseClick);
						}else if(!(Player.clicked.includes(box)) && !(box.classList.contains("box-filled-2")) && _this.playerIndex === 0){
							//console.log(Player.boxes.indexOf(box))
							_this.clickedBoxIndexes.push(Player.boxes.indexOf(box));
							box.classList.add("box-filled-1");
							Player.clicked.push(box);
							_this.clicked.push(box);
							_this.inactive();
							opponent.active();
							opponent.choose(_this);
						}else if(!(Player.clicked.includes(box)) && !(box.classList.contains("box-filled-1")) && _this.playerIndex === 1){
							_this.clickedBoxIndexes.push(Player.boxes.indexOf(box));
							box.classList.add("box-filled-2");
							Player.clicked.push(box);
							_this.clicked.push(box);
							_this.inactive();
							opponent.active();
							opponent.choose(_this);
						}
					});
				}
			});
		}
		status(){
			if(this.clickedBoxIndexes.includes(0) && this.clickedBoxIndexes.includes(3) && this.clickedBoxIndexes.includes(6)){
				return true;
			}else if(this.clickedBoxIndexes.includes(0) && this.clickedBoxIndexes.includes(1) && this.clickedBoxIndexes.includes(2)){
				return true;
			}else if(this.clickedBoxIndexes.includes(0) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(8)){
				return true;
			}else if(this.clickedBoxIndexes.includes(3) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(5)){
				return true;
			}else if(this.clickedBoxIndexes.includes(6) && this.clickedBoxIndexes.includes(7) && this.clickedBoxIndexes.includes(8)){
				return true;
			}else if(this.clickedBoxIndexes.includes(1) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(7)){
				return true;
			}else if(this.clickedBoxIndexes.includes(2) && this.clickedBoxIndexes.includes(5) && this.clickedBoxIndexes.includes(8)){
				return true;
			}else if(this.clickedBoxIndexes.includes(2) && this.clickedBoxIndexes.includes(4) && this.clickedBoxIndexes.includes(6)){
				return true;
			}else{
				return false; //Game resulted in a draw..if draw and Player.clicked.length === 9
			}
		}
	}







