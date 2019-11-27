const config = require('config');
const IORedis = require('ioredis');

module.exports = new IORedis(config.redis);
