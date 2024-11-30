const Player = require("./Player");
const Field = require("./Field");
const Elf = require("./Elf");

class Game {
  elves = [];
  player;
  field;

  constructor() {
    this.field = new Field(input);
    this.field = input.forEach(row, (indexY) => {
      row.forEach(element, (indexX) => {
        if (element === "o") {
          this.elves.push(new Elf(indexX, indexY));
        } else if (element === "x") {
          this.player = new Player(indexX, indexY);
        }
      });
    });
  }
}

module.exports = Game;