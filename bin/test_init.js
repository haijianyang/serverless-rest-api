const redis = require('../src/db/redis');

(async () => {
  const tasks = [redis.flushdb()];

  await Promise.all(tasks);

  process.exit(0);
})();
