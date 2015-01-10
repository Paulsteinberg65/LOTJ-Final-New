
import System.Collections.Generic;

// Does this script currently respond to input?
var canControl : boolean = true; //canControl is assigned values according to GUIController's canControl(boolean) method
var numPages = 0;
private var talkedToDad : boolean = false;
private var tm : Object;

var useFixedUpdate : boolean = true;

var myTrans : Transform;

private var GLOBAL : Object;

// The current global direction we want the character to move in.
@System.NonSerialized
var inputMoveDirection : Vector3 = Vector3.zero;

//the tk2dsprite for the scene
var sprite : tk2dAnimatedSprite;

private var newLib : tk2dSpriteAnimation;

var bCollider : BoxCollider;
var fCollider : BoxCollider;
var fSprite : tk2dAnimatedSprite;

var footsteps : AudioClip; //the clip that will be used for footstep sounds

class CharacterMotorMovement {
	// The maximum horizontal speed when moving
	var maxSpeed : float = 0.8;
	// Maximum horizontal speed that's accelerate-able to from the air
	var maxAirSpeed : float = 0.4;
	
	// How fast does the character change speeds?  Higher is faster.
	var maxGroundAcceleration : float = 5.0;
	var maxAirAcceleration : float = 2.0;

	// The gravity for the character
	var gravity : float = 3.0;
	var maxFallSpeed : float = 2.0;

	// Wall run variables
	@System.NonSerialized
	var wallRunning : boolean = false;
	@System.NonSerialized
	var wallRunTime : float = 2.0;
	@System.NonSerialized
	var wallRunStartTime : float = 0.0;

	// The last collision flags returned from controller.Move
	@System.NonSerialized
	var collisionFlags : CollisionFlags; 

	// We will keep track of the character's current velocity,
	@System.NonSerialized
	var velocity : Vector3;
	
	// This keeps track of our current velocity while we're not grounded
	@System.NonSerialized
	var frameVelocity : Vector3 = Vector3.zero;
	
	@System.NonSerialized
	var hitPoint : Vector3 = Vector3.zero;
	
	@System.NonSerialized
	var lastHitPoint : Vector3 = Vector3(Mathf.Infinity, 0, 0);
	
	// Variables used to restrict aerial acceleration, based on movement.maxAirSpeed
	@System.NonSerialized
	var maxPositiveAirSpeed : float = 0;
	@System.NonSerialized
	var maxNegativeAirSpeed : float = 0;
	
	// Keep track of recently pressed left/right buttons
	@System.NonSerialized
	var rightLastPressed : float = -100;
	@System.NonSerialized
	var leftLastPressed : float = -100;
	
	@System.NonSerialized
	var facing : String = "right";
}

public var movement : CharacterMotorMovement = CharacterMotorMovement();

enum MovementTransferOnJump {
	None, // The jump is not affected by velocity of floor at all.
	InitTransfer, // Jump gets its initial velocity from the floor, then gradualy comes to a stop.
	PermaTransfer, // Jump gets its initial velocity from the floor, and keeps that velocity until landing.
	PermaLocked // Jump is relative to the movement of the last touched floor and will move together with that floor.
}

class CharacterMotorJumping {
	// Is jumping available?
	var enabled : boolean = true;
	
	// Jump height when jump button is released immediately
	var baseHeight : float = 0.2;
	
	// Extra height added on when jump button is held
	var extraHeight : float = 0.2;
	
	// Air jump height (for double jump)
	var airJumpHeight : float = 0.3;
	
	// How much does the character jump out perpendicular to the surface on walkable surfaces?
	// 0 means a fully vertical jump and 1 means fully perpendicular.
	var perpAmount : float = 0.0;
	
	// Are air jump / dash available?
	var airJumpEnabled : boolean = false;
	var airDashEnabled : boolean = false;
	
	// Are we jumping? (Initiated with jump button and not grounded yet)
	// To see if we are just in the air (initiated by jumping OR falling) see the grounded variable.
	@System.NonSerialized
	var jumping : boolean = false;
	
	// Used because wall jumping behaves differently than normal jumping
	@System.NonSerialized
	var wallJumping : boolean = false;
	
	@System.NonSerialized
	var holdingJumpButton : boolean = false;

	// the time we jumped at (Used to determine for how long to apply extra jump power after jumping.)
	@System.NonSerialized
	var lastStartTime : float = 0.0;
	
	@System.NonSerialized
	var lastButtonDownTime : float = -100;
	
	@System.NonSerialized
	var jumpDir : Vector3 = Vector3.up;
	
	@System.NonSerialized
	var wallJumpDir : Vector3 = (Vector3.up + Vector3.right).normalized;
	
	// For jumping while grounded next to a wall
	@System.NonSerialized
	var jumpedNearWall : boolean = false;
}

var jumping:CharacterMotorJumping = CharacterMotorJumping();

class CharacterMotorWallRun {
	// Is wall run available?
	var enabled : boolean = true;
	
	// Wall run total height
	var runHeight : float = 1.0;
	
	// Wall run speed
	var runSpeed : float = 1.0;
	
	// Wall slide speed
	var slideSpeed : float = 0.5;
	
	// Are we wall running?
	@System.NonSerialized
	var running : boolean = false;
	
	// Sliding?
	@System.NonSerialized
	var sliding : boolean = false;
	
	// Wall collision tracking
//	@System.NonSerialized
	var onLeftWall : boolean = false;
	
//	@System.NonSerialized
	var onRightWall : boolean = false;
	
	@System.NonSerialized
	var wallCollisionTime : float = -100;
	
	var wallJumpHeight : float = .15;
	
	@System.NonSerialized
	var wallJumpTime : float = -100;
	
	@System.NonSerialized
	var runStartTime : float = -100;
	
	@System.NonSerialized
	var collisionVelocity : float = 1;
	
	@System.NonSerialized
	var detachTime : float = -100;

	@System.NonSerialized
	var nearWall : boolean = false;
	
}

var wallRun:CharacterMotorWallRun = CharacterMotorWallRun();


@System.NonSerialized
var grounded : boolean = true;

@System.NonSerialized
var groundedLast : boolean = true;

@System.NonSerialized
var onWall : boolean = false;

@System.NonSerialized
var groundNormal : Vector3 = Vector3.zero;

private var lastGroundNormal : Vector3 = Vector3.zero;

private var tr : Transform;

private var controller : CharacterController;

private var jumpDisabled : float = 0;

function Awake () {
	controller = GetComponent (CharacterController);
	tr = transform;
	GLOBAL = GameObject.Find("GLOBAL").GetComponent("GLOBAL");
	tm = GameObject.Find("Player").GetComponent("TextManager");
	GLOBAL.FindGUI();
}

function Start () {
	//code to change gender of player
	if (GLOBAL.playerGender == 1 ){
		newLib = Resources.Load("femaleSpriteAnimation",tk2dSpriteAnimation); //load the spriteAnimation prefab
		sprite.anim = newLib; //assign the newLib to the sprite anim var to change the animations
		sprite.Play("right");
		sprite.StopAndResetFrame();
	}
	else if (GLOBAL.playerGender == 0 ){
		newLib = Resources.Load("maleSpriteAnimation",tk2dSpriteAnimation); //^^^
		sprite.anim = newLib; //^^^
		sprite.Play("right");
		sprite.StopAndResetFrame();
	}
	
	//set the footstep clip
	audio.clip = footsteps;
}

// Update is called once per frame
function Update () {
	//code for footsteps while player is walking
	if (sprite.Playing && jumping.jumping == false) {
		if (!audio.isPlaying) {
			audio.Play();
		}
	} else if (!sprite.Playing || jumping.jumping == true) {
		audio.Stop();
	}
	if (GLOBAL.GUIController.journalDisplay) { //disable the walking sound when looking at journal pages
		audio.Stop();
	}
	//code to switch animation direction depending on facing direction
	if (movement.velocity.x < 0.0 && grounded) {
			if (!sprite.IsPlaying("left"))
				sprite.Play("left");
		}
		else if (movement.velocity.x > 0.0 && grounded) {
			if (!sprite.IsPlaying("right"))
				sprite.Play("right");
	}
		else if (movement.velocity.x == 0.0 && grounded) {
			sprite.StopAndResetFrame();
	}
	
	groundedLast = grounded;
	
	// Perform grounded tests
	if (grounded && !IsGroundedTest()) {
		grounded = false;
	}
	else if (!grounded && IsGroundedTest()) {
		grounded = true;
		jumping.jumping = false;
		//wallRun.enabled = true;
	}
	
	if (GLOBAL.GUIController.journalDisplay) {
		jumpDisabled = Time.time;
	}
	
	if (canControl) {
	
		// Temporary velocity and position vectors for manipulations
		var velocity : Vector3 = movement.velocity;
		var lastPosition : Vector3 = tr.position;
		
		// Calculate new velocity
		velocity = ApplyInputVelocityChange(velocity);
		velocity = ApplyGravityAndJumping(velocity);
			
		movement.facing = GetFacing(velocity);
		
		// Reset values that will be recalculated after movement
		groundNormal = Vector3.zero;
		
		// Move!
		movement.collisionFlags = controller.Move(velocity * Time.deltaTime);
		
		// Recalculate values that were reset before movement
		movement.lastHitPoint = movement.hitPoint;
		lastGroundNormal = groundNormal;
		
		// Calculate actual velocity based on movement that occurred (accounts for collisions)
		movement.velocity = (tr.position - lastPosition) / Time.deltaTime;
	}
	
	if (jumping.jumping) {
		if (movement.velocity.x < 0.0) {
			if (!sprite.IsPlaying("jumpleft")) {
				sprite.Play("jumpleft");
				}
			}
		else if (movement.velocity.x > 0.0) {
			if (!sprite.IsPlaying("jumpright")) {
				sprite.Play("jumpright");
			}
		}
	}
	
	//load the next level when the player approaches the door
	if ((myTrans.position.x <= -7.52) && (myTrans.position.y >=5.0) && GLOBAL.questNum == 4) {
		Application.LoadLevel("enterCave");
	}
	
	//if (myTrans.position.x <= (bCollider.transform.position.x + (bCollider.size.x / 2.0)) && Application.loadedLevelName == "waterfall" && numPages == 8) {
	//	Application.LoadLevel("waterfallCave");
	//}
	
}

// Handles all horizontal movement due to input
private function ApplyInputVelocityChange (velocity : Vector3) {
	// Calculate horizontal velocity change
	var hVelocityChange : float = Input.GetAxis("Horizontal") - velocity.x;
	if (grounded) {
		// Stop if left and right are pressed
		if (GetArrowKeys()[2] && GetArrowKeys()[3])
			hVelocityChange = -velocity.x;
		else {
			if (hVelocityChange > 0)
				hVelocityChange = Mathf.Min(movement.maxGroundAcceleration * Time.deltaTime, hVelocityChange);
			else if (hVelocityChange < 0)
				hVelocityChange = Mathf.Max(-movement.maxGroundAcceleration * Time.deltaTime, hVelocityChange);
		}
	}
	else {
		// Keep going if neither or both of left+right are pressed
		if ((!GetArrowKeys()[2] && !GetArrowKeys()[3]) || (GetArrowKeys()[2] && GetArrowKeys()[3]))
			hVelocityChange = 0;
		else {
			if (hVelocityChange > 0)
				hVelocityChange = Mathf.Min(movement.maxAirAcceleration * Time.deltaTime, hVelocityChange);
			else if (hVelocityChange < 0)
				hVelocityChange = Mathf.Max(-movement.maxAirAcceleration * Time.deltaTime, hVelocityChange);
		}
	}

	velocity.x += hVelocityChange;
	
	// Constrain x velocity to maxSpeed
	if (grounded) {
		if (velocity.x > 0)
			velocity.x = Mathf.Min(velocity.x, movement.maxSpeed);
		else
			velocity.x = Mathf.Max(velocity.x, -movement.maxSpeed);
	}
	// Constrain x velocity to maxAirSpeed, if needed
	else {
		if (movement.velocity.x > 0 && Input.GetAxis("Horizontal") >= 0) {
			if (movement.velocity.x > movement.maxAirSpeed )
				velocity.x = movement.velocity.x;
			else
				velocity.x = Mathf.Min(velocity.x, movement.maxAirSpeed);
		}
		else if (movement.velocity.x < 0 && Input.GetAxis("Horizontal") <= 0) {
			if (movement.velocity.x < -movement.maxAirSpeed)
				velocity.x = movement.velocity.x;
			else
				velocity.x = Mathf.Max(velocity.x, -movement.maxAirSpeed);
		}
	}
	
	// Remove onLeft/RightWall state if moving away
	if (velocity.x > .01) {
		if (wallRun.onRightWall)
			velocity.x = 0;
		else if (wallRun.onLeftWall) {
			wallRun.detachTime = Time.time;
			wallRun.onLeftWall = false;
		}
	}
	else if (velocity.x < -.01) {
		if (wallRun.onLeftWall)
			velocity.x = 0;
		else if (wallRun.onRightWall) {
			wallRun.detachTime = Time.time;
			wallRun.onRightWall = false;
		}
	}
	return velocity;
}

// Handles gravity and jumping movement (only if not on a wall)
private function ApplyGravityAndJumping (velocity : Vector3) {

	// Reset jump button variables if required
	if (!JumpButtonPressed() || !canControl) {
		jumping.holdingJumpButton = false;
		jumping.lastButtonDownTime = -100;
	}
	
	// Record when jump button is pressed for later calculations
	if (JumpButtonPressed() && jumping.lastButtonDownTime < 0 && canControl)
		jumping.lastButtonDownTime = Time.time;
		
	// Apply gravity (unless jump button is held during jump)
	if (grounded) {
		velocity.y = Mathf.Min(0, velocity.y) - movement.gravity * Time.deltaTime;
		//jumping.airJumpEnabled = true;
	}
	else {
		velocity.y = velocity.y - movement.gravity * Time.deltaTime;

		// Waits to apply gravity while player holds jump button (for bonus height)
		if (jumping.jumping && jumping.holdingJumpButton) {
			// Calculate the duration that the extra jump force should have effect.
			// If we're still less than that duration after the jumping time, negate gravity by applying opposite force
			if (Time.time < jumping.lastStartTime + jumping.extraHeight / CalculateJumpVerticalSpeed(jumping.baseHeight)) {
				// force = to gravity pushes in jumpDir rather than upwards.
				velocity += jumping.jumpDir * movement.gravity * Time.deltaTime;
			}
		}
		
		// Gives our character a terminal velocity.
		velocity.y = Mathf.Max (velocity.y, -movement.maxFallSpeed);
		}
	
	// Jumping
	if (grounded && Time.time - jumpDisabled > .1) {
		velocity = Jump(velocity);
	}
	// Air jumping (only works 0.1s or more after first jump, to protect player)
	else if (jumping.airJumpEnabled && canControl && (Time.time - jumping.lastButtonDownTime == 0.0) && 
		((Time.time - jumping.lastStartTime) > 0.1)) {
		if (wallRun.nearWall && !jumping.jumpedNearWall) {
			velocity = WallJump(velocity);
		}
		else {
			velocity.y = 0;
			if (GetArrowKeys()[2])
				velocity.x = Mathf.Min(-movement.maxSpeed, velocity.x);
			else if (GetArrowKeys()[3])
				velocity.x = Mathf.Max(movement.maxSpeed, velocity.x);
			velocity += jumping.jumpDir * CalculateJumpVerticalSpeed (jumping.airJumpHeight);
			jumping.airJumpEnabled = false;
		}
	}
	
	return velocity;
}

// Handles all wallrun related movement, including jumping off
private function ApplyWallMovement(velocity : Vector3) {

	// Reset jump button variables if required
	if (!JumpButtonPressed() || !canControl) {
		jumping.lastButtonDownTime = -100;
	}
	
	if (grounded)
		jumping.airJumpEnabled = true;
	
	// Record when jump button is pressed for later calculations
	if (JumpButtonPressed() && jumping.lastButtonDownTime < 0 && canControl)
		jumping.lastButtonDownTime = Time.time;
		
	// Keep wall jump direction updated
	if (wallRun.onLeftWall)
		jumping.wallJumpDir = Vector3(.8,.8,0);
	else if (wallRun.onRightWall) 
		jumping.wallJumpDir = Vector3(-.8,.8,0);
	
	// Handles wall running / sliding (/ sticking when you first collide)
	if (GetArrowKeys()[0] && wallRun.enabled) {
		wallRun.enabled = false;
		wallRun.running = true;
		wallRun.runStartTime = Time.time;
	}
	// Check for wallrun
	else if (Time.time - wallRun.runStartTime < wallRun.runHeight / wallRun.runSpeed)
		velocity.y = wallRun.runSpeed;
	// Regular jumping (if on the ground, next to a wall)
	else if (jumping.enabled && canControl && (Time.time - jumping.lastButtonDownTime < 0.2) && grounded) {
		velocity = Jump(velocity);
		wallRun.onLeftWall = false;
		wallRun.onRightWall = false;
		jumping.jumpedNearWall = true;
		}
	// Check for recent collision or end of wallrun in order to stick to wall
	else if ((Time.time - wallRun.wallCollisionTime < 0.1 && !grounded &&
			wallRun.collisionVelocity > -wallRun.slideSpeed / 2) ||
			(Time.time - wallRun.runStartTime < wallRun.runHeight / wallRun.runSpeed + 0.2))
		velocity.y = -wallRun.slideSpeed / 4;
	else 
		velocity.y = -wallRun.slideSpeed;
		
	if (canControl && (Time.time - jumping.lastButtonDownTime < .01) && !grounded && !jumping.jumpedNearWall)
		velocity = WallJump(velocity);
	

	
	return velocity;
}



/////////////////////////////////
/////////////HELPERS/////////////
/////////////////////////////////

private function JumpButtonPressed () {
	return Input.GetButton("Space");
}

// Returns booleans for all arrow keys in a list (order: Up Down Left Right)
private function GetArrowKeys () {
	var keysPressed : List.<boolean> = new List.<boolean>();
	keysPressed.Add(Input.GetButton("Up"));
	keysPressed.Add(Input.GetButton("Down"));
	keysPressed.Add(Input.GetButton("Left"));
	keysPressed.Add(Input.GetButton("Right"));
	
	if (Input.GetButton("Left"))
		movement.leftLastPressed = Time.time;
	if (Input.GetButton("Right"))
		movement.rightLastPressed = Time.time;
	
	return keysPressed;
}

// Called upon controller collision
// Calculates hitpoint and ground normal for ground collisions
function OnControllerColliderHit (hit : ControllerColliderHit) {  
	if (hit.normal.y > 0 && hit.normal.y > groundNormal.y && hit.moveDirection.y < 0) {
		if ((hit.point - movement.lastHitPoint).sqrMagnitude > 0.001 || lastGroundNormal == Vector3.zero)
			groundNormal = hit.normal;
		else
			groundNormal = lastGroundNormal;
		
		movement.hitPoint = hit.point;
		movement.frameVelocity = Vector3.zero;
	}
	
	if (hit.gameObject.tag == "Page") {
		var pageNum : int = 0;
		pageNum = hit.gameObject.name[4];
		//GLOBAL.pagesObtained[pageNum-48] = "y";
		GLOBAL.AddPage(pageNum-48);
		Destroy(hit.gameObject);
		numPages++;
	}
	
	if (hit.gameObject.tag == "NPC") {
		if (!talkedToDad) {
			talkedToDad = true;
			if (!fSprite.IsPlaying("StandUp")) {
				fSprite.Play("StandUp");
			}
			fCollider.enabled = false;
			tm.facedObject = GameObject.Find("Father");
			tm.startConvo("Father");
		}
	}
	
	if (hit.gameObject.tag == "Door") {
		if (Application.loadedLevelName == "waterfall" && GLOBAL.questNum == 5) {
			Application.LoadLevel("enterCave");
		}
		if (Application.loadedLevelName == "waterfallCave" && talkedToDad) {
			Application.LoadLevel("searchParty2");
		}
	}
}

private function CalculateJumpVerticalSpeed (targetJumpHeight : float) {
	// From the jump height and gravity we deduce the upwards speed 
	// for the character to reach the target height
	return Mathf.Sqrt (2 * targetJumpHeight * movement.gravity);
}

// Returns true if character is in wallrun or wallslide state
// Also keeps track of a lot of collision data
private function OnWall () {
	// Raycasts are used to detect left and right walls
	var rightRay = Vector3(1,0,0);
	var leftRay = Vector3(-1,0,0);
	
	// Uses left/rightLastPressed in order to give buffer for attaching to walls
	// This makes walljumping much more forgiving
	if (Physics.Raycast(tr.position, leftRay, .01 + controller.radius)) {
		if (Time.time - movement.leftLastPressed < .1) { 
			if (!wallRun.onLeftWall && (Time.time - wallRun.wallJumpTime > .1)) {
				wallRun.wallCollisionTime = Time.time;
				wallRun.collisionVelocity = movement.velocity.y;
				wallRun.enabled = true;
			}
			wallRun.onLeftWall = true;
			jumping.wallJumpDir = Vector3(.8,.8,0);
		}
	}
	else {
		wallRun.onLeftWall = false;
	}
	
	if (Physics.Raycast(tr.position, rightRay, .01 + controller.radius)) {
		if (Time.time - movement.rightLastPressed < .1) {
			if (!wallRun.onRightWall && (Time.time - wallRun.wallJumpTime > .1)) {
				wallRun.wallCollisionTime = Time.time;
				wallRun.collisionVelocity = movement.velocity.y;
				wallRun.enabled = true;
			}
			wallRun.onRightWall = true;
			jumping.wallJumpDir = Vector3(-.8,.8,0);	
		}
	}
	else {
		wallRun.onRightWall = false;
	}
	
	// Draw ray lines for debug
	//Debug.DrawLine(tr.position, tr.position + leftRay * (controller.radius + .01), Color.red);
	//Debug.DrawLine(tr.position, tr.position + rightRay * (controller.radius + .01), Color.red);
	
	if (wallRun.onRightWall || wallRun.onLeftWall)
		return true;
	else
		return false;
}

// Checks whether player is against a wall (doesn't care about key presses)
private function NearWall(){
	// Raycasts are used to detect left and right walls
	var rightRay = Vector3(1,0,0);
	var leftRay = Vector3(-1,0,0);
	
	if (Physics.Raycast(tr.position, leftRay, .02 + controller.radius)){
		jumping.wallJumpDir = Vector3(.8,.8,0);
		return true;
	}
	else if (Physics.Raycast(tr.position, rightRay, .02 + controller.radius)){
		jumping.wallJumpDir = Vector3(-.8,.8,0);
		return true;
	}
	return false;
}

// Jumping helper (so it can be used while grounded near walls)
private function Jump (velocity : Vector3) {
	// Jump only if the jump button was pressed down in the last 0.2 seconds, for responsiveness
	if (jumping.enabled && canControl && (Time.time - jumping.lastButtonDownTime < 0.2)) {
		grounded = false;
		jumping.jumping = true;
		jumping.lastStartTime = Time.time;
		jumping.lastButtonDownTime = -100;
		jumping.holdingJumpButton = true;
		
		// Apply the jumping force to the velocity. Cancel any vertical velocity first.
		velocity.y = 0;
		velocity += jumping.jumpDir * CalculateJumpVerticalSpeed (jumping.baseHeight);
		
		SendMessage("OnJump", SendMessageOptions.DontRequireReceiver);
	}
	else {
		jumping.holdingJumpButton = false;
	}
	return velocity;
}

// Wall jumping helper (mostly so that ApplyGravityAndJumping can use it while player is detaching from wall)
private function WallJump (velocity : Vector3) {
	jumping.wallJumping = true;
	jumping.lastStartTime = Time.time;
	jumping.lastButtonDownTime = -100;
	movement.wallRunning = false;
	wallRun.enabled = true;
	wallRun.wallJumpTime = Time.time;
	
	wallRun.onLeftWall = false;
	wallRun.onRightWall = false;
	
	// Apply the jumping force to the velocity. Cancel any vertical and horizontal velocity first.
	velocity.x = 0;
	velocity.y = 0;
	velocity += jumping.wallJumpDir * CalculateJumpVerticalSpeed (wallRun.wallJumpHeight);

	
	SendMessage("OnJump", SendMessageOptions.DontRequireReceiver);

	return velocity;	
}

// More accurate grounded test than controller.isGrounded
private function IsGroundedTest () {
	return (groundNormal.y > 0.01);
}

public function GetFacing (velocity : Vector3) {
	if (!(Input.GetButton("Left") && (Input.GetButton("Right")))) {
		if (Input.GetButton("Left"))
			movement.facing = "left";
		else if (Input.GetButton("Right"))
			movement.facing = "right";;
	}
	return movement.facing;
}