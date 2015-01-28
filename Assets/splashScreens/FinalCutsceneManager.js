private var NPCDict : Array = [];
private var TextDict : Array = [];

private var currentIndex : int = 0;
private var currentNPC : String;
private var currentText : String;
private var nextScene: String;

var GUIController;

var dialogueTextStyle : GUIStyle;

var backgroundGUI : GUITexture;
var backgroundImg : Texture2D;

// Use this for initialization
function Start () {
	TextDict.push("You did it! With your help, the community put in place new rules to ensure sustainable governance of the forests. Over the ensuing years, the forest recovered, wildlife returned, and the community thrived.");
	TextDict.push("With a solid governance structure in place, the community became an attractive site for new 'payment for environmental services' programs, in which the beneficiaries of forest conservation – such as local water users, tourist organizations, and companies looking to reduce carbon dioxide emissions – pay those landowners who conserve or expand their forests.");
	
	nextScene = "gameEnd2";

	currentText = TextDict[currentIndex];
}

// Update is called once per frame
function Update () {
	if (Input.GetButtonDown("Space"))
		AdvanceCutscene();
}

function AdvanceCutscene () {
	if (TextDict.length > currentIndex + 1) {
		currentIndex += 1;
		currentText = TextDict[currentIndex];
	}
	else {
		Application.LoadLevel(nextScene);
	}
	// else end the cutscene and transition scenes
}

function OnGUI () {
	GUI.Label(Rect(-25,Screen.height-235,Screen.width,200), currentText, dialogueTextStyle);
}