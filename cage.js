const House = require("./House");
const input = [
  "                 o      ",
  "    #####     #######   ",
  "    #   #######     #   ",
  "    #       x       #   ",
  "o   #             o #   ",
  "    #################   ",
];

// let field = new Field(input);
// console.log(field.searchHouseBorders({ x: 4, y: 1 }));

let house = new House(
  {
    x0: 10,
    y0: 5,
    x1: 10,
    y1: 0,
  },
  {
    x0: 10,
    y0: 0,
    x1: 0,
    y1: 0,
  },
  {
    x0: 0,
    y0: 0,
    x1: 0,
    y1: 5,
  },
  {
    x0: 0,
    y0: 5,
    x1: 3,
    y1: 5,
  },
  {
    x0: 3,
    y0: 5,
    x1: 3,
    y1: 3,
  },
  {
    x0: 3,
    y0: 3,
    x1: 7,
    y1: 3,
  },
  {
    x0: 7,
    y0: 3,
    x1: 7,
    y1: 5,
  },
  {
    x0: 7,
    y0: 5,
    x1: 10,
    y1: 5,
  }
);

house.draw();
