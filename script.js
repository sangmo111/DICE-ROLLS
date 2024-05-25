function getRandomInteger(lower, upper) {
  //R = parseInt(rnd * (upper - (lower -1)) + lower
  var multiplier = upper - (lower - 1);
  var rnd = parseInt(Math.random() * multiplier) + lower;

  return rnd;
}

function rollDiceAndRun() {
  getresults(); // Call the getresults() function first
  run(); // Then call the run() function
  rotateDice(); // Rotate the dice every time it's clicked
}

function getresults() {
  rolls = inputContainer.rolls.value;
  dicenum = inputContainer.dicenum.value;
  if (inputContainer.rolls.value == "" || inputContainer.dicenum.value == "") {
    //if no value entered
    alert(
      "Please pick the number of dice and how many times you want to roll it to continue"
    );
  } else {
    //else run the program to get results
    numRolls = Number(rolls);
    numDice = Number(dicenum);
    //sets the vaule of amount of rolls needed

    rolldie();

    fcleartable();
    median();
    mean();

    fdoubles();
    ftriples();
    fonetable();
    ftwotable();
    fthreetable();

    mode();

    empty();
  }
}

function fcleartable() {
  for (var i = 6; i < statsTable.rows.length; i + 1) {
    statsTable.deleteRow(i);
  }
  //deletes all rows in the table
  statsTable = document.getElementById("statstable");
}
function empty() {
  results = [];
  sortedresults = [];
  //empties the results
}

function rolldie() {
  document.getElementById("dice").className = "rolldice";
  for (var i = 0; i < numRolls; i++) {
    var diceRoll = getRandomInteger(1, 6);

    newRow = diceTable.insertRow();
    newCell = newRow.insertCell();
    newCell.innerHTML = "Roll " + (i + 1);

    newCell = newRow.insertCell();
    newCell.innerHTML = diceRoll;
    results.push(diceRoll);
    sortedresults.push(diceRoll);

    if (dicenum == 1) {
      //adds two empty cells if only one die is rolled
      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
    } else {
      //adds a second cell otherwise because it will be for two or three dies
      var secondroll = getRandomInteger(1, 6);
      newCell = newRow.insertCell();
      newCell.innerHTML = secondroll;
      results.push(secondroll);
      sortedresults.push(secondroll);
      if (dicenum == 2) {
        //if there are 2 dies, thent there would be a third empty cell
        newCell = newRow.insertCell();
        newCell.innerHTML = " ";
      }
      if (dicenum == 3) {
        //if there are three dies, the third cell will be full
        var thirdroll = getRandomInteger(1, 6);
        newCell = newRow.insertCell();
        newCell.innerHTML = thirdroll;
        results.push(thirdroll);
        sortedresults.push(thirdroll);
      }
    }
  }
  console.log("the value of results is " + results);
}

function mean() {
  var sum = 0;
  var mean = 0;
  for (var i = 0; i < results.length; i++) {
    sum += results[i];
  }
  mean = (sum / results.length).toFixed(2);
  console.log("the value of the mean is " + mean);

  document.getElementById("mean").innerHTML = mean;
}
function median() {
  var sorted = sortedresults.sort();
  console.log("the value of the sorted is " + sorted);
  if (
    sorted.length % 2 ==
    0
    // is even
  ) {
    // average of two middle numbers
    console.log("boo");
    med = (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  } else {
    // is odd
    // middle number only
    med = sorted[(sorted.length - 1) / 2];
    console.log("yay" + (sorted.length - 1) / 2);
  }
  console.log("the value of the median is " + med);
  document.getElementById("median").innerHTML = med;
}
function mode() {
  var max = 0;
  modes = [];
  //console.log("the frequencies are " + modesfreq);
  for (i = 1; i < modesfreq.length; i++) {
    if (modesfreq[i] > max) {
      max = modesfreq[i];
      //console.log("the max is " + max);
    }
  }
  for (i = 1; i < modesfreq.length; i++) {
    if (modesfreq[i] == max) {
      modes.push(i);
    }
  }
  //console.log("the value of the mode is " + modes);
  document.getElementById("mode").innerHTML = modes;
}

function fdoubles() {
  var double = 0;
  if (dicenum == 2) {
    for (i = 0; i < results.length - 1; i += 2) {
      number1 = results[i];
      //console.log("the first number is " + number1);
      number2 = results[i + 1];
      // console.log("the 2nd number is " + number2);
      if (number1 == number2) {
        double++;
      }
    }
  }
  if (dicenum == 3) {
    for (i = 0; i < results.length - 1; i += 3) {
      number1 = results[i];
      // console.log("the first number is " + number1);
      number2 = results[i + 1];
      //console.log("the 2nd number is " + number2);
      number3 = results[i + 2];
      //console.log("the 3rd number is " + number3);
      if (
        (number1 == number2 && number1 != number3) ||
        (number2 == number3 && number2 != number1) ||
        (number1 == number3 && number1 != number2)
      ) {
        double++;
      }
    }
  }
  document.getElementById("doubles").innerHTML = double;
}
function ftriples() {
  var triple = 0;
  if (dicenum == 3) {
    for (i = 0; i < results.length - 1; i += 3) {
      number1 = results[i];
      // console.log("the first number is " + number1);
      number2 = results[i + 1];
      //  console.log("the 2nd number is " + number2);
      number3 = results[i + 2];
      // console.log("the 3rd number is " + number3);
      if (number1 == number2 && number1 == number3) {
        triple = +1;
      }

      //  document.getElementById("demo").innerHTML = "Found " + x + " cells in the first tr";
      // document.getElementById("triple").innerHTML = triple;
    }
  }
  document.getElementById("triples").innerHTML = triple;
}

//  for (i = 0; i < results.length; i += 1) {
//if ((results[i] = results[i + 1]) && results[i] != results[i + 2]) {

//  number= results[i];
//  freqdouble.push(Number(i));
//  document.getElementById("doubles").innerHTML = number;
// document.getElementById("double").innerHTML = double;

function fonetable() {
  if (numDice == 1) {
    frequencies = [0, 0, 0, 0, 0, 0, 0];
    modesfreq = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < 6; i++) {
      newRow = statsTable.insertRow();
      newCell = newRow.insertCell();

      newCell.innerHTML = "Frequency of  " + (i + 1);

      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
    }
    for (i = 6; i < 12; i++) {
      var table = document.getElementById("statstable");
      if (table.rows[i].cells[1].innerHTML) {
        table.rows[i].cells[1].innerHTML = 0;
      }
    }

    for (i = 0; i < numRolls; i++) {
      var sum = results[i];
      for (x = 1; x < 7; x++) {
        if (sum == x) {
          frequencies[sum]++;
          modesfreq[sum]++;
          //adds one to the frequency of that number
          table.rows[x + 5].cells[1].innerHTML = frequencies[sum];
        }
      }
    }
  }
}
function ftwotable() {
  //this array sets the value of the frequency for each number to zero
  if (numDice == 2) {
    frequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    modesfreq = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 1; i < 12; i++) {
      //draws table for frequency
      newRow = statsTable.insertRow();
      newCell = newRow.insertCell();

      newCell.innerHTML = "Frequency of  " + (i + 1);

      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
    }

    for (i = 6; i < 17; i++) {
      var table = document.getElementById("statstable");
      //adds a zero to all frequencies as a base
      if (table.rows[i].cells[1].innerHTML) {
        table.rows[i].cells[1].innerHTML = 0;
      }
    }

    for (i = 0; i < results.length - 1; i += 2) {
      //numrolls times two bc two dies are rolled, i is added by two bc freq is for every two numbers

      var sum = results[i] + results[i + 1];
      //  console.log("the sum is " + sum);

      var table = document.getElementById("statstable");

      for (x = 2; x < 13; x++) {
        if (sum == x) {
          frequencies[sum]++;
          //adds one to the frequency of that number
          table.rows[x + 4].cells[1].innerHTML = frequencies[sum];
        }
      }
    }
    //modes frequency list
    for (i = 0; i < modesfreq.length; i++) {
      var num = results[i];
      for (x = 1; x < 7; x++) {
        if (num == x) {
          modesfreq[num]++;
        }
      }
    }
  }
}
function fthreetable() {
  if (numDice == 3) {
    frequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    modesfreq = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 2; i < 18; i++) {
      newRow = statsTable.insertRow();
      newCell = newRow.insertCell();

      newCell.innerHTML = "Frequency of  " + (i + 1);

      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
    }
    for (i = 6; i < 22; i++) {
      var table = document.getElementById("statstable");
      if (table.rows[i].cells[1].innerHTML) {
        table.rows[i].cells[1].innerHTML = 0;
      }
    }
    for (i = 0; i < numRolls * 3; i += 3) {
      var num = results[i] + results[i + 1] + results[i + 2];
      //  console.log("num is " + num);
      var table = document.getElementById("statstable");
    }
    for (i = 0; i < numRolls * 3; i += 3) {
      var sum = results[i] + results[i + 1] + results[i + 2];
      for (x = 3; x < 19; x++) {
        if (sum == x) {
          frequencies[sum]++;
          //adds one to the frequency of that number
          table.rows[x + 3].cells[1].innerHTML = frequencies[sum];
        }
      }
    }
    for (i = 0; i < modesfreq.length; i++) {
      //   console.log("the initial freq is" + modesfreq);
      var num = results[i];
      for (x = 1; x < 7; x++) {
        if (num == x) {
          modesfreq[num]++;
        }
      }
    }
  }

  console.log("the value of numdice is " + numDice);
}

function run() {
  // retrieve the element
  element = document.getElementById("dice");

  // reset the transition by...
  document.getElementById("dice").addEventListener(
    "click",
    function (e) {
      e.preventDefault;

      // removing the class
      element.classList.remove("rolldice");

      void element.offsetWidth;

      //re-adding the class
      element.classList.add("rolldice");
    },
    false
  );
}

function reset() {
  // Clear radio button selection
  var radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(function (radioButton) {
    radioButton.checked = false;
  });

  // Clear text input value
  var rollsInput = document.querySelector('input[name="rolls"]');
  rollsInput.value = "";

  // Clear dice table
  var diceTable = document.getElementById("dicetable");
  diceTable.innerHTML = '<th colspan="4">Cumulative results</th>' +
    '<tr><th>Roll</th><th>Dice 1</th><th>Dice 2</th><th>Dice 3</th></tr>';

  // Clear stats table
  var statsTable = document.getElementById("statstable");
  statsTable.innerHTML = '<th colspan="2">Statistics for roll</th>' +
    '<tr><th>Mean</th><td id="mean"></td></tr>' +
    '<tr><th>Median</th><td id="median"></td></tr>' +
    '<tr><th>Mode(s)</th><td id="mode"></td></tr>' +
    '<tr><th>Frequency of Doubles</th><td id="doubles"></td></tr>' +
    '<tr><th>Frequency of Triples</th><td id="triples"></td></tr>' +
    '<tr><td>Frequency of 1</td><td type="number" id="1"></td></tr>' +
    '<tr><td>Frequency of 2</td><td type="number" id="2"></td></tr>' +
    '<tr><td>Frequency of 3</td><td type="number" id="3"></td></tr>' +
    '<tr><td>Frequency of 4</td><td type="number" id="4"></td></tr>' +
    '<tr><td>Frequency of 5</td><td type="number" id="5"></td></tr>' +
    '<tr><td>Frequency of 6</td><td type="number" id="6"></td></tr>';
}
