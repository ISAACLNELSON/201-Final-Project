'use strict';

var SCORE_DATA = 'SCORE_DATA';

var tableContents = document.getElementById('scores');

var renderTitleRow = function (tableContents) {
  var tr = document.createElement('tr');
  var userNames = document.createElement('td');
  userNames.textContent = (' Player Names ');
  tr.append(userNames);
  var td = document.createElement('td');
  td.textContent = (' Games Won / Games Lost ');
  tr.append(td);
  tableContents.append(tr);
};

var render = function (tableContents, userData) {
  var tr = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.textContent = userData.name;
  tr.append(nameCell);

  var matchCount = document.createElement('td');
  matchCount.textContent = userData.winLossHistory;
  tr.append(matchCount);
  tableContents.append(tr);
};

if (localStorage.getItem(SCORE_DATA) !== null) {
  var jsonData = localStorage.getItem(SCORE_DATA);
  var dataForHighScores = JSON.parse(jsonData);
} else {
  dataForHighScores = [];
}

renderTitleRow(tableContents);

for (var i = 0; i < dataForHighScores.length; i++) {
  render(tableContents, dataForHighScores[i]);
}
