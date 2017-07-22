/* 
Loading a file via Node.JS
Pulled from mihai at 
https://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-object-into-server-memory
*/

// Synchronously
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('file', 'utf8'));


// Asynchronously
var fs = require('fs');
var obj;
fs.readFile('file', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
});