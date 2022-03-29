class ErrorService {
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

  static forBidden(msg) {
    return new Error(403, msg);
  }
}

export default ErrorService;
