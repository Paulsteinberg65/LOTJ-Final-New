private var dialogueDict : Object = {};
private var questArray : Array = [];
private var quizDict : Object = {};
private var quizResponseDict : Object = {};

private var NPC1 : String[];
private var NPC2 : String[];

function Start () {
	//populate NPC dialogue dictionary
	NPC1 = ["Hi!", "Nice to meet you.", "I have to go now.", "quiz", "you just got quizzed!"];
	NPC2 = ["Howdy!", "We don't get too many visitors around here."];
	
	dialogueDict["NPC1"] = NPC1;
	dialogueDict["NPC2"] = NPC2;
	
	quizDict["NPC1"] = ["Answer 1","Answer 2"];
	quizResponseDict["NPC1"] = ["Correct!", "Wrong!"];
	
	//populate Quest text array
	questArray.push("Quest 1");
	questArray.push("Quest 2");
	questArray.push("Quest 3");
}

function Update () {

}