private var dialogueDict : Object = {};
private var questArray : Array = [];
private var questHArray : Array = [];
private var quizDict : Object = {};
private var quizResponseDict : Object = {};

private var imgDict : Object = {};
var momImg : Texture2D;
var biologistImg : Texture2D;
var evitaImg : Texture2D;
var mayorImg : Texture2D;
var estrellaImg : Texture2D;
var juanaImg : Texture2D;
var fatherDiegoImg : Texture2D;
var felipeImg : Texture2D;
var solImg : Texture2D;

private var currentDialogue : int = 1;

function Start () {
	//populate NPC dialogue dictionary
	BirdSign = ["These little blue birds are cerulean warblers. They pass through Central America on their annual 3,500 mile migration from South America to the United States and Canada. Due to the destruction of forests throughout their migratory range, ceruleans are the most endangered birds in the eastern United States, with a population shrinking by three percent per year. This is part of a larger trend. Globally, 1,226 bird species - one out of every eight species of bird on planet earth - are threatened with extinction, primarily as a result of habitat destruction."];
	TimberSign = ["This timber was harvested illegally from the nearby national forest. It will be exported to the United States to manufacture furniture. The US has laws against this, but without clear labeling requirements, no one knows which timber was harvested legally in the country of origin."];
	HomeSign = ["This home was built without permits and without the backing of the government. As is common in the developing world, the official process for permitting and registering homes and businesses is so cumbersome that people avoid it altogether. But without legal documentation of their property, people can't use these assets to secure loans for investment and business expansion."];
	ChurchSign = ["This church served as an important base for community organizing against the military junta that ruled this country from 1967 to 1988."];
	TownhallSign = ["This is town hall, the seat of the town council and mayor. Democratic reforms introduced in this country several years ago ensure that mayors are now elected directly by the people instead of appointed by the military. \nReflecting a broader trend throughout Latin America, there has been a movement to grant more decision-making power and tax revenues to local governments instead of concentrating authority in the capital. But the process is incomplete, and not all national leaders are comfortable with the idea of handing over power."];

	
	Mom = ["I am so glad to see you, my love. It has been such a very long time.", "Your father didn't come home last night. I think it has something to do with his efforts to protect the forest.", "This beautiful forest is so important to our community. It's our source of food, water, and medicine", "But things have gotten so out of control. Farmers set fires in a race to claim land.", "Remember the hill where you and your friends would play in the trees until dark? It is now a field of ashes.", "The trouble began when a very dangerous man named Dante and his henchmen moved into the area a few years ago and began illegally harvesting the largest trees in the forest.", "The national government has done nothing to stop him. Your father decided to try and put an end to this madness.", "He must have set up camp in the forest. You must find him. Go talk to John Jeffers, the American biologist.", "He and your dad teach together at the university in the city and are close friends. Maybe he can help."];
	Evita = ["Welcome back! Have you seen your mother yet?"];
	Mayor = ["Your mother can't wait to see you.", "Has it been so long that you've forgotten the way? Just head to the eastern edge of town."];
	Estrella = ["I can't believe how many trees they are cutting down these days... Your mother has been asking for you. Please hurry."];
	Juana = ["Your mom is calling for you from the other side of the river!"];
	FatherDiego = ["Your mother is across the river. She has important news to share."];
	Felipe = ["Welcome home!"];
	Sol = ["It's been a long time. Have you found your mother yet?"];
	Biologist = ["I have been studying this forest ecosystem for many years. It is in worse shape today than at any time I can remember."];
	
	
	dialogueDict["Mom"] = Mom;
	dialogueDict["Biologist"] = Biologist;
	dialogueDict["Evita"] = Evita;
	dialogueDict["Mayor"] = Mayor;
	dialogueDict["Estrella"] = Estrella;
	dialogueDict["Juana"] = Juana;
	dialogueDict["FatherDiego"] = FatherDiego;
	dialogueDict["Felipe"] = Felipe;
	dialogueDict["Sol"] = Sol;
	
	
	
	dialogueDict["BirdSign"] = BirdSign;
	dialogueDict["TimberSign"] = TimberSign;
	dialogueDict["HomeSign"] = HomeSign;
	dialogueDict["ChurchSign"] = ChurchSign;
	dialogueDict["TownhallSign"] = TownhallSign;
	
	imgDict["Mom"] = momImg;
	imgDict["Biologist"] = biologistImg;
	imgDict["Evita"] = evitaImg;
	imgDict["Mayor"] = mayorImg;
	imgDict["Estrella"] = estrellaImg;
	imgDict["Juana"] = juanaImg;
	imgDict["FatherDiego"] = fatherDiegoImg;
	imgDict["Felipe"] = felipeImg;
	imgDict["Sol"] = solImg;
	
	
	// sample quiz
	//quizDict["NPC1"] = ["Answer 1","Answer 2"];
	//quizResponseDict["NPC1"] = ["Correct!", "Wrong!"];
	
	//populate Quest text array
	questHArray.push("Find your mother");
	questArray.push("Your mother is waiting for you in the village. Seek her out. Move the arrow keys and use the space bar to talk with people near you and to read information signs. (Space bar to continue...)");
	questHArray.push("Find the biologist");
	questArray.push("Your mother suggested that you find the biologist to help figure out what happened to your father and why the forest is being destroyed. He is somewhere in this area.");
	questHArray.push("Find your father in the forest");
	questArray.push("The biologist feels that ignorance and greed are driving the destruction of the forest, but you suspect it's more complex than that. Find your father to learn more. There are five farmers in the forest who may be able to help you find him.");
	questHArray.push("Return to the village");
	questArray.push("Your father has been kidnapped. Go tell the villagers what has happened.");
	questHArray.push("Go to the waterfall");
	questArray.push("The search party suggested that you might find clues about what happened to your dad. If you see more pages from his research journal, read them carefully.");
	questHArray.push("Find your father");
	questArray.push("The search party mentioned that there are caves around here.");
	questHArray.push("Return to the village");
	questArray.push("Let the search party know that you found your father.");
}

function Update () {
	
}

function NextDialogue () {
	currentDialogue += 1;
	if (currentDialogue == 2) {
		Biologist = ["It is good to see you. I only regret the tragic circumstances.", "Your father and I are hoping to save what's left of the forest before it's too late.", "I have been researching the ecological damage to the soil, water and wildlife.", "Your father, as a social scientist, is investigating the social dimensions of the problem. He spends a lot of time in the forest talking with farmers.", "I honestly don't know why he bothers; it seems pretty clear to me that the problem is the ignorance and greed of the local people.", "I don't mean to offend you... I know that you grew up here. But I just don't think that these uneducated farmers know what's good for them.", "For some reason they always refuse to talk to me, but maybe they'll listen to you. Let me know if you learn anything.", "It's illegal to harvest trees in the National Forest, so people wait until night. That's when your father travels through the forest talking with them and listening to their stories.", "I suggest you wait until dark to find him. Here, take a lantern."];
		Evita = ["I don't care where that scientist is. He looks down on the people around here - he thinks we're stupid."];
		Mayor = ["The biologist? He is probably working on his latest bird survey near the forest edge"];
		Mom = ["Have you found the biologist yet?"];
		Estrella = ["I hope you find the biologist."];
		Juana = ["I collect wild plants and sell them as traditional medicines. If this forest disappears, I will lose my income.", "John Jeffers and I sometimes collect plants together. He is probably by the forest."];
		FatherDiego = ["John Jeffers, the biologist - yes, I know him well. Try the edge of the forest"];
		Felipe = ['The biologist is studying what he calls "edge effects" - how living things at the edges of natural areas are exposed to dangers from human activities.', "Try the edge of the forest, west of the village."];
		Sol = ["Me, a biologist? No, although I could teach  you about fishing. Unfortunately, there are few fish left."];
	}
	if (currentDialogue == 3) {
		Biologist = ["Have you found your father in the forest behind me yet? Ask the farmers there which way he went."];
		Evita = ["I agree that you should talk to people in the forest. There are things that the American biologist just doesn't understand."];
		Sol = ["Be careful - it's a big forest and you could get lost."];
		Felipe = ["Have you found your father yet?"];
		FatherDiego = ["The forest you seek is to the west."];
		Juana = ["I think you will learn many things from the people working in the forest.", "Your father understands the importance of listening to the people."];
		Mom = ["The biologist asked you to look for your father in the forest? Okay, but be careful. Dante's men are around."];
		Estrella = ["Yes, talk to the people in the forest.", "Listen to their stories, and maybe you will solve the puzzle of why our environment is being destroyed."];
		Mayor = ["If you're looking for the forest, it is right next to the biologist."];
	}
	
	dialogueDict["Mom"] = Mom;
	dialogueDict["Biologist"] = Biologist;
	dialogueDict["Evita"] = Evita;
	dialogueDict["Mayor"] = Mayor;
	dialogueDict["Estrella"] = Estrella;
	dialogueDict["Juana"] = Juana;
	dialogueDict["FatherDiego"] = FatherDiego;
	dialogueDict["Felipe"] = Felipe;
	dialogueDict["Sol"] = Sol;

}