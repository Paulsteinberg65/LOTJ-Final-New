private var dialogueDict : Object = {};
private var questArray : Array = [];
private var questHArray : Array = [];
private var quizDict : Object = {};
private var quizResponseDict : Object = {};

private var imgDict : Object = {};
//main area npcs + Dante
var biologistImg : Texture2D;
var mayorImg : Texture2D;
var repYImg : Texture2D;
var senatorAImg : Texture2D;
var danteImg : Texture2D;

//senate npcs
var senatorCImg : Texture2D;
var senatorGImg : Texture2D;
var senatorXImg : Texture2D;
var senatorZImg : Texture2D;
var lAideXImg : Texture2D;
var lAideZImg : Texture2D;

//parliament npcs
var repEImg : Texture2D;
var repWImg : Texture2D;
var repRImg : Texture2D;
var repHImg : Texture2D;
var repQImg : Texture2D;
var repTImg : Texture2D;
var lAideWImg : Texture2D;


private var currentDialogue : int = 1;

function Start () {
	//populate NPC dialogue dictionary for main area
	Mayor = ["Let's find Senator A.  He represents our region and we're old school chums.  He will help to arrange meetings with lawmakers."];
	RepY = ["Sorry, I have to take this call."];
	SenatorA = ["As the senator from your district, I would be honored to sponsor a new forestry law.  But I have only been in office for a year and I have little influence.  I suggest you begin in the senate."];
	Biologist = ["This place is pretty impressive.  The mayor says he knows someone around here?"];
	//for post-senate text
	SenatorA2 = ["You did it!  But you need approval from the chamber of representatives as well.  Head quickly to the other building and find Representative T.  He comes from a timber-dependant community and will be a strong supporter."];
	
	dialogueDict["Biologist"] = Biologist;
	dialogueDict["Mayor"] = Mayor;
	dialogueDict["Rep. Y"] = RepY;
	dialogueDict["Senator A"] = SenatorA;
	
	imgDict["Biologist"] = biologistImg;
	imgDict["Mayor"] = mayorImg;
	imgDict["Rep. Y"] = repYImg;
	imgDict["Senator A"] = senatorAImg;
	
	//populate NPC dialoge dictionary for senate
	DanteSenate = ["Well, what a surprise, our little villagers have come to the big city.  So you think that lawmakers will listen to you, eh?  You think you know your way around this place?  Politics is a delicate business you know.  You have to understand who's connected to whom.  Besides, half of these guys are on my payroll!  What, you thought my influence was limited to that pathetic little hamlet of yours?  I'm going to speak with them first.  By the end of the day, they'll understand that all of this talk of empowering local communities is a romantic little joke."];
	LAideZ = ["This way leads to Senator Z's office.  You can't go this way without an appointment.  I suggest you speak with someone else first."];
	SenatorC = ["Sorry, I'm in a meeting right now."];
	SenatorG = ["Welcome, any friend of Senator A is a friend of mine.  Your community forestry law sounds like a promising idea, and I support it.  I work closely with Senator C on the Natural Resources Committee.  You might try her next."];
	LAideX = ["I am sorry, but you cannot pass through here.  Senator X is not taking any appointments at this time.  I suggest you speak with other senators first."];
	SenatorZ = ["It sounds like a great idea so long as one of their first projects is in my home district.  I will vote for it."];
	SenatorX = ["I have good news!  We have passed your foresty bill.  Bur you still need support from the other chamber of legislators.  Share the news with Senator A outside and he will let you know what do do next."];
	
	dialogueDict["Dante1"] = DanteSenate;
	dialogueDict["LAideZ"] = LAideZ;
	dialogueDict["SenatorC"] = SenatorC;
	dialogueDict["SenatorG"] = SenatorG;
	dialogueDict["LAideX"] = LAideX;
	dialogueDict["SenatorZ"] = SenatorZ;
	dialogueDict["SenatorX"] = SenatorX;
	
	imgDict["Dante1"] = danteImg;
	imgDict["LAideZ"] = lAideZImg;
	imgDict["SenatorC"] = senatorCImg;
	imgDict["SenatorG"] = senatorGImg;
	imgDict["LAideX"] = lAideXImg;
	imgDict["SenatorZ"] = senatorZImg;
	imgDict["SenatorX"] = senatorXImg;
	
	//populate npc dialogue for house of representatives
	DanteRep = ["You may have won support in the senate, but you'll never find your way through here.  Lawmaking is for people of influence.  This is no place for you.  Five up, you'll never make it in time."];
	LAideW = ["I don't see your name on Rep W's appointment calendar."];
	RepH = ["We are in a meeting right now.  Would you mind waiting outside?"];
	RepQ = ["I'm busy at the moment"];
	RepR = ["Come back later, perhaps next week"];
	RepT = ["I'm surprised you found me.  They give junior lawmakers the most obscure rooms.  Senator A told me you were coming.  Listen carefully: the rules of the game work differently here than in the senate.  If you want to get your forestry law passed, you need the support of the Green Coalition.  These are lawmakers from 3 major regions of the country who have formed an alliance to promote sustainability in our country.  Their names are Reps Q, E, and R.  But you must move fast!"];
	RepW = ["I have something to tell you... You did it!  The new Community Forestry Law has passed.  Dante?  Oh, I was never going to let him push me around.  I survived 3 years in a prison cell under the dictatorship; I'm not afraid of a common thug in a suit.  My aides told me about your father's ordeal.  I have asked the judicial police to look into Dante's activities.  Go now, your mayor called.  He says to meet him outside."];
	
	dialogueDict["Dante2"] = DanteRep;
	dialogueDict["LAidew"] = LAideW;
	dialogueDict["RepH"] = RepH;
	dialogueDict["RepQ"] = RepQ;
	dialogueDict["RepR"] = RepR;
	dialogueDict["RepT"] = RepT;
	dialogueDict["RepW"] = RepW;
	
	imgDict["Dante2"] = danteImg;
	imgDict["LAidew"] = lAideWImg;
	imgDict["RepH"] = repHImg;
	imgDict["RepQ"] = repQImg;
	imgDict["RepR"] = repRImg;
	imgDict["RepT"] = repTImg;
	imgDict["RepW"] = repWImg;
	
	
	// sample quiz
	//quizDict["NPC1"] = ["Answer 1","Answer 2"];
	//quizResponseDict["NPC1"] = ["Correct!", "Wrong!"];
	
	//populate Quest text array
	questHArray.push("Lobby for Change");
	questArray.push("The key to influencing national laws is to meet with the right people.  Convince politicians in the senate building to revise the forestry law so that local communities can participate in forest governance.  By meeting with lower level politicians you will make personal connections that allow you to talk to more influential legislators.  But don't take too long.  Dante is simultaneously lobbying against community forestry.");
	questHArray.push("Continue Lobbying for Change");
	questArray.push("There is a great deal of clamor at the capital about the need for a change in forestry legislation, but more still needs to be done.  Continue convincing politicians in the parliament building to implement these reforms before Dante convinces them otherwise.");
	
}

function Update () {
	
}

function NextDialogue () {

	currentDialogue += 1;
	if (currentDialogue == 2) {
		SenatorC = ["Senator G told me you were coming,  I would like the National Environment Agency to have some oversight over community forestry plans.  Your town cares about the future, but inevitably some mayors would rather just sell off their forests and keep the tax reciepts.  This modification is acceptable to you?  Terrific- then you have my support.  Talk to the head of my party, Senator Z."];
		RepE = ["Rep T explained the situation to me.  I like how the law includes women as decision-makers rather than relying on traditional property arrangments under marriage laws.  I'll support it."];
		RepH = ["If you can garner support from the Green Coalition then I will support your bill."];
		RepQ = ["Have you spoken with Rep E?"];
		RepR = ["Have you spoken with Rep E?"];
	}
	if (currentDialogue == 3) {
		RepH = ["I want language in the bill that allows us to sell carbon credits to industrialized countries under climate change treaty, earning cash for land owners who conserve trees.  You agree?  Okay, you have my support."];
		RepQ = ["Let's include an anti-corruption measure in the law, requiring that all logging permits are posted in newspapers and on he internet."];
		RepR = ["This will promote the cause of community empowerment across the country, helping us overcome the legacy of the dictatorship.  Bur you must explicitly recognize the traditional land rights of the indigenous peoples.  This is acceptable to you?  Then you have my full support."];
	}
	
	//dialogueDict["Dante"] = Dante;
	

}