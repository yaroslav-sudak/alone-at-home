class Entity {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }
}

module.exports = Entity;