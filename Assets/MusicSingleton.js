#pragma strict
 
 //This script is a Singleton pattern class meant to control music overmultiple scenes
  
 public class MusicSingleton extends MonoBehaviour
 {
     private static var instance : MusicSingleton;
     
     public var secrets : AudioClip; //the Secrets Revealed clip
     public var maze : AudioClip; //the Forest Maze clip
     public var waterfall : AudioClip; //the By The River clip
     public var market : AudioClip; //the market clip
     public var meeting : AudioClip; //the meeting clip
     public var coppers : AudioClip; //piggies clip
     public var radio : AudioClip; //piggies clip
     public var jeep : AudioClip; //jeep engine clip
     public var city : AudioClip; //city clip
     public var legislature : AudioClip; //in building clip for the capital
     public var azteca : AudioClip;
     
     function Awake() 
     {
         if (instance != null && instance != this) 
         {
             Destroy( this.gameObject );
             return;
         } 
         else 
         {
             instance = this;
         }
         
         DontDestroyOnLoad( this.gameObject );
     }
     
     function Update() {
     }
     
     //changes the music when a new level is loaded if necessary
     function OnLevelWasLoaded( level : int )
     {
         if ( level == 0 ) //play music when you first enter the game
         {
             audio.Stop();
             audio.clip = secrets;
             audio.Play();
         }
         else if ( level == 10 ) //when you get to forest, change music
         {
         	audio.Stop();
         	audio.clip = maze;
         	audio.Play();
         }
         else if ( level == 13 ) //when you get to waterfall, change music
         {
         	audio.Stop();
         	audio.clip = waterfall;
         	audio.volume = 0.2;
         	audio.Play();
         }
         else if ( level == 14 && audio.clip != waterfall) //when you get to waterfall, change music
         {
         	audio.Stop();
         	audio.volume = 0.2;
         	audio.clip = waterfall;
         	audio.Play();
         }
         else if ( level == 17 ) //play different music when you come to searchparty2
         {
         	audio.Stop();
         	audio.volume = 0.4;
         	audio.clip = secrets;
         	audio.Play();
         }
         else if ( level == 18 ) //play market sounds for market
         {
         	audio.Stop();
         	audio.volume = 0.34;
         	audio.clip = market;
         	audio.Play();
         }
         else if ( level == 19 && audio.clip != market ) //play market sounds for market
         {
         	audio.Stop();
         	audio.volume = 0.34;
         	audio.clip = market;
         	audio.Play();
         }
         else if ( level == 20 ) //play different music for rules
         {
         	audio.Stop();
         	audio.volume = 0.4;
         	audio.clip = meeting;
         	audio.Play();
         }
         else if ( level == 21 && audio.clip != meeting)
         {
         	audio.Stop();
         	audio.volume = 0.4;
         	audio.clip = meeting;
         	audio.Play();
         }
         else if ( level == 22 ) //play siren noises for the police officer
         {
         	audio.Stop();
         	audio.clip = coppers;
         	audio.Play();
         }
         else if ( level == 23 ) //play cop chatter for the police officer
         {
         	audio.Stop();
         	audio.clip = radio;
         	audio.Play();
         }
         else if ( level == 24 ) //play new music for town3
         {
         	audio.Stop();                       //I'M TRAPPED IN JAVASCRIPT AND I CAN'T GET OUT. SEND FOR STEPHEN HAWKING, HE'LL KNOW WHAT TO DO
         }
         else if ( level == 25 ) //play car noise for driving scenes
         {
         	audio.Stop();
         	audio.clip = jeep;
         	audio.Play();
         }
         else if ( level == 27 || level == 28 ) //stop car noises for capitol
         {
         	audio.Stop();
         	audio.clip = city;
         	audio.Play();
         }
         else if (level == 29 || level == 30) {
         	audio.Stop();
         	audio.clip = azteca;
         	audio.Play();
         }
     }
     
     //returns the singleton instance of the music player
     public static function GetInstance() : MusicSingleton 
     {
         return instance;
     }
     
     function ToggleInsideAudio (inside : boolean) { //toggles the audio clips in the capital for walking inside and outside
     	if (inside) {
     		audio.Stop();
     		audio.clip = legislature;
     		audio.Play();
     	} else if (!inside) {
     		audio.Stop();
     		audio.clip = city;
     		audio.Play();
     	}
     }
     
     function LevelSelection () {
     	audio.Stop();
     	audio.clip = secrets;
     	audio.Play();
     }
     
 }