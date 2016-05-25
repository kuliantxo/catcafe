/* Executed every time the "Calculate Change" button is pressed. This should do any necessary
** validation, call calculateChange, and populate the DOM
*/
var onCalculatePressed = function(e) {
  e.preventDefault();

  // ---
  // Add your hooks, call to calculateChange, and DOM manipulations here
  // ---
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

  return changeOwed;
};

// Hook up the function to the change button. jQuery is already included!
$("#calculate").click(onCalculatePressed);
