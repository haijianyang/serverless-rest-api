const assert = require('power-assert');
const chance = require('../helper/chance');
const { expect } = require('../helper/chai');
const servicePig = require('../../src/service/pig');

require('../helper/server');

describe('POST /pigs', () => {
  it('new pig', async () => {
    const pigData = chance.pig();

    const pig = await api().post({
      uri: '/pigs',
      body: pigData
    });

    assert(pig.id);
    assert.deepEqual(pig.name, pigData.name);
  });
});

describe('get /pigs/:id', () => {
  beforeEach(async () => {
    this.pig = await servicePig.create(chance.pig());
  });

  it('404', async () => {
    await expect(api().get(`/pigs/${Date.now()}`)).to.be.rejectedWith('Not Found');
  });

  it('return pig', async () => {
    const pig = await api().get({ uri: `/pigs/${this.pig.id}` });

    assert.deepEqual(pig.id, this.pig.id);
    assert.deepEqual(pig.name, this.pig.name);
  });
});
