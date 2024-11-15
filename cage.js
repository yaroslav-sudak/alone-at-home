const input = [
  "                 o      ",
  "    #####     #######   ",
  "    #   #######     #   ",
  "    #       x       #   ",
  "o   #             o #   ",
  "    #################   ",
];

class Game {
  elves = [];
  player;
  field;

  Game() {
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
        if (this.field[i][j] === "#" /* and not in other house */) {
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

class Entity {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player extends Entity {
  constructor(x, y) {
    super(x, y);
  }
}

class Elf extends Entity {
  constructor(x, y) {
    super(x, y);
  }
}

class House {
  // x - number, y - number
  // Array of coordinates of house ( [{x: 0, y: 0}, {x: 1, y: 0}, ...] )
  coordinates = [];

  House() {}
  // Add coordinates to house ( [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 0}, ...] )
  addCoordinates(...args) {
    if (
      args.every(
        (coordinate) =>
          typeof coordinate === "object" &&
          "x" in coordinate &&
          "y" in coordinate
      )
    ) {
      args.forEach((coordinate) => {
        let x = coordinate.x;
        let y = coordinate.y;
        this.coordinates.push({ x, y });
      });
    } else {
      throw new Error("Invalid coordinates");
    }
  }

  isInHouse(x, y) {
    let beforeHorizontalWall;
    let beforeVerticalWall;

    let afterVerticalWall = this.coordinates
      .sort(this.xSort)
      .find((coordinate) => coordinate.x > x);
    if (this.coordinates.indexOf(afterVerticalWall) % 2 === 0) {
      return false;
    } else {
      beforeVerticalWall =
        this.coordinates[this.coordinates.indexOf(afterVerticalWall) - 1];
    }
    let afterHorizontalWall = this.coordinates
      .sort(this.ySort)
      .find((coordinate) => coordinate.y > y);
    if (this.coordinates.indexOf(afterHorizontalWall) % 2 === 0) {
      return false;
    } else {
      beforeHorizontalWall =
        this.coordinates[this.coordinates.indexOf(afterHorizontalWall) - 1];
    }
    console.log(
      afterVerticalWall,
      beforeVerticalWall,
      afterHorizontalWall,
      beforeHorizontalWall
    );
    if (
      afterVerticalWall &&
      afterHorizontalWall &&
      beforeVerticalWall &&
      beforeHorizontalWall
    ) {
      return true;
    } else {
      return false;
    }
  }

  draw() {
    let field = [];
    let coordinates = this.coordinates.map((e) => e);
    coordinates.sort(this.ySort);
    for (let i = 0; i < coordinates[coordinates.length - 1].y; i++) {
      field.push([]);
    }
    coordinates.sort(this.xSort);
    let start = coordinates.shift();
    let saved = start;
    console.log(coordinates, field);
    while (coordinates.length > 0) {
      let next = coordinates.shift();
      if (next.x === saved.x) {
        for (let i = saved.y; i < next.y; i += Math.sign(next.y - saved.y)) {
          field[next.x][i] = "#";
        }
      } else if (next.y === saved.y) {
        for (let i = saved.x; i < next.x; i += Math.sign(next.x - saved.x)) {
          field[i][next.y] = "#";
        }
      }
    }
  }

  searchNearest(x, y) {
    let closest = null;
    let closestDistance = Infinity;
    this.coordinates.forEach((coordinate) => {
      if (coordinate.x === x || coordinate.y === y) {
        let distance = Math.abs(coordinate.x - x) + Math.abs(coordinate.y - y);
        if (distance < closestDistance) {
          closest = coordinate;
          closestDistance = distance;
        }
      }
    });
    return closest;
  }
}

let field = new Field(input);
console.log(field.searchHouseBorders({ x: 4, y: 1 }));

