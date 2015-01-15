var grunt : AudioClip;
var speed : float;

private var playerSprite : int;
var canControl : boolean = true;

var guiObject : GameObject;
private var guiScript : Object;

private var farmerWin : boolean = false;
private var fisherWin : boolean = false;
private var studentWin : boolean = false;
private var artisanWin : boolean = false;
private var farmerLose : boolean = false;
private var fisherLose : boolean = false;
private var studentLose : boolean = false;
private var artisanLose : boolean = false;

private var farmerRep : float = 5;
private var fisherRep : float = 5;
private var studentRep : float = 5;
private var artisanRep : float = 5;
private var scoreToWin : int = 8;


// Use this for initialization
function Start () {
	playerSprite = transform.GetComponent(tk2dSprite).spriteId;
	guiScript = guiObject.GetComponent("AwarenessGUI");
}

// Update is called once per frame
function Update () {
	if (canControl) {
		if (Input.GetButton("Up") && transform.position.y < 7.5)
			transform.Translate(Vector3(0,speed*Time.deltaTime,0));
		if (Input.GetButton("Down") && transform.position.y > -7.75)
			transform.Translate(Vector3(0,-speed*Time.deltaTime,0));
			
		playerSprite = transform.GetComponent(tk2dSprite).spriteId;
	}
}

function sameSprite (player : int, other : int) {
	if (player == 0) {
		if (other < 5)
			return true;
	}
	if (player == 9) {
		if (other >= 5 && other < 10)
			return true;
	}
	if (player == 13) {
		if (other >= 10 && other < 15)
			return true;
	}
	if (player == 15) {
		if (other >= 15)
			return true;
	}
	return false;
}

function OnTriggerEnter (other : Collider) {
	var otherSprite : int = other.GetComponent(tk2dSprite).spriteId;
	if (sameSprite(playerSprite, otherSprite)) {
		if (playerSprite == 9) {
			if (farmerRep < scoreToWin)
				farmerRep += 1;
			if (!farmerWin && farmerRep == scoreToWin) {
				farmerWin = true;
				if (farmerWin && studentWin && fisherWin && artisanWin)
					guiScript.DisplayMessage("allWin");
				else
					guiScript.DisplayMessage("farmerWin");
			}
		}
		else if (playerSprite == 15) {
			if (studentRep < scoreToWin)
				studentRep += 1;
			if (!studentWin && studentRep == scoreToWin) {
				studentWin = true;
				if (farmerWin && studentWin && fisherWin && artisanWin)
					guiScript.DisplayMessage("allWin");
				else
					guiScript.DisplayMessage("studentWin");
			}
		}
		else if (playerSprite == 13) {
			if (fisherRep < scoreToWin)
				fisherRep += 1;
			if (!fisherWin && fisherRep == scoreToWin) {
				fisherWin = true;
				if (farmerWin && studentWin && fisherWin && artisanWin)
					guiScript.DisplayMessage("allWin");
				else
					guiScript.DisplayMessage("fisherWin");
			}
		}
		else if (playerSprite == 0) {
			if (artisanRep < scoreToWin)
				artisanRep += 1;
			if (!artisanWin && artisanRep == scoreToWin) {
				artisanWin = true;
				if (farmerWin && studentWin && fisherWin && artisanWin)
					guiScript.DisplayMessage("allWin");
				else
					guiScript.DisplayMessage("artisanWin");
			}
		}
		
	}
	
	else {
		if (otherSprite >= 5 && otherSprite < 10) {
			if (farmerRep < scoreToWin && farmerRep > 0) {
				audio.PlayOneShot(grunt);
				farmerRep -=1;
				}
			if (!farmerWin && !farmerLose) {
				guiScript.DisplayMessage("farmerLose");
				farmerLose = true;
			}
		}
		else if (otherSprite >= 15) {
			if (studentRep < scoreToWin && studentRep > 0){
				audio.PlayOneShot(grunt);
				studentRep -=1;
				}
			if (!studentWin && !studentLose) {
				guiScript.DisplayMessage("studentLose");
				studentLose = true;
			}
		}
		else if (otherSprite >= 10 && otherSprite < 15) {
			if (fisherRep < scoreToWin && fisherRep > 0){
				audio.PlayOneShot(grunt);
				fisherRep -=1;
				}
			if (!fisherWin && !fisherLose) {
				guiScript.DisplayMessage("fisherLose");
				fisherLose = true;
			}
		}
		else if (otherSprite < 5) {
			if (artisanRep < scoreToWin && artisanRep > 0){
				audio.PlayOneShot(grunt);
				artisanRep -=1;
				}
			if (!artisanWin && !artisanLose) {
				guiScript.DisplayMessage("artisanLose");
				artisanLose = true;
			}
		}
	}
	
	
	//if (other.GetComponent(tk2dSprite).spriteId == playerSprite) {
	Destroy(other.gameObject);
	//}
	
}