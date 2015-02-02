var boo : AudioClip;
private var GLOBAL : Object;
var applause : AudioClip;
var slider1Value : float = 0.0;
var slider2Value : float = 0.0;
private var slider1Text : String;
private var slider2Text : String;
private var mayorText : String;
private var subText1 : String;
var menuButtonStyle : GUIStyle;
var infoBoxStyle : GUIStyle;
private var subText2 : String;
private var approval1 : int;
private var approval2 : int;
private var approval3 : int;
private var approvalTotal : int;

private var currentQuestion : int = 0;
private var ruleAccepted : boolean = false;
private var changeScene : boolean = false;

private var tc : Object;

var questTextStyle : GUIStyle;
var questionStyle : GUIStyle;
var labelStyle : GUIStyle;
var sliderStyle1 : GUIStyle;
var thumbStyle1 : GUIStyle;
var sliderStyle2 : GUIStyle;
var thumbStyle2 : GUIStyle;
var submitStyle : GUIStyle;
var approvalStyle : GUIStyle;
var approvalThumbStyle : GUIStyle;
var approvalLabelStyle : GUIStyle;

var submitImg : Texture2D;
private var showingHelp : boolean = false; //are we showing the help message?
private var resetDisplay : boolean = false;
private var helpString : String = "You must come to an agreement on a system of land regulations with your fellow villagers. Move the sliders to the desired position to change your proposal, and then hit 'Propose Rule' to put it to a vote.";

//images for buttons
var helpImg : Texture2D;
var muteImg : Texture2D;
var volumeImg : Texture2D;
var journalImg : Texture2D;
var soundIconImg : Texture2D;
var resetIconImg : Texture2D;

// Use this for initialization
function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	menuButtonStyle = GLOBAL.menuButtonStyle;
	infoBoxStyle = GLOBAL.infoBoxStyle;
	questTextStyle = GLOBAL.questTextStyle;
	tc = GameObject.Find("TextContainer").GetComponent("Rules_TextContainer");
	ResetValues();
}

// Update is called once per frame
function Update () {
	if (Input.GetButtonDown("Space")) {
		if (ruleAccepted) {
			if (changeScene) {
				if (GLOBAL.questNum == 7){
					GLOBAL.AdvanceQuest();
				}
				else if (GLOBAL.questNum == 6){
					GLOBAL.AdvanceQuest();
					GLOBAL.AdvanceQuest();
				}
				Application.LoadLevel("rulesExit");
			}
			else {
				ruleAccepted = false;
				AdvanceQuestion();
			}
		}
		if(showingHelp){
			showingHelp = false;
		}
		if (resetDisplay) { //if we're displaying the reset info and the player presses space, make it go away and give control back
			resetDisplay = false;
		}
	}
}

function OnGUI () {
	//question displays
	GUI.Box(Rect(455,28,215,115),mayorText,questionStyle);
	GUI.Box(Rect(65,50,290,95),subText1,questionStyle);
	GUI.Box(Rect(65,243,290,95),subText2,questionStyle);
	
	//answer sliders
	if (!ruleAccepted) {
		slider1Value = GUI.HorizontalSlider(Rect(460,160,135,50), slider1Value, 0.0, 98.0, sliderStyle1, thumbStyle1);
		slider2Value = GUI.HorizontalSlider(Rect(460,345,135,50), slider2Value, 0.0, 98.0, sliderStyle1, thumbStyle1);
	}
	else {
		GUI.HorizontalSlider(Rect(460,160,135,50), slider1Value, 0.0, 98.0, sliderStyle1, thumbStyle1);
		GUI.HorizontalSlider(Rect(460,345,135,50), slider2Value, 0.0, 98.0, sliderStyle1, thumbStyle1);
	}
	
	var answer1 : int = Mathf.Floor(slider1Value / (100.0/tc.answer1LabelArray[currentQuestion].length));
	var answer2 : int = Mathf.Floor(slider2Value / (100.0/tc.answer2LabelArray[currentQuestion].length));
	
	slider1Text = tc.answer1LabelArray[currentQuestion][answer1];
	slider2Text = tc.answer2LabelArray[currentQuestion][answer2];
		
	GUI.Label(Rect(63,155,Screen.width/2,20),slider1Text,labelStyle);
	GUI.Label(Rect(63,345,Screen.width/2,20),slider2Text,labelStyle);
	
	//approval sliders
	GUI.HorizontalSlider(Rect(150,Screen.height-85,150,25), approval1, 0.0, 100.0, approvalStyle, approvalThumbStyle);
	GUI.HorizontalSlider(Rect(150,Screen.height-40,150,25), approval2, 0.0, 100.0, approvalStyle, approvalThumbStyle);
	GUI.HorizontalSlider(Rect(Screen.width-250,Screen.height-85,150,25), approval3, 0.0, 100.0, approvalStyle, approvalThumbStyle);
	GUI.HorizontalSlider(Rect(Screen.width-250,Screen.height-40,150,25), approvalTotal, 0.0, 100.0, approvalStyle, approvalThumbStyle);
	
	GUI.Label(Rect(50,Screen.height-125,250,30),"Audience Approval",approvalLabelStyle);
	
	GUI.Label(Rect(50,Screen.height-85,100,30),"Subsistence Farmers",approvalLabelStyle);
	GUI.Label(Rect(50,Screen.height-40,100,30),"Commercial Farmers",approvalLabelStyle);
	GUI.Label(Rect(Screen.width-350,Screen.height-85,100,30),"Preservation Advocates",approvalLabelStyle);
	GUI.Label(Rect(Screen.width-350,Screen.height-40,100,30),"Total Popular Support",approvalLabelStyle);
	
	GUI.Label(Rect(300,Screen.height-85,50,25),approval1.ToString()+"%",approvalLabelStyle);
	GUI.Label(Rect(300,Screen.height-40,50,25),approval2.ToString()+"%",approvalLabelStyle);
	GUI.Label(Rect(Screen.width-100,Screen.height-85,50,25),approval3.ToString()+"%",approvalLabelStyle);
	GUI.Label(Rect(Screen.width-100,Screen.height-40,50,25),approvalTotal.ToString()+"%",approvalLabelStyle);
	
	if (GUI.Button(Rect(680,360,84,75),submitImg,submitStyle) && !ruleAccepted) {
		EvaluateAnswer(answer1, answer2);
	}
	
	if (showingHelp) {
		GUI.Box(Rect(Screen.width / 2 - 267, Screen.height / 2 - 100, 535, 200), helpString, questTextStyle);
	}
	
	if (GUI.Button(Rect(Screen.width-32,0,32,32), helpImg, menuButtonStyle)) {
			if (!showingHelp) {
				showingHelp = true;
			}
			else {
				showingHelp = false;
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
		}			
	}
	if (resetDisplay) {
		var resetMsg : String = "Resetting the game will undo any progress you've made so far. If you'd like to cancel, press the space bar. If you still want to reset and go back to level selection, press the button below.";
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), resetMsg, infoBoxStyle);
		if (GUI.Button(Rect(Screen.width/2 - 15, (Screen.height * 0.75) - 60, 32, 32), resetIconImg, menuButtonStyle)) {
			Application.LoadLevel("levelSelect");
			GLOBAL.ResetVariables();
		}
	}
}

function EvaluateAnswer (answer1 : int, answer2 : int) {
	approval1 = tc.approval1Vals[currentQuestion][0][answer1]+tc.approval1Vals[currentQuestion][1][answer2];
	approval2 = tc.approval2Vals[currentQuestion][0][answer1]+tc.approval2Vals[currentQuestion][1][answer2];
	approval3 = tc.approval3Vals[currentQuestion][0][answer1]+tc.approval3Vals[currentQuestion][1][answer2];
	approvalTotal = (approval1+approval2+approval3)/3;
	Debug.Log(currentQuestion);
	Debug.Log(tc.mainQuestionArray.length);
	
	mayorText = "";
	
	if (answer1 != tc.correctAnswerArray[currentQuestion][0]) {
		mayorText += tc.wrongAnswerArray[currentQuestion][0][answer1];
		audio.PlayOneShot(boo);
	}
	else if (answer2 != tc.correctAnswerArray[currentQuestion][1]){
		mayorText += tc.wrongAnswerArray[currentQuestion][1][answer2];
		audio.PlayOneShot(boo);
	}
	if (answer1 == tc.correctAnswerArray[currentQuestion][0] && answer2 == tc.correctAnswerArray[currentQuestion][1]) {
		ruleAccepted = true;
		audio.PlayOneShot(applause);
		if (currentQuestion+1 == tc.mainQuestionArray.length) {
			changeScene = true;
			mayorText = "Congratulations, everybody. Maybe now our forest has a chance. \n\n Press space to continue.";
		}
		else {
			mayorText = "Your proposed rule has been accepted! \n\nPress space to continue.";
		}
	}
}

function AdvanceQuestion () {
	currentQuestion ++;
	ResetValues();
}

function ResetValues () {
	approval1 = 0;
	approval2 = 0;
	approval3 = 0;
	approvalTotal = 0;
	
	mayorText = tc.mainQuestionArray[currentQuestion];
	subText1 = tc.question1Array[currentQuestion];
	subText2 = tc.question2Array[currentQuestion];
	slider1Value = 0;
	slider2Value = 0;
}