private var msgDict : Object = {};
private var questArray : Array = [];
private var questHArray : Array = [];

private var imgDict : Object = {};

private var currentDialogue : int = 1;

function Start () {
	//populate NPC dialogue dictionary
	
	startMsg = ["Raise awareness about the plight of the forest and encourage people to come to a community meeting to decide how to set things right. You have four campaigners who will talk with people at the village market. Click the buttons at the top left to choose your campaigner and have him or her talk with (bump into) people of the same background. Move your character up and down the column on the left to speak to all the market-goers. Press space to play the game."];
	helpMsg = ["Raise awareness about the plight of the forest and encourage people to come to a community meeting to decide how to set things right. You have four campaigners who will talk with people at the village market. Click the buttons at the top left to choose your campaigner and have him or her talk with (bump into) people of the same background. Move your character up and down the column on the left to speak to all the market-goers."];
	fisherWin = ["You did it!  The fishermen have agreed to come to your meeting. Choose another profession (upper left) to reach more people."];
	fisherLose = ["Your meeting sounds worthwhile.  But fishermen around here, we don't join many causes.  Perhaps if you had another fisherman helping you to spread the word, we would come to your meeting."];
	artisanWin = ["Well done!  The artisan community will come to your meeting.  Thanks to your campaigner, they want to be sure that the forest is used sustainably – and that any new rules serve the interests of the local community rather than foreign corporations. Choose another profession (upper left) to reach more people."];
	artisanLose = ["What do you know about the struggles of artisans in this community?  These days we can't even find the hardwood species we need for furniture production, our most important source of income.  I have children to feed, you know.  I want to talk with someone who understands my craft – then maybe I'll consider attending your meeting."];
	farmerWin = ["You did it!  The coffee farmers have agreed to come to your meeting. Choose another profession (upper left) to reach more people."];
	farmerLose = ["Conservation?  I worry that you are going to try to preserve everything, like some sort of museum, and I won't be able to make a living.  Listen, we coffee farmers have a strong union and we stick together.  If you want us on board, have another farmer do the talking."];
	studentWin = ["Congratulations!  Your campaigner has convinced the other students to attend the meeting. Choose another profession (upper left) to reach more people."];
	studentLose = ["A meeting?  Could you send me the link on my cell phone?  Oh, you don't have this online?  Listen, young people around here care a lot about sustainability – more than you realize.  But there's no way that students are going to attend a meeting unless we're invited by our friends.  That's just how it works."];
	allWin = ["You did it!  The coffee farmers, artisans, students and fisherman have agreed to come to your meeting."];
	alreadyFinished = ["You have already convinced this group to attend the meeting.  Choose another character."];
	
	msgDict["startMsg"] = startMsg;
	msgDict["helpMsg"] = helpMsg;
	msgDict["fisherWin"] = fisherWin;
	msgDict["fisherLose"] = fisherLose;
	msgDict["artisanWin"] = artisanWin;
	msgDict["artisanLose"] = artisanLose;
	msgDict["farmerWin"] = farmerWin;
	msgDict["farmerLose"] = farmerLose;
	msgDict["studentWin"] = studentWin;
	msgDict["studentLose"] = studentLose;
	msgDict["allWin"] = allWin;
	msgDict["alreadyFinished"] = alreadyFinished;
	
	
	// sample quiz
	//quizDict["NPC1"] = ["Answer 1","Answer 2"];
	//quizResponseDict["NPC1"] = ["Correct!", "Wrong!"];
	
	//populate Quest text array
	questHArray.push("Find your mother");
	questArray.push("Your mother is waiting for you in the village. Seek her out.");
	questHArray.push("Find the biologist");
	questArray.push("Your mother suggested that you find the biologist to help figure out what happened to your father and why the forest is being destroyed. He is somewhere in this area.");
	questHArray.push("Find your father in the forest");
	questArray.push("The biologist feels that ignorance and greed are driving the destruction of the forest, but you suspect it's more complex than that. You grew up here and you know that these are good people. Find your father to learn more. There are five farmers in the forest who may be able to help you find him.");
	questHArray.push("Return to the village");
	questArray.push("Your father has been kidnapped. Go tell the villagers what has happened.");
	questHArray.push("Quest4");
	questArray.push("QuestText4");
}

function Update () {
	
}

function NextDialogue () {
//	currentDialogue += 1;
//	if (currentDialogue == 2) {
//		Biologist = ["It is good to see you. I only regret the tragic circumstances.", "Your father and I are hoping to save what's left of the forest before it's too late.", "I have been researching the ecological damage to the soil, water and wildlife.", "Your father, as a social scientist, is investigating the social dimensions of the problem. He spends a lot of time in the forest talking with farmers.", "I honestly don't know why he bothers; it seems pretty clear to me that the problem is the ignorance and greed of the local people.", "I don't mean to offend you... I know that you grew up here. But I just don't think that these uneducated farmers know what's good for them.", "For some reason they always refuse to talk to me, but maybe they'll listen to you. Let me know if you learn anything.", "It's illegal to harvest trees in the National Forest, so people wait until night. That's when your father travels through the forest talking with them and listening to their stories.", "I suggest you wait until dark to find him. Here, take a lantern."];
//		Evita = ["I don't care where that scientist is. He looks down on the people around here - he thinks we're stupid."];
//		Mayor = ["The biologist? He is probably working on his latest bird survey near the forest edge"];
//		Mom = ["Have you found the biologist yet?"];
//		Estrella = ["I hope you find the biologist."];
//		Juana = ["I collect wild plants and sell them as traditional medicines. If this forest disappears, I will lose my income.", "John Jeffers and I sometimes collect plants together. He is probably by the forest."];
//		FatherDiego = ["John Jeffers, the biologist - yes, I know him well. Try the edge of the forest"];
//		Felipe = ['The biologist is studying what he calls "edge effects" - how living things at the edges of natural areas are exposed to dangers from human activities.', "Try the edge of the forest, west of the village."];
//		Sol = ["Me, a biologist? No, although I could teach  you about fishing. Unfortunately, there are few fish left."];
//	}
//	if (currentDialogue == 3) {
//		Biologist = ["Have you found your father in the forest behind me yet? Ask the farmers there which way he went."];
//		Evita = ["I agree that you should talk to people in the forest. There are things that the American biologist just doesn't understand."];
//		Sol = ["Be careful - it's a big forest and you could get lost."];
//		Felipe = ["Have you found your father yet?"];
//		FatherDiego = ["The forest you seek is to the west."];
//		Juana = ["I think you will learn many things from the people working in the forest.", "Your father understands the importance of listening to the people."];
//		Mom = ["The biologist asked you to look for your father in the forest? Okay, but be careful. Dante's men are around."];
//		Estrella = ["Yes, talk to the people in the forest.", "Listen to their stories, and maybe you will solve the puzzle of why our environment is being destroyed."];
//		Mayor = ["If you're looking for the forest, it is right next to the biologist."];
//	}
//	
//	dialogueDict["Mom"] = Mom;
//	dialogueDict["Biologist"] = Biologist;
//	dialogueDict["Evita"] = Evita;
//	dialogueDict["Mayor"] = Mayor;
//	dialogueDict["Estrella"] = Estrella;
//	dialogueDict["Juana"] = Juana;
//	dialogueDict["FatherDiego"] = FatherDiego;
//	dialogueDict["Felipe"] = Felipe;
//	dialogueDict["Sol"] = Sol;

}