class House {
  // x0, y0, x1, y1 - number
  // Array of coordinates of house edges [{x0: 0, y0: 0, x1: 1, y1: 0}, ...]
  edges = [];

  constructor(...args) {
    this.addEdges(...args);
  }

  // Add edge to house [{x0: 0, y0: 0, x1: 1, y1: 0}, ...]
  addEdges(...args) {
    if (
      args.every(
        (coordinate) =>
          typeof coordinate === "object" &&
          "x0" in coordinate &&
          "y0" in coordinate &&
          "x1" in coordinate &&
          "y1" in coordinate
      )
    ) {
      args.forEach((coordinate) => {
        let x0 = coordinate.x0;
        let y0 = coordinate.y0;
        let x1 = coordinate.x1;
        let y1 = coordinate.y1;
        this.edges.push({ x0, y0, x1, y1 });
      });
    } else {
      throw new Error("Invalid coordinates");
    }
  }

  isInHouse(x, y) {
    this.edges.forEach((edge) => {
      // Find all vertical edges with x coordinate greater than x
      let verticalEdges = edge.filter((e) => e.x0 == e.x1 && e.x0 > x);
      // Find all horizontal edges with y coordinate greater than y
      let horizontalEdges = edge.filter((e) => e.y0 == e.y1 && e.y0 > y);
      if (verticalEdges.length % 2 == 1 && horizontalEdges.length % 2 == 1) {
        return true;
      } else {
        return false;
      }
    });
  }

  draw() {
    let field = [];
    let maxY = this.edges[0].y0;
    let maxX = this.edges[0].x0;
    this.edges.forEach((edge) => {
      if (edge.x0 > maxX) {
        maxX = edge.x0;
      }
      if (edge.y0 > maxY) {
        maxY = edge.y0;
      }
    });

    for (let i = 0; i <= maxY; i++) {
      field[i] = " ".repeat(maxX + 1);
    }

    this.edges.forEach((edge) => {
      if (edge.x0 == edge.x1) {
        // If edge is vertical
        let max = Math.max(edge.y0, edge.y1);
        let min = Math.min(edge.y0, edge.y1);
        for (let i = min; i <= max; i++) {
          field[i] =
            field[i].slice(0, edge.x0) + "#" + field[i].slice(edge.x0 + 1);
        }
      } else if (edge.y0 == edge.y1) {
        // If edge is horizontal
        let max = Math.max(edge.x0, edge.x1);
        let min = Math.min(edge.x0, edge.x1);
        for (let i = min; i <= max; i++) {
          field[edge.y0] =
            field[edge.y0].slice(0, i) + "#" + field[edge.y0].slice(i + 1);
        }
      }
    });
    console.log(field);
  }

  // searchNearest(x, y) {
  //   let closest = null;
  //   let closestDistance = Infinity;
  //   this.coordinates.forEach((coordinate) => {
  //     if (coordinate.x === x || coordinate.y === y) {
  //       let distance = Math.abs(coordinate.x - x) + Math.abs(coordinate.y - y);
  //       if (distance < closestDistance) {
  //         closest = coordinate;
  //         closestDistance = distance;
  //       }
  //     }
  //   });
  //   return closest;
  // }
}

module.exports = House;
