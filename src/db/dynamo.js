const config = require('config');
const AWS = require('aws-sdk');

const dynamo = [undefined, 'test'].includes(process.env.NODE_ENV)
  ? new AWS.DynamoDB.DocumentClient({ region: 'localhost', endpoint: `http://localhost:${config.dynamodb.port}` })
  : new AWS.DynamoDB.DocumentClient(config.aws);

module.exports = dynamo;
