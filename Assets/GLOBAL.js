
public static var questNum : int = 0;
public static var pagesObtained : Array = [];

var numPages : int = 9;
var totalPages : int = 0;
var playerGender : int = 0; //0 for boy; 1 for girl

var quizProg : int = 0;		//increases for every politician met and answered correctly
var inSenate : boolean = false;	//true if in the senate building in the capitol
var inHouse : boolean = false; //true if in the house of reps in the capitol

var GUIController : Object;

var dialogueHeaderStyle : GUIStyle;
var dialogueTextStyle : GUIStyle;
var questHeaderStyle : GUIStyle;
var questTextStyle : GUIStyle;
var infoBoxStyle : GUIStyle;
var journalStyle : GUIStyle;
var menuButtonStyle : GUIStyle;
var spaceBarStyle : GUIStyle;

var NPCDict : Object = {};
var priestImg : Texture2D;
var mayorImg : Texture2D;
var studentImg : Texture2D;
var coffeeImg : Texture2D;
var fishermanImg : Texture2D;
var artisanImg : Texture2D;
var policeImg : Texture2D;

var infoDict : Object = {};

private var questArray : Array = [];
private var questHArray : Array = [];

var muted : boolean = false;


function Start () {
	DontDestroyOnLoad(gameObject);
	GUIController = GameObject.Find("GUIController").GetComponent("GUIController");
	for (var i = 1; i < numPages; i++) {
		pagesObtained.push("n");
	}
	
	NPCDict["Priest"] = priestImg;
	NPCDict["Mayor"] = mayorImg;
	NPCDict["Student"] = studentImg;
	NPCDict["Coffee Farmer"] = coffeeImg;
	NPCDict["Fisherman"] = fishermanImg;
	NPCDict["Artisan"] = artisanImg;
	NPCDict["Police Officer"] = policeImg;
	
	infoDict["capital"] = "If your village is going to protect its natural resources, you will need the support of national lawmakers. You must convince them to pass a new law that empowers local communities to take part in forest governance. The national legislature is in the capital, a day's drive from here.";
	
	//populate Quest text array
	questHArray.push("Find your mother");
	questArray.push("Your mother is waiting for you in the village. Seek her out.  Move with the arrow keys and press space to talk to nearby characters.");
	questHArray.push("Find the biologist");
	questArray.push("Your mother suggested that you find the biologist to help figure out what happened to your father and why the forest is being destroyed. He is somewhere in this area.");
	questHArray.push("Find your father in the forest");
	questArray.push("The biologist feels that ignorance and greed are driving the destruction of the forest, but you suspect it's more complex than that. Find your father to learn more. There are five farmers in the forest who may be able to help you find him.");
	//questHArray.push("Return to the village");
	//questArray.push("Your father has been kidnapped. Go tell the villagers what has happened.");
	questHArray.push("Go to the waterfall");
	questArray.push("The search party suggested that you might find clues about what happened to your dad. If you see more pages from his research journal, read them carefully.");
	questHArray.push("Find your father");
	questArray.push("The search party mentioned that there are caves around here.");
	questHArray.push("Return to the village");
	questArray.push("Let the search party know that you found your father.");
	questHArray.push("Locate transportation");
	questArray.push("Travel to the capital with the mayor and the biologist. See if you can convince lawmakers to consider supporting the new model of community forest governance you have created.");
	questHArray.push("Find Senator A");
	questArray.push("");
	questHArray.push("Lobby for change");
	questArray.push("You still need to find Senator G - Member, Natural Resources Committee,Senator C - Chair, Natural Resources Committee,Senator Z - Head of the National Justice Party, Senator X - President of the Senate", "The key to influencing national laws is to meet with the right people.  Convince politicians in the parliament building to revise the forestry law so that local communities can participate in forest governance.  By meeting with lower-level politicians you will make personal connections that allow you to talk to more influential legislators.  But don't take too long - Dante is simultaneously lobbying against community forestry.");
	questHArray.push("Continue lobbying for change");
	questArray.push("There is a great deal of clamor at the capital about the need for a change in forestry legislation, but more still needs to be done!  Continue convincing politicians in the parliament building to implement these reforms before Dante convinces them otherwise!");
	questHArray.push("You have succeeded!");
	questArray.push("The legislation has been passed! Congratulations!");
	questHArray.push("You have succeeded!");
	questArray.push("The legislation has been passed! Congratulations!");
}

function Update () {

}

function AdvanceQuest () {
	questNum += 1;
	DisplayQuest();
}

function DisplayQuest () {
	GUIController.DisplayQuest();
}

function DisplayInfo (infoTitle : String) {
	GUIController.DisplayInfo(infoTitle);
}

function refreshGender (gender : int) { //takes gender number and saves it to playerGender variable
	playerGender = gender; 
}

function getGender () {
	return playerGender;
}

function SenateToggle(){	//toggle state for in senate building or not
	if (inSenate){
		inSenate = false;
	}
	else{
		inSenate = true;
	}
}
function HouseToggle(){	//toggle state for in house of reps or not
	if (inHouse){
		inHouse = false;
	}
	else{
		inHouse = true;
	}
}

function AdvanceQuiz(){
	quizProg += 1;
}

function AddPage (pageNum : int) {
	pagesObtained[pageNum] = "y";
	totalPages++;
	Debug.Log("Total pages: " + totalPages);
	Debug.Log("Page num: " + pageNum);
	GUIController.DisplayJournal(pageNum);
	if (totalPages == 9) {
		AdvanceQuest();
		Debug.Log("advancing quest");
	}
}

function FindGUI () {
	GUIController = GameObject.Find("GUIController").GetComponent("GUIController");
}