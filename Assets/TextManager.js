private var facedPosition : Vector3;
private var facedDifference : Vector3;
var facedObject : GameObject;

private var interacting : boolean = false;
private var currentText : String[];
private var currentLine : String;
private var currentLineNum : int;
private var currentTextLength : int;

private var quiz : boolean = false;
private var quizLength : int = 0;
private var selectedQuizAnswer : int = 0;
private var quizAnswers : String[];
private var quizResponses : String[];
private var quizA0 : String;
private var quizA1 : String;
private var quizProg : int = 0;

var collisionManager : GameObject;
private var collisionDict : Object;
private var movementScript : Object;
private var wMovement : Object;

var textContainer : GameObject;
var tcName : String = "enter name";
var tcScript : Object;
var ts : Object;	//timer script
var gui : Object;
private var GLOBAL : Object;
private var questDisplay : boolean = false;

private var mazeList = new Array( ["Gabriela","Manuel","Lita","Carlos","Camilo"] );
private var mazeComplete : boolean = false;

var charSprite : tk2dAnimatedSprite;
var charMotor : Object;

var iTime : float;

var endCamilo : float;

// Use this for initialization
function Start () {
	if (Application.loadedLevelName == "capitol"){
		//ts = GameObject.Find("TIMER").GetComponent("timerScript"); TODO: ALL INSTANCES OF ts. became gui.
		gui = GameObject.Find("GUIController").GetComponent("GUIController");
	}
	if (collisionManager) {
		collisionDict = collisionManager.GetComponent("CollisionManager").collisionDict;
	}
	if(Application.loadedLevelName != "waterfall" && Application.loadedLevelName != "waterfallCave") {
		movementScript = GetComponent("PlayerMovement");
	}
	else if (Application.loadedLevelName == "waterfall" || Application.loadedLevelName == "waterfallCave") {
		charMotor = GameObject.Find("Player").GetComponent("CharacterMotor");
	}
	wMovement = GetComponent("CharacterMotor");
	tcScript = textContainer.GetComponent(tcName);
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	
	//populate maze list
	//["Gabriela","Manuel","Lita","Carlos","Camilo"];
}

// Update is called once per frame
function Update () {
	//the following elif stops the character from jumping at the end of the interaction with the Father in WaterfallCave
	if (Application.loadedLevelName == "waterfallCave" && interacting == false && (Time.time - iTime) <= 0.3) {
		charMotor.jumping.enabled = false;
		} else if (Application.loadedLevelName == "waterfallCave" && interacting == false && (Time.time - iTime > 0.3)) {
		charMotor.jumping.enabled = true;
	}
	if (Application.loadedLevelName == "waterfallCave" && interacting) {
		charMotor.canControl = false;
		charMotor.movement.velocity.x = 0.0;
		charMotor.movement.velocity.y = 0.0;
		charMotor.movement.velocity.z = 0.0;
		charSprite.Stop();
	}
	
	if (Input.GetButtonDown("Space")) {
		if (questDisplay) {
			questDisplay = false;
		}
		else if (!interacting) {
			if (Application.loadedLevelName == "waterfall" || Application.loadedLevelName == "waterfallCave"){
				return;
				}
			else {
				facedPosition = transform.position + getFacedDifference();
				if (collisionDict) {
					if (collisionDict[(facedPosition.x).ToString() + ", " + (facedPosition.y).ToString()]) {
						facedObject = collisionDict[(facedPosition.x).ToString() + ", " + (facedPosition.y).ToString()];
						if (facedObject.tag == "NPC"  && (GLOBAL.GUIController.journalDisplay == false) && ((Time.time - GLOBAL.GUIController.endCamilo)> 2.0)) {
							startConvo(facedObject.name);
							//gui.timerPause();
						}
					}
				}
			}
		}
		else {
		//gui.timerPause();
		Debug.Log("current dialogue = "+ tcScript.currentDialogue);
				Debug.Log("current dialogue = "+ tcScript.currentDialogue);
						Debug.Log("current dialogue = "+ tcScript.currentDialogue);
			if (currentLineNum+1 < currentTextLength && currentText[currentLineNum+1] != "quiz") {
				currentLineNum++;
				currentLine = currentText[currentLineNum];
			}
			else {
				//quiz
				if (currentLineNum+1 < currentTextLength && currentText[currentLineNum+1] == "quiz" && !quiz) {
					quiz = true;
					quizAnswers = tcScript.quizDict[facedObject.name];
					quizResponses = tcScript.quizResponseDict[facedObject.name];
					quizLength = quizAnswers.Length;
					quizA0 = quizAnswers[0];
					quizA1 = quizAnswers[1];
					Debug.Log("quizzing");
				}
			
				//end quiz
				else if (quiz) {
					quizAnswer = quizAnswers[selectedQuizAnswer];
					Debug.Log(quizAnswer);
					quiz = false;
					currentLine = quizResponses[selectedQuizAnswer];
					
					
					if (currentLine == "Correct!"){
						selectedQuizAnswer = 0;
						GLOBAL.AdvanceQuiz();	//advances quiz progress
						//Debug.Log("Quiz is now on: " + GLOBAL.quizProg); TODO: REmove
					//	currentLineNum = currentTextLength; //don't think this is necessary for correct answer
						currentLineNum += 2; //skips displaying the "quiz" line that activates quiz
						currentLine = currentText[currentLineNum]; //continues text

						if (gui.playerCounter == 1 && facedObject.name == "Senator C - Chair, Natural Resources Committee"){
							gui.playerUp();
							GLOBAL.AdvanceQuest();
							tcScript.NextDialogue();
							//tcScript.ChangeAides(1);
						}
						else if (gui.playerCounter == 2 && facedObject.name == "Senator Z"){
							gui.playerUp();
							GLOBAL.AdvanceQuest();
							tcScript.NextDialogue();
							//tcScript.ChangeAides(2);
						}

						else if (facedObject.name == "Representative H" && gui.playerCounter == 4){
							//tcScript.ChangeAides(3);
							tcScript.NextDialogue();
							gui.playerUp();
						}

						else if (gui.playerCounter == 0 && facedObject.name == "Representative T"){
							tcScript.NextDialogue();
							gui.playerUp();
						}

						else if (gui.playerCounter < 5 && gui.playerCounter >= 1 && facedObject.name == "Representative E"){
							if(!gui.repE){
							gui.repE = true;
							gui.playerUp();
							tcScript.NextDialogue();
								if(gui.repQ && gui.repR){
									tcScript.NextDialogue();
								}
							}
						}
						else if (facedObject.name == "Representative W - Speaker of the Chamber of Representatives" && gui.playerCounter == 5){
						gui.toggleFinish();
						gui.stopTimer();
						gui.playerUp();
						//gui.GameOver();
						}
					
					}
					else{ //wrong answer
						gui.skip();
						currentLineNum = currentTextLength;
						currentLine = "That's not quite right... Check the pages you have collected and try again";
					}
				}
				else {
					//gui.timerUnpause();
					Debug.Log("End interaction");
					interacting = false;
					iTime = Time.time;
					//advance quests / progress zone dialogue
					if (GLOBAL.questNum == 0 && facedObject.name == "Mom") {
						GLOBAL.AdvanceQuest();
						tcScript.NextDialogue();
					}
					if (GLOBAL.questNum == 1 && facedObject.name == "Biologist") {
						GLOBAL.AdvanceQuest();
						tcScript.NextDialogue();
					}
					
					if (GLOBAL.questNum == 2 && mazeComplete) {
						endCamilo = Time.time;
						GLOBAL.AddPage(0);
						GLOBAL.AdvanceQuest();
						Debug.Log("advancing from maze");
					}
					
					if (GLOBAL.questNum == 5 && currentText == tcScript.dialogueDict["Father"]) {
						GLOBAL.AdvanceQuest();
					}
					if (facedObject.name == "Legislative Aide Z" && gui.playerCounter == 2){
						Destroy(facedObject);
					}
					if (facedObject.name == "Legislative Aide X" && gui.playerCounter == 3){
						Destroy(facedObject);
					}
					if (facedObject.name == "Legislative Aide W" && gui.playerCounter == 5){
						Destroy(facedObject);
					}
					if (Application.loadedLevelName == "capitol" && (facedObject.name == "Dante" || facedObject.name == "Dante ")){
						if (facedObject.name == "Dante"){
							GLOBAL.AdvanceQuest();
						}
						Destroy(facedObject);
						
					}
					//these add to the quiz progress counter for NPC's that don't give quizzes
					if (facedObject.name == "Senator A" && ((GLOBAL.questNum <= 8)||(GLOBAL.questNum == 10)) ){
						GLOBAL.AdvanceQuest();
						tcScript.NextDialogue();
					}
					if (facedObject.name == "Senator G - Member, Natural Resources Committee" && gui.playerCounter == 0){
						Debug.Log("Should advance dialogue");
						GLOBAL.AdvanceQuiz();
						GLOBAL.AdvanceQuest();
						tcScript.NextDialogue();
						gui.playerUp();
					}
					else if (facedObject.name == "Senator X - President of the Senate" && gui.playerCounter == 3){
						tcScript.NextDialogue();
						gui.toggleFinish();
						gui.stopTimer();
						GLOBAL.AdvanceQuiz();
						GLOBAL.AdvanceQuest();
						gui.playerUp();
						Debug.Log("On quest #: "+GLOBAL.questNum);
						gui.senateExit();
					}
					else if (facedObject.name == "Representative R" && gui.playerCounter < 5 && gui.playerCounter > 1){
						if (!gui.repR){
						GLOBAL.AdvanceQuiz();
						gui.playerUp();
						gui.repR = true;
							if(gui.repQ && gui.repE){
								tcScript.NextDialogue();
							}
						}
					}
					else if (facedObject.name == "Representative Q" && gui.playerCounter < 5  && gui.playerCounter > 1){
						if(!gui.repQ){
						GLOBAL.AdvanceQuiz();
						gui.playerUp();
						gui.repQ = true;
							if(gui.repR && gui.repE){
								tcScript.NextDialogue();
							}
						}

					}
					else if (facedObject.name == "Representative W - Speaker of the Chamber of Representatives" && gui.playerCounter == 6){
						gui.GameOver();
						}
					

					
					//update dynamic text
					if (Application.loadedLevelName == "Maze") {
						for(var i = 0; i < mazeList.length; i++) {
							if (mazeList[i]==facedObject.name) {
								mazeList.RemoveAt(i);
							}
						}
						if (mazeList.length==0 && mazeComplete==false) {
							mazeComplete = true;
							startConvo("QuestComplete");
							
							//tcScript.dialogueDict[facedObject.name].Push(tcScript.dialogueDict["QuestComplete"]);
						}
					}
//					if(!questDisplay){
//						canControl(true);
//					}
//					else{
//						
//					}
//					
					canControl(true);
					
					
					//facedObject = null;
				}
				
			}
		}
	}
	
	
	if (Input.GetButtonDown("Up") && quiz) {
		if (selectedQuizAnswer == 0) {
			selectedQuizAnswer = quizAnswers.Length-1;
		}
		else {
			selectedQuizAnswer--;
		}
	}
	if (Input.GetButtonDown("Down") && quiz) {
		if (selectedQuizAnswer == quizAnswers.Length-1) {
			selectedQuizAnswer = 0;
		}
		else {
			selectedQuizAnswer++;
		}
	}
}


function getFacedDifference () {
	if (movementScript.facing == "left")
		return Vector3(-1,0,0);
	else if (movementScript.facing == "right")
		return Vector3(1,0,0);
	else if (movementScript.facing == "up")
		return Vector3(0,1,0);
	else if (movementScript.facing == "down")
		return Vector3(0,-1,0);
	else
		return Vector3(0,0,0);
}

function canControl (val : boolean) {
	if (movementScript)
		movementScript.canControl = val;
	if (wMovement)
		wMovement.canControl = val;
}

function senateDialogue(){
	tcScript.senateDialogue();
}

function houseDialogue(){

	tcScript.houseDialogue();
}

function startConvo (NPC : String) {
	Debug.Log("starting");
	interacting = true;
	canControl(false);
	charSprite.StopAndResetFrame();
	currentText = tcScript.dialogueDict[NPC];
	currentLineNum = 0;
	currentLine = currentText[currentLineNum];
	currentTextLength = currentText.Length;
	charMotor.jumping.enabled = false;
}