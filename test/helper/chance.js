const Chance = require('chance');

class MsChance extends Chance {
  pig(data) {
    return Object.assign({
      id: `${Date.now()}`,
      name: this.string()
    }, data);
  }
}

module.exports = new MsChance();
