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
	
	
	dialogueDict["Biologist"] = Biologist;
	dialogueDict["Mayor"] = Mayor;
	dialogueDict["Rep. Y"] = RepY;
	dialogueDict["Senator A"] = SenatorA;
	
	imgDict["Biologist"] = biologistImg;
	imgDict["Mayor"] = mayorImg;
	imgDict["Rep. Y"] = repYImg;
	imgDict["Senator A"] = senatorAImg;
	
	//populate NPC dialoge dictionary for senate
	DanteSenate = ["Well, what a surprise, our little villagers have come to the big city. So you think that lawmakers will listen to you, eh?  You think you know your way around this place?  Politics is a delicate business you know.",  "You have to understand who's connected to whom.",  "Besides, half of these guys are on my payroll!  What, you thought my influence was limited to that pathetic little hamlet of yours? I'm going to speak with them first.",  "By the end of the day, they'll understand that all of this talk of empowering local communities is a romantic little joke."];
	LAideZ = ["This way leads to Senator Z's office.  You can't go this way without an appointment.  I suggest you speak with someone else first."];
	SenatorC = ["Sorry, I'm in a meeting right now."];
	SenatorG = ["Welcome, any friend of Senator A is a friend of mine.  Your community forestry law sounds like a promising idea, and I support it.  I work closely with Senator C on the Natural Resources Committee.  You might try her next."];
	LAideX = ["I am sorry, but you cannot pass through here.  Senator X is not taking any appointments at this time.  I suggest you speak with other senators first."];
	SenatorZ = ["I like nature as much as the next person, but I just got off the phone with a gentleman by the name of Dante, and he noted that extinction is a natural process that occurs in the wild anyway.  What do you say to that?", "quiz", "It sounds like a great idea so long as one of their first projects is in my home district.  I will vote for it."];
	SenatorX = ["I have good news!  We have passed your foresty bill.  But you still need support from the other chamber of legislators.  Share the news with Senator A outside and he will let you know what do do next."];
	
	dialogueDict["Dante"] = DanteSenate;
	dialogueDict["LAideZ"] = LAideZ;
	dialogueDict["SenatorC"] = SenatorC;
	dialogueDict["SenatorG"] = SenatorG;
	dialogueDict["LAideX"] = LAideX;
	dialogueDict["SenatorZ"] = SenatorZ;
	dialogueDict["SenatorX"] = SenatorX;
	
	imgDict["Dante"] = danteImg;
	imgDict["LAideZ"] = lAideZImg;
	imgDict["SenatorC"] = senatorCImg;
	imgDict["SenatorG"] = senatorGImg;
	imgDict["LAideX"] = lAideXImg;
	imgDict["SenatorZ"] = senatorZImg;
	imgDict["SenatorX"] = senatorXImg;
	
	//populate npc dialogue for house of representatives
	DanteRep = ["You may have won support in the senate, but you'll never find your way through here.  Lawmaking is for people of influence.  This is no place for you.  Give up, you'll never make it in time."];
	LAideW = ["I don't see your name on Rep W's appointment calendar."];
	RepH = ["We are in a meeting right now.  Would you mind waiting outside?"];
	RepQ = ["I'm busy at the moment"];
	RepR = ["Come back later, perhaps next week"];
	RepT = ["I'm surprised you found me.  They give junior lawmakers the most obscure rooms.  Senator A told me you were coming.", "So when you say you want to help local communities, what do you mean by 'local'?", "quiz", "Listen carefully: the rules of the game work differently here than in the senate.",  "If you want to get your forestry law passed, you need the support of the Green Coalition.  These are lawmakers from 3 major regions of the country who have formed an alliance to promote sustainability in our country.  Their names are Reps Q, E, and R.  But you must move fast!"];
	RepW = ["By bringing this matter to the national legislature, you have demonstrated a sophisticated understanding of the fact that 'local' environmental outcomes are never truly local.  They are affected by larger sets of social rules including those created by national governments.  Would you happen to know what percent of the world's forests are owned by governments?", "quiz", "I have something to tell you... You did it!  The new Community Forestry Law has passed.  Dante?  Oh, I was never going to let him push me around.",  "I survived 3 years in a prison cell under the dictatorship; I'm not afraid of a common thug in a suit.  My aides told me about your father's ordeal.  I have asked the judicial police to look into Dante's activities.  Go now, your mayor called.  He says to meet him outside."];
	
	dialogueDict["Dante "] = DanteRep;
	dialogueDict["LAideW"] = LAideW;
	dialogueDict["RepH"] = RepH;
	dialogueDict["RepQ"] = RepQ;
	dialogueDict["RepR"] = RepR;
	dialogueDict["RepT"] = RepT;
	dialogueDict["RepW"] = RepW;
	
	imgDict["Dante "] = danteImg;
	imgDict["LAideW"] = lAideWImg;
	imgDict["RepH"] = repHImg;
	imgDict["RepQ"] = repQImg;
	imgDict["RepR"] = repRImg;
	imgDict["RepT"] = repTImg;
	imgDict["RepW"] = repWImg;
	
	
	// sample quiz
	//quizDict["Biologist"] = ["A. blah blah blah blah blah", "B. blah blah blah blah blah", "C. blah blah blah blah blah", "D. blah blah blah blah blah"];
	//quizResponseDict["Biologist"] = ["Correct!", "Wrong!", "Wrong!","Wrong!"];
	
	
	quizDict["SenatorC"] = ["A. The forests will be overexploited.  It is simply not worth it for a community to leave the trees standing because they can earn more from ranching and agriculture.", "B. Communities are likely to do a better job of protecting forests than will the national government.  After all, they live in these forests and depend on them.", 'C. When a community owns property in common, no one takes responsibility for it and it is doomed to be overexploited.  This is known as the "tragedy of the commons."', "D. Many communities have shown that they are capable of governing local forests sustainably."];
	quizResponseDict["SenatorC"] = ["", "", "", "Correct!"];
	quizDict["SenatorZ"] = ["A. Today species are disappearing at 100 times the rate prior to the appearance of humans.", "B. The rate of extinction today is roughly the same as it was in the past, but we're wiping out the most economically important species.", "C. Except for catastrophic events like the meteor collision that wiped out the dinosaurs, extinction does not occur naturally.", "I don't know..."];
	quizResponseDict["SenatorZ"] = ["Correct!", "", "",""];
	quizDict["RepT"] = ["A. The 'locals' in a community are the people who were born there.", "B. 'Local' people are those who live in the immediate area.", "C. 'Local' people are those who live nearby and depend on the forest.", "D. Depending on the specific case, different definitions of 'local' may need to be used. "];
	quizResponseDict["RepT"] = ["","","","Correct!"];
	quizDict["RepE"] = ["A. There are many examples, such as Loma Alta in western Ecuador.","B.  There are many examples, such as the community of Santa Catarina Ixtepeji, in the Mexican state of Oaxaca.","C. There are many examples, such as the town of Julipan de la Sierra, in Colombia.","D. Community forestry has not actually been tried yet, because governments have been so hostile to the idea of local control.  This is our chance to show it can be done!"];
	quizResponseDict["RepE"] = ["","Correct!","",""];
	quizDict["RepH"] = ["A. Decentralization is a timber management system in which trees are harvested at different rates in concentric circles emanating outward from the oldest tree in a patch of forest.","B. Decentralization describes the changing relationships among local governments as they jostle for influence at the level of states and provinces.","C. Decentralization is a process in which national governments give greater discretion and resources to local governments, often including new powers to decide how natural resources are used.","D. Decentralization is part of an overall system of democratic reforms, focusing specifically on the democratic election of mayors."];
	quizResponseDict["RepH"] = ["","","Correct!",""];
	quizDict["RepW"] = ["A. 25%","B. 52%","C. 75%","D. 35%"];
	quizResponseDict["RepW"] = ["","","Correct!",""];
	//populate Quest text array
	//questHArray.push("Lobby for Change");
	//questArray.push("The key to influencing national laws is to meet with the right people.  Convince politicians in the senate building to revise the forestry law so that local communities can participate in forest governance.  By meeting with lower level politicians you will make personal connections that allow you to talk to more influential legislators.  But don't take too long.  Dante is simultaneously lobbying against community forestry.");
	//questHArray.push("Continue Lobbying for Change");
	//questArray.push("There is a great deal of clamor at the capital about the need for a change in forestry legislation, but more still needs to be done.  Continue convincing politicians in the parliament building to implement these reforms before Dante convinces them otherwise.");
	
}

function Update () {
}

function ChangeAides(x : int){

	if (x == 1){
	Debug.Log("Aide Z Changed!");
		LAideZ = ["Oh! You have an appointment with Senator Z?  Here, I'll let you through."];
		dialogueDict["LAideZ"] = LAideZ;
	}
	else if (x == 2){
		LAideX = ["Senator X is available now.  Here, I'll let you through."];
		dialogueDict["LAideX"] = LAideX;
	}
	else if (x == 3){
		LAideW = ["Senator W is available now.  Here, I'll let you through."];
		dialogueDict["LAideW"] = LAideW;
	}

}

function NextDialogue () {
	
	currentDialogue += 1;
	Debug.Log("Current Dialogue is: "+ currentDialogue);
	if (currentDialogue == 2 ) {
		SenatorC = ["Senator G told me you were coming,  If you want me to trust your advice, I need to be sure that you are well versed in the issues.  So tell me, if we give communities greater power to manage local forests, which of the following do you think is most likely to happen?", "quiz", "I would like the National Environment Agency to have some oversight over community forestry plans.  Your town cares about the future, but inevitably some mayors would rather just sell off their forests and keep the tax reciepts.",  "This modification is acceptable to you?  Terrific- then you have my support.  Talk to the head of my party, Senator Z."];
		SenatorA = ["You did it!  But you need approval from the chamber of representatives as well.  Head quickly to the other building and find Representative T.  He comes from a timber-dependant community and will be a strong supporter."];
	}
	if (currentDialogue == 3) {
		SenatorA = ["You did it!  But you need approval from the chamber of representatives as well.  Head quickly to the other building and find Representative T.  He comes from a timber-dependant community and will be a strong supporter."];
		RepE = ["Rep T explained the situation to me.",  "Can you provide me with an example of a place where community forestry has actually worked?", "quiz", "I like how the law includes women as decision-makers rather than relying on traditional property arrangments under marriage laws.  I'll support it."];
		RepH = ["If you can garner support from the Green Coalition then I will support your bill."];
		RepQ = ["Have you spoken with Rep E?"];
		RepR = ["Have you spoken with Rep E?"];
	}
	if (currentDialogue == 4) {
		RepH = ["I want to be sure that you understand the big picture.  So tell me: What is  decentralization?","quiz", "I want language in the bill that allows us to sell carbon credits to industrialized countries under climate change treaty, earning cash for land owners who conserve trees.  You agree?  Okay, you have my support."];
		RepQ = ["Let's include an anti-corruption measure in the law, requiring that all logging permits are posted in newspapers and on he internet."];
		RepR = ["This will promote the cause of community empowerment across the country, helping us overcome the legacy of the dictatorship.  Bur you must explicitly recognize the traditional land rights of the indigenous peoples.  This is acceptable to you?  Then you have my full support."];
	}
	
	dialogueDict["SenatorC"] = SenatorC;
	dialogueDict["Senator A"] = SenatorA;
	dialogueDict["RepE"] = RepE;
	dialogueDict["RepH"] = RepH;
	dialogueDict["RepQ"] = RepQ;
	dialogueDict["RepR"] = RepR;
	
	//dialogueDict["Dante"] = Dante;
	

}