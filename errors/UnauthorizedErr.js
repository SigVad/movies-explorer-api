class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.name = this.constructor.name;
  }
}

module.exports = UnauthorizedErr;
