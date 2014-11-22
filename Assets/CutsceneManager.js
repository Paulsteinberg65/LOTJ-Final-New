var cutscene : int = 0;

private var NPCDict : Array = [];
private var TextDict : Array = [];

private var currentIndex : int = 0;
private var currentNPC : String;
private var currentText : String;
private var nextScene: String;

private var speakerTex : Texture2D;
private var GLOBAL;

var GUIController;

var dialogueHeaderStyle : GUIStyle;
var dialogueTextStyle : GUIStyle;

var backgroundGUI : GUITexture;
var boyBG1 : Texture2D;
var girlBG1 : Texture2D;
var boyBG2 : Texture2D;
var girlBG2 : Texture2D;

// Use this for initialization
function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	dialogueTextStyle = GLOBAL.dialogueTextStyle;
	dialogueHeaderStyle = GLOBAL.dialogueHeaderStyle;
	
	if (Application.loadedLevelName == "searchParty1" && GLOBAL.playerGender == 0) {
			backgroundGUI.texture = boyBG1;
		}
		else if (Application.loadedLevelName == "searchParty1" &&  GLOBAL.playerGender == 1) {
			backgroundGUI.texture = girlBG1;
		}
		else if (Application.loadedLevelName == "searchParty2" && GLOBAL.playerGender == 0) {
			backgroundGUI.texture = boyBG2;
		}
		else if (Application.loadedLevelName == "searchParty2" && GLOBAL.playerGender == 1) {
			backgroundGUI.texture = girlBG2;
		}
		else if (Application.loadedLevelName == "town3" && GLOBAL.playerGender == 0) {
			if(cutscene == 0){
				cutscene = 3;
			}
			backgroundGUI.texture = boyBG1;
		}
		else if (Application.loadedLevelName == "town3" && GLOBAL.playerGender == 1) {
			if(cutscene == 0){
				cutscene = 3;
			}
			backgroundGUI.texture = girlBG1;
		}
	
	if (cutscene == 0 && Application.loadedLevelName != "town3") {
		NPCDict.push("NPC1");
		NPCDict.push("NPC1");
		NPCDict.push("NPC2");
		NPCDict.push("NPC2");
		NPCDict.push("NPC1");
		
		TextDict.push("I sure hope we catch that villain....");
		TextDict.push("He's been causing a lot of trouble around here lately.");
		TextDict.push("Agreed. The situation's only been getting worse.");
		TextDict.push("We need a hero, and fast!");
		TextDict.push("A hero? Do you think this is some kind of game!?");
		
		nextScene = "none";	
	}
	else if (cutscene == 1 && Application.loadedLevelName != "town3") {
		NPCDict.push("Priest");
		NPCDict.push("Mayor");
		NPCDict.push("Student");
		NPCDict.push("Coffee Farmer");
		NPCDict.push("Fisherman");
		NPCDict.push("Fisherman");
		NPCDict.push("Fisherman");
		
		TextDict.push("As soon as we heard that your father is missing we organized a search party.");
		TextDict.push("This sounds like Dante’s dirty work.  He and his men will stop at nothing in their effort to control these forests.");
		TextDict.push("I don’t mean to alarm you, but I learned in class that in countries like ours where the laws are poorly enforced, people fighting for sustainability are sometimes harassed and even subjected to violence by those who profit from destroying the environment.");
		TextDict.push("We need to find your father right away.  I’ll put together a team of farmers to search in the forest.");
		TextDict.push("I’ll search for clues along the river.  Dante’s men transport their wood there and have many hideouts.  You should check out the waterfall.");
		TextDict.push("There are caves at the top where rebel forces used to hide during the war against the dictators.");
		TextDict.push("If you find more pages from his research journal like the one you have, read them carefully - they may provide useful clues.  Take the path behind your parents' house.");
		
		nextScene = "waterfall";
	}
	else if (cutscene == 2 && Application.loadedLevelName != "town3") {
		NPCDict.push("Fisherman");
		NPCDict.push("Coffee Farmer");
		NPCDict.push("Coffee Farmer");
		NPCDict.push("Mayor");
		NPCDict.push("Mayor");
		NPCDict.push("Mayor");
		NPCDict.push("Mayor");
		NPCDict.push("Mayor");
		NPCDict.push("Mayor");
		NPCDict.push("Priest");
		NPCDict.push("Priest");
		NPCDict.push("Coffee Farmer");
		NPCDict.push("Coffee Farmer");
		NPCDict.push("Coffee Farmer");
		NPCDict.push("Student");
		NPCDict.push("Fisherman");
		NPCDict.push("Fisherman");
		NPCDict.push("Fisherman");
		NPCDict.push("Artisan");
		NPCDict.push("Artisan");
		NPCDict.push("Mayor");
		NPCDict.push("Priest");
		NPCDict.push("Priest");
		NPCDict.push("Priest");
		NPCDict.push("Priest");
		
		TextDict.push("We are shocked to hear what Dante’s men did to your father.  This time he has gone to far.  We need to run Dante and his gang of thugs out of town!");
		TextDict.push("Hold on everyone.  We need to be smart about this.  First of all, we need to put in place new rules to govern the use of our forests.");
		TextDict.push("Otherwise, even if we have Dante arrested, what’s to prevent some other powerful people from coming here and doing the same thing in the future?");
		TextDict.push("I am glad to hear your father is safe.  That man Dante is a scoundrel.");
		TextDict.push("He has tried to influence me with threats and bribes, but he knows that I have political connections in the capital, and wouldn't dare move against me.");
		TextDict.push("It is true that we need some new arrangement to better manage our use of the land.");
		TextDict.push("I could convene a town meeting for this purpose.  But please understand: I serve at the will of the people.");
		TextDict.push("The demand for conservation must come from the community.  We must help people understand that we don’t have to live this way.");
		TextDict.push("But I worry that people are now so dispirited, they won’t come together for much of anything.");
		TextDict.push("We must not forget that this community banded together to oppose the dictators during the dark years.  We can do it again!");
		TextDict.push("If you want to get people's attention, remember: people listen to others in their peer group, who share their background and concerns.  That is how you build trust.");
		TextDict.push("I could speak with other farmers.  We belong to the union and have strong bonds.  I will talk with them about new ways to expand business opportunities without clearing the forest.");
		TextDict.push("Your father and I have been talking about this.");
		TextDict.push("The possibilities include reaching new markets for shade-grown coffee, selling carbon credits to foreign investors, and charging our local water company for planting tree crops alongside the river, which prevents soil runoff.");
		TextDict.push("I’ll spread the word among the students.  Young people around here care a great deal about sustainability.  We can also have an influence within our families, sharing insights with parents and grandparents.");
		TextDict.push("I will speak with the fishermen.  We have been concerned about declining fish catches in the river.  Your father and I often talk about this problem late into the night.");
		TextDict.push("I now realize this is due in part to destruction of the forest.  When the trees are cut down, there are no root systems to hold together the soil, which then flows into the river.");
		TextDict.push("The cloudy water reduces sunlight, and this means less oxygen for the fish.");
		TextDict.push("I will speak with the other craftspeople.  The artisans are natural allies for conservation because we need sustainable wood supplies.");
		TextDict.push("We also want to be sure that any new rules serve the interests of the local community rather than foreign corporations.");
		TextDict.push("Come on, everyone.  We know what we need to do.  Let’s start by spreading the word in the town market.");
		TextDict.push("Child, let me speak to you quickly before you go.");
		TextDict.push("I am so glad that you are helping your father in his quest.  You come from a very courageous family, you know – your parents played an important role in opposing the dictators back in the 1980s.");
		TextDict.push("If you want to get people's attention, remember: people listen to others in their peer group, who share their background and concerns.");
		TextDict.push("In our community, that means that farmers can reach out to other farmers, hunters to other hunters, and so forth.");
		
		nextScene = "enterAwareness";
	}
	else if (cutscene == 3 || (Application.loadedLevelName == "town3" && cutscene != 4)) {
		cutscene = 4;
		NPCDict.push("Police Officer");
		NPCDict.push("Police Officer");
		NPCDict.push("Police Officer");
		NPCDict.push("Police Officer");
		NPCDict.push("Police Officer");
		NPCDict.push("Police Officer");
		NPCDict.push("Police Officer");
		NPCDict.push("Mayor");
		NPCDict.push("Mayor");
		NPCDict.push("Mayor");
		
		TextDict.push("Police! Hold it right there! What do you think you're doing here? You cannot just give yourselves new powers, completely ignoring national laws.");
		TextDict.push("Yes, I realize that the existing national laws are not enforced.  Did Dante put us up to this, you ask? Where did you get that idea? Why that's just, um...");
		TextDict.push("Okay, look - we're just following orders here.  My captain told me to make this a priority.  Besides, it's true: you aren't authorized to do this under the current law.");
		TextDict.push("Listen...  I know your parents, we grew up together.  And...  Between you and me, if you want to beat this guy, you'll need to match his political influence in the capital.");
		TextDict.push("Don't ask me how, I'm just a police officer.  But I can tell you this: right now, it's easy for Dante to do whatever he wishes because the existing rules are so weak.");
		TextDict.push("If you did have a new national law, and if it was clear and enforceable and respected by the community...  and if Dante broke that law... ");
		TextDict.push("Well, let's just say it would make my job a lot easier.  I could arrest him.");
		TextDict.push("He’s right.  We must travel to the capital.");
		TextDict.push("Lawmakers are already debating whether to revise the national forestry law.  We need to convince them to include rules that empower communities to manage forests sustainably.");
		TextDict.push("We must go back to the village and prepare to leave for the capital!");
		
		
		nextScene = "drive1";
		//nextScene = "town3"; UNCOMMENT IF NOT DEMO
	}
	else if (cutscene == 4) {
		NPCDict.push("Priest");
		NPCDict.push("Priest");
		NPCDict.push("Mayor");
		
		TextDict.push("Are you all packed and ready to depart? I've put gas in the jeep for you already.");
		TextDict.push("There is nothing more important than your mission in the capital. Our village is depending on you. Good luck.");
		TextDict.push("I will accompany you - I have friends in the legislature.  Your father is too weak to travel, but the biologist John Jeffers will join us.");
		
		nextScene = "drive1";
		
		//nextScene = "drive1"; UNCOMMENT IF NOT DEMO MAKE SURE TO REPLACE IMAGES FOR DRIVE1 AND DRIVE2!!!
	}


	currentNPC = NPCDict[currentIndex];
	currentText = TextDict[currentIndex];
	speakerTex = GLOBAL.NPCDict[currentNPC];
}

// Update is called once per frame
function Update () {
	if (Input.GetButtonDown("Space"))
		AdvanceCutscene();
}

function AdvanceCutscene () {
	if (NPCDict.length > currentIndex + 1) {
		currentIndex += 1;
		currentNPC = NPCDict[currentIndex];
		currentText = TextDict[currentIndex];
		speakerTex = GLOBAL.NPCDict[currentNPC];
	}
	else {
		Application.LoadLevel(nextScene);
	}
	// else end the cutscene and transition scenes
}

function OnGUI () {
	GUI.Box(Rect(0,Screen.height-200,Screen.width,200), currentText, dialogueTextStyle);
	GUI.Label(Rect(0,Screen.height-200,Screen.width,200), currentNPC, dialogueHeaderStyle);
	GUI.DrawTexture(Rect(0,Screen.height-450,326,450), speakerTex);
}