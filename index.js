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
// console.log(field.searchHouseBorders({ x: 4, y: 1 }));

// let house = new House(
//   { x0: 0, y0: 0, x1: 5, y1: 0 },
//   { x0: 5, y0: 0, x1: 5, y1: 2 },
//   { x0: 5, y0: 2, x1: 10, y1: 2 },
//   { x0: 10, y0: 2, x1: 10, y1: 0 },
//   { x0: 10, y0: 0, x1: 15, y1: 0 },
//   { x0: 15, y0: 0, x1: 15, y1: 7 },
//   { x0: 15, y0: 7, x1: 10, y1: 7 },
//   { x0: 10, y0: 7, x1: 10, y1: 5 },
//   { x0: 10, y0: 5, x1: 5, y1: 5 },
//   { x0: 5, y0: 5, x1: 5, y1: 7 },
//   { x0: 5, y0: 7, x1: 0, y1: 7 },
//   { x0: 0, y0: 7, x1: 0, y1: 0 }
// );

// house.draw();
