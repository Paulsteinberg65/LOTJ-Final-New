
var startPosition : Vector3;
var randomOffset = 0.0;
var frequency : float;
var frequencyRange : float;

var prefab : Transform;

private var startTime : float;

private var playerScript : Object;


function Start () {
	startTime = Time.time;
	playerScript = GameObject.Find("Player").GetComponent("AwarenessPlayer");
}

function Update () {
	if (!GameObject.Find("Player").GetComponent("AwarenessPlayer").canControl) {
		startTime += Time.deltaTime;
	}
	if (Time.time - startTime > frequency) {
		randomOffset = Mathf.Round(Random.Range(0,6));
		if (randomOffset == 1)
			randomOffset = 7.15;
		else if (randomOffset == 2)
			randomOffset = 3.65;
		else if (randomOffset == 3)
			randomOffset = -.5;
		else if (randomOffset == 4)
			randomOffset = -4;
		else if (randomOffset == 5)
			randomOffset = -7.5;
		Instantiate(prefab, startPosition+Vector3(0,randomOffset,0), Quaternion.identity);
		startTime = Time.time;
	}
}