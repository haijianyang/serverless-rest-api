const assert = require('power-assert');
const servicePig = require('../../src/service/pig');
const chance = require('../helper/chance');

describe('service-pig-create', () => {
  it('new pig', async () => {
    const pigData = chance.pig();
    const pig = await servicePig.create(pigData);

    assert.deepEqual(pig.id, pigData.id);
    assert.deepEqual(pig.name, pigData.name);
  });
});

describe('service-pig-get', () => {
  beforeEach(async () => {
    this.pig = await servicePig.create(chance.pig());
  });

  it('none', async () => {
    const pig = await servicePig.get(chance.string());

    assert.deepEqual(pig, null);
  });

  it('get pig', async () => {
    const pig = await servicePig.get(this.pig.id);

    assert.deepEqual(pig.id, this.pig.id);
    assert.deepEqual(pig.name, this.pig.name);
  });
});
