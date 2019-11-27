class Response {
  static ok(data = 'OK', headers) {
    return this.json(200, data, headers);
  }

  static created(data = 'Created', headers) {
    return this.json(201, data, headers);
  }

  static badRequest(data = 'Bad Request', headers) {
    return this.json(400, data, headers);
  }

  static unauthorized(data = 'Unauthorized', headers) {
    return this.json(401, data, headers);
  }

  static notFound(data = 'Not Found', headers) {
    return this.json(404, data, headers);
  }

  static json(status, data, headers = {}) {
    const body = typeof data === 'string' ? { code: status, message: data } : { code: status, data };

    return ({
      statusCode: status,
      headers: Object.assign({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      }, headers),
      body: JSON.stringify(body)
    });
  }
}

module.exports = Response;
