var fs = require("fs");

//require all the controllers
var controllers = {};
var names = fs.readdirSync("./controllers/");

names.forEach((name) => {
  if (!name.match(/\.js$/)) return;
  if (name === "index.js") return;
  var controller = require("./" + name);

  controllers[name.replace(".js", "")] = controller;
});

module.exports = controllers;
