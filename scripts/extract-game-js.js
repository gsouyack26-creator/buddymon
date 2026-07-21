// Extracts the embedded <script>...</script> body from index.html so it
// can be linted as a standalone file (index.html itself isn't valid JS).
// Writes to .lint/game.js (gitignored).
var fs = require("fs");
var path = require("path");

var html = fs.readFileSync("index.html", "utf8");
var m = html.match(/<script>([\s\S]*)<\/script>/);
if (!m) {
  console.error("extract-game-js: no <script> block found in index.html");
  process.exit(1);
}

var outDir = ".lint";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "game.js"), m[1]);
console.log("extract-game-js: wrote " + m[1].length + " chars to " + outDir + "/game.js");
