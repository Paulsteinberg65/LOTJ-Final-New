
var collisionDict : Object = {};
function Start () {
	// create initial object list
	var obstacles : GameObject[];
	var size : Vector3;
	var center : Vector3;	
	obstacles = FindGameObjectsWithLayer(8);
	
	for (var obstacle : GameObject in obstacles) {
		size = obstacle.collider.bounds.size;
		center = obstacle.collider.bounds.center;
		
		for (var i=0; i<size.x; i++) {
			for (var j=0; j<size.y; j++) {
				if (obstacle.tag != "NPC")
					collisionDict[Mathf.RoundToInt(center.x - size.x * 0.5 + 0.5 + i).ToString() + ", " 
						+ Mathf.RoundToInt(center.y - size.y * 0.5 + 0.5 + j).ToString()] = obstacle;
				else
					collisionDict[center.x.ToString() + ", " + center.y.ToString()] = obstacle;
			}
		}
	}
}

function Update () {

}



function FindGameObjectsWithLayer (layer : int) : GameObject[] {
    var goArray = FindObjectsOfType(GameObject);
    var goList = new System.Collections.Generic.List.<GameObject>();
    for (var i = 0; i < goArray.Length; i++) {
       if (goArray[i].layer == layer) {
         goList.Add(goArray[i]);
       }
    }
    if (goList.Count == 0) {
       return null;
    }
    return goList.ToArray();
}