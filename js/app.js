/* Executed every time the "Calculate Change" button is pressed. This should do any necessary
** validation, call calculateChange, and populate the DOM
*/
var onCalculatePressed = function(e) {
  e.preventDefault();

  // ---
  // Add your hooks, call to calculateChange, and DOM manipulations here
  // ---

  if ($( "#amountCharged" ).valid() && $( "#amountTendered" ).valid())
  {
     // do some stuff
     console.log('valid');

     var t = $( "#amountTendered" ).val(),
         c = $( "#amountCharged" ).val(),
         r = calculateChange(parseFloat(c), parseFloat(t));

     if($.isEmptyObject(r)) {
       renderFortune();
     } else {
       renderChange(r);
     }
  }
  else
  {
     // just show validation errors, dont post
     console.log('not valid');
  }
};

/* Render fortune results
**
*/
var renderFortune = function() {
  $.getJSON('http://fortunecookieapi.com/v1/cookie', function(view) {
    $.get("tmpl/fortune.mustache", function(template) {
      var results = $.mustache(template, view[0].fortune);
      $("#results").html(results);
    });
  });
};

/* Render change ammounts
**
** Arguments: An object composed of keys in Mewla denominations (i.e. 1, 3, 7, 21, 33, 100) and values
**          corresponding to the number of coins owed in each denomination.
**
*/
var renderChange = function(ammountChange) {
  $.get("tmpl/change.mustache", function(template) {
    var results = $.mustache(template, ammountChange);
    $("#results").html(results);
  });
};

/* Does the caculation of change owed to the customer.
**
** Arguments:
**  - amountCharged: <float> The amount being charged to the customer. Must be <= amountTendered
**  - amountTendered: <float> The amount that the customer is using to pay. Must be >= amountCharged
**
** Returns: An object composed of keys in Mewla denominations (i.e. 1, 3, 7, 21, 33, 100) and values
**          corresponding to the number of coins owed in each denomination.
**          e.g. {1: 2, 3: 1, 7: 0, 21: 1, 33: 2, 100: 0} if the change owed is 92
*/
var calculateChange = function(amountCharged, amountTendered) {
  var changeOwed = {};
  // ---
  // Implement your change-calculating logic here
  // ---

  var t = amountTendered,
      c = amountCharged;

  if(c != t) {
    changeOwed = {1: 0, 3: 0, 7: 0, 21: 0, 33: 0, 100: 0};
    while (t > c) {
      if ((t - c) > 100 ) {
        console.log(100);
        changeOwed[100] += 1;
        t -= 100;
      } else if ((t - c) > 33 ) {
        console.log(33);
        changeOwed[33] += 1;
        t -= 33;
      } else if ((t - c) > 21 ) {
        console.log(21);
        changeOwed[21] += 1;
        t -= 7;
      } else if ((t - c) > 7 ) {
        console.log(7);
        changeOwed[7] += 1;
        t -= 7;
      } else if ((t - c) > 3 ) {
        console.log(3);
        changeOwed[3] += 1;
        t -= 3;
      } else {
        console.log(1);
        changeOwed[1] += 1;
        t -= 1;
      }
    }
  }

  console.log(changeOwed);
  return changeOwed;
};

// Display cat image on header
$('#head-cat').attr('src', 'images/headercat' + Math.floor((Math.random() * 4) + 1) + '.jpg');

// Hook up the function to the change button. jQuery is already included!
$("#calculate").click(onCalculatePressed);
