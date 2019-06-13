var error_strings = ['ERROR','[ERROR]','FailedCreate','level=error','level=fatal','result: Failed'];
var debug_strings = ['DEBUG', '[DEBUG]','level=debug'];
var info_strings = ['[INFO]','level=info'];
var warning_strings = ['WARNING','level=warning'];

function contains(target, pattern){
  var value = 0;
  pattern.forEach(function(word){
    value = value + target.includes(word);
  });
  return (value === 1)
}

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
    if ( firstWord === "command" ) {
      logLineType = 'command';
    } else if (contains(logLine, error_strings)) {
      logLineType = 'error';
    } else if (contains(logLine, debug_strings)) {
      logLineType = 'debug';
    } else if (contains(logLine, info_strings)) {
      logLineType = 'build';
    } else if (contains(logLine, warning_strings)) {
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

        if (logLineType === "command"){
          var cellDivText = document.createTextNode(lineContent[j].replace(/\\n/g,"\n"));
        } else {
          var cellDivText = document.createTextNode(lineContent[j]);
        }
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
