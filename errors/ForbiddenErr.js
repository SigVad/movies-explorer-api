class ForbiddenErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.name = this.constructor.name;
  }
}

module.exports = ForbiddenErr;
