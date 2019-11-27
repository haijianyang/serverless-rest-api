module.exports = {
  aws: {
    accountId: '123456789012',
    region: 'us-east-1',
    role: 'lambda_basic_execution_gateway'
  },
  dynamodb: {
    port: 8000
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  server: {
    port: 3000
  },
  sls: {
    offline: { port: 3001 }
  },
  sqs: {
    pig: 'sqs-rest_pig-dev'
  },
  table: {
    pig: 'DevPig'
  }
};
