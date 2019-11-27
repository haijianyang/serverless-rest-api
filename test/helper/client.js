const rp = require('request-promise');
const config = require('config');

const request = rp.defaults({
  json: true,
  followRedirect: false,
  transform: (body, response, resolveWithFullResponse) => {
    if (resolveWithFullResponse) {
      return response;
    }

    if (response.headers['content-type'] === 'application/json') {
      return JSON.parse(body);
    }

    return body.data || body.message || body;
  }
});

class ApiRequest {
  constructor(options) {
    this.options = options;
  }
}

['get', 'post', 'delete', 'patch', 'put'].forEach((method) => {
  ApiRequest.prototype[method] = function (options) {
    const opts = typeof options === 'string'
      ? Object.assign({}, this.options, { uri: `http://127.0.0.1:${config.server.port}/api${options}` })
      : Object.assign({}, this.options, options, { uri: `http://127.0.0.1:${config.server.port}/api${options.uri}` });
    opts.qs = Object.assign({}, this.options.qs, options.qs);
    opts.body = Object.assign({}, this.options.body, options.body);

    return request[method](opts);
  };
});

module.exports = options => new ApiRequest(options || {});
