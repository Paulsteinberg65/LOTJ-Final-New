var player : Transform;
private var GLOBAL : Object;

private var playerSprite : tk2dSprite;
private var playerScript : Object;
var textContainer : GameObject;
private var tcScript : Object;
var questTextStyle : GUIStyle;
var menuButtonStyle : GUIStyle;
var infoBoxStyle : GUIStyle;
var doNotEnterStyle : GUIStyle;
var resetBoxStyle : GUIStyle;
var buttonStyle : GUIStyle;
var sliderStyle : GUIStyle;
var thumbStyle1 : GUIStyle;
var thumbStyle2 : GUIStyle;
var thumbStyle3 : GUIStyle;
var thumbStyle4 : GUIStyle;

var farmerSqr : Texture2D;
var studentSqr : Texture2D;
var fisherSqr : Texture2D;
var artisanSqr : Texture2D;
var bgImg : Texture2D;

private var showingMsg : boolean = false;
private var resetDisplay : boolean = false;

private var currentString : String;

//images for buttons
var helpImg : Texture2D;
var muteImg : Texture2D;
var volumeImg : Texture2D;
var journalImg : Texture2D;
var soundIconImg : Texture2D;
var resetIconImg : Texture2D;

private var musicPlayer : Object;

// Use this for initialization
function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	menuButtonStyle = GLOBAL.menuButtonStyle;
	playerSprite = player.GetComponent(tk2dSprite);
	playerScript = player.GetComponent("AwarenessPlayer");
	tcScript = textContainer.GetComponent("Awareness_TextContainer");
	infoBoxStyle = GLOBAL.infoBoxStyle;
	musicPlayer = GameObject.Find("MusicPlayer").GetComponent("MusicSingleton");
	DisplayMessage("startMsg");
}

// Update is called once per frame
function Update () {
	if (Input.GetButtonDown("Space")) {
		if (showingMsg) {
			showingMsg = false;
			playerScript.canControl = true;
			if (playerScript.farmerWin && playerScript.fisherWin && playerScript.studentWin && playerScript.artisanWin) {
				Application.LoadLevel("enterRules");
			}
		}
		if (resetDisplay) { //if we're displaying the reset info and the player presses space, make it go away and give control back
			resetDisplay = false;
			playerScript.canControl = true;
		}
	}
}

function OnGUI () {
	//GUI.DrawTexture(Rect(0,0,800,600), bgImg);

	if (GUI.Button(Rect(30,30,65,65), farmerSqr, buttonStyle)){
        if(!playerScript.farmerWin){
            playerSprite.spriteId = 9;
        }
        else{
            DisplayMessage("alreadyFinished");
        }
    }
        
    if (GUI.Button(Rect(105,30,65,65), studentSqr, buttonStyle)){
        if(!playerScript.studentWin){
            playerSprite.spriteId = 15;
        }
        else{
            DisplayMessage("alreadyFinished");
        }
    }
    if (GUI.Button(Rect(30,105,65,65), fisherSqr, buttonStyle)){
        if(!playerScript.fisherWin){
            playerSprite.spriteId = 13;
        }
        else{
            DisplayMessage("alreadyFinished");
        }
    }
    if (GUI.Button(Rect(105,105,65,65), artisanSqr, buttonStyle)){
        if(!playerScript.artisanWin){
            playerSprite.spriteId = 0;
        }
        else{
            DisplayMessage("alreadyFinished");
        }
    }

		
		
	GUI.HorizontalSlider(Rect(30,297,185,20),player.GetComponent("AwarenessPlayer").farmerRep,0,10, sliderStyle, thumbStyle1);
	GUI.HorizontalSlider(Rect(30,352,185,20),player.GetComponent("AwarenessPlayer").studentRep,0,10, sliderStyle, thumbStyle2);
	GUI.HorizontalSlider(Rect(30,409,185,20),player.GetComponent("AwarenessPlayer").fisherRep,0,10, sliderStyle, thumbStyle3);
	GUI.HorizontalSlider(Rect(30,464,185,20),player.GetComponent("AwarenessPlayer").artisanRep,0,10, sliderStyle, thumbStyle4);
		
	if (showingMsg) {
		GUI.Box(Rect(222, 200, 535, 200), currentString, questTextStyle);
	}
	
	if (GUI.Button(Rect(Screen.width-32,0,32,32), helpImg, menuButtonStyle)) {
			if (!showingMsg) {
				DisplayMessage("helpMsg");
			}
			else {
				showingMsg = false;
				playerScript.canControl = true;
			}
	}
	if (GUI.Button(Rect(Screen.width-74,0,32,32), soundIconImg, menuButtonStyle)) {
		var volume : float = GameObject.Find("Main Camera").GetComponent("AudioListener").volume;
		if (volume == 0) {
			GameObject.Find("Main Camera").GetComponent("AudioListener").volume = 1.0;
			soundIconImg = volumeImg;
			GLOBAL.muted = false;
		}
		else {
			GameObject.Find("Main Camera").GetComponent("AudioListener").volume = 0.0;
			soundIconImg = muteImg;
			GLOBAL.muted = true;
		}
	}
	if (GUI.Button(Rect(Screen.width-116,0,32,32), resetIconImg, menuButtonStyle)) {
		if (!resetDisplay) {
			resetDisplay = true;
		} else {
			resetDisplay = false;
			playerScript.canControl = true;
		}			
	}
	
	if (resetDisplay) {
		var resetMsg : String = "Resetting the game will undo any progress you've made so far. If you'd like to cancel, press the space bar. If you still want to reset and go back to level selection, press the button below.";
		GUI.Box(Rect(Screen.width/4 + 100, Screen.height/4, Screen.width/2, Screen.height/2), resetMsg, infoBoxStyle);
		if (GUI.Button(Rect(Screen.width/2 + 85, (Screen.height * 0.75) - 60, 32, 32), resetIconImg, menuButtonStyle)) {
			Application.LoadLevel("levelSelect");
			musicPlayer.LevelSelection(); //have musicsingleton stop music and reset it to Secrets Revealed
			GLOBAL.ResetVariables();
		}
	}
}

function DisplayMessage (dictVal : String) {
	showingMsg = true;
	playerScript.canControl = false;
	currentString = tcScript.msgDict[dictVal][0];
}