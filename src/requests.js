import _ from 'underscore';
import axios from 'axios';

export default class requests {
  // eslint-disable-next-line
  axios() {
    return axios;
  }

  get(params, url, wait) {
    return this.request('get', 'get', null, params, url, wait);
  }

  load(params, url, wait) {
    return this.request('get', 'load', null, params, url, wait);
  }

  cget(params, url, wait) {
    return this.request('get', 'cget', null, params, url, wait);
  }

  send(params, url, wait) {
    return this.request('get', 'send', null, params, url, wait);
  }

  post(data, params, url, wait) {
    return this.request('post', 'post', data, params, url, wait);
  }

  save(data, params, url, wait) {
    return this.request('post', 'save', data, params, url, wait);
  }

  new(data, params, url, wait) {
    return this.request('post', 'new', data, params, url, wait);
  }

  edit(data, params, url, wait) {
    return this.request('post', 'edit', data, params, url, wait);
  }

  remove(data, params, url, wait) {
    return this.request('post', 'remove', data, params, url, wait);
  }

  delete(params, url, wait) {
    return this.request('delete', 'delete', null, params, url, wait);
  }

  put(data, params, url, wait) {
    return this.request('put', 'put', data, params, url, wait);
  }

  patch(data, params, url, wait) {
    return this.request('patch', 'patch', data, params, url, wait);
  }

  option(params, url, wait) {
    return this.request('option', 'option', null, params, url, wait);
  }

  request(method, action, data, params, url, wait) {
    let result = null;
    const URI = this.router.setUrl(action, params, url);
    this.config.params = this.router.params;
    if (data) {
      result = axios[method](URI, data, this.config);
    } else {
      result = axios[method](URI, this.config);
    }
    this.clear(); // index.js
    return this.delay(result, wait);
  }

  delay(result, wait) {
    let msec = wait || this.wait || 0;
    if (msec < this.wait) {
      msec = this.wait;
    }
    if (msec == 0 || typeof Promise === 'undefined') {
      return result;
    }
    return new Promise((resolve) => {
      _.delay(resolve, msec, result);
    });
  }
}
