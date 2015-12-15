AngularJS interface designed to simulate different scenarios.  Current theme is Firefly, but could be anything.
The choices could be changing things in the past which effects different eras or civilations, etc.  

Each character has a fatigue cap of 10.  Careful not to over-utilyze any one person or game over.  
Also, each has a conflict, two things they want that are often mutually exclusive.  For example:

Mal has:

"Keep Flyin'" - Keep the shipping fueled and running, no matter what.  
"You're on my crew" - His desire to keep the crew safe and cared for sometimes overrides his need to "Keep Flyin'"

Game mechanics are over simplified for now, but the concept of the game is in place. 

TODO
-Get all game data from server side app.  (Likely use Laravel.)
-Add many more scenarios
-Have some scenarios trigger the "desireable" trait on each character.
-Have better means of recouperating fatigue.
-Track money, since that is vital to keep the ship running.
-Consider adding Serenity as a "character", instead of fatigue, would be hull damage or remaining fuel.
-Consider adding a combat system, some starter ideas:
--Player assigns a number of characters to combat
--"Roll dice" to see effectiveness of combat, vs. computer
--If injuries result, character's fatigue is stuck at 9, and they are in med-bay for a pre-determinied amount of time.
-Prettify the UI.  
-Add another optional content theme (Like the time travel option)
-Have the UI skin change (backgrounds, colors, images) depending on chosen content theme 
