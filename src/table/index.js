const config = require('config');

module.exports = {
  pigTable: {
    TableName: config.table.pig,
    AttributeDefinitions: [{
      AttributeName: 'id',
      AttributeType: 'S'
    }],
    KeySchema: [{
      AttributeName: 'id',
      KeyType: 'HASH'
    }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    }
  }
};
