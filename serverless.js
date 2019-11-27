const config = require('config');
const tables = require('./src/table');

const env = config.util.getEnv('NODE_ENV');

const stage = ({
  development: 'dev',
  test: 'test',
  staging: 'staging',
  production: 'prod'
})[env];

const plugins = stage !== 'test'
  ? []
  : ['serverless-dynamodb-local', 'serverless-offline'];

module.exports = {
  service: 'serverless-rest-api',
  provider: {
    name: 'aws',
    runtime: 'nodejs10.x',
    role: `arn:aws:iam::${config.aws.accountId}:role/${config.aws.role}`,
    iamRoleStatements: [
      ...Object.keys(config.sqs).map(name => ({
        Effect: 'Allow',
        Action: ['sqs:SendMessage', 'sqs:GetQueueUrl', 'sqs:ListQueues'],
        Resource: `arn:aws:sqs:${config.aws.region}:${config.aws.accountId}:${config.sqs[name]}`
      })),
      ...Object.keys(tables).map(name => ({
        Effect: 'Allow',
        Action: ['dynamodb:Query', 'dynamodb:Scan', 'dynamodb:GetItem', 'dynamodb:PutItem', 'dynamodb:UpdateItem', 'dynamodb:DeleteItem'],
        Resource: `arn:aws:dynamodb:${config.aws.region}:*:table/${name}`
      }))
    ],
    stage,
    environment: { NODE_ENV: env }
  },

  custom: {
    'serverless-offline': { port: config.sls.offline.port },
    dynamodb: {
      stages: ['test'],
      start: {
        port: config.dynamodb.port,
        inMemory: true,
        migrate: true
      }
    }
  },

  functions: {
    createPig: {
      handler: 'src/handler/pig.create',
      events: [{
        http: { path: '/api/pigs', method: 'POST' }
      }]
    },
    getPig: {
      handler: 'src/handler/pig.get',
      events: [{
        http: { path: '/api/pigs/{id}', method: 'GET' }
      }]
    }
  },

  resources: {
    Resources: {
      ...Object.keys(tables).reduce((obj, name) => (Object.assign(obj,
        {
          [name]: {
            Type: 'AWS::DynamoDB::Table',
            Properties: tables[name]
          }
        })), {}),
      ...Object.keys(config.sqs).reduce((obj, name) => (Object.assign(obj,
        {
          [name]: {
            Type: 'AWS::SQS::Queue',
            Properties: { QueueName: config.sqs[name] }
          }
        })), {})
    }
  },

  plugins,

  package: {
    exclude: [
      '.nyc_output/**',
      'bin/**',
      'coverage/**',
      'test/**',
      '.eslintignore',
      '.eslintrc',
      '.nycrc',
      'README.md',
      'test.js',
      'tables/**',
      '.dynamodb/**'
    ]
  }
};
