
export default class ApiError extends Error {
  constructor (req, res, message) {
    super(`API_ERROR: ${message}`);
    this.req = req;
    this.res = res;
  }
}
