import ApiError from './ApiError'

export default class ApiRequest {
  req = null;
  res = null;

  constructor (method, path, body) {
    this.method = method;
    this.path = path;
    this.body = body ? JSON.stringify(body) : null;
  }

  send () {
    return new Promise((resolve, reject) => {
      this.req = new XMLHttpRequest();
      this.req.onreadystatechange = () => {
        if(this.req.readyState === 1) {
          this.req.setRequestHeader("Content-Type", "application/json");
        } else if (this.req.readyState === 4) {
          // Parse JSON
          try {this.res = JSON.parse(this.req.responseText);}
          catch(e) {return reject(new ApiError(this.req, {}, ``));}

          // Check success
          if(!this.res.success)
            return reject(new ApiError(this.req, this.res, `Request not successful`));
          if(this.req.status !== 200)
            return reject(new ApiError(this.req, this.res, `Request status not ok`));

          // Resolve
          resolve(this.res);
        }
      }
      this.req.open(this.method, this.path, true);
      if(this.body) this.req.send(this.body); else this.req.send();
    });
  }


}
