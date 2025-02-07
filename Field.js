const Player = require("./Player.js");
const House = require("./House.js");
const Elf = require("./Elf.js");

class Field {
  player = null;
  house = null;
  elves = [];
  constructor(input) {
    let field = input.map((line) => line.split(""));
    this.field = field;
    for (let y = 0; y < field.length; y++) {
      for (let x = 0; x < field[y].length; x++) {
        if (field[y][x] === "#" && !this.house) {
          this.house = this.searchHouseBorders(x, y);
        } else if (field[y][x] === "o") {
          this.elves.push(new Elf(x, y));
        } else if (field[y][x] === "x") {
          this.player = new Player(x, y);
        }
      }
    }
  }

  searchHouseBorders(x, y) {
    let edges = [];
    let prev = { x: x, y: y };
    let next = { x: null, y: null };
    while (next.x !== x || next.y !== y) {
      next = this.horizontalFind(prev.x, prev.y);
      edges.push({ x0: prev.x, y0: prev.y, x1: next.x, y1: next.y });
      prev = next;
      next = this.verticalFind(prev.x, prev.y);
      edges.push({ x0: prev.x, y0: prev.y, x1: next.x, y1: next.y });
      prev = next;
    }
    return new House(edges);
  }

  horizontalFind(x, y) {
    let iterator;
    if (this.field[y][x - 1] && this.field[y][x - 1] === "#") {
      iterator = -1;
    } else if (this.field[y][x + 1] && this.field[y][x + 1] === "#") {
      iterator = 1;
    }

    while (this.field[y][x + iterator] && this.field[y][x + iterator] === "#") {
      x += iterator;
    }
    return { x, y };
  }

  verticalFind(x, y) {
    let iterator;
    if (this.field[y - 1][x] && this.field[y - 1][x] === "#") {
      iterator = -1;
    } else if (this.field[y + 1][x] && this.field[y + 1][x] === "#") {
      iterator = 1;
    }

    while (this.field[y + iterator] && this.field[y + iterator][x] === "#") {
      y += iterator;
    }

    return { x, y };
  }

  checkElvesInHouse() {
    return this.elves.some((elf) => this.house.isInHouse(elf.x, elf.y));
  }

  aloneAtHome() {
    if (this.checkElvesInHouse()) {
      console.log("Player is not alone at home");
    } else {
      console.log("Player is alone at home");
    }
  }
}

module.exports = Field;
