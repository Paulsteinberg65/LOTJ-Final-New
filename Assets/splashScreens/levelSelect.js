var GLOBAL : Object;
var nextScene : String;
var img : Texture2D;

var newImg : Texture2D;
var waterfallImg : Texture2D;
var marketImg : Texture2D;
var rulesImg : Texture2D;
var capitalImg : Texture2D;

private var selection : int = 0;

function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
}

function Update () {
	if (Input.GetButtonDown("Space")) {
		Application.LoadLevel(nextScene);
	}
	
	if (Input.GetButtonDown("Left") || Input.GetButtonDown("Right")) {
		if (Input.GetButtonDown("Right")) {
			if (selection == 4) {
				selection = 0;
			} else {
				selection += 1;
			}
		} else {
			if (selection == 0) {
				selection = 4;
			} else {
				selection -= 1;
			}
		}
		
		if (selection == 0) {
			GLOBAL.questNum = 0;
			nextScene = "intro1";
		} else if (selection == 1) {
			GLOBAL.questNum = 3;
			GLOBAL.pagesObtained[0] = "y";
			GLOBAL.totalPages = GLOBAL.totalPages + 1;
			nextScene = "waterfall";
		} else if (selection == 2) {
			GLOBAL.questNum = 6;
			for (i = 0; i < GLOBAL.pagesObtained.length; i++) {
				GLOBAL.pagesObtained[i] = "y";
			}
			GLOBAL.totalPages = 9;
			nextScene = "awareness";
		} else if (selection == 3) {
			GLOBAL.questNum = 6;
			for (j = 0;j < GLOBAL.pagesObtained.length;j++) {
				GLOBAL.pagesObtained[j] = "y";
			}
			GLOBAL.totalPages = 9;
			nextScene = "rules";
		} else if (selection == 4) {
			GLOBAL.questNum = 7;
			for (k = 0;k < GLOBAL.pagesObtained.length;k++) {
				GLOBAL.pagesObtained[k] = "y";
			}
			GLOBAL.totalPages = 9;
			nextScene = "capitol";
		}
	}
}

function OnGUI () {

	GUI.DrawTexture(Rect(0,0,800,600), img);
	
	if (selection == 0) {
		GUI.DrawTexture(Rect(101,27,617,290), newImg);
	} else if (selection == 1) {
		GUI.DrawTexture(Rect(101,336,140,140), waterfallImg);
	} else if (selection == 2) {
		GUI.DrawTexture(Rect(260,336,140,140), marketImg);
	} else if (selection == 3) {
		GUI.DrawTexture(Rect(419,336,140,140), rulesImg);
	} else if (selection == 4) {
		GUI.DrawTexture(Rect(578,336,140,140), capitalImg);
	}
	
}