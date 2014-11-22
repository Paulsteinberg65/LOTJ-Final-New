var speed : float;
var lifetime : float = 5;

private var lifeStart : float;

private var pos1 : float;
private var pos2 : float;
private var swapTime : float;
private var swapFreq : float;

function Start () {
	
	lifeStart = Time.time;
	pos1 = transform.position.y;
	pos2 = transform.position.y+.075;
	swapTime = Time.time;
	swapFreq = Random.Range(0.15,0.3);
}

function Update () {
	transform.Translate(Vector3(speed*Time.deltaTime,0,0));
	if (lifetime <= Time.time - lifeStart)
	{
		Destroy(gameObject);
	}
	
	if (Time.time - swapTime > swapFreq) {
		swapTime = Time.time;
		if (transform.position.y == pos1)
			transform.position.y = pos2;
		else
			transform.position.y = pos1;
	}
}