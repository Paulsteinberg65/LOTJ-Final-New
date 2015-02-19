private var GLOBAL : Object;
var nextScene : String;
var textImg : Texture2D;
var img : Texture2D;
var boyimg : Texture2D;
var girlimg : Texture2D;
var sprite : tk2dAnimatedSprite;
sprite = GetComponent(tk2dAnimatedSprite);
var selection : int = 0;

function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL"); //copied from playerMovement is this necessary?
}

function Update () {
	if (Input.GetButtonDown("Space")) {
		GLOBAL.refreshGender(selection); //saves gender to GLOBAL using GLOBAL's method
		Application.LoadLevel(nextScene);
	}
	if (Input.GetButtonDown("Left") || Input.GetButtonDown("Right") || Input.GetButtonDown("Up")
		|| Input.GetButtonDown("Down")) {
		if (Input.GetButtonDown("Right") || Input.GetButtonDown("Up")) {
			if (selection == 1) {
				selection = 0;
			} else {
				selection += 1;
			}
		} else if (Input.GetButtonDown("Left") || Input.GetButtonDown("Down")) {
			if (selection == 0) {
				selection = 1;
			} else {
				selection -= 1;
			}
		}
//	if (selection == 0) {
//			//sprite.Library = Resources.Load("maleSpriteAnimation");
//			GLOBAL.refreshGender(selection)
//		} else if (selection == 1) {
//			sprite.Library = Resources.Load("femaleSpriteAnimation");
//		}
	}
}

function OnGUI () {
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), img);
	GUI.DrawTexture(Rect(Screen.width/2-Screen.width/6,Screen.height*4/5,Screen.width/3,Screen.height/6), textImg);
	if (selection == 0) {
		GUI.DrawTexture(Rect(23.5,174.0,Screen.width/2.275,Screen.height/1.40), boyimg);
		GUI.DrawTexture(Rect(Screen.width/2-Screen.width/6,Screen.height*4/5,Screen.width/3,Screen.height/6), textImg);
	} else if (selection == 1) {
		GUI.DrawTexture(Rect(Screen.width/1.78,148.5,Screen.width/2.98,Screen.height/1.525), girlimg);
		GUI.DrawTexture(Rect(Screen.width/2-Screen.width/6,Screen.height*4/5,Screen.width/3,Screen.height/6), textImg);
	}
}