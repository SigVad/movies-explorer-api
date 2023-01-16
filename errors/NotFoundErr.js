class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = this.constructor.name;
  }
}

module.exports = NotFoundErr;
