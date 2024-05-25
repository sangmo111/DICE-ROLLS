// Function to generate a random integer between 'lower' and 'upper' (inclusive)
function getRandomInteger(lower, upper) {
  // Formula: R = parseInt(rnd * (upper - (lower - 1)) + lower)
  var multiplier = upper - (lower - 1);
  var rnd = parseInt(Math.random() * multiplier) + lower;
  return rnd;
}

// Function to roll the dice and execute necessary functions
function rollDiceAndRun() {
  getresults(); // Call the getresults() function first
  run(); // Then call the run() function
  rotateDice(); // Rotate the dice every time it's clicked
}

// Function to retrieve input values and initiate result generation
function getresults() {
  rolls = inputContainer.rolls.value;
  dicenum = inputContainer.dicenum.value;
  if (inputContainer.rolls.value == "" || inputContainer.dicenum.value == "") {
    // If no value entered, show an alert
    alert("Please pick the number of dice and how many times you want to roll it to continue");
  } else {
    // Otherwise, proceed with result generation
    numRolls = Number(rolls);
    numDice = Number(dicenum);
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

// Function to clear all rows in the stats table
function fcleartable() {
  for (var i = 6; i < statsTable.rows.length; i + 1) {
    statsTable.deleteRow(i);
  }
}

// Function to empty the results arrays
function empty() {
  results = [];
  sortedresults = [];
}

// Function to roll the dice and populate the results table
function rolldie() {
  // Add rolling animation to the dice
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
      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
    } else {
      var secondroll = getRandomInteger(1, 6);
      newCell = newRow.insertCell();
      newCell.innerHTML = secondroll;
      results.push(secondroll);
      sortedresults.push(secondroll);
      if (dicenum == 2) {
        newCell = newRow.insertCell();
        newCell.innerHTML = " ";
      }
      if (dicenum == 3) {
        var thirdroll = getRandomInteger(1, 6);
        newCell = newRow.insertCell();
        newCell.innerHTML = thirdroll;
        results.push(thirdroll);
        sortedresults.push(thirdroll);
      }
    }
  }
}

// Function to calculate the mean of dice rolls
function mean() {
  var sum = 0;
  var mean = 0;
  for (var i = 0; i < results.length; i++) {
    sum += results[i];
  }
  mean = (sum / results.length).toFixed(2);
  document.getElementById("mean").innerHTML = mean;
}

// Function to calculate the median of dice rolls
function median() {
  var sorted = sortedresults.sort();
  var med;
  if (sorted.length % 2 == 0) {
    med = (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  } else {
    med = sorted[(sorted.length - 1) / 2];
  }
  document.getElementById("median").innerHTML = med;
}

// Function to calculate the mode of dice rolls
function mode() {
  var max = 0;
  modes = [];
  for (i = 1; i < modesfreq.length; i++) {
    if (modesfreq[i] > max) {
      max = modesfreq[i];
    }
  }
  for (i = 1; i < modesfreq.length; i++) {
    if (modesfreq[i] == max) {
      modes.push(i);
    }
  }
  document.getElementById("mode").innerHTML = modes;
}

// Function to calculate the frequency of doubles
function fdoubles() {
  var double = 0;
  if (dicenum == 2) {
    for (i = 0; i < results.length - 1; i += 2) {
      if (results[i] == results[i + 1]) {
        double++;
      }
    }
  }
  if (dicenum == 3) {
    for (i = 0; i < results.length - 1; i += 3) {
      if ((results[i] == results[i + 1] && results[i] != results[i + 2]) ||
        (results[i + 1] == results[i + 2] && results[i + 1] != results[i]) ||
        (results[i] == results[i + 2] && results[i] != results[i + 1])) {
        double++;
      }
    }
  }
  document.getElementById("doubles").innerHTML = double;
}

// Function to calculate the frequency of triples
function ftriples() {
  var triple = 0;
  if (dicenum == 3) {
    for (i = 0; i < results.length - 1; i += 3) {
      if (results[i] == results[i + 1] && results[i] == results[i + 2]) {
        triple++;
      }
    }
  }
  document.getElementById("triples").innerHTML = triple;
}

// Function to update frequency table for one die
function fonetable() {
  if (numDice == 1) {
    // Reset frequencies and modes frequencies arrays
    frequencies = [0, 0, 0, 0, 0, 0, 0];
    modesfreq = [0, 0, 0, 0, 0, 0, 0];
    // Update frequency table
    for (var i = 0; i < 6; i++) {
      newRow = statsTable.insertRow();
      newCell = newRow.insertCell();
      newCell.innerHTML = "Frequency of  " + (i + 1);
      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
    }
    // Reset frequencies in the stats table
    for (i = 6; i < 12; i++) {
      var table = document.getElementById("statstable");
      if (table.rows[i].cells[1].innerHTML) {
        table.rows[i].cells[1].innerHTML = 0;
      }
    }
    // Calculate frequencies
    for (i = 0; i < numRolls; i++) {
      var sum = results[i];
      for (x = 1; x < 7; x++) {
        if (sum == x) {
          frequencies[sum]++;
          modesfreq[sum]++;
          table.rows[x + 5].cells[1].innerHTML = frequencies[sum];
        }
      }
    }
  }
}

// Function to update frequency table for two dice
function ftwotable() {
  if (numDice == 2) {
    frequencies = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    modesfreq = [0, 0, 0, 0, 0, 0, 0];
    for (var i = 1; i < 12; i++) {
      newRow = statsTable.insertRow();
      newCell = newRow.insertCell();
      newCell.innerHTML = "Frequency of  " + (i + 1);
      newCell = newRow.insertCell();
      newCell.innerHTML = " ";
    }
    for (i = 6; i < 17; i++) {
      var table = document.getElementById("statstable");
      if (table.rows[i].cells[1].innerHTML) {
        table.rows[i].cells[1].innerHTML = 0;
      }
    }
    for (i = 0; i < results.length - 1; i += 2) {
      var sum = results[i] + results[i + 1];
      var table = document.getElementById("statstable");
      for (x = 2; x < 13; x++) {
        if (sum == x) {
          frequencies[sum]++;
          table.rows[x + 4].cells[1].innerHTML = frequencies[sum];
        }
      }
    }
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

// Function to update frequency table for three dice
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
      var table = document.getElementById("statstable");
    }
    for (i = 0; i < numRolls * 3; i += 3) {
      var sum = results[i] + results[i + 1] + results[i + 2];
      for (x = 3; x < 19; x++) {
        if (sum == x) {
          frequencies[sum]++;
          table.rows[x + 3].cells[1].innerHTML = frequencies[sum];
        }
      }
    }
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

// Function to handle rolling animation of the dice
function run() {
  element = document.getElementById("dice");
  document.getElementById("dice").addEventListener(
    "click",
    function (e) {
      e.preventDefault;
      element.classList.remove("rolldice");
      void element.offsetWidth;
      element.classList.add("rolldice");
    },
    false
  );
}

// Function to reset the form and tables
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
