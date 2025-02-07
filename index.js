const House = require("./House.js");
const Field = require("./Field.js");
const input = [
  "                 o     o",
  "    #####     #######   ",
  "    #   #######    o#   ",
  "    #       x       #   ",
  "o   #               #o  ",
  "    #################   ",
];

let field = new Field(input);
field.aloneAtHome();
