(function() {

  // Separates the log file into separate blocks, depending
  // on the type of the log line (build, command, error, simple, debug and warning).
  // Each block is then colored according to the `log_lines.css` file.

  var logLineTypes = [
    'build',
    'command',
    'error',
    'simple',
    'debug',
    'warning'
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

    logLine = logLines[i];
    firstWord = logLine.split('\t')[0];

    // Search for specific words to get the line log type
    if ( logLine.indexOf("[ERROR]") >= 0 || logLine.indexOf("level=error") >= 0 || logLine.indexOf("level=fatal") >= 0) {
      logLineType = 'error';
    } else if ( logLine.indexOf("[DEBUG]") >= 0 || logLine.indexOf("level=debug") >= 0 ) {
      logLineType = 'debug';
    } else if ( logLine.indexOf("[INFO]") >= 0 || logLine.indexOf("level=info") >= 0 ) {
      logLineType = 'build';
    } else if ( logLine.indexOf("level=warning") >= 0 ) {
      logLineType = 'warning';
    } else {
      // If log line type could not be determined with the log msg, get the class to use depending on the first word
      if ( logLineTypes.indexOf(firstWord) >= 0 ){
        logLineType = firstWord;
      } else {
        logLineType = 'default';
      }
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
