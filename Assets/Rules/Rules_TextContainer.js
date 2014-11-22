private var mainQuestionArray : Array = [];
private var question1Array : Array = [];
private var question2Array : Array = [];

private var answer1LabelArray : Array = [];
private var answer2LabelArray : Array = [];

private var correctAnswerArray : Array = [];
private var wrongAnswerArray : Array = [];

private var approval1Vals : Array = [];
private var approval2Vals : Array = [];
private var approval3Vals : Array = [];

// Use this for initialization
function Start () {
	mainQuestionArray = ["First order of business:  How will we arrange the property rights?",
			"Next on the agenda, who has access to the commonly-owned land in the community forest and who will make day-to-day decisions for specific situations?",
			"Next up, harvesting rules and usage fees.",
			"Next, we need to figure out how we will monitor harvesting and what sanctions will be applied to violators of the harvesting laws.",
			"Finally, how will we resolve conflicts when they arise?  And if we need to revise the rules in the future, how shall we do so?"];
	question1Array = ["To what extent should the forest be owned by the community or the national government?",
			"Who should have access to the commonly-owned land in the community forest?  80 hectares will be assigned to each family that has lived here for at least __ years.",
			"What percentage of large trees on a family plot may be cut down each year?",
			"How shall we monitor to make sure everyone is following the harvesting and other rules for managing the land sustainably?",
			"How should we resolve conflicts that arise among landowners?"];
	question2Array = ["To what extent should the forest be owned according to private property (with rights to buy, sell, divide and combine properties at will) versus property held in common by the community?",
			"A seven-member Community Forestry Council will make the day-to-day decisions applying these rules to specific situations.  Who gets to run for and elect the Council?",
			"How much must each household contribute to the Community Forestry Council each year for operating expenses?",
			"What sanctions should be applied to those who overharvest or break other land management rules?",
			"What percentage of qualified voters is required to change any of the above rules governing the operation of the Community Forestry Council?"];
	
	answer1LabelArray = [["0% locally owned, 100% nationally owned","25% locally owned, 75% nationally owned","50% locally owned, 50% nationally owned","75% locally owned, 25% nationally owned","100% locally owned, 0% nationally owned"],
			["1 year","5 years","10 years","15 years","20 years"],
			["0%","1%","2%","3%","4%","5%"],
			["Rely on self-reporting from users.","Three respected community members will monitor land use once per year, using a simple reporting system.  The reports will be shared publicly with the community.","Monitoring teams consisting of biologists and foresters will complete detailed land use reports each month.  Watershed population stats will be measured.  Reports will be made public."],
			["The Community Forestry Council will provide mediation services and issue binding decisions.","Landowners can work these problems out themselves.  There is no need to involve outside parties.","Landowners can use the existing court system."]];
	answer2LabelArray = [["0% commonly owned, 100% privately owned","25% commonly owned, 75% privately owned","50% commonly owned, 50% privately owned","75% commonly owned, 25% privately owned","100% commonly owned, 0% privately owned"],
			["Male heads of households.","Male heads of households; female heads of households.","Male heads of households; female heads of households; all members of households owning private land.","Male heads of households; female heads of households; all members of households owning private land; all who've lived here more than 10 years.","Everyone who has lived here for more than one year.","Everyone who has lived here for more than one year; those who have worked here for more than 1 year but do not live here.","Everyone who has lived here for more than one year; those who have worked here for more than 1 year but do not live here; members of immediately adjacent communities."],
			["No usage fees","$10 from each household that uses a community forestry plot","$5 annually from each voting household in the community","20% of the price of every large tree sold","100 hours of labor per household using a community forest plot","Households awarded community plots may choose between one-time $10 fee, 20% of the price of every large tree sold, and 100 hours of labor"],
			["Avoid financial sanctions altogether to prevent undue hardship.  Rely on publicity and community pressure.","Impose steep fines for any proven infraction of the rules to send a strong signal from the outset.","The first infraction will be met with a warning; subsequent infractions will earn increasingly serious fines to be set by the Council in accordance with the severity of the infraction."],
			["51%","66%","100%"]];

	correctAnswerArray = [[3,3],[2,3],[1,5],[1,2],[0,1]];
	wrongAnswerArray = [[["Too centralized.  The government never listens to our concerns.",
						"Too centralized.  The government never listens to our concerns.",
						"Too centralized.  The government never listens to our concerns.",
						"[DEBUG] correct answer",
						"Too local.  National officials will never support this if the government doesn't have some control, like water and mineral rights."],
						["Too privatized.  The wealthiest families will soon own the whole forest!",
						"Too privatized.  The wealthiest families will soon own the whole forest!",
						"Too privatized.  The wealthiest families will soon own the whole forest!",
						"[DEBUG] correct answer",
						"If we want to attract investors, including nature tourism firms, we need to have some private property."]],
						[["That's too short.  Soon the place will be overrun with squatters trying to take our land!",
						"That's too short.  Soon the place will be overrun with squatters trying to take our land!",
						"[DEBUG] correct answer",
						"That's too long.  We have been members of this community for a long time!",
						"That's too long.  We have been members of this community for a long time!"],
						["Too restrictive.  Those who are directly affected by the rules should have a say in making them.",
						"Too restrictive.  Those who are directly affected by the rules should have a say in making them.",
						"Too restrictive.  Those who are directly affected by the rules should have a say in making them.",
						"[DEBUG] correct answer",
						"Too inclusive.  The local community should be in control of these decisions.",
						"Too inclusive.  The local community should be in control of these decisions.",
						"Too inclusive.  The local community should be in control of these decisions."]],
						[["I need to feed my family.  If we can’t use the land, why should I attend all these meetings and agree to these rules?",
						"[DEBUG] correct answer",
						"At this rate, the forest will never recover.",
						"At this rate, the forest will never recover.",
						"At this rate, the forest will never recover.",
						"At this rate, the forest will never recover."],
						["It takes resources to organize the community forest.",
						"What about years when markets are bad? How will we afford the fees?",
						"It's not right that those who can't harvest trees must pay.",
						"How are small-scale forest enterprises supposed to make a profit?",
						"My family would rather pay the fee.",
						"[DEBUG] correct answer"]],
						[["Even the most honest members of our community will face incentives to cheat during hard times - especially if we don't know whether our neighbors are following the rules.",
						"[DEBUG] correct answer",
						"If monitoring is too costly, it will never work."],
						["Too lenient.  And if most people are cheating, there will be little community pressure to change.",
						"Too strict.  We don't want a 'police state' in our community.  What if someone makes a simple mistake?",
						"[DEBUG] correct answer"]],
						[["[DEBUG] correct answer",
						"What if one of the parties is considerably more wealthy or powerful than the other?",
						"The legal system is so costly and slow that no one will use it."],
						["This is too easy to change.  Why should we follow the rules if they could be overturned tomorrow by some small coalition?",
						"[DEBUG] correct answer",
						"This is too hard to change.  What if there are unexpected shifts in the community, the economy, or the forest that require revisiting our assumptions and rules?"]]];
	
	approval1Vals = [[[0,5,10,75/2,95/2],[0,5,10,95/2,45]],
					[[5/2,5,40,15,10],[10,15,30,40,10,5,0]],
					[[0,55/2,35,40,45,50],[10,5,25,75/2,40,50]],
					[[5,45,10],[5,75/2,45]],
					[[40,15,0],[10,45,5]]];
	
	approval2Vals = [[[0,5,45,35,10],[45,95/2,25,15,0]],
					[[0,75/2,25,15,5],[0,0,75/2,85/2,0,25,0]],
					[[0,25/2,25,40,45,50],[0,75/2,10,5,5/2,50]],
					[[75/2,45,10],[5,45,35]],
					[[10,15,30],[10,45,5]]];
	
	approval3Vals = [[[30,75/2,40,75/2,5],[0,5,20,30,5]],
					[[0,0,65/2,35,25],[0,0,25,75/2,85/2,45,0]],
					[[30,50,25,0,0,0],[10,25,25,35,25,15]],
					[[0,30,45],[40,10,35]],
					[[40,10,5],[5,45,5]]];
}

// Update is called once per frame
function Update () {
}

