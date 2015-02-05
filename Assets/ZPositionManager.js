//This script controls the z position of all NPCs that have odd depth problems when layering with the player.
//The script will cause the z position of the NPC it is attached to to change dynamically depending on the position of the player.
private var player : GameObject;
private var playerPosition : Transform;
private var playerY : float;
var myPosition : Transform;

function Start () {
	player = GameObject.Find("player");
	playerPosition = GameObject.Find("player").GetComponent("Transform");
	playerY = playerPosition.position.y;
}

function Update () {
	playerY = playerPosition.position.y;
	if(Application.loadedLevelName == "Town1") {
		if (myPosition.position.y > playerY) {
			myPosition.position.z = 0.05;
		} else {
			myPosition.position.z = -2.0;
		}
	}
	if(Application.loadedLevelName == "Maze" || Application.loadedLevelName == "capitol") {
		if (myPosition.position.y > playerY) {
			myPosition.position.z = 0.05;
		} else {
			myPosition.position.z = -1.0;
		}
	}
}