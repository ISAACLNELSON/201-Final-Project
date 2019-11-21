
var renderTitleRow = function (tableContents) {
  // var tableContents = document.getElementById('scores');
  var tr = document.createElement('tr');
  var userNames = document.createElement('td');
  userNames.textContent = (' Squires Names ');
  tr.append(userNames);
  var td = document.createElement('td');
  td.textContent = (' Squires Games Won / Squires Games Played ');
  tr.append(td);
  tableContents.append(tr);
};

var SCORE_DATA = 'SCORE_DATA';

var render = function (tableContents, userData) {
  var tr = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.textContent = userData.name;
  tr.append(nameCell);
  var matchCount = document.createElement('td');
  matchCount.textContent = userData.winLossHistory;
  tr.append(matchCount);
  console.log(this);
  tableContents.append(tr);
};

var tableContents = document.getElementById('scores');

var jsonData = localStorage.getItem(SCORE_DATA);
var dataForHighScores = JSON.parse(jsonData);
renderTitleRow(tableContents);

for (var i = 0; i < dataForHighScores.length; i++) {
  render(tableContents, dataForHighScores[i]);
}
