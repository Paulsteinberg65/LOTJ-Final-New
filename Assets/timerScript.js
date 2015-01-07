//#pragma strict //for explicit type casting
var myPosition : Transform;
var player: GameObject;
private var playerCounter: int = 0;	//number of politicians player has convinced on a given level
private var danteCounter: int = 0;	//number of politicians dante has convinced on a given level
private var timer: float = 120;
private var hours: int = 0;
private var minutes: int = 0;
private var time: String;
private var text: String;
private var GLOBAL : Object; //TODO delete if unnecessary
private var tm : Object;
private var running : boolean = false;	//variable for whether timer is running or not
private var show : boolean = false;
var finished : boolean = false;

function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");  //TODO delete if unnecessary
	tm = player.GetComponent(TextManager); //can use the tm.interacting variable if we want to stop timer during conversations TODO Delete if unnecessary
	//guiText.enabled = false;
}

function showTimer (){
	guiText.enabled = true;
	//show = true;
}

function hideTimer (){
	guiText.enabled = false;
	//show = false;
}

function runTimer(){
	running = true;
}

function stopTimer() {
	running = false;
}

function skip(){	//for use when a quiz is answered incorrectly.  advances time by amount
	timer += 10;
}

function senateRollback(){
	timer = 120;
}

function houseRollback(){
	timer = 420;
}

function toggleFinish(){
	if (!finished){
		finished = true;
	}
	else{
		finished = false;
	}
}

//function OnGui (){
//	//if (!show){
//	GUI.Box(new Rect(10, 10, 20, 10), text);
//	//}
//
//}

function Update () {
	
	guiText.enabled = true;
	//converts timer from seconds to "hours/minutes"
	hours = Mathf.FloorToInt(timer / 60F);
    minutes = Mathf.FloorToInt(timer - hours * 60);
    time = String.Format("{0:00}:{1:00}", hours, minutes);
	
	//updates text to display current "time"
	if(!finished){
		guiText.text = (time + " PM");
		
	}
	else{
		guiText.text = "Success!";
		
	}
	if(running){
			
			timer += Time.deltaTime;
			
	  		if (timer >= 720 && GLOBAL.inHouse){	//TODO: to be changed to a relevant time based number
	    		//some kind of game over Dante wins thing
	  		}
	  		else if (hours >= 420 && GLOBAL.inSenate) {	//if timer runs out
	  			//some kind of game over Dante wins thing
	  		}

	}
}