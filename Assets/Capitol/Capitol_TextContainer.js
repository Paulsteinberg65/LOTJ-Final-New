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

private var journalDict : Object = {};

var currentDialogue : int = 1;

function Start () {
	journalDict[0] = ["After months of research, I believe I have finally figured out how to fix this mess. There are two problems. \n\nThe first is that we need new rules to govern out forest sustainably for the benefit of the community. Right now it's a free-for-all. Everyone is in a race to take what's left from the forest before it is all gone.  \n\nBut after reading widely in the published research, I have made an important discovery: the famous 'tragedy of the commons' is misleading.  According to that theory, property owned in common by large numbers of people is doomed to be overexploited.  But I have learned that many communities around the world have put in place rules to sustainably manage their resources. \n\nWe need new rules and we need them now.  But this leads to the second problem:  Dante and his thugs would do anything to prevent--"];
	journalDict[1] = ["Research Journal Entry January 17 \n\nWe're Contributing to a Global Extinction Crisis \n\nI have learned that the destruction taking place in our community is part of a much larger trend that has serious consequences for the health of our planet. The rate of species extinction is now more than 100 times higher than the rate prior to the appearance of humans. The most important cause of extinction is habitat destruction, such as the clearing of tropical forests for agriculture. \n\nThe tropics are home to two-thirds of the world’s species, most of which live in forests. Today only half of the original forest cover remains.", "Our forest is part of what scientists call the Mesoamerican hotspot. Biodiversity hotspots are species-rich areas facing imminent threats. These areas collectively contain 44% of the world’s plant species and 35% of all vertebrate species. At the current rate of habitat destruction, we will eventually lose about 40% of the species in hotspots throughout the tropics.",
						"My sources: Stuart L. Pimm and Peter Raven (2000) Biodiversity - Extinction by Numbers, Nature 403 (6772): 843–45; Norman Myers et al. (2000) Biodiversity Hotspots for Conservation Priorities, Nature 403: 853–58; Rodolfo Dirzo and Peter H. Raven (2003) Global State of Biodiversity and Loss, Annual Review of Environment and Resources 28: 137–67."];
	journalDict[2] = ["Research Journal Entry February 9 \n\nThree-quarters of the world's forests are owned by governments. \n\nBut I have learned that almost a quarter of all forests in developing countries are 'common-property resources,' meaning they are owned in common by a community. \n\nMany people mistakenly believe that forests must be either managed by the government or sold to private landowners. This belief stems from Garrett Hardin’s “tragedy of the commons” argument. In a famous article published in 1968, Hardin claimed that when a resource is shared by many people, self-interest will lead to its overuse and eventual destruction. \n\nHardin was confusing common-property – in which a resource is jointly owned and managed – with open access, where it's every man for himself. Open access sounds an awful lot like our forest lately. I wonder what it takes to make common-property systems work?",
	 "Sources: Garrett Hardin (1968) The Tragedy of the Commons, Science 162:1243–48; S.V. Ciriacy-Wantrup and Richard C. Bishop (1975) 'Common Property' as a Concept in Natural Resources Policy, Natural Resources Journal 15: 713–27."];
	journalDict[3] = ["Research Journal Entry February 10 \n\nWhat makes for a successful common-property system? \n\nI have been reviewing the research literature, and I'm finding important insights that may help our community. To ensure sustainable management, a community must put in place rules to govern use of the forest. These include: • rules that decide who has access to the forest and when • regulations specifying how much can be harvested • procedures governing how rules are changed or modified.  \n\nWhat makes for a successful common-property system? I have been reviewing the research literature, and I'm finding important insights that may help our community. To ensure sustainable management, a community must put in place rules to govern use of the forest. These include: • rules that decide who has access to the forest and when • regulations specifying how much can be harvested • procedures governing how rules are changed or modified.", "And here's a crucial finding: Those who are subject to the rules must have a hand in making them! This is the only way to ensure the legitimacy of the system.", 
	"Sources: Elinor Ostrom et al. (1999) Revisiting the Commons: Local Lessons, Global Challenges. Science 284 (278): 278–82; Arun Agrawal, Local Institutions and the Governance of Forest Commons, in Paul F. Steinberg and Stacy D. Vandeveer (eds.), Comparative Environmental Politics: Theory, Practice, and Prospects, MIT Press, 2012."];
	journalDict[4] = ["Research Journal Entry March 5 \n\nA case study of community forest management in action \n\nThe research literature is filled with examples of communities that have sensible rules for governing local forests. One example is the community of Santa Catarina Ixtepeji, in the Mexican state of Oaxaca. Until 1980, the forests around this small community were under the control of a government-run timber operation.  \n\nIn the 1970s, community members demanded a greater role in forest management and eventually gained control. This occurred as part of a larger trend across Mexico favoring community forestry. The community of Ixtepeji operates a commercial timber mill that markets wood from its 15,000 hectares of production forests, which also produce profitable non-timber products such as white mushrooms and pine resin. Another 4,000 hectares are in restoration and conservation areas to protect biodiversity and water sources.",  
	"These activities are profitable! The money supports local services like roads and schools. The community has invested in equipment to sell more profitable processed wood products, while expanding into businesses like nature tourism and bottling local spring water.  \n\nTo ensure a balance between conservation and development, major decisions concerning the forest are made by the community's general assembly in consultation with national environmental officials. Any community member who breaks the rules faces fines or exclusion from community enterprises. Might we create something like this in our community?",
						"Sources: Salvador Anta Fonseca, Forest Management in the Community Enterprise of Santa Catarina Ixtepeji, Oaxaca, Mexico, Rights and Resources Group, Washington, DC, 2007; Camille Antinori and David Barton Bray (2005) Community Forest Enterprises as Entrepreneurial Firms: Economic and Institutional Perspectives from Mexico, World Development 33 (9): 1529–43."];
	journalDict[5] = ["Research Journal Entry March 30 \n\nCommunity forestry is growing in importance due to political decentralization \n\nDozens of countries are experimenting with 'decentralization,' giving local governments new powers to decide how natural resources are used. This is important because local governments are often in a better position to identify and meet the needs of local people. I recall reading in the news that lawmakers in our country are debating a proposal along these lines.  \n\nAccording to my research, decentralization has been successful in some places but has caused conflict elsewhere. An example can be found in Senegal, where the forestry code of 1998 supposedly gave local councils new powers to control commercial use of their forests. But the central government didn't want to give up control, and pressured the councils to meet unsustainable production quotas.", "This shows that we can never ignore the central government when thinking about local management of forests. National policy decisions have an enormous impact on local outcomes.",
	 "Sources: Jesse C. Ribot, Arun Agrawal, and Anne M. Larson (2006) Recentralizing While Decentralizing: How National Governments World Development 34 (11): 1864–86."];
	journalDict[6] = ["Research Journal Entry April 14 \n\nWhat exactly is a 'local community' in the context of forest management? \n\nWhen designing rules for local management of forests, we must define what we mean by “local.” Is a man local according to his birthplace, where he lives now, his proximity to the forest boundary, or how much he relies on the forest? My research suggests that different definitions may be needed in different circumstances.  \n\nLocal communities are not homogenous. There is often considerable diversity in race, ethnicity, religion, and economic standing. Research shows that the poor often rely more on forest commons, and may have a special interest in sustaining the forest as a hedge against unemployment. Wealthier and more politically powerful community members may dominate the use of a common resource unless rules are put in place to ensure that everyone has access.", "That's certainly true of this community. Dante and his men have been intimidating local people and stealing their land. Lately it seems like someone has been following me. I may need to hide out for a couple of days in the cave I discovered at the top of the waterfall.",
						"Sources: Amy R. Poteete and Elinor Ostrom (2004) Heterogeneity, Group Size and Collective Action: The Role of Institutions in Forest Management, Development and Change 35(3): 435–61; Jean Marie Baland and Jean-Philippe Platteau (1999) The Ambiguous Impact of Inequality on Local Resource Management. World Development 27 (5): 773–88."];
	journalDict[7] = ["Research Journal Entry May 4 \n\nWomen's participation is essential in community forestry \n\nI have learned that rural women are among those most seriously affected by deforestation. Healthy forests are necessary for traditional women's activities such as the collection of fuel wood and medicinal plants. Without adequate cooking fuel, they are less likely to boil water used for cooking and cleaning, which can affect the health of entire communities.  \n\nCommunity forestry programs often discriminate against women despite evidence that women’s participation can increase their effectiveness. A case study in India shows that when forest access is limited to men, women must walk long distances to neighboring forests to gather fuel and fodder. Even in villages where women have the right to use the forest, they're often excluded from meetings where decisions are made about the rules governing forest use.",
						"Another study from India focused on traditional village-level women’s organizations called mahila mandals, which provide a space where women can express their views and contribute to forest policy discussions. Through these organizations, many women actively monitor, protect, and manage their local forests.",
						"Sources: Bina Agarwal (1997) Environmental Action, Gender Equity, and Women's Participation, Development and Change 28 (1): 1–44; Bina Agarwal (2000) Conceptualising Environmental Collective Action: Why Gender Matters, Cambridge Journal of Economics 24: 283-310; Kristen Bingeman (2003) Women’s Participation in Forest Management Decisions. Himalayan Research Bulletin 21(2): 53–61."];
	journalDict[8] = ["Research Journal Entry June 3 \n\nValuing the forest \n\nA local community may have in place strong rulemaking processes, but none of this matters if they don't see the value of conservation. Some communities have a strong conservation ethic and take a long-term view. Others may be unaware of the long-term impacts of their actions or face strong financial pressures to convert forests to cropland and pasture.  \n\nFor example, in the community of Loma Alta in western Ecuador, most residents wish to clear the land and grow the profitable paja toquilla plant. They see little reason to restrict forest access or reduce short-term profits. In these settings, one promising approach is to put in place rules that allow communities to charge users (such as local water companies) for the environmental benefits provided by forested lands.", 
	"In Costa Rica, a national 'payment for ecosystem services' program pays an annual fee to farmers who plant or protect trees on their land. This popular program is funded by local water user fees, a national gasoline tax, and funds from international organizations with an interest in slowing global warming through terrestrial carbon storage.",
						"Sources: Gibson, Clark C. and Becker, C. Dustin, A Lack of Institutional Demand: Why a Strong Local Community in Western Ecuador Fails to Protect its Forest, in People and Forests: Communities, Institutions, and Governance, edited by Clark C. Gibson, Margaret A. McKean, and Elinor Ostrom, MIT Press, Cambridge, 2000, pp. 135–61; Stefano Pagiola (2008) Payments for Environmental Services in Costa Rica, Ecological Economics 65 (4): 712–724."];
	
	//populate NPC dialogue dictionary for main area
	Mayor = ["Let's find Senator A.  He represents our region and we're old school chums.  He will help to arrange meetings with lawmakers."];
	RepY = ["Sorry, I have to take this call."];
	SenatorA = ["As the senator from your district, I would be honored to sponsor a new forestry law.  But I have only been in office for a year and I have little influence.  I suggest you begin in the senate.  It's the building below.", "Senator G is my good friend and he knows how things work.  One more thing: It would be unwise to bring the biologist with you.  My colleagues are wary of foreigners trying to influence domestic laws."];
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
	SenatorG = ["Welcome, any friend of Senator A is a friend of mine.  Your community forestry law sounds like a promising idea, and I support it.",  "I work closely with Senator C on the Natural Resources Committee.  You might try her next."];
	LAideX = ["I am sorry, but you cannot pass through here.  Senator X is not taking any appointments at this time.  I suggest you speak with other senators first."];
	SenatorZ = ["I've heard about you.  Unfortunately, I'm going to need to see support from other senators before I can help you."];
	SenatorX = ["Where has my secretary gone?  I'm sorry but you can't be in here right now.  Try back later."];
	
	dialogueDict["Dante"] = DanteSenate;
	dialogueDict["Legislative Aide Z"] = LAideZ;
	dialogueDict["Senator C - Chair, Natural Resources Committee"] = SenatorC;
	dialogueDict["Senator G - Member, Natural Resources Committee"] = SenatorG;
	dialogueDict["Legislative Aide X"] = LAideX;
	dialogueDict["Senator Z"] = SenatorZ;
	dialogueDict["Senator X - President of the Senate"] = SenatorX;
	
	imgDict["Dante"] = danteImg;
	imgDict["Legislative Aide Z"] = lAideZImg;
	imgDict["Senator C - Chair, Natural Resources Committee"] = senatorCImg;
	imgDict["Senator G - Member, Natural Resources Committee"] = senatorGImg;
	imgDict["Legislative Aide X"] = lAideXImg;
	imgDict["Senator Z"] = senatorZImg;
	imgDict["Senator X - President of the Senate"] = senatorXImg;
	
	//populate npc dialogue for house of representatives
	DanteRep = ["You may have won support in the senate, but you'll never find your way through here.  Lawmaking is for people of influence.  This is no place for you.  Give up, you'll never make it in time."];
	LAideW = ["I don't see your name on Rep W's appointment calendar."];
	RepE = ["You come from where?  Never heard of it."];
	RepH = ["We are in a meeting right now.  Would you mind waiting outside?"];
	RepQ = ["I'm busy at the moment"];
	RepR = ["Come back later, perhaps next week"];
	RepT = ["I'm surprised you found me.  They give junior lawmakers the most obscure rooms.  Senator A told me you were coming.", "So when you say you want to help local communities, what do you mean by 'local'?", "quiz", "That's correct!", "Listen carefully: the rules of the game work differently here than in the senate.",  "If you want to get your forestry law passed, you need the support of the Green Coalition.  These are lawmakers from 3 major regions of the country who have formed an alliance to promote sustainability in our country.",  "Their names are Reps Q, E, and R.  But you must move fast!"];
	RepW = ["How did you get in here?  I'm very busy at the moment, please come back later."];
	
	dialogueDict["Dante "] = DanteRep;
	dialogueDict["Legislative Aide W"] = LAideW;
	dialogueDict["Representative E"] = RepE;
	dialogueDict["Representative H"] = RepH;
	dialogueDict["Representative Q"] = RepQ;
	dialogueDict["Representative R"] = RepR;
	dialogueDict["Representative T"] = RepT;
	dialogueDict["Representative W - Speaker of the Chamber of Representatives"] = RepW;
	
	imgDict["Dante "] = danteImg;
	imgDict["Legislative Aide W"] = lAideWImg;
	imgDict["Representative E"] = repEImg;
	imgDict["Representative H"] = repHImg;
	imgDict["Representative Q"] = repQImg;
	imgDict["Representative R"] = repRImg;
	imgDict["Representative T"] = repTImg;
	imgDict["Representative W - Speaker of the Chamber of Representatives"] = repWImg;
	
	// sample quiz
	//quizDict["Biologist"] = ["A. blah blah blah blah blah", "B. blah blah blah blah blah", "C. blah blah blah blah blah", "D. blah blah blah blah blah"];
	//quizResponseDict["Biologist"] = ["Correct!", "Wrong!", "Wrong!","Wrong!"];
	
	quizDict["Senator C - Chair, Natural Resources Committee"] = ["A. The forests will be overexploited.  It is simply not worth it for a community to leave the trees standing because they can earn more from ranching and agriculture.", "B. Communities are likely to do a better job of protecting forests than will the national government.  After all, they live in these forests and depend on them.", 'C. When a community owns property in common, no one takes responsibility for it and it is doomed to be overexploited.  This is known as the "tragedy of the commons."', "D. Many communities have shown that they are capable of governing local forests sustainably."];
	quizResponseDict["Senator C - Chair, Natural Resources Committee"] = ["", "", "", "Correct!"];
	quizDict["Senator Z"] = ["A. Today species are disappearing at 100 times the rate prior to the appearance of humans.", "B. The rate of extinction today is roughly the same as it was in the past, but we're wiping out the most economically important species.", "C. Except for catastrophic events like the meteor collision that wiped out the dinosaurs, extinction does not occur naturally.", "D. Species extinction rates will slow as people move into cities and forests grow back."];
	quizResponseDict["Senator Z"] = ["Correct!", "", "",""];
	quizDict["Representative T"] = ["A. The 'locals' in a community are the people who were born there.", "B. 'Local' people are those who live in the immediate area.", "C. 'Local' people are those who live nearby and depend on the forest.", "D. Depending on the specific case, different definitions of 'local' may need to be used. "];
	quizResponseDict["Representative T"] = ["","","","Correct!"];
	quizDict["Representative E"] = ["A. There are many examples, such as Loma Alta in western Ecuador.","B.  There are many examples, such as the community of Santa Catarina Ixtepeji, in the Mexican state of Oaxaca.","C. There are many examples, such as the town of Julipan de la Sierra, in Colombia.","D. Community forestry has not actually been tried yet, because governments have been so hostile to the idea of local control.  This is our chance to show it can be done!"];
	quizResponseDict["Representative E"] = ["","Correct!","",""];
	quizDict["Representative H"] = ["A. Decentralization is a timber management system in which trees are harvested at different rates in concentric circles emanating outward from the oldest tree in a patch of forest.","B. Decentralization describes the changing relationships among local governments as they jostle for influence at the level of states and provinces.","C. Decentralization is a process in which national governments give greater discretion and resources to local governments, often including new powers to decide how natural resources are used.","D. Decentralization is part of an overall system of democratic reforms, focusing specifically on the democratic election of mayors."];
	quizResponseDict["Representative H"] = ["","","Correct!",""];
	quizDict["Representative W - Speaker of the Chamber of Representatives"] = ["A. 25%","B. 52%","C. 75%","D. 35%"];
	quizResponseDict["Representative W - Speaker of the Chamber of Representatives"] = ["","","Correct!",""];
	//populate Quest text array
	//	questHArray.push("Find Senator A");
//	questArray.push("");
//	questHArray.push("Lobby for change");
//	questArray.push("You still need to find Senator G - Member, Natural Resources Committee - Member, Natural Resources Committee,Senator C - Chair, Natural Resources Committee,Senator Z - Head of the National Justice Party, Senator X - President of the Senate - President of the Senate", "The key to influencing national laws is to meet with the right people.  Convince politicians in the parliament building to revise the forestry law so that local communities can participate in forest governance.  By meeting with lower-level politicians you will make personal connections that allow you to talk to more influential legislators.",  "But don't take too long - Dante is simultaneously lobbying against community forestry.");
//	questHArray.push("Continue lobbying for change");
//	questArray.push("There is a great deal of clamor at the capital about the need for a change in forestry legislation, but more still needs to be done!  Continue convincing politicians in the parliament building to implement these reforms before Dante convinces them otherwise!");
//	questHArray.push("You have succeeded!");
//	questArray.push("The legislation has been passed! Congratulations!");

}

function Update () {
}

//function ChangeAides(x : int){
//
//	if (x == 1){
//	Debug.Log("Aide Z Changed!");
//		Legislative Aide Z = ["Oh! You have an appointment with Senator Z?  Here, I'll let you through."];
//		dialogueDict["Legislative Aide Z"] = Legislative Aide Z;
//	}
//	else if (x == 2){
//		LAideX = ["Senator X - President of the Senate is available now.  Here, I'll let you through."];
//		dialogueDict["LAideX"] = LAideX;
//	}
//	else if (x == 3){
//		LAideW = ["Senator W is available now.  Here, I'll let you through."];
//		dialogueDict["LAideW"] = LAideW;
//	}
//
//}

function senateDialogue(){
	currentDialogue = 2;
	
	DanteSenate = ["Well, what a surprise, our little villagers have come to the big city. So you think that lawmakers will listen to you, eh?  You think you know your way around this place?  Politics is a delicate business you know.",  "You have to understand who's connected to whom.",  "Besides, half of these guys are on my payroll!  What, you thought my influence was limited to that pathetic little hamlet of yours? I'm going to speak with them first.",  "By the end of the day, they'll understand that all of this talk of empowering local communities is a romantic little joke."];
	LAideZ = ["This way leads to Senator Z's office.  You can't go this way without an appointment.  I suggest you speak with someone else first."];
	SenatorC = ["Sorry, I'm in a meeting right now."];
	SenatorG = ["Welcome, any friend of Senator A is a friend of mine.  Your community forestry law sounds like a promising idea, and I support it.",  "I work closely with Senator C on the Natural Resources Committee.  You might try her next."];
	LAideX = ["I am sorry, but you cannot pass through here.  Senator X is not taking any appointments at this time.  I suggest you speak with other senators first."];
	SenatorZ = ["I've heard about you.  Unfortunately, I'm going to need to see support from other senators before I can help you."];
	SenatorX = ["Where has my secretary gone?  I'm sorry but you can't be in here right now.  Try back later."];
	
	dialogueDict["Dante"] = DanteSenate;
	dialogueDict["Legislative Aide Z"] = LAideZ;
	dialogueDict["Senator C - Chair, Natural Resources Committee"] = SenatorC;
	dialogueDict["Senator G - Member, Natural Resources Committee"] = SenatorG;
	dialogueDict["Legislative Aide X"] = LAideX;
	dialogueDict["Senator Z"] = SenatorZ;
	dialogueDict["Senator X - President of the Senate"] = SenatorX;
}

function houseDialogue(){
	currentDialogue = 7;
	
	DanteRep = ["You may have won support in the senate, but you'll never find your way through here.  Lawmaking is for people of influence.  This is no place for you.  Give up, you'll never make it in time."];
	LAideW = ["I don't see your name on Rep W's appointment calendar."];
	RepE = ["You come from where?  Never heard of it."];
	RepH = ["We are in a meeting right now.  Would you mind waiting outside?"];
	RepQ = ["I'm busy at the moment"];
	RepR = ["Come back later, perhaps next week"];
	RepT = ["I'm surprised you found me.  They give junior lawmakers the most obscure rooms.  Senator A told me you were coming.", "So when you say you want to help local communities, what do you mean by 'local'?", "quiz", "That's correct!", "Listen carefully: the rules of the game work differently here than in the Senate.",  "If you want to get your forestry law passed, you need the support of the Green Coalition.  These are lawmakers from 3 major regions of the country who have formed an alliance to promote sustainability in our country.",  "Their names are Reps Q, E, and R.  But you must move fast!"];
	RepW = ["How did you get in here?  I'm very busy at the moment, please come back later."];
	
	dialogueDict["Dante "] = DanteRep;
	dialogueDict["Legislative Aide W"] = LAideW;
	dialogueDict["Representative E"] = RepE;
	dialogueDict["Representative H"] = RepH;
	dialogueDict["Representative Q"] = RepQ;
	dialogueDict["Representative R"] = RepR;
	dialogueDict["Representative T"] = RepT;
	dialogueDict["Representative W - Speaker of the Chamber of Representatives"] = RepW;
	
}

function NextDialogue () {
	
	currentDialogue += 1;
	Debug.Log("Current Dialogue is: "+ currentDialogue);
	if(currentDialogue == 2){//After talking to Senator A first time
		Mayor = ["You start in the Senate.  I'll make phone calls to help arrange meetings. "];
		Biologist = ["What do you mean I can't go inside?"];
		RepY = ["Yes, I know Senator G.  Always taking about rural communities.  But that's part of the past.  We need to look to the future - and the future is in the cities.",  "Where did you say you're from?  Excuse me, I need to take this call."];
		SenatorA = ["Begin in the Senate.  That's the southern building.  Remember, Senator G can help you."];
	
		dialogueDict["Biologist"] = Biologist;
		dialogueDict["Mayor"] = Mayor;
		dialogueDict["Rep. Y"] = RepY;
		dialogueDict["Senator A"] = SenatorA;
	}
	if (currentDialogue == 3) {//after talking to Senator G - Member, Natural Resources Committee
		SenatorC = ["Senator G told me you were coming,  If you want me to trust your advice, I need to be sure that you are well versed in the issues.",  "So tell me, if we give communities greater power to manage local forests, which of the following do you think is most likely to happen?", "quiz",  "That's correct!","I would like the National Environment Agency to have some oversight over community forestry plans.",  "Your town cares about the future, but inevitably some mayors would rather just sell off their forests and keep the tax reciepts.",  "This modification is acceptable to you?  Terrific- then you have my support.  Talk to the head of my party, Senator Z."];
		SenatorG = ["Did you find Senator C?  My staff have told her office to expect you."];
		LAideZ = ["Forestry? That's normally handled by the Natural Resources Committee.  I suggest you talk with Senator C.  Perhaps she will authorize your access to this part of the Senate."];
		
		dialogueDict["Senator C - Chair, Natural Resources Committee"] = SenatorC;
		dialogueDict["Senator G - Member, Natural Resources Committee"] = SenatorG;
		dialogueDict["Legislative Aide Z"] = LAideZ;
	
	}
	if(currentDialogue == 4){//after talking to Senator C
		SenatorC = ["You already have my support. Have you spoken with everyone?"];
		SenatorG = ["You already have my support.  Hurry!"];
		LAideZ = ["Oh! You have an appointment with Senator Z?  Here, I'll let you through."];
		SenatorZ = ["I like nature as much as the next person, but I just got off the phone with a gentleman by the name of Dante, and he noted that extinction is a natural process that occurs in the wild anyway.  What do you say to that?", "quiz",  "That's correct!","It sounds like a great idea so long as one of their first projects is in my home district.  I will vote for it."];
		
		dialogueDict["Senator C - Chair, Natural Resources Committee"] = SenatorC;
		dialogueDict["Senator G - Member, Natural Resources Committee"] = SenatorG;
		dialogueDict["Legislative Aide Z"] = LAideZ;
		dialogueDict["Senator Z"] = SenatorZ;
	}
	if(currentDialogue == 5){//after talking to senator Z
		SenatorZ = ["You already have my support.  Hurry before the legislative session closes."];
		LAideX = ["Senator X is available now.  Here, I'll let you through."];
		SenatorX = ["I have good news!  We have passed your foresty bill.  But you still need support from the other chamber of legislators.",  "Share the news with Senator A outside and he will let you know what do do next."];
		
		dialogueDict["Senator Z"] = SenatorZ;
		dialogueDict["Legislative Aide X"] = LAideX;
		dialogueDict["Senator X - President of the Senate"] = SenatorX;
	}
	if(currentDialogue == 6){//after talking to senator x
		Mayor = ["Let's ask my friend if he has any contacts in the Chamber of Representatives."];
		Biologist = ["Well done!"];
		RepY = ["The Chamber of Representatives?  That's my turf.  Here's what you need to do.  Oh hold on, I need to take this call."];
		SenatorA = ["You did it!  But you need approval from the chamber of representatives as well.  Head quickly to the other building and find Representative T.  He comes from a timber-dependant community and will be a strong supporter."];
		
		dialogueDict["Biologist"] = Biologist;
		dialogueDict["Mayor"] = Mayor;
		dialogueDict["Rep. Y"] = RepY;
		dialogueDict["Senator A"] = SenatorA;	
	}
	if(currentDialogue == 7){//after talking to senator A outside again
		Mayor = ["It takes approval from both chambers to pass a law."];
		Biologist = ["Shouldn't you be in the second chamber?  There's no time to waste."];
		RepY = ["Can't talk now.  There's some sort of forestry bill being debated by my colleagues."];
		
		dialogueDict["Biologist"] = Biologist;
		dialogueDict["Mayor"] = Mayor;
		dialogueDict["Rep. Y"] = RepY;
	}
	if (currentDialogue == 8) {//After talking to RepT
		RepE = ["Rep T explained the situation to me.",  "Can you provide me with an example of a place where community forestry has actually worked?", "quiz",  "That's correct!","I like how the law includes women as decision-makers rather than relying on traditional property arrangments under marriage laws.  I'll support it."];
		RepH = ["If you can garner support from the Green Coalition then I will support your bill."];
		RepQ = ["Let's include an anti-corruption measure in the law, requiring that all logging permits are posted in newspapers and on he internet."];
		RepR = ["This will promote the cause of community empowerment across the country, helping us overcome the legacy of the dictatorship.  But you must explicitly recognize the traditional land rights of the indigenous peoples.", "This is acceptable to you?  Then you have my full support."];
		RepT = ["Did you speak with the Green Coalition?"];
		
		dialogueDict["Representative E"] = RepE;
		dialogueDict["Representative H"] = RepH;
		dialogueDict["Representative Q"] = RepQ;
		dialogueDict["Representative R"] = RepR;
		dialogueDict["Representative T"] = RepT;
	}
	if (currentDialogue == 9){
	RepE = ["Have you spoken with everyone?"];
	dialogueDict["Representative E"] = RepE;
	}
	if (currentDialogue == 10) {//After talking to RepE Q and R
		
		RepT = ["Nice job gaining the support of the Green Coalition!  Did you meet with the Speaker of the Chamber, Rep. W?"];
		RepH = ["I want to be sure that you understand the big picture.  So tell me: What is  decentralization?","quiz",  "That's correct!","I want language in the bill that allows us to sell carbon credits to industrialized countries under climate change treaty, earning cash for land owners who conserve trees.  You agree?  Okay, you have my support."];
		RepQ = ["Talk with Rep. H.  We come from the same part of the country and tend to see eye-to-eye on these things."];
		RepR = ["Have you spoken with Rep. H?"];
		LAideW = ["Let me give you some advice.  When they were college students, Rep W and Rep H marched side-by-side during the years of protest against the dictator.", "If you want Rep. W's support, first get Rep H on your side."];
		
		dialogueDict["Legislative Aide W"] = LAideW;
		dialogueDict["Representative H"] = RepH;
		dialogueDict["Representative Q"] = RepQ;
		dialogueDict["Representative R"] = RepR;
		dialogueDict["Representative T"] = RepT;	
	}
	if(currentDialogue == 11){//after talking to RepH
		LAideW = ["Senator W is available now.  Here, I'll let you through."];
		RepR = ["Where is Rep. W?"];
		RepE = ["Hurry, see if Rep. W will talk to you now."];
		RepH = ["I will call ahead to tell my friend Rep W. that you are on your way."];
		RepQ = ["Quickly, meet with Rep. W!  If he supports it, the bill will surely pass."];
		RepW = ["By bringing this matter to the national legislature, you have demonstrated a sophisticated understanding of the fact that 'local' environmental outcomes are never truly local.",  "They are affected by larger sets of social rules including those created by national governments.  Would you happen to know what percent of the world's forests are owned by governments?", "quiz",  "That's correct!","I have something to tell you... You did it!  The new Community Forestry Law has passed.  Dante?  Oh, I was never going to let him push me around.",  "I survived 3 years in a prison cell under the dictatorship; I'm not afraid of a common thug in a suit.  My aides told me about your father's ordeal.  I have asked the judicial police to look into Dante's activities.",  "Go now, your mayor called.  He says to meet him outside."];
		
		dialogueDict["Legislative Aide W"] = LAideW;
		dialogueDict["Representative R"] = RepR;
		dialogueDict["Representative E"] = RepE;
		dialogueDict["Representative H"] = RepH;
		dialogueDict["Representative Q"] = RepQ;
		dialogueDict["Representative W - Speaker of the Chamber of Representatives"] = RepW;
	}
	
	
	
	//dialogueDict["Dante"] = Dante;
	

}