var myPosition : Transform;
var walkSpeed : float = 1.0;
var runSpeed : float = 2.0;
var gridSize : int = 1;
enum Orientation {Horizontal, Vertical}
var gridOrientation = Orientation.Horizontal;
var allowDiagonals = false;
var correctDiagonalSpeed = true;
private var canControl : boolean = true;
private var input = Vector2.zero;
private var facing : String;
private var GLOBAL : Object;
private var gui : GameObject;
var questHeaderStyle : GUIStyle;
var questTextStyle : GUIStyle;
var sprite : tk2dAnimatedSprite;

var ts : Object;
var footsteps : AudioClip; //the footsteps audio clip to be used

var collisionManager : GameObject;
private var collisionDict : Object;
private var newLib : tk2dSpriteAnimation;
 
function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	GLOBAL.FindGUI();
	if(Application.loadedLevelName == "capitol") {
		ts = GameObject.Find("TIMER").GetComponent("timerScript"); //find the timer script for capitol
	}
	//gui = GameObject.Find("GUIController").GetComponent("GUIController");
	//code to change gender of player
	if (GLOBAL.playerGender == 1 ){
		newLib = Resources.Load("femaleSpriteAnimation",tk2dSpriteAnimation); //load the spriteAnimation prefab
		sprite.anim = newLib; //assign the newLib to the sprite anim var to change the animations
		sprite.Play("down");
		sprite.StopAndResetFrame();
	}
	else if (GLOBAL.playerGender == 0 ){
		newLib = Resources.Load("maleSpriteAnimation",tk2dSpriteAnimation); //^^^
		sprite.anim = newLib; //^^^
		sprite.Play("down");
		sprite.StopAndResetFrame();
	}
	
	//set the audio clip attached to the player to footsteps
	audio.clip = footsteps;
	
	//// This is a good place to load a specific level, since it runs after finishing the intro screens once everything is loaded
	/*if (Application.loadedLevelName == "Town1") {
		Application.LoadLevel("waterfall");
		GLOBAL.questNum = 3;
	}*/
	var myTransform = transform;
	var startPosition : Vector3;
	var endPosition : Vector3;
	var t : float;
	var tx : float;
	var moveSpeed = walkSpeed;
	facing = "down";
	
	Debug.Log("I'm working!");
	
 	collisionDict = collisionManager.GetComponent("CollisionManager").collisionDict;
	while (true) {
		while (input == Vector2.zero) {
			GetAxes();
			tx = 0.0;
			yield;
		}
		facing = GetFacing(startPosition, endPosition);
		transform.forward = Vector3.Normalize(new Vector3(Input.GetAxis("Horizontal"), 0f, Input.GetAxis("Vertical")));
		startPosition = myTransform.position;
		endPosition = gridOrientation == Orientation.Horizontal?
			Vector3(Mathf.Round(myTransform.position.x), 0.0, Mathf.Round(myTransform.position.z)) +
			Vector3(System.Math.Sign(input.x)*gridSize, 0.0, System.Math.Sign(input.y)*gridSize)
			:
			Vector3(Mathf.Round(myTransform.position.x), Mathf.Round(myTransform.position.y), -0.001) +
			Vector3(System.Math.Sign(input.x)*gridSize, System.Math.Sign(input.y)*gridSize, 0.0);
		t = tx;
		while (t < 1.0) {
			var dTime = Time.fixedDeltaTime;
			//moveSpeed = Input.GetButton("Run")? runSpeed : walkSpeed;
			t += Time.deltaTime * (moveSpeed/gridSize) * (correctDiagonalSpeed && input.x != 0.0 && input.y != 0.0? .7071 : 1.0);
			if (!collisionDict[(endPosition.x).ToString() + ", " + (endPosition.y).ToString()])
				myTransform.position = Vector3.Lerp(startPosition, endPosition, t);
			if (endPosition.x == -6.0 && GLOBAL.questNum==2 && Application.loadedLevelName == "Town1") {
				Application.LoadLevel("enterForest");
			}
			if (endPosition.x == 37 && (GLOBAL.questNum == 2 || GLOBAL.questNum == 3) && Application.loadedLevelName == "Maze") {
				if (GLOBAL.questNum == 2){
					myPosition.position.x = 35;
					//OnGUI();
					}
			}
			if (endPosition.x == 37 && endPosition.y > 0 && Application.loadedLevelName == "town2") {
				Application.LoadLevel("enterWaterfall");
			}
			//if (endPosition.x > 24 && endPosition.x < 26.5 && endPosition.y > -16.5 && endPosition.y < -15.5 
			//	&& input.y == 1.0 && Application.loadedLevelName == "capitol"){
			//	myPosition.position.x = 24;
			//	myPosition.position.y = 0;
			//}
			if (endPosition.x > 24 && endPosition.x < 26.5 && endPosition.y > -16.5 && endPosition.y < -15.5 
				&& input.y == 1.0 && Application.loadedLevelName == "capitol" && (GLOBAL.quizProg == 0) && GLOBAL.questNum == 8){
				senateReset();
			}
			if (endPosition.x > 103 && endPosition.x < 106 && endPosition.y > -25 && endPosition.y < -22 
				&& input.y == -1.0 && Application.loadedLevelName == "capitol" && (GLOBAL.quizProg == 4) && GLOBAL.questNum == 9){
				senateExit();
			}
			if (endPosition.x > 24 && endPosition.x < 26.5 && endPosition.y > -5.5 && endPosition.y < -3.5 
				&& input.y == 1.0 && Application.loadedLevelName == "capitol" && (GLOBAL.quizProg == 4) && GLOBAL.questNum == 10){
				houseReset();
			}
			myTransform.rotation = Quaternion(0.0, 1.0, 0.0, 0.0);
			yield;
		}
		tx = t - 1.0;	// Used to prevent slight visual hiccups on "grid lines" due to Time.deltaTime variance
		GetAxes();
		
		if (input.y == 1.0) {
			if (!sprite.IsPlaying("up"))
				sprite.Play("up");
		}
		else if (input.y == -1.0) {
			if (!sprite.IsPlaying("down"))
				sprite.Play("down");
		}
		else if (input.x == -1.0) {
			if (!sprite.IsPlaying("right"))
				sprite.Play("right");
		}
		else if (input.x == 1.0) {
			if (!sprite.IsPlaying("left"))
				sprite.Play("left");
		}
		else
			sprite.StopAndResetFrame();
//		if (endPosition.x < startPosition.x && !sprite.IsPlaying("left")) {
//			Debug.Log("left");
//			sprite.Play("left");
//		}
//		else if (endPosition.x > startPosition.x && !sprite.IsPlaying("right")) {
//			Debug.Log("right");
//			sprite.Play("right");
//		}
//		else {
//			Debug.Log("stop");
//			sprite.StopAndResetFrame();
//		}
	}
}
/*function OnGUI(){
	GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You need help finding your father.  Find 5 people in the forest and then exit through here.", questTextStyle);
	GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Have you found all 5 people in the forest?", questHeaderStyle);	
				
}
*/

function senateReset() {
	myPosition.position.x = 105;
	myPosition.position.y = -23;
	ts.senateRollback();
	ts.showTimer();
	ts.runTimer();
	GLOBAL.SenateToggle();
}
function senateExit(){
	myPosition.position.x = 25;
	myPosition.position.y = -15;
	ts.hideTimer();
}
function houseReset() {
	myPosition.position.x = 110;
	myPosition.position.y = 33.5;
	ts.houseRollback();
	if(ts.finished){
	ts.toggleFinish();
	}
	ts.showTimer();
	ts.runTimer();
	GLOBAL.HouseToggle();
}


function Update () {
	if (sprite.Playing) {
		if (!audio.isPlaying) {
			audio.Play();
		}
	} else if (!sprite.Playing) {
		audio.Stop();
	}
	//if you're in Town1, change z position near all NPCs and signs to stop overlap
	if (Application.loadedLevelName == "Town1") {
		if (myPosition.position.x == 29.0 && myPosition.position.y == 5.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == -2.0 && myPosition.position.y == -1.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 15.0 && myPosition.position.y == -28.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 40.0 && myPosition.position.y == -19.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 8.0 && myPosition.position.y == -21.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == -3.0 && myPosition.position.y == -28.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 30.0 && myPosition.position.y == -28.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 15.0 && myPosition.position.y == -22.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 6.0 && myPosition.position.y == -21.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 27.0 && myPosition.position.y == -27.0) {
				     myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 10.0 && myPosition.position.y == 4.0) {
				     myPosition.position.z = -3.0;
		}

	}
	//if you're in Maze, change z position near all NPCs to stop overlap
	else if (Application.loadedLevelName == "Maze") {
		if (myPosition.position.x == 28.0 && myPosition.position.y == 10.0) {
				myPosition.position.z = -2.0;
			}
		else if (myPosition.position.x == -27.0 && myPosition.position.y == -7.0) {
				myPosition.position.z = -2.0;
			}
		else if (myPosition.position.x == -28.0 && myPosition.position.y == 8.0) {
				myPosition.position.z = -2.0;
			}
		else if (myPosition.position.x == -1.0 && myPosition.position.y == -4.0) {
				myPosition.position.z = -2.0;
			}
		else if (myPosition.position.x == 34.0 && myPosition.position.y == 6.0) {
				myPosition.position.z = -2.0;
		}
		
	}
	//if you're in Town3, change z position near all NPCs to stop overlap
	else if (Application.loadedLevelName == "town3") {
		if (myPosition.position.x == 34.0 && myPosition.position.y == 32.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 29.0 && myPosition.position.y == 32.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 42.0 && myPosition.position.y == 40.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 41.0 && myPosition.position.y == 41.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 44.0 && myPosition.position.y == 41.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 32.0 && myPosition.position.y == 33.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 20.0 && myPosition.position.y == 38.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 13.0 && myPosition.position.y == 39.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 45.0 && myPosition.position.y == 39.0) {
				myPosition.position.z = -3.0;
			}
		else if (myPosition.position.x == 11.5 && myPosition.position.y == 39.0) {
				myPosition.position.z = -3.0;
		}
		
	}
	
}
 
function GetAxes () {
//	input = Vector2(Input.GetAxis("Horizontal"), Input.GetAxis("Vertical"));
//	if (allowDiagonals)
//		return;
//	if (Mathf.Abs(input.x) > Mathf.Abs(input.y))
//		input.y = 0.0;
//	else
//		input.x = 0.0;

	input = Vector2(0.0, 0.0);
	if (canControl) {
		if (Input.GetButton("Up"))
			input.y = 1.0;
		else if (Input.GetButton("Down"))
			input.y = -1.0;
		else if (Input.GetButton("Left"))
			input.x = -1.0;
		else if (Input.GetButton("Right"))
			input.x = 1.0;
	}
}

function GetFacing (startPosition : Vector3, endPosition : Vector3) {
	var posDelta = input;
	if (posDelta.x == -1)
		return "left";
	else if (posDelta.x == 1)
		return "right";
	else if (posDelta.y == -1)
		return "down";
	else if (posDelta.y == 1)
		return "up";
}