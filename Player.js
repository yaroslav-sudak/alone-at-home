const Entity = require("./Entity.js");

class Player extends Entity {
  constructor(x, y) {
    super(x, y);
  }
}

module.exports = Player;