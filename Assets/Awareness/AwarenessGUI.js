var player : Transform;

private var playerSprite : tk2dSprite;
private var playerScript : Object;
var textContainer : GameObject;
private var tcScript : Object;
var questTextStyle : GUIStyle;
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

private var currentString : String;

// Use this for initialization
function Start () {
	playerSprite = player.GetComponent(tk2dSprite);
	playerScript = player.GetComponent("AwarenessPlayer");
	tcScript = textContainer.GetComponent("Awareness_TextContainer");
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
	}
}

function OnGUI () {
	//GUI.DrawTexture(Rect(0,0,800,600), bgImg);

	if (GUI.Button(Rect(30,30,65,65), farmerSqr, buttonStyle))
		playerSprite.spriteId = 9;
	if (GUI.Button(Rect(105,30,65,65), studentSqr, buttonStyle))
		playerSprite.spriteId = 15;
	if (GUI.Button(Rect(30,105,65,65), fisherSqr, buttonStyle))
		playerSprite.spriteId = 13;
	if (GUI.Button(Rect(105,105,65,65), artisanSqr, buttonStyle))
		playerSprite.spriteId = 0;
		
		
	GUI.HorizontalSlider(Rect(10,297,175,20),player.GetComponent("AwarenessPlayer").farmerRep,0,10, sliderStyle, thumbStyle1);
	GUI.HorizontalSlider(Rect(10,352,175,20),player.GetComponent("AwarenessPlayer").studentRep,0,10, sliderStyle, thumbStyle2);
	GUI.HorizontalSlider(Rect(10,409,175,20),player.GetComponent("AwarenessPlayer").fisherRep,0,10, sliderStyle, thumbStyle3);
	GUI.HorizontalSlider(Rect(10,464,175,20),player.GetComponent("AwarenessPlayer").artisanRep,0,10, sliderStyle, thumbStyle4);
		
	if (showingMsg) {
		GUI.Box(Rect(222, 200, 535, 200), currentString, questTextStyle);
	} 
}

function DisplayMessage (dictVal : String) {
	showingMsg = true;
	playerScript.canControl = false;
	currentString = tcScript.msgDict[dictVal][0];
}