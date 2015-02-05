//This script fades out the plane noises in intro2
private var fade : boolean = false;

function Start () {
	DontDestroyOnLoad(gameObject);
}

function Update () {
	if (fade) {
		fadeOut();
	}
}

function OnLevelWasLoaded (level : int) {
	if (level == 7) {
		fade = true;
	}
}

function fadeOut() {
     if (audio.volume > 0.01) {
         audio.volume -= 0.55 * Time.deltaTime;
     } else {
     	audio.volume = 0.0;
     }
 }