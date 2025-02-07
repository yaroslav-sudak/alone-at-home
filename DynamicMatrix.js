class DynamicMatrix {
  matrix;
  x;
  y;
  constructor() {
    this.matrix = [];
    this.x = this.y = 0;
  }

  set(x, y, value) {
    if (this.x <= x || this.y <= y) {
      this.x = x + 1;
      this.y = y + 1;
      for (let i = 0; i <= y; i++) {
        if (!this.matrix[i]) {
          this.matrix[i] = [];
        }
        for (let j = 0; j <= x; j++) {
          if (!this.matrix[i][j]) {
            this.matrix[i][j] = null;
          }
        }
      }
    }
    this.matrix[y][x] = value;
  }

  get(x, y) {
    return this.matrix[y][x];
  }

  join(rowJoinSymbol = "\n", columnJoinSymbol = "") {
    return this.matrix
      .map((row) => row.map((x) => x || " ").join(columnJoinSymbol))
      .join(rowJoinSymbol);
  }
}

module.exports = DynamicMatrix;
