private var GLOBAL : Object;

function Start () {
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	GLOBAL.AdvanceQuest();
}

function Update () {

}