const House = require("./House");

class Field {
  /*Array of strings that represent the field
    Each string represents a row
    Example:
    [
      "#####",
      "#   #",
      "#   #",
      "#   #",
      "#####"
    ]
  */
  field;
  houses = [];
  constructor(input) {
    this.field = input.map((row) =>
      row
        .split("")
        .map((x) => (x === "#" || x === " " ? x : " "))
        .join("")
    );
    console.log(this.field);
  }

  searchForHouses() {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        if (this.field[i][j] === "#" && !this.houses.some((house) => house.isInHouse(j, i))) {
          let house = new House();
        }
      }
    }
  }

  // startCoordinate - {x: number, y: number}
  searchHouseBorders(startCoordinate) {
    let currentCoordinate = {...startCoordinate};
    let house = new House();
    let isHorisontal = true;
    house.addCoordinates(currentCoordinate);
    while (true) {
      let next = this.searchForNext(currentCoordinate, isHorisontal);
      console.log(next);
      if (next === 0) {
        house.addCoordinates(currentCoordinate);
        isHorisontal = !isHorisontal;
        continue;
      }
      if (isHorisontal) {
        currentCoordinate.x += next;
      } else {
        currentCoordinate.y += next;
      }
      console.log(currentCoordinate, startCoordinate);
      if (currentCoordinate === startCoordinate) {
        break;
      }
    }
    return house;
  }

  // coordinate - {x: number, y: number}
  // isHorisontal - boolean
  searchForNext(coordinate, isHorisontal) {
    if (!isHorisontal) {
      if (this.field[coordinate.y + 1][coordinate.x] === "#") {
        return 1;
      } else if (this.field[coordinate.y - 1][coordinate.x] === "#") {
        return -1;
      } else {
        return 0;
      }
    } else {
      if (this.field[coordinate.y][coordinate.x + 1] === "#") {
        return 1;
      } else if (this.field[coordinate.y][coordinate.x - 1] === "#") {
        return -1;
      } else {
        return 0;
      }
    }
  }

  print() {
    console.log(this.field);
  }
}

module.exports = Field;