(function() {

  // Separates the log file into separate blocks, depending
  // on the type of the log line (build, command, error, simple).
  // Each block is then colored according to the `log_lines.css` file.

  var logLineTypes = [
    'build',
    'command',
    'error',
    'simple'
  ];
  var body = document.body
  var logLines = body.innerText.split('\n');

  var currentLogLineType;
  var currentLogBlock;

  body.children[0].remove();

  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  for (var i = 0; i < logLines.length; ++i) {
    var row = document.createElement("tr");

    // Get the class to use depending on the first word
    logLine = logLines[i];
    firstWord = logLine.split('\t')[0];

    if (logLineTypes.indexOf(firstWord) >= 0){
      logLineType = firstWord;
    } else {
      logLineType = 'default';
    }

    var lineContent = logLine.split('\t');
    for (var j = 0; j < lineContent.length; ++j) {
      if (j == 1) {
        var cell = document.createElement("td");
        cell.className = "time";
        var cellText = document.createTextNode(lineContent[j]);
        cell.appendChild(cellText);
        row.appendChild(cell);

      } else if (j == 2) {
        var cell = document.createElement("td");
        var cellDiv = document.createElement("div");       
        cellDiv.className = logLineType;

        var cellDivText = document.createTextNode(lineContent[j]);
        cellDiv.appendChild(cellDivText);
        cell.appendChild(cellDiv);
        row.appendChild(cell);
      }
    }

    tblBody.appendChild(row);
  }

  tbl.appendChild(tblBody);
  body.appendChild(tbl);

})();
