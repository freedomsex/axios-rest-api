import _ from 'underscore';
import axios from 'axios';

export default class requests {
  constructor(config, omitEmpty) {
    this.omitEmpty = (omitEmpty === true);
    this.axiosInstance = axios.create(config || {});
    this.CancelToken = axios.CancelToken; 
  }

  // eslint-disable-next-line
  axios() {
    return this.axiosInstance;
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
    return this.request('patch', 'patch', data || {}, params, url, wait);
  }

  option(params, url, wait) {
    return this.request('option', 'option', null, params, url, wait);
  }

  axiosData(data, method) {
    return data || ['post', 'put', 'patch'].includes(method);
  }

  adaptParams(params) {
    if (!this.omitEmpty) {
      return params;
    } 
    function prune(object) {
      object = _.mapObject(object, value => {
        if (_.isObject(value)) {
          if (_.isEmpty(value)) {
            return null;
          }
          return prune(value);
        }
        return value;
      });
      return _.pick(object, value => value !== '' && !_.isNull(value) && !_.isNaN(value) && !_.isUndefined(value));
    }
    return prune(params);
  }

  async request(method, action, data, params, url, wait) {
    let result = null;
    const URI = this.router.setUrl(action, params, url);
    // this.config.params = this.router.params; 
    this.config.params = this.adaptParams(this.router.params);
    this.currentRequest = this.CancelToken.source();
    this.config.cancelToken = this.currentRequest.token;
    if (this.axiosData(data, method)) {
      result = this.axiosInstance[method](URI, data, this.config);
    } else {
      result = this.axiosInstance[method](URI, this.config);
    }
    result = result.finally(() => {
      this.clear(); // index.js 
    });
    await this.delay(wait);
    return result; 
  }

  current() {
    this.currentRequest;
  }

  cancel() {
    this.currentRequest.cancel();
  }

  async delay(wait) {
    let seconds = wait || this.wait || 0;
    if (seconds < this.wait) {
      seconds = this.wait;
    }
    if (!seconds) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      _.delay(resolve, seconds * 1000);
    });
  }
}
