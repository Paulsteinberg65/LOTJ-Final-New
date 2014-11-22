//very simple implementation currently

var followedObject : GameObject;
var following : boolean = true;
private var followedTransform : Transform;

function Start () {
	followedTransform = followedObject.transform;
}

function Update () {
	transform.position.x = followedTransform.position.x;
	transform.position.y = followedTransform.position.y;
}