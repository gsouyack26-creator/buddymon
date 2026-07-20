// Copies the game web assets into www/ for Capacitor to wrap.
var fs = require("fs");
var path = require("path");
var out = "www";
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
var files = ["index.html", "manifest.webmanifest", "sw.js"];
files.forEach(function(f){ if(fs.existsSync(f)) fs.copyFileSync(f, path.join(out, f)); });
if(fs.existsSync("icons")) fs.cpSync("icons", path.join(out, "icons"), { recursive: true });
console.log("build:web -> copied " + files.join(", ") + " + icons into " + out + "/");
