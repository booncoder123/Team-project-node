class Error {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(msg) {
    return new Error(400, msg);
  }

  static internal(msg) {
    return new Error(500, msg);
  }
}

export default Error;
