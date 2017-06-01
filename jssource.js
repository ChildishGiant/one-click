//Number of bits. Odd numbers look nicer
var bits = 5

//Global count for which bit we're on. 0 indexed.
var count = 0;
//Global level count. We're starting from 1.
var level = 1;
//Array of times of button presses (if used)
var s = [];
//Bool of if one's won.
var won = false;

$( document ).ready(function() {
  //Making bits
  for (i = 0; i < bits; i++) {
    $("#center").append('<div class="bit" id="' + i + '"></div>');
  }

})

function level1(){
  $("#"+count).addClass("on");
  count = count + 1

  return(count > bits);
}

function level2(){

  //max ms between all clicks
  var x = 1000 ;

  //Add unix time to s[]
  var d = new Date();
  s.push(d.getTime());

  $("#"+count).addClass("on");
  count = count + 1

  //If you've pressed  all the bits
  if (s.length > bits){

    if ( ( s[s.length - 1] - s[0] ) <= x){
      return true;
    } else{

      count = 0;
      //Turn off all bits.
      $(".bit").removeClass("on");
      s = [];

      $("#levelCount").removeClass("fail");
        setTimeout(function() {
          $("#levelCount").addClass("fail");
      }, 1);

      return false;
    }

  };
};



//On click
$(document).click(function() {
  bitPress();
});

//On key press
$(document).keypress(function() {
  bitPress();
});


//Called when a bit is to be pressed.
function bitPress(){

  //Don't do anything if the user has won.
  if (!won){
    if (
      //Run the level's code and see if it say's they've won.
      eval("level"+level+"();")
    ){
      //If the level function says it's a pass

      //Check if the next level exists
      if (typeof window["level"+(parseInt(level)+1)] != 'function') {
        //If you've got no levels left.
        win();
      }else{
        //If you still have levels left.

        level += 1;
        count = 0;
        //Turn off all bits.
        $(".bit").removeClass("on");

        //Update level counter.
        $("#levelCount").removeClass("pass");
          setTimeout(function() {
            $("#levelCount").addClass("pass");
        }, 1);
        $("#levelCount").text("Level: " + level);
      };
    };
  };
};

//What to do when one wins.
function win(){
  won = true;
  alert("temp win");
}

//Fully resets the game from fresh.
function restart(){
  won = false;
  level = 1;
  count = 0;
  //Update level counter.

  $("#levelCount").text("Level: " + level);
  $(".bit").removeClass("on");
}
