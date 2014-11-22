private var dialogueDict : Object = {};
private var questArray : Array = [];
private var questHArray : Array = [];
private var quizDict : Object = {};
private var quizResponseDict : Object = {};

private var imgDict : Object = {};
var gabrielaImg : Texture2D;
var litaImg : Texture2D;
var manuelImg : Texture2D;
var carlosImg : Texture2D;
var camiloImg : Texture2D;

private var currentDialogue : int = 1;

private var journalDict : Object = {};

function Start () {
	//populate NPC dialogue dictionary
	journalDict[0] = ["After months of research, I believe I have finally figured out how to fix this mess. There are two problems. \n\nThe first is that we need new rules to govern out forest sustainably for the benefit of the community. Right now it's a free-for-all. Everyone is in a race to take what's left from the forest before it is all gone.",
					  "But after reading widely in the published research, I have made an important discovery: the famous 'tragedy of the commons' is misleading.  According to that theory, property owned in common by large numbers of people is doomed to be overexploited.  But I have learned that many communities around the world have put in place rules to sustainably manage their resources. \n\nWe need new rules and we need them now.  But this leads to the second problem:  Dante and his thugs would do anything to prevent--"];
	journalDict[1] = ["Research Journal Entry January 17 \n\nWe're Contributing to a Global Extinction Crisis \n\nI have learned that the destruction taking place in our community is part of a much larger trend that has serious consequences for the health of our planet. The rate of species extinction is now more than 100 times higher than the rate prior to the appearance of humans. The most important cause of extinction is habitat destruction, such as the clearing of tropical forests for agriculture.",
						"The tropics are home to two-thirds of the world’s species, most of which live in forests. Today only half of the original forest cover remains.",
						"Our forest is part of what scientists call the Mesoamerican hotspot. Biodiversity hotspots are species-rich areas facing imminent threats. These areas collectively contain 44% of the world’s plant species and 35% of all vertebrate species. At the current rate of habitat destruction, we will eventually lose about 40% of the species in hotspots throughout the tropics.",
				     	"Sources: Stuart L. Pimm and Peter Raven (2000) Biodiversity - Extinction by Numbers, Nature 403 (6772): 843–45; Norman Myers et al. (2000) Biodiversity Hotspots for Conservation Priorities, Nature 403: 853–58; Rodolfo Dirzo and Peter H. Raven (2003) Global State of Biodiversity and Loss, Annual Review of Environment and Resources 28: 137–67."];
	journalDict[2] = ["Research Journal Entry February 9 \n\nThree-quarters of the world's forests are owned by governments. \n\nBut I have learned that almost a quarter of all forests in developing countries are 'common-property resources,' meaning they are owned in common by a community.",
						"Many people mistakenly believe that forests must be either managed by the government or sold to private landowners. This belief stems from Garrett Hardin’s “tragedy of the commons” argument. In a famous article published in 1968, Hardin claimed that when a resource is shared by many people, self-interest will lead to its overuse and eventual destruction.",
						"Hardin was confusing common-property – in which a resource is jointly owned and managed – with open access, where it's every man for himself. Open access sounds an awful lot like our forest lately. I wonder what it takes to make common-property systems work? Sources: Garrett Hardin (1968) The Tragedy of the Commons, Science 162:1243–48; S.V. Ciriacy-Wantrup and Richard C. Bishop (1975) 'Common Property' as a Concept in Natural Resources Policy, Natural Resources Journal 15: 713–27."];
	journalDict[3] = ["Research Journal Entry February 10 \n\nWhat makes for a successful common-property system? \n\nI have been reviewing the research literature, and I'm finding important insights that may help our community. To ensure sustainable management, a community must put in place rules to govern use of the forest. These include: • rules that decide who has access to the forest and when • regulations specifying how much can be harvested • procedures governing how rules are changed or modified",
						"What makes for a successful common-property system? I have been reviewing the research literature, and I'm finding important insights that may help our community. To ensure sustainable management, a community must put in place rules to govern use of the forest. These include: • rules that decide who has access to the forest and when • regulations specifying how much can be harvested • procedures governing how rules are changed or modified",
						"And here's a crucial finding: Those who are subject to the rules must have a hand in making them! This is the only way to ensure the legitimacy of the system. Sources: Elinor Ostrom et al. (1999) Revisiting the Commons: Local Lessons, Global Challenges. Science 284 (278): 278–82; Arun Agrawal, Local Institutions and the Governance of Forest Commons, in Paul F. Steinberg and Stacy D. Vandeveer (eds.), Comparative Environmental Politics: Theory, Practice, and Prospects, MIT Press, 2012."];
	journalDict[4] = ["Research Journal Entry March 5 \n\nA case study of community forest management in action \n\nThe research literature is filled with examples of communities that have sensible rules for governing local forests. One example is the community of Santa Catarina Ixtepeji, in the Mexican state of Oaxaca. Until 1980, the forests around this small community were under the control of a government-run timber operation. In the 1970s, community members demanded a greater role in forest management and eventually gained control. This occurred as part of a larger trend across Mexico favoring community forestry.",
						"The community of Ixtepeji operates a commercial timber mill that markets wood from its 15,000 hectares of production forests, which also produce profitable non-timber products such as white mushrooms and pine resin. Another 4,000 hectares are in restoration and conservation areas to protect biodiversity and water sources.",
						"These activities are profitable! The money supports local services like roads and schools. The community has invested in equipment to sell more profitable processed wood products, while expanding into businesses like nature tourism and bottling local spring water.",
						"To ensure a balance between conservation and development, major decisions concerning the forest are made by the community's general assembly in consultation with national environmental officials. Any community member who breaks the rules faces fines or exclusion from community enterprises. Might we create something like this in our community?",
						"Sources: Salvador Anta Fonseca, Forest Management in the Community Enterprise of Santa Catarina Ixtepeji, Oaxaca, Mexico, Rights and Resources Group, Washington, DC, 2007; Camille Antinori and David Barton Bray (2005) Community Forest Enterprises as Entrepreneurial Firms: Economic and Institutional Perspectives from Mexico, World Development 33 (9): 1529–43."];
	journalDict[5] = ["Research Journal Entry March 30 \n\nCommunity forestry is growing in importance due to political decentralization \n\nDozens of countries are experimenting with 'decentralization,' giving local governments new powers to decide how natural resources are used. This is important because local governments are often in a better position to identify and meet the needs of local people. I recall reading in the news that lawmakers in our country are debating a proposal along these lines.",
						"According to my research, decentralization has been successful in some places but has caused conflict elsewhere. An example can be found in Senegal, where the forestry code of 1998 supposedly gave local councils new powers to control commercial use of their forests. But the central government didn't want to give up control, and pressured the councils to meet unsustainable production quotas.",
						"This shows that we can never ignore the central government when thinking about local management of forests. National policy decisions have an enormous impact on local outcomes. Sources: Jesse C. Ribot, Arun Agrawal, and Anne M. Larson (2006) Recentralizing While Decentralizing: How National Governments World Development 34 (11): 1864–86."];
	journalDict[6] = ["Research Journal Entry May 4 \n\nWomen's participation is essential in community forestry \n\nI have learned that rural women are among those most seriously affected by deforestation. Healthy forests are necessary for traditional women's activities such as the collection of fuel wood and medicinal plants. Without adequate cooking fuel, they are less likely to boil water used for cooking and cleaning, which can affect the health of entire communities.",
						"Community forestry programs often discriminate against women despite evidence that women’s participation can increase their effectiveness. A case study in India shows that when forest access is limited to men, women must walk long distances to neighboring forests to gather fuel and fodder. Even in villages where women have the right to use the forest, they're often excluded from meetings where decisions are made about the rules governing forest use.",
						"Another study from India focused on traditional village-level women’s organizations called mahila mandals, which provide a space where women can express their views and contribute to forest policy discussions. Through these organizations, many women actively monitor, protect, and manage their local forests.",
						"Sources: Bina Agarwal (1997) Environmental Action, Gender Equity, and Women's Participation, Development and Change 28 (1): 1–44; Bina Agarwal (2000) Conceptualising Environmental Collective Action: Why Gender Matters, Cambridge Journal of Economics 24: 283-310; Kristen Bingeman (2003) Women’s Participation in Forest Management Decisions. Himalayan Research Bulletin 21(2): 53–61."];
	journalDict[7] = ["Research Journal Entry April 14 \n\nWhat exactly is a 'local community' in the context of forest management? \n\nWhen designing rules for local management of forests, we must define what we mean by “local.” Is a man local according to his birthplace, where he lives now, his proximity to the forest boundary, or how much he relies on the forest? My research suggests that different definitions may be needed in different circumstances.",
						"Local communities are not homogenous. There is often considerable diversity in race, ethnicity, religion, and economic standing. Research shows that the poor often rely more on forest commons, and may have a special interest in sustaining the forest as a hedge against unemployment. Wealthier and more politically powerful community members may dominate the use of a common resource unless rules are put in place to ensure that everyone has access.",
						"That's certainly true of this community. Dante and his men have been intimidating local people and stealing their land. Lately it seems like someone has been following me. I may need to hide out for a couple of days in the cave I discovered at the top of the waterfall.",
						"Sources: Amy R. Poteete and Elinor Ostrom (2004) Heterogeneity, Group Size and Collective Action: The Role of Institutions in Forest Management, Development and Change 35(3): 435–61; Jean Marie Baland and Jean-Philippe Platteau (1999) The Ambiguous Impact of Inequality on Local Resource Management. World Development 27 (5): 773–88."];
	journalDict[8] = ["Research Journal Entry June 3 \n\nValuing the forest A local community may have in place strong rulemaking processes, but none of this matters if they don't see the value of conservation. Some communities have a strong conservation ethic and take a long-term view. Others may be unaware of the long-term impacts of their actions or face strong financial pressures to convert forests to cropland and pasture.",
						"For example, in the community of Loma Alta in western Ecuador, most residents wish to clear the land and grow the profitable paja toquilla plant. They see little reason to restrict forest access or reduce short-term profits. In these settings, one promising approach is to put in place rules that allow communities to charge users (such as local water companies) for the environmental benefits provided by forested lands.",
						"In Costa Rica, a national 'payment for ecosystem services' program pays an annual fee to farmers who plant or protect trees on their land. This popular program is funded by local water user fees, a national gasoline tax, and funds from international organizations with an interest in slowing global warming through terrestrial carbon storage.",
						"Sources: Gibson, Clark C. and Becker, C. Dustin, A Lack of Institutional Demand: Why a Strong Local Community in Western Ecuador Fails to Protect its Forest, in People and Forests: Communities, Institutions, and Governance, edited by Clark C. Gibson, Margaret A. McKean, and Elinor Ostrom, MIT Press, Cambridge, 2000, pp. 135–61; Stefano Pagiola (2008) Payments for Environmental Services in Costa Rica, Ecological Economics 65 (4): 712–724."];
	
	
	Gabriela = ["We artisans have been using the hardwood from this forest for generations.", "During the war, the government came in and told us that we have no right to use the forest.", "They passed a law making this a national forest without our input. We don't respect it.", "Your father is trying to help the community to have a greater say in how the forest is managed. I saw him pass this way yesterday afternoon."];
	Lita = ["As I was explaining to your father, life isn't easy for us coffee growers. The forestry officials from the capital come around to try and prevent people from planting crops.", "But it is easy to evade them. Some farmers even pay them bribes."];
	Manuel = ["I work for a powerful boss named Dante. He hires teams of woodcutters to take trees from the forest.", "I have lived here for many years, so I know where to find the oldest and most valuable mahogany and cedar trees.", "Illegal? That's none of my business. Besides, how am I supposed to feed my family? But I do wish things were different.", "The boss hasn't paid me in two months. We do all the work, and he keeps all the money, you know?"];
	Carlos = ["I hope you find your dad. There are no rules in place to govern this forest. If I don't harvest these trees, my neighbors will.", "It's a free-for-all, and I am not going to stand by while my neighbors make money selling these trees for export."];
	Camilo = ["In the old days, when I was just a boy, we had harvesting rules that everyone had to follow. We created the rules and we lived by them.", "Now, I'm not so sure. It seems like we don't even get a say in the rules of our own forest...", "Your father understands and is trying to help us."];
	QuestComplete = ["Listen, late yesterday I saw Dante's men arguing with someone.", "The sun was already down and I couldn't see very well. But they shoved the person into one of their logging trucks and sped away. I found this page. It looks like your father's."];

	dialogueDict["Gabriela"] = Gabriela;
	dialogueDict["Lita"] = Lita;
	dialogueDict["Manuel"] = Manuel;
	dialogueDict["Carlos"] = Carlos;
	dialogueDict["Camilo"] = Camilo;
	dialogueDict["QuestComplete"] = QuestComplete;
	
	imgDict["Gabriela"] = gabrielaImg;
	imgDict["Lita"] = litaImg;
	imgDict["Manuel"] = manuelImg;
	imgDict["Carlos"] = carlosImg;
	imgDict["Camilo"] = camiloImg;

	
	
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