private var GLOBAL : Object;
var nextScene : String;
var img : Texture2D;

function Start () {

}

function Update () {
	if (Input.GetButtonDown("Space")) {
		Application.LoadLevel(nextScene);
	}
}

function OnGUI () {
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height), img);
}