const { isBetween } = require("./Functions.js");
const DynamicMatrix = require("./DynamicMatrix.js");
class House {
  // x0, y0, x1, y1 - coordinates of the house border
  // args -
  // { x0: number, y0: number, x1: number, y1: number },{ x0: number, y0: number, x1: number, y1: number },...
  // or
  // [{ x0: number, y0: number, x1: number, y1: number },{ x0: number, y0: number, x1: number, y1: number },...]
  constructor(...args) {
    // Vertical edges of the house
    // { x: number, y: [number, number] }
    // Horizontal edges of the house
    // { y: number, x: [number, number] }
    this.edges = [];
    if (args[0][0]) {
      args = args[0];
    }
    if (
      args.every(
        (arg) =>
          arg.hasOwnProperty("x0") &&
          arg.hasOwnProperty("y0") &&
          arg.hasOwnProperty("x1") &&
          arg.hasOwnProperty("y1")
      )
    ) {
      args.forEach((arg) => {
        if (arg.x0 === arg.x1) {
          this.edges.push({ x: arg.x0, y: [arg.y0, arg.y1] });
        } else if (arg.y0 === arg.y1) {
          this.edges.push({ y: arg.y0, x: [arg.x0, arg.x1] });
        }
      });
    } else {
      throw new Error("Invalid arguments");
    }
  }

  isInHouse(x, y) {
    let vertical = this.edges.filter((edge) => typeof edge.x === "number");
    let horizontal = this.edges.filter((edge) => typeof edge.y === "number");
    if (
      vertical.some(
        (edge) => edge.x > x && isBetween(y, edge.y[0], edge.y[1])
      ) &&
      vertical.some(
        (edge) => edge.x < x && isBetween(y, edge.y[0], edge.y[1])
      ) &&
      horizontal.some(
        (edge) => edge.y > y && isBetween(x, edge.x[0], edge.x[1])
      ) &&
      horizontal.some(
        (edge) => edge.y < y && isBetween(x, edge.x[0], edge.x[1])
      )
    ) {
      return true;
    }
    return false;
  }

  draw() {
    let field = new DynamicMatrix();
    this.edges.forEach((edge) => {
      if (typeof edge.x === "number") {
        for (
          let y = Math.min(edge.y[0], edge.y[1]);
          y <= Math.max(edge.y[0], edge.y[1]);
          y++
        ) {
          field.set(edge.x, y, "#");
        }
      } else {
        for (
          let x = Math.min(edge.x[0], edge.x[1]);
          x <= Math.max(edge.x[0], edge.x[1]);
          x++
        ) {
          field.set(x, edge.y, "#");
        }
      }
    });
    console.log(field.join());
  }
}

module.exports = House;
