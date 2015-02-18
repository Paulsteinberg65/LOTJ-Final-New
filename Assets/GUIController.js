var player : GameObject;
var visible : boolean = true;
var cerulean_warbler : AudioClip;
var chainsaw : AudioClip;
private var tm : Object;
private var currentString : String;
private var NPCName : String;
private var speakerTex : Texture2D;
private var questDisplay : boolean = false;
private var capInfoDisplay : boolean = false;
private var jumpInfoDisplay : boolean = false; //is the GUI showing the jump info for the waterfall?
private var resetDisplay : boolean = false; //is the GUI showing the reset info?
var journalDisplay : boolean = false;
var journalUI : boolean = false;
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
private var doNotInfoDisplay : boolean = false;

var quiz : boolean = false;
var sQuizAnswer : int = 0;
var quizAnswers : String[];
var dialogueHeaderStyle : GUIStyle;
var dialogueTextStyle : GUIStyle;
var questHeaderStyle : GUIStyle;
var questTextStyle : GUIStyle;
var infoBoxStyle : GUIStyle;
var doNotEnterStyle : GUIStyle;
var resetBoxStyle : GUIStyle;
var journalStyle : GUIStyle;
var journalSelectStyle: GUIStyle;
var menuButtonStyle : GUIStyle;
var spaceBarStyle : GUIStyle;
var timerStyle: GUIStyle;
var counterStyle: GUIStyle;
var quizAnswerStyle: GUIStyle;
var sQuizAnswerStyle: GUIStyle;

var helpImg : Texture2D;
var muteImg : Texture2D;
var volumeImg : Texture2D;
var journalImg : Texture2D;
var soundIconImg : Texture2D;
var resetIconImg : Texture2D;

var smokeImg : Texture2D;

var startTime : float;
var secondPopUp : boolean = false;

var endCamilo : float;

private var playedWarblers : boolean = false;
private var playedManuel: boolean = false;
//TODO: STUFF FROM TIMER
var repR: boolean = false;
var repQ: boolean = false;
var repE: boolean = false;
private var tick: int = 0;
var playerCounter: int = 0;	//number of politicians player has convinced on a given level
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

var remainingMaze = ["Camilo", "Carlos", "Gabriela", "Lita", "Manuel"];

private var musicPlayer : Object;

private var spacedTown1 : boolean = false;
private var spacedWaterfall : boolean = false;

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
	musicPlayer = GameObject.Find("MusicPlayer").GetComponent("MusicSingleton");
	dialogueHeaderStyle = GLOBAL.dialogueHeaderStyle;
	dialogueTextStyle = GLOBAL.dialogueTextStyle;
	questHeaderStyle = GLOBAL.questHeaderStyle;
	questTextStyle = GLOBAL.questTextStyle;
	infoBoxStyle = GLOBAL.infoBoxStyle;
	doNotEnterStyle = GLOBAL.doNotEnterStyle;
	resetBoxStyle = GLOBAL.resetBoxStyle;
	journalStyle = GLOBAL.journalStyle;
	journalSelectStyle = GLOBAL.journalSelectStyle; //TODO: NEW JOURNAL
	menuButtonStyle = GLOBAL.menuButtonStyle;
	spaceBarStyle = GLOBAL.spaceBarStyle;
	
	if (Application.loadedLevelName == "titleCard") {
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
	else if (Application.loadedLevelName == "waterfall") { //should the jump info be displayed?
		jumpInfoDisplay = true;
		canControl(false);
	}
	else if (Application.loadedLevelName == "capitol"){
		capInfoDisplay = true;
		canControl(false);
	}
}

function Update () {
	Debug.Log("questNum: " + GLOBAL.questNum);
	Debug.Log("totalPages: " + GLOBAL.totalPages);
	//Debug.Log("GLOBAL.pagesObtained.length: " + GLOBAL.pagesObtained.length + " GLOBAL.numPages: " + GLOBAL.numPages);
	//following elif toggles inside or outside audio in the capitol level
	if (Application.loadedLevelName == "capitol" && (GLOBAL.inSenate || GLOBAL.inHouse) && musicPlayer.audio.clip == musicPlayer.city) {
		musicPlayer.ToggleInsideAudio(true);
	} else if (Application.loadedLevelName == "capitol" && (!GLOBAL.inSenate && !GLOBAL.inHouse) && musicPlayer.audio.clip == musicPlayer.legislature) {
		musicPlayer.ToggleInsideAudio(false);
	}
	if ( Input.GetButtonDown("H")){
		if (!questDisplay)
				DisplayQuest();
			else {
				questDisplay = false;
				canControl(true);
			}
	}
	if (Input.GetButtonDown("M")){
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
		
	if (Input.GetButtonDown("Space")) { //the player has pressed space
		if (jumpInfoDisplay) { //are we currently showing the jumping instructions in the waterfall?
			jumpInfoDisplay = false; //if so, stop, and allow the player to control themselves once again
			canControl(true);
		} //TODO: implement what happens if someone presses space while in the restart message
		if (infoDisplay){
			infoDisplay = false;
			canControl(true);
		}
		if (questDisplay || infoDisplay) { //are we currently showing quets or info?
			if(Application.loadedLevelName == "Maze" && questDisplay && Array(remainingMaze).length == 0){
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
				journalPart++;
				currentJournalText = tc.journalDict[currentJournalPage][journalPart];
			}
			else {
				if(Application.loadedLevelName == "Maze"){
					endCamilo = Time.time;
				}
				journalDisplay = false;
				running = true; //maybe something to do with reenabling running or canControl too quickly?
				canControl(true);
				if (displayQuestOnExit) {
					DisplayQuest();
					displayQuestOnExit = false;
				}
			}
		}
		if (resetDisplay) { //if we're displaying the reset info and the player presses space, make it go away and give control back
			resetDisplay = false;
			canControl(true);
		}
	}
	quiz = tm.quiz;
	sQuizAnswer = tm.selectedQuizAnswer;
	quizAnswers = tm.quizAnswers;
	if((Time.time - startTime) >= 60.0 && GLOBAL.questNum == 0 && secondPopUp == false && Application.loadedLevelName == "Town1"){
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

			
	  		if (danteCounter == 6 && GLOBAL.inHouse){	//if timer runs out in senate
				DisplayInfo("hFailure");
				canControl(false);
				movement.houseReset(1);
	  		}
	  		else if (danteCounter == 4 && GLOBAL.inSenate) {	//if timer runs out in senate
				DisplayInfo("sFailure");
				canControl(false);
				movement.senateReset(1);
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
		tm.senateDialogue();
	}
	else{
		tick = 4;
		tm.houseDialogue();
	}
	danteCounter = 0;
	playerCounter = 0;
	repR = false;
	repQ = false;
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

function senateExit(){
	movement.senateExit();
}
//TODO: END OF TIMER STUFF

function OnGUI () {
	//TODO: TIMER
	if(showTime){
		GUI.Box(Rect(Screen.width*0.5-95,30,180,90), "");
		GUI.Box(Rect(Screen.width*0.5-75,20,100,25),timerText, timerStyle);
		if (GLOBAL.inSenate){
		GUI.Box(Rect(Screen.width*0.5-75,90,100,25), "You: "+playerCounter.ToString()+"/4", counterStyle);
		GUI.Box(Rect(Screen.width*0.5-10,90,100,25), "Dante: "+danteCounter.ToString()+"/4", counterStyle);
		}
		else if (GLOBAL.inHouse){
		GUI.Box(Rect(Screen.width*0.5-75,90,100,25), "You: "+playerCounter.ToString()+"/6", counterStyle);
		GUI.Box(Rect(Screen.width*0.5-10,90,100,25), "Dante: "+danteCounter.ToString()+"/6", counterStyle);
		}
	}
	//TODO: END OF TIMER
	//code for the do not enter signs
	if (Application.loadedLevelName == "Town1") { //do not enter signs for Town1 are contained here
		if (player.transform.position.x == 41.0 && (player.transform.position.y >= 3.0 && player.transform.position.y <= 5.0)) {
			if (Input.GetButtonDown("Space")) {
				spacedTown1 = true;
			}
			else if (spacedTown1) {
				//do nothing, don't want the sign to display
			}
			else {
				GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "This passage is closed for now.", questTextStyle);
			}
		} 
		else if (player.transform.position.x == -5.0 && player.transform.position.y == -23.0 && GLOBAL.questNum < 2) {
			if (Input.GetButtonDown("Space")) {
				spacedTown1 = true;
			}
			else if (spacedTown1) {
				//do nothing, don't want the sign to display
			}
			else {
				GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "This passage is closed for now.", questTextStyle);
			}
		}
		else if (player.transform.position.x == 41.0 && (player.transform.position.y == -24.0 || player.transform.position.y == -23.0)) {
			if (Input.GetButtonDown("Space")) {
				spacedTown1 = true;
			}
			else if (spacedTown1) {
				//do nothing, don't want the sign to display
			}
			else {
				GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Before traveling anywhere, you should learn more about what’s going on in your village.", questTextStyle);
			}
		}
		else {
			spacedTown1 = false;
		}
	}
	//do not enter sign for the waterfall
	if (Application.loadedLevelName == "waterfall") {
		if (player.transform.position.x < -7.62 && player.transform.position.y > 5.0 && GLOBAL.questNum < 5) {
			if (Input.GetButtonDown("Space")) {
				spacedWaterfall = true;
			}
			else if (spacedWaterfall) {
				//do nothing, don't want the sign to display
			}
			else {
				GUI.Box(Rect((Screen.width/4)+25, (Screen.height/4)+50, (Screen.width/2)-50, (Screen.height/2)-100), "You can't leave yet. There are still more pages of your father's journal to collect!", doNotEnterStyle);
			}
		}
		else {
			spacedWaterfall = false;
		}
	}
//	if (Application.loadedLevelName == "capitol") { //do not enter signs for the capitol are here
//		if (player.transform.position.x >= 30.0 && player.transform.position.x <= 33.0 && player.transform.position.y >= -20.0 && player.transform.position.y < -18.0 
//					&& (GLOBAL.quizProg == 0) && GLOBAL.questNum < 9){
//			GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Talk to Senator A.", questTextStyle);
//			GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You are not ready to enter here", questHeaderStyle);
//		}
//		else if (player.transform.position.x >= 30.0 && player.transform.position.x <= 33.0 && player.transform.position.y >= -20.0 && player.transform.position.y < -18.0 
//					&& (GLOBAL.quizProg != 0)){
//			GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Visit the other building to talk to more politicians.", questTextStyle);
//			GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You have already convinced the Senators", questHeaderStyle);
//		}
//		else if (player.transform.position.x > 26 && player.transform.position.x <= 29 && player.transform.position.y == -2.0
//					&& (GLOBAL.quizProg < 4) && GLOBAL.questNum < 11){
//			GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You can't enter this building until you have talked to everyone in the building below.", infoBoxStyle);
//		}
//		else if (player.transform.position.x > 26 && player.transform.position.x < 29 && player.transform.position.y > -1.5 && player.transform.position.y < 0
//					&& (GLOBAL.quizProg >= 4)){
//			GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Talk to Senator A before entering this building.", questTextStyle);
//			GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You are not ready to enter here", questHeaderStyle);
//		}
//	}
	

	
	
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
//		if (GUI.Button(Rect(Screen.width-116,0,32,32), journalImg, menuButtonStyle)) {
//			if (!journalDisplay)
//				DisplayJournal(currentJournalPage);
//			else {
//				journalDisplay = false;
//				canControl(true);
//			}
//		} TODO: OLD JOURNAL DISPLAY
		if (GUI.Button(Rect(Screen.width-116,0,32,32), journalImg, menuButtonStyle)) {
			if(journalDisplay){
				journalDisplay = false;
				running = true;
				canControl(true);
			}
			else if(journalUI){
				journalUI = false;
				running = true;
				canControl(true);
			}
			else{
				DisplayJournalUI();
			}
			
		} //TODO: NEW JOURNAL DISPLAY
		if (GUI.Button(Rect(Screen.width-158,0,32,32), resetIconImg, menuButtonStyle)) {
			if (!resetDisplay) {
				resetDisplay = true;
			} else {
				resetDisplay = false;
				canControl(true);
			}			
		}
	}

	if (tm.interacting) {
		currentString = tm.currentLine;
		NPCName = tm.facedObject.name;
		
		if ("Sign" in NPCName) { //this is where info signs display is done
			GUI.Box(Rect((Screen.width/4)-20, (Screen.height/4)-20, (Screen.width/2)+40, (Screen.height/2+40)), currentString, infoBoxStyle);
			if("BirdSign" in NPCName && !playedWarblers) {
				audio.PlayOneShot(cerulean_warbler);
				playedWarblers = true;
			}
		}
		
		else {
			if (Application.loadedLevelName == "Maze") { //are we in the maze?
				var indexNPC = System.Array.IndexOf(remainingMaze, NPCName); //what's the index of the NPC's name in the remainingMaze array?
				if (indexNPC > -1) { //if indexNPC = -1, the NPC name has already been removed from remainingMaze
					var mazeCharArray : Array = new Array(remainingMaze); //convert originial array to dynamic array so we can remove elements
					mazeCharArray.RemoveAt(indexNPC); //since we haven't removed this NPC yet, remove it
					remainingMaze = mazeCharArray.ToBuiltin(String) as String[]; //convert back to static array
				}
			}
			speakerTex = tc.imgDict[NPCName];
			GUI.Box(Rect(0,Screen.height-200,Screen.width,200), currentString, dialogueTextStyle);
			GUI.Label(Rect(0,Screen.height-200,Screen.width,200), NPCName+":", dialogueHeaderStyle);
			GUI.DrawTexture(Rect(0,Screen.height-450,326,450), speakerTex); //TODO: assign the correct speaker images to capitol
			GUI.Label(Rect(0,Screen.height-200,Screen.width,200), "Space bar to continue...", spaceBarStyle);
			if ("Manuel" in NPCName && !playedManuel) {
				audio.PlayOneShot(chainsaw);
				playedManuel = true;
			}
		}
		
        if (quiz) {
            GUI.Box(Rect(Screen.width/4,Screen.height/4.25-10,Screen.width/1.75,Screen.height/1.5+10), "");
            GUI.Box(Rect(Screen.width/4,Screen.height/4.25-10,Screen.width/1.75,Screen.height/1.5+10), "");
            GUI.Box(Rect(Screen.width/4,Screen.height/4.25-10,Screen.width/1.75,Screen.height/1.5+10), "");
            GUI.Label(Rect(Screen.width/4+5,Screen.height/4.25-5,Screen.width/2,Screen.height/2), "Use arrow keys to move and select answer with space..", quizAnswerStyle);
            GUI.Label(Rect(Screen.width/4+15,Screen.height/4+15,Screen.width/2,Screen.height/2), quizAnswers[0], quizAnswerStyle);
            GUI.Label(Rect(Screen.width/4+15,Screen.height/4+105,Screen.width/2,Screen.height/2), quizAnswers[1], quizAnswerStyle);
            GUI.Label(Rect(Screen.width/4+15,Screen.height/4+195,Screen.width/2,Screen.height/2), quizAnswers[2], quizAnswerStyle);
            GUI.Label(Rect(Screen.width/4+15,Screen.height/4+285,Screen.width/2,Screen.height/2), quizAnswers[3], quizAnswerStyle);
            if (sQuizAnswer == 0){
                GUI.Label(Rect(Screen.width/4+15,Screen.height/4+15,Screen.width/2,Screen.height/2), quizAnswers[0], sQuizAnswerStyle);
            }
            else if (sQuizAnswer == 1){
                GUI.Label(Rect(Screen.width/4+15,Screen.height/4+105,Screen.width/2,Screen.height/2), quizAnswers[1], sQuizAnswerStyle);
            }
            else if (sQuizAnswer == 2){
                GUI.Label(Rect(Screen.width/4+15,Screen.height/4+195,Screen.width/2,Screen.height/2), quizAnswers[2], sQuizAnswerStyle);
            }
            else if (sQuizAnswer == 3){
                GUI.Label(Rect(Screen.width/4+15,Screen.height/4+285,Screen.width/2,Screen.height/2), quizAnswers[3], sQuizAnswerStyle);
            }
        }
	}
	
	
	if (questDisplay) {
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), currentQuestText, questTextStyle);
		GUI.Label(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), currentQuestHeader, questHeaderStyle);
	}
	
	if (resetDisplay) {
		var resetMsg : String = "Resetting the game will undo any progress you've made so far. If you'd like to cancel, press the space bar. If you still want to reset and go back to level selection, press the button below.";
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), resetMsg, resetBoxStyle);
		if (GUI.Button(Rect(Screen.width/2 - 15, (Screen.height * 0.75) - 60, 32, 32), resetIconImg, menuButtonStyle)) {
			Application.LoadLevel("levelSelect");
			musicPlayer.LevelSelection(); //have musicsingleton stop music and reset it to Secrets Revealed
			GLOBAL.ResetVariables();
		}
	}
	
	if (journalDisplay) {
		GUI.Box(Rect(Screen.width/8, Screen.height/8, Screen.width/1.33, Screen.height/1.33), currentJournalText, journalStyle);
//		GUI.Box(Rect(140,Screen.height-80,Screen.width*0.7,30), "");
//		GUI.Label(Rect(-80,Screen.height-230,Screen.width,200), "Space bar for next page. Or use the buttons to cycle through journal entries", spaceBarStyle);
//		if (currentJournalPage != 0) {
//			if (GUI.Button(Rect(Screen.width/8,Screen.height/2,32,32),journalImg,menuButtonStyle)){
//				DisplayJournal(--currentJournalPage);
//				}
//		}
//				
//		if (currentJournalPage != 8) {
//			if (GUI.Button(Rect(Screen.width*7/8,Screen.height/2,32,32),journalImg,menuButtonStyle)){
//				DisplayJournal(++currentJournalPage);
//			}
//		}
	}
	if (journalUI){//TODO: NEW JOURNAL UI
        GUI.Box(Rect(Screen.width/8, Screen.height/8, Screen.width*3/4, Screen.height*3/4+10),"");
        if ((GLOBAL.pagesObtained[0] == "y")){
        	if(GUI.Button(Rect(Screen.width/8+30, Screen.height/8+25, Screen.width/5, Screen.height/5), "\n\nFather's Note", journalSelectStyle)){
            	DisplayJournal(0);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+30, Screen.height/8+25, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
            	DisplayJournal(0);
            	journalUI = false;
        	}
        }
        if((GLOBAL.pagesObtained[1] == "y")){
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width/5)+60, Screen.height/8+25, Screen.width/5, Screen.height/5), "\nWe're Contributing to a Global Extinction Crisis ", journalSelectStyle)){
            	DisplayJournal(1);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width/5)+60, Screen.height/8+25, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
            	DisplayJournal(1);
            	journalUI = false;
        	}
        }
        if(GLOBAL.pagesObtained[2] == "y"){
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width*2/5)+90, Screen.height/8+25, Screen.width/5, Screen.height/5), "\nThree-quarters of the world's forests are owned by governments.", journalSelectStyle)){
            	DisplayJournal(2);
            	journalUI = false;
        	}
        }
        else {
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width*2/5)+90, Screen.height/8+25, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
            	DisplayJournal(2);
            	journalUI = false;
        	}
        }
        if(GLOBAL.pagesObtained[3] == "y"){
        	if(GUI.Button(Rect(Screen.width/8+30, Screen.height/8+(Screen.height/5)+50, Screen.width/5, Screen.height/5), "\nWhat makes for a successful common-property system? ", journalSelectStyle)){
            	DisplayJournal(3);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+30, Screen.height/8+(Screen.height/5)+50, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
            	DisplayJournal(3);
            	journalUI = false;
        	}
        }
        if(GLOBAL.pagesObtained[4] == "y"){
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width/5)+60, Screen.height/8+(Screen.height/5)+50, Screen.width/5, Screen.height/5), "\nA case study of community forest management in action ", journalSelectStyle)){
            	DisplayJournal(4);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width/5)+60, Screen.height/8+(Screen.height/5)+50, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
            	DisplayJournal(4);
            	journalUI = false;
        	}
        }
        if(GLOBAL.pagesObtained[5] == "y"){
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width*2/5)+90, Screen.height/8+(Screen.height/5)+50, Screen.width/5, Screen.height/5), "\nCommunity forestry is growing in importance due to political decentralization", journalSelectStyle)){
        	    DisplayJournal(5);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width*2/5)+90, Screen.height/8+(Screen.height/5)+50, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
        	    DisplayJournal(5);
            	journalUI = false;
        	}
        }
        if(GLOBAL.pagesObtained[6] == "y"){
        	if(GUI.Button(Rect(Screen.width/8+30, Screen.height/8+(Screen.height*2/5)+75, Screen.width/5, Screen.height/5), "\nWhat exactly is a 'local community' in the context of forest management?", journalSelectStyle)){
            	DisplayJournal(6);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+30, Screen.height/8+(Screen.height*2/5)+75, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
            	DisplayJournal(6);
            	journalUI = false;
        	}
        }
        if(GLOBAL.pagesObtained[7] == "y"){
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width/5)+60, Screen.height/8+(Screen.height*2/5)+75, Screen.width/5, Screen.height/5), "\nWomen's participation is essential in community forestry", journalSelectStyle)){
            	DisplayJournal(7);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width/5)+60, Screen.height/8+(Screen.height*2/5)+75, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
            	DisplayJournal(7);
            	journalUI = false;
        	}
        }
        if(GLOBAL.pagesObtained[8] == "y"){
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width*2/5)+90, Screen.height/8+(Screen.height*2/5)+75, Screen.width/5, Screen.height/5), "\n\nValuing the forest", journalSelectStyle)){
           		DisplayJournal(8);
            	journalUI = false;
        	}
        }
        else{
        	if(GUI.Button(Rect(Screen.width/8+(Screen.width*2/5)+90, Screen.height/8+(Screen.height*2/5)+75, Screen.width/5, Screen.height/5), "", journalSelectStyle)){
           		DisplayJournal(8);
            	journalUI = false;
        	}
        }
    }
	
	if (infoDisplay) { //HELP MENU DISPLAY
		currentString = GLOBAL.infoDict[infoTitle];
		GUI.Box(Rect((Screen.width/4)-20, (Screen.height/4)-20, (Screen.width/2)+40, (Screen.height/2+40)), currentString, infoBoxStyle);
	}
	
	if (doNotInfoDisplay) { //HELP MENU DISPLAY
		currentString = GLOBAL.infoDict[infoTitle];
		GUI.Box(Rect((Screen.width/4)-20, (Screen.height/4)-20, (Screen.width/2)+40, (Screen.height/2+40)), currentString, doNotEnterStyle);
	}
	
	if (jumpInfoDisplay) { //show the jump info if we should be
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "Your father's journal pages are scattered around the waterfall. Use the space bar to jump and find all the pages.", infoBoxStyle);
	}
	if (capInfoDisplay) { //show the cap info if we should be
		GUI.Box(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), "You have arrived in the capital.  It is now up to you to convince politicians in the parliament building to revise the forestry law so that local communities can participate in forest governance.  Go find Senator A to get started.", infoBoxStyle);
	}
}

function DisplayQuest () {
	if (journalDisplay) {
		displayQuestOnExit = true;
	}
	else {
		currentQuestHeader = GLOBAL.questHArray[GLOBAL.questNum];
		if (Application.loadedLevelName == "Maze" && Array(remainingMaze).length > 0) {
			currentQuestText = 
				"You still need to find: " + Array(remainingMaze).Join(", ") + "\n\n" + GLOBAL.questArray[GLOBAL.questNum];
		} else if (Application.loadedLevelName == "waterfall" && ((GLOBAL.numPages - GLOBAL.totalPages)) > 0) {
			currentQuestHeader = "Find the journal pages";
			currentQuestText =
				"You still need to find " + ((GLOBAL.numPages - GLOBAL.totalPages)) + " more page(s).\n\n" + GLOBAL.questArray[GLOBAL.questNum];
		} else {
			currentQuestText = GLOBAL.questArray[GLOBAL.questNum];
		}
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
		currentJournalText = "You have not found this entry yet.";
	}
	else {
		currentJournalText = tc.journalDict[currentPage][journalPart];
	}
	journalDisplay = true;
	running = false;
	canControl(false);
	questDisplay = false;
}
function DisplayJournalUI (){ //TODO: new JOURNAL UI
	journalUI = true;
	running = false;
	canControl(false);
	questDisplay = false;
}
function DisplayInfo (infoName : String) {
	infoTitle = infoName;
	infoDisplay = true;
	canControl(false);
	questDisplay = false;
}
function DisplayNotEnterInfo (infoName : String) {
	infoTitle = infoName;
	doNotInfoDisplay = true;
	canControl(false);
	questDisplay = false;
}

function canControl (val : boolean) {
	if (movement)
		movement.canControl = val;
	if (wMovement)
		wMovement.canControl = val;
}

function GameOver (){
	Application.LoadLevel("demoEnd");
}