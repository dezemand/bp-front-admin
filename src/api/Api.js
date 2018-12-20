
import ApiRequest from './ApiRequest'
import * as EventEmitter from 'events'

export default class Api extends EventEmitter {
  onError = () => {};

  constructor () {
    super();
  }

  async listFee() {
    const req = new ApiRequest("GET", "/api/list/fee", null);
    const res = await req.send().catch(this.errorHandler.bind(this));
    return res.response.listFee;
  }

  async listBuy() {
    const req = new ApiRequest("GET", "/api/list/buy", null);
    const res = await req.send().catch(this.errorHandler.bind(this));
    return res.response.listBuy;
  }

  async status(uuid) {
    if(!uuid)
      throw new Error("No UUID");
    const req = new ApiRequest("GET", `/api/status/${uuid}`, null);
    const res = await req.send().catch(this.errorHandler.bind(this));
    return res.response.status;
  }

  async info(uuid) {
    if(!uuid)
      throw new Error("No UUID");
    const req = new ApiRequest("GET", `/api/info/${uuid}`, null);
    const res = await req.send().catch(this.errorHandler.bind(this));
    return res.response.info;
  }

  async remove(uuid) {
    if(!uuid)
      throw new Error("No UUID");
    const req = new ApiRequest("DELETE", `/api/request/${uuid}`, null);
    const res = await req.send().catch(this.errorHandler.bind(this));
    return res.response.updateStatus;
  }

  async updateState(uuid, state) {
    if(!uuid)
      throw new Error("No UUID");
    const req = new ApiRequest("PUT", `/api/request/${uuid}`, {state});
    const res = await req.send().catch(this.errorHandler.bind(this));
    return res.response.updateStatus;
  }

  errorHandler(e) {
    this.onError(e);
    console.log(e);
  }
}
