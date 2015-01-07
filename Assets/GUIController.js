var player : GameObject;
var visible : boolean = true;
var cerulean_warbler : AudioClip;
var chainsaw : AudioClip;
private var tm : Object;
private var currentString : String;
private var NPCName : String;
private var speakerTex : Texture2D;
private var questDisplay : boolean = false;
var journalDisplay : boolean = false;
private var displayQuestOnExit : boolean = false;
private var currentQuestText : String;
private var currentQuestHeader : String;
private var currentJournalText : String;
private var currentJournalPage : int = 0;
private var journalPart : int = 0;
var textContainer : GameObject;
var tcName : String = "enter name";
private var tc : Object;
private var GLOBAL : Object;
private var movement : Object;
private var wMovement : Object;
private var showGUI : boolean = true;
private var infoTitle;
private var infoDisplay : boolean = false;

var quiz : boolean = false;
var sQuizAnswer : int = 0;
var quizAnswers : String[];
var dialogueHeaderStyle : GUIStyle;
var dialogueTextStyle : GUIStyle;
var questHeaderStyle : GUIStyle;
var questTextStyle : GUIStyle;
var infoBoxStyle : GUIStyle;
var journalStyle : GUIStyle;
var menuButtonStyle : GUIStyle;
var spaceBarStyle : GUIStyle;

var helpImg : Texture2D;
var muteImg : Texture2D;
var volumeImg : Texture2D;
var journalImg : Texture2D;
var soundIconImg : Texture2D;

var smokeImg : Texture2D;

var startTime : float;
var secondPopUp : boolean = false;

var endCamilo : float;

private var playedWarblers : boolean = false;
private var playedManuel: boolean = false;
//TODO: STUFF FROM TIMER
private var tick: int = 0;
private var playerCounter: int = 0;	//number of politicians player has convinced on a given level
private var danteCounter: int = 0;	//number of politicians dante has convinced on a given level
private var timer: float = 480;
private var hours: int = 0;
private var minutes: int = 0;
private var time: String;
private var timerText: String;

private var running : boolean = false;	//variable for whether timer is running or not
private var showTime : boolean = false;
var finished : boolean = false;
//TODO: END OF STUFF FROM TIMER

//private var speaking : boolean = false;		currently not used because redundant

//var dialogueBox : GUIStyle;		use this line when applying styles

function Start () {
	tm = player.GetComponent(TextManager);
	if(Application.loadedLevelName != "waterfall" && Application.loadedLevelName != "waterfallCave") {
		movement = player.GetComponent("PlayerMovement");
	}
	else if (Application.loadedLevelName == "waterfall" || Application.loadedLevelName == "waterfallCave") {
		wMovement = player.GetComponent("CharacterMotor");
	}
	tc = textContainer.GetComponent(tcName);
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	dialogueHeaderStyle = GLOBAL.dialogueHeaderStyle;
	dialogueTextStyle = GLOBAL.dialogueTextStyle;
	questHeaderStyle = GLOBAL.questHeaderStyle;
	questTextStyle = GLOBAL.questTextStyle;
	infoBoxStyle = GLOBAL.infoBoxStyle;
	journalStyle = GLOBAL.journalStyle;
	menuButtonStyle = GLOBAL.menuButtonStyle;
	spaceBarStyle = GLOBAL.spaceBarStyle;
	
	Debug.Log(Application.loadedLevelName);
	
	if (Application.loadedLevelName == "titleCard") {
		Debug.Log("adsfasdf");
		showGUI = false;
	}
	//to make sure the right volume image loads for each level
	if (GLOBAL.muted) {
		soundIconImg = muteImg;
	}
	else {
		soundIconImg = volumeImg;
	}
	
	if (Application.loadedLevelName == "Town1"){
		DisplayQuest();
		startTime = Time.time;
	}
}

function Update () {
	if (Input.GetButtonDown("Space")) {
		if (questDisplay || infoDisplay) {
			Debug.Log("closing quest");
			if(Application.loadedLevelName == "Maze" && questDisplay){
			questDisplay = false;
			Application.LoadLevel("searchParty1");
			}
			questDisplay = false;
			if (infoDisplay && infoTitle == "capital") {
				infoDisplay = false;
				Application.LoadLevel("capitol");
			}
			infoDisplay = false;
			if(!journalDisplay){
			canControl(true);
			}
		}
		if (journalDisplay) {
			canControl(false);
			if ((GLOBAL.pagesObtained[currentJournalPage] == "y") && (tc.journalDict[currentJournalPage].length-1 > journalPart)) {
				Debug.Log(tc.journalDict[currentJournalPage]);
				journalPart++;
				currentJournalText = tc.journalDict[currentJournalPage][journalPart];
			}
			else {
				if(Application.loadedLevelName == "Maze"){
					endCamilo = Time.time;
				}
				journalDisplay = false;
				canControl(true);
				if (displayQuestOnExit) {
					DisplayQuest();
					displayQuestOnExit = false;
				}
			}
			
		}
	}
	quiz = tm.quiz;
	sQuizAnswer = tm.selectedQuizAnswer;
	quizAnswers = tm.quizAnswers;
	if((Time.time - startTime) >= 60.0 && GLOBAL.questNum == 0 && secondPopUp == false){
		DisplayQuest();
		secondPopUp = true;
	}
	//TODO: THIS (UNTIL END OF UPDATE) IS ALL STUFF FROM TIMERSCRIPT 
	//converts timer from seconds to "hours/minutes"
	hours = Mathf.FloorToInt(timer / 60F);
    minutes = Mathf.FloorToInt(timer - hours * 60);
    time = String.Format("{0:0}:{1:00}", hours, minutes);
    
			if ((hours == 9 && tick == 0)||(hours == 10&& tick == 1)||(hours == 11&& tick == 2)||(hours == 12&& tick == 3)){
				tick++;
				danteCounter++;
			}

			else if ((hours == 3 && tick == 4)||(hours == 4&& tick == 5)||(hours == 5&& tick == 6)||(hours == 6&& tick == 7)||(hours == 7&& tick == 8)||(hours == 8&& tick == 9)){
				tick++;
				danteCounter++;
			}

			
	  		if (danteCounter == 6 && !GLOBAL.inHouse){	//if timer runs out in senate
				DisplayInfo("hFailure");
				canControl(false);
				movement.senateReset(1);
	  		}
	  		else if (danteCounter == 4 && !GLOBAL.inSenate) {	//if timer runs out in senate
				DisplayInfo("sFailure");
				canControl(false);
				movement.houseReset(1);
	  		}
	//updates text to display current "time". displays success if finished with area
	if(!finished){
		if(timer>=480){
			timerText = (time + " AM");
		}
		else{
			timerText = (time + " PM");
		}
		
	}
	else{
		timerText = "Success!";
		
	}
	
	if(running){
			
			timer += Time.deltaTime;
			
			//increment counter for dante every hour
			

	}
	
}
function danteReset(location : int){//location = 1 for senate, 2 for house
	if (location == 1){
		tick = 0;
	}
	else{
		tick = 4;
	}
	danteCounter = 0;
	playerCounter = 0;
}
function playerUp(){
	playerCounter++;
}
function showTimer (){
	showTime = true;
}

function hideTimer (){
	showTime = false;
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
	timer = 480;
}

function houseRollback(){
	timer = 120;
}

function toggleFinish(){
	if (!finished){
		finished = true;
	}
	else{
		finished = false;
	}
}
//TODO: END OF TIMER STUFF

function OnGUI () {
	//TODO: TIMER
	if(showTime){
		GUI.Box(Rect(Screen.width*0.5-(75*0.5),0,75,25),timerText);
		if (!GLOBAL.inSenate){
		GUI.Box(Rect(Screen.width*0.30-50,0,100,25), "You: "+playerCounter.ToString()+"/4");
		GUI.Box(Rect(Screen.width*0.70-50,0,100,25), "Dante: "+danteCounter.ToString()+"/4");
		}
		else{
		GUI.Box(Rect(Screen.width*0.30-50,0,100,25), "You: "+playerCounter.ToString()+"/6");
		GUI.Box(Rect(Screen.width*0.70-50,0,100,25), "Dante: "+danteCounter.ToString()+"/6");
		}
	}
	//TODO: END OF TIMER
	//code for the do not enter signs
	if (Application.loadedLevelName == "Town1" && player.transform.position.x == 41.0 && player.transform.position.y == 4.0) {
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "The path to the waterfall is not open right now.", questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "DO NOT ENTER.", questHeaderStyle);
		} 
	else if (Application.loadedLevelName == "Town1" && player.transform.position.x == -5.0 && player.transform.position.y == -23.0 && GLOBAL.questNum < 2) {
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You have to talk to the biologist first!", questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "THE MAZE IS CLOSED", questHeaderStyle);
		}
		
	if (Application.loadedLevelName == "Maze" && player.transform.position.x == 34.0 && (player.transform.position.y == 19.0 || player.transform.position.y == 18.0 ) && GLOBAL.questNum < 3){
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You must talk to all the people in the forest before moving to the waterfall", questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "DO NOT ENTER", questHeaderStyle);
	}
	if (Application.loadedLevelName == "waterfall" && player.transform.position.x < -7.6 && player.transform.position.y > 5.0 && GLOBAL.questNum < 4) {
		Debug.Log("Hello there, finish!");
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You still have more pages of your Father's journal to collect!", questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "DO NOT ENTER.", questHeaderStyle);
	}
	if (player.transform.position.x > 30.5 && player.transform.position.x < 32.5 && player.transform.position.y > -20.0 && player.transform.position.y < -18.0 
				&& Application.loadedLevelName == "capitol" && (GLOBAL.quizProg == 0) && GLOBAL.questNum < 8){
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Talk to Senator A.", questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You are not ready to enter here", questHeaderStyle);
	}
	else if (player.transform.position.x > 30.5 && player.transform.position.x < 32.5 && player.transform.position.y > -20.0 && player.transform.position.y < -18.0 
				&& Application.loadedLevelName == "capitol" && (GLOBAL.quizProg != 0)){
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Visit the other building to talk to more politicians.", questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You have already convinced the Senators", questHeaderStyle);
	}
	else if (player.transform.position.x > 26 && player.transform.position.x < 29 && player.transform.position.y > -1.5 && player.transform.position.y < 0
				&& Application.loadedLevelName == "capitol" && (GLOBAL.quizProg < 4) && GLOBAL.questNum < 10){
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Talk to Senator A and then visit the Senate building to the South.", questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You are not ready to enter here", questHeaderStyle);
	}
	
	
	
	if (showGUI) {
		//maze smoke
//		if (Application.loadedLevelName == "Maze") {
//			var size : int = Mathf.Max(Screen.width,Screen.height);
//			GUI.DrawTexture(Rect(0,0,player.transform.position.x,player.transform.position.y), smokeImg);
//		}
	
		if (GUI.Button(Rect(Screen.width-32,0,32,32), helpImg, menuButtonStyle)) {
			if (!questDisplay)
				DisplayQuest();
			else {
				questDisplay = false;
				canControl(true);
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
		if (GUI.Button(Rect(Screen.width-116,0,32,32), journalImg, menuButtonStyle)) {
			if (!journalDisplay)
				DisplayJournal(currentJournalPage);
			else {
				journalDisplay = false;
				canControl(true);
			}
		}
	}

	if (tm.interacting) {
		currentString = tm.currentLine;
		NPCName = tm.facedObject.name;
			
		
		if ("Sign" in NPCName) { //this is where info signs display is done
			GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), currentString, infoBoxStyle);
			if("BirdSign" in NPCName && !playedWarblers) {
				audio.PlayOneShot(cerulean_warbler);
				playedWarblers = true;
			}
		}
		
		else {
			speakerTex = tc.imgDict[NPCName];
			GUI.Box(Rect(0,Screen.height-200,Screen.width,200), currentString, dialogueTextStyle);
			GUI.Label(Rect(0,Screen.height-200,Screen.width,200), NPCName+":", dialogueHeaderStyle);
			GUI.DrawTexture(Rect(0,Screen.height-450,326,450), speakerTex);
			GUI.Label(Rect(0,Screen.height-200,Screen.width,200), "Space bar to continue...", spaceBarStyle);
			if ("Manuel" in NPCName && !playedManuel) {
				audio.PlayOneShot(chainsaw);
				playedManuel = true;
			}
		}
	
		if (quiz) {
			GUI.Box(Rect(Screen.width/4,Screen.height/4,Screen.width/1.75,Screen.height/2), "");
			GUI.Label(Rect(Screen.width/4+15,Screen.height/4+15,Screen.width/2,Screen.height/2), quizAnswers[0]);
			GUI.Label(Rect(Screen.width/4+15,Screen.height/4+75,Screen.width/2,Screen.height/2), quizAnswers[1]);
			GUI.Label(Rect(Screen.width/4+15,Screen.height/4+135,Screen.width/2,Screen.height/2), quizAnswers[2]);
			GUI.Label(Rect(Screen.width/4+15,Screen.height/4+195,Screen.width/2,Screen.height/2), quizAnswers[3]);
			if (sQuizAnswer == 0){
				GUI.Box(Rect(Screen.width/4+10,Screen.height/4+15,Screen.width/35,Screen.height/25), "");
			}
			else if (sQuizAnswer == 1){
				GUI.Box(Rect(Screen.width/4+10,Screen.height/4+75,Screen.width/35,Screen.height/25), "");
			}
			else if (sQuizAnswer == 2){
				GUI.Box(Rect(Screen.width/4+10,Screen.height/4+135,Screen.width/35,Screen.height/25), "");
			}
			else if (sQuizAnswer == 3){
				GUI.Box(Rect(Screen.width/4+10,Screen.height/4+195,Screen.width/35,Screen.height/25), "");
			}
		}
	}
	
	
	if (questDisplay) {
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), currentQuestText, questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), currentQuestHeader, questHeaderStyle);
	}
	
	if (journalDisplay) {
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), currentJournalText, journalStyle);
		if (currentJournalPage != 0) {
			if (GUI.Button(Rect(Screen.width/4,Screen.height/2,32,32),journalImg,menuButtonStyle)){
				DisplayJournal(--currentJournalPage);
				}
		}
				
		if (currentJournalPage != 8) {
			if (GUI.Button(Rect(Screen.width*3/4,Screen.height/2,32,32),journalImg,menuButtonStyle)){
				DisplayJournal(++currentJournalPage);
				Debug.Log(currentJournalPage);}
		}
	}
	
	if (infoDisplay) {
		Debug.Log("Hello2");
		currentString = GLOBAL.infoDict[infoTitle];
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), currentString, infoBoxStyle);
	}
}

function DisplayQuest () {
	if (journalDisplay) {
		displayQuestOnExit = true;
		Debug.Log("Quest advanced to: " +GLOBAL.questNum);
	}
	else {
		Debug.Log(GLOBAL.questNum);
		currentQuestHeader = GLOBAL.questHArray[GLOBAL.questNum];
		currentQuestText = GLOBAL.questArray[GLOBAL.questNum];
		questDisplay = true;
		tm.questDisplay = true;
		canControl(false);
		journalDisplay = false;
	}
}

function DisplayJournal (currentPage : int) {
	journalPart = 0;
	currentJournalPage = currentPage;
	if (GLOBAL.pagesObtained[currentPage] == "n") {
		currentJournalText = "You haven't found this page yet.";
	}
	else {
		currentJournalText = tc.journalDict[currentPage][journalPart];
	}
	journalDisplay = true;
	canControl(false);
	questDisplay = false;
}

function DisplayInfo (infoName : String) {
	infoTitle = infoName;
	infoDisplay = true;
	canControl(false);
}

function canControl (val : boolean) {
	if (movement)
		movement.canControl = val;
	if (wMovement)
		wMovement.canControl = val;
}