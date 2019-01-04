/*
- Create a Class (JS Class, look at your notes if your forget) for your tomagotchi
- Instatiate your Tomagotchi
- Display a character of your choice on the screen to represent your pet
- Display the following metrics for your pet:
	* Hunger (1-10 scale)
	* Sleepiness (1-10 scale)
	* Boredom (1-10 scale)
	* Age
- Add buttons to the screen to feed your pet, turn off the lights, and play with your pet.
- Add the ability to name your pet.
- Style the page.
- Increase your pet's age every x minutes
- Increase your pet's Hunger, Sleepiness, and Bored metrics on an interval of your choosing.
- You pet should die if Hunger, Boredom, or Sleepiness hits 10.
- Morph your pet at certain ages.
- Animate your pet across the screen while it's alive.

Extras
- Have your tomagotchi give birth to baby tomagotchi...
- ...with special powers (extend the class)!
- Add an excercise() method to your tomagotchi, that affects certain properties
- Add anything you can think of... use your imagination!
*/

class tomagotchi {
	constructor (name,hunger,sleepiness,boredom,age) {
		this.name = name;
		this.hunger = hunger;
		this.sleepiness = sleepiness;
		this.boredom = boredom;
		this.age = age;
	}
}

$( ".lights" ).click(function() { 
	if ( $( ".lights" ).text() === "Turn Lights Off") {
		$( "body" ).css("background", "black");
		$( "h5" ).css("color", "green");
		$( ".lights" ).text("Turn Lights On");
		$( "fieldset" ).css("color", "green")
		$( "button" ).css("color", "green")
		$( "button" ).css("background-color", "black")
		tomagotchiPet.sleepiness = 0;
	} else {
		$( "body" ).css("background", "white");
		$( "h5" ).css("color", "black");
		$( ".lights" ).text("Turn Lights Off");
		$( "fieldset" ).css("color", "black")
		$( "button" ).css("color", "black")
		$( "button" ).css("background-color", "")
	}
});

$( ".feed" ).click(function() { 
	tomagotchiPet.hunger = 0;
});

//$( ".sleep" ).click(function() { 
//	tomagotchiPet.sleepiness = 0;
//});

$( ".play" ).click(function() { 
	tomagotchiPet.boredom = 0;
});


function increaseAge() {
    tomagotchiPet.age++;
    $( ".AgeCountLegend" ).text("Age: " + tomagotchiPet.age)
    $( "#progressBarAge" ).progressbar( "option", "value", tomagotchiPet.age );
    if (tomagotchiPet.age >= 100) {
    	endGame();
    	$( ".died" ).text(tomagotchiPet.name + " Died of old Age.  Game Over!!!")
    }
}

function increaseHunger() {
    tomagotchiPet.hunger++;
    $( ".HungerCountLegend" ).text("Hunger: " + tomagotchiPet.hunger)
    $( "#progressBarHunger" ).progressbar( "option", "value", (tomagotchiPet.hunger * 10));
    if (tomagotchiPet.hunger >= 10) {
    	endGame();
    	$( ".died" ).text(tomagotchiPet.name + " Died of Hunger.  Game Over!!!")
    }
}

function increaseSleepiness() {
    if ( $( ".lights" ).text() !== "Turn Lights On") tomagotchiPet.sleepiness++;
    $( ".SleepCountLegend" ).text("Sleepiness: " + tomagotchiPet.sleepiness)
    $( "#progressBarSleep" ).progressbar( "option", "value", (tomagotchiPet.sleepiness * 10));
    if (tomagotchiPet.sleepiness >= 10) {
    	endGame();
    	$( ".died" ).text(tomagotchiPet.name + " Died of Sleepiness.  Game Over!!!")
    }
}

function increaseBoredom() {
    tomagotchiPet.boredom++;
    $( ".BoredomCountLegend" ).text("Boredom:  " + tomagotchiPet.boredom)
    $( "#progressBarBoredom" ).progressbar( "option", "value", (tomagotchiPet.boredom * 10));
    if (tomagotchiPet.boredom >= 10) {
    	endGame();
    	$( ".died" ).text(tomagotchiPet.name + " Died of Boredom.  Game Over!!!")
    }

    //console.log("Boredom: " + tomagotchiPet.boredom);
}


//----------------------------------------------------------------------------------
//Moving my 
//----------------------------------------------------------------------------------
let y = 0;
let z = 0;
let regExp = /q/ig;
let regExp2 = /x/ig;
let space = " ";
let morph = "";
let morphOld = 
" \r\n \
q--------------  \r\n \
q|   I'm old   | \r\n \
q--------------  \r\n \
q|               \r\n \
q|   ";
let morphOld2="";

function movement() {
    
if (z % 2 === 0) {
    tomagotchiPics2 = tomagotchiPicsMoveRight.replace(regExp, space.repeat(y) );
    if (tomagotchiPet.age > 10) {
    	morphOld2 = morphOld.replace(regExp, space.repeat(y) );
    	tomagotchiPics2 = tomagotchiPics2.replace(regExp, space.repeat(y) ).replace(regExp2, morphOld2 );
    	//tomagotchiPics2 = tomagotchiPics2.replace(regExp2, morphOld );
	} else {
		tomagotchiPics2 = tomagotchiPics2.replace(regExp2, morph );
	}
    y++;
} else {
	tomagotchiPics2 = tomagotchiPicsMoveLeft.replace(regExp, space.repeat(y) );
	if (tomagotchiPet.age > 10) {
    	morphOld2 = morphOld.replace(regExp, space.repeat(y) );
    	tomagotchiPics2 = tomagotchiPics2.replace(regExp, space.repeat(y) ).replace(regExp2, morphOld2 );
    	//tomagotchiPics2 = tomagotchiPics2.replace(regExp2, morphOld );
	} else {
		tomagotchiPics2 = tomagotchiPics2.replace(regExp2, morph );
	}
	y--;
}
    $( ".pic" ).text(tomagotchiPics2);
    
    if ( y >= 15 || y <= 0) {
    	z++;
    }
    //console.log("Boredom: " + tomagotchiPet.boredom);
}



function endGame() {
	clearInterval(intervalAge);
	clearInterval(intervalHunger);
	clearInterval(intervalBoredom);
	clearInterval(intervalSleepiness);
	clearInterval(intervalMove);
}

$( ".endPlay" ).click(function() { 
	endGame();
});

let intervalAge = 0;
let intervalHunger = 0;
let intervalBoredom = 0;
let intervalSleepiness = 0;

let tomagotchiPet = new tomagotchi("Swamp Gator", 0, 0, 0, 0 );
$( ".name" ).text(tomagotchiPet.name);


intervalAge = setInterval(increaseAge, 1000);
intervalHunger = setInterval(increaseHunger, 2000);
intervalBoredom = setInterval(increaseBoredom, 3000);
intervalSleepiness = setInterval(increaseSleepiness, 4000);
intervalMove = setInterval(movement, 500);

//----------------------------------------------------------------------------------
//Initialize the Progress bar jQuery UI
//----------------------------------------------------------------------------------
$('#progressBarAge').progressbar({
	value: 0
});

$('#progressBarHunger').progressbar({
	value: 0
});

$('#progressBarBoredom').progressbar({
	value: 0
});

$('#progressBarSleep').progressbar({
	value: 0
});


$( ".namePetButton" ).click(function() {
	
	let task = $( ".namePetInput" ).val();
	if (task === "") {
		alert("Name Cannot be blank");
	} else {
		tomagotchiPet.name = task;
		$( ".name" ).text(tomagotchiPet.name);
	}
	$( ".namePetInput" ).val("");
});


let tomagotchiPicsMoveRight = 

"q       x            \r\n \
 q  .::::::::..       \r\n \
 q :::::::::::::      \r\n \
 q:::::::::::' .\     \r\n \
 q`::::::::::_,__o    ";

let tomagotchiPicsMoveLeft = 


"q   x            \r\n \
 q   ..::::::::.  \r\n \
 q  ::::::::::::: \r\n \
 q /. `:::::::::::\r\n \
 qo__,_::::::::::'";

/*

"   .::::::::..       \r\n \
   :::::::::::::      \r\n \
  :::::::::::' .\     \r\n \
  `::::::::::_,__o    ",

"    .::::::::..       \r\n \
    :::::::::::::      \r\n \
   :::::::::::' .\     \r\n \
   `::::::::::_,__o    ",


"     .::::::::..       \r\n \
     :::::::::::::      \r\n \
    :::::::::::' .\     \r\n \
    `::::::::::_,__o    ",    

"      .::::::::..       \r\n \
      :::::::::::::      \r\n \
     :::::::::::' .\     \r\n \
     `::::::::::_,__o    ",

"       .::::::::..       \r\n \
       :::::::::::::      \r\n \
      :::::::::::' .\     \r\n \
      `::::::::::_,__o    ",

"   .::::::::..       \r\n \
   :::::::::::::      \r\n \
  :::::::::::' .\     \r\n \
  `::::::::::_,__o    ",

"   .::::::::..       \r\n \
   :::::::::::::      \r\n \
  :::::::::::' .\     \r\n \
  `::::::::::_,__o    "  

  */









