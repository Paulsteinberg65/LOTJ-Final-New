var startPosition : Vector3;
var randomOffset = 0.0;
var frequency : float;
var frequencyRange : float;

var prefab : Transform;

private var startTime : float;

function Start () {
	startTime = Time.time;
}

function Update () {
	if (Time.time - startTime > frequency) {
		randomOffset = Mathf.Round(Random.Range(0,6));
		if (randomOffset == 1)
			randomOffset = -1.8;
		else if (randomOffset == 2)
			randomOffset = 1.8;
		else if (randomOffset == 3)
			randomOffset = 0;
		else if (randomOffset == 4)
			randomOffset = -.7;
		else if (randomOffset == 5)
			randomOffset = .8;
		Instantiate(prefab, startPosition+Vector3(0,randomOffset,0), Quaternion.identity);
		startTime = Time.time;
	}
}