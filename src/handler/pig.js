
const Response = require('../lib/response');
const servicesPig = require('../service/pig');

class Pig {
  static async create(event) {
    const body = JSON.parse(event.body);
    const { name } = body;

    if (!name) {
      return Response.badRequest();
    }

    const pig = await servicesPig.create({ name });

    return Response.created(pig);
  }

  static async get(event) {
    const { id } = event.pathParameters;

    if (!id) {
      return Response.badRequest();
    }

    const pig = await servicesPig.get(id);

    return pig ? Response.ok(pig) : Response.notFound();
  }
}

module.exports = Pig;
