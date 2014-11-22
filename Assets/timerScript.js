#pragma strict
var myPosition : Transform;
var player: GameObject;
var timer: float = 300;
var running: int = 0;	//variable for whether timer is running or not

function Start () {

}

function Update () {
	//changes guitext to the timer numbers
	guiText.text = timer.ToString("F0");
	
	if (myPosition.position.x > 24 && myPosition.position.y > 0){
		running = 1;
	}
	else{
		running = 0;
	}
	if(running == 1){
			timer += Time.deltaTime;
	  		if (timer < 1000){	//TODO: to be changed to a relevant time based number
	    		guiText.text = timer.ToString("F0");
	  		}
	  		else{	//if timer runs out
	  			//some kind of game over Dante wins thing
	  		}
	}
}