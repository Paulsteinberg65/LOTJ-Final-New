private var GLOBAL : Object;
var nextScene : String;
var img : Texture2D;

function Start () {

}

function Update () {

}

function OnGui () {
	GUI.DrawTexture(Rect((Screen.width-size)/2,(Screen.height-size)/2,size,size), img);
}