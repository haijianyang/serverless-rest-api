const config = require('config');
const dynamo = require('../db/dynamo');

class Pig {
  static async create(pigData) {
    const item = Object.assign({ id: `${Date.now()}` }, pigData);

    await dynamo.put({
      TableName: config.table.pig,
      Item: item
    }).promise();

    return item;
  }

  static async get(id) {
    const query = await dynamo.get({
      Key: { id },
      TableName: config.table.pig
    }).promise();

    return query.Item || null;
  }
}

module.exports = Pig;
