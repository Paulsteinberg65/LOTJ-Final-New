
var speed : float;
var oldSpeed : float;
var type : int;
var lifetime : float = 5;

private var lifeStart : float;

private var sprite : tk2dSprite;
private var playerScript : Object;

private var pos1 : float;
private var pos2 : float;
private var swapTime : float;
private var swapFreq : float;

function Start () {
	type = 0;
	lifeStart = Time.time;
	sprite = GetComponent(tk2dSprite);
	while (type == 0 || type == 9 || type == 13 || type == 15)
		type = Random.Range(0,19);
	sprite.spriteId = type;
	//playerScript = GameObject.Find("Player").GetComponent("AwarenessPlayer");
	oldSpeed = speed;
	pos1 = transform.position.y;
	pos2 = transform.position.y+.075;
	swapTime = Time.time;
	swapFreq = Random.Range(0.15,0.3);
}

function Update () {
	transform.Translate(Vector3(-speed*Time.deltaTime,0,0));
	if (lifetime <= Time.time - lifeStart)
	{
		Destroy(gameObject);
	}
	if (!GameObject.Find("Player").GetComponent("AwarenessPlayer").canControl) { //use directly instead of playerScript to avoid errors on destruction
		speed = 0;
		lifetime += Time.deltaTime;
	}
	else {
		speed = oldSpeed;
	}
	
	if (Time.time - swapTime > swapFreq) {
		swapTime = Time.time;
		if (transform.position.y == pos1)
			transform.position.y = pos2;
		else
			transform.position.y = pos1;
	}
}