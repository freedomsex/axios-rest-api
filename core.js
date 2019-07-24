import _ from 'underscore';

import requests from './requests';
import router from './router';

export default class core extends requests {
  setDelay(sec) {
    this.wait = sec ? sec * 1000 : 0;
    return this;
  }

  setRouting(routing, resource) {
    this.routing = {
      route: resource,
    };
    _.extend(this.routing, router, routing);
    return this;
  }

  setRoot(host, prefix, version) {
    const ver = version ? `${version}/` : '';
    const pre = prefix ? `${prefix}/` : '';
    this.root = `${host}/${pre}${ver}`;
    return this;
  }

  setConfig(url, key) {
    this.config = {
      baseURL: url || this.defaults.baseURL,
      headers: {
        Authorization: `Bearer ${key || this.defaults.key}`,
      },
    };
    return this;
  }

  setAuthKey(key) {
    _.extend(this.config.headers, {
      Authorization: `Bearer ${key}`,
    });
    this.config.key = key;
    return this;
  }

  setParams(params, url) {
    const result = url.replace(/\{(.*?)\}/gi, (match, token) => {
      const slug = params[token];
      delete params[token];
      return slug;
    });
    // console.log('url: ', [this.root, result, params]);
    this.config.params = params || {};
    return result;
  }

  setUrl(method, params, url) {
    let result;
    let {root} = this;
    if (this.isAbsolute(url)) {
      result = url;
      root = '';
    } else {
      const {route} = this.routing;
      if (url) {
        result = url;
      } else {
        const action = this.routing[method];
        result = route || '';
        if (result && action) {
          result = `${result}/${action}`;
        } else if (action) {
          result = action;
        }
      }
    }
    result = this.setParams(params, result);
    return root + result;
  }

  // eslint-disable-next-line
  isAbsolute(url) {
    const re = new RegExp('(www|://)');
    return re.test(url);
  }
}
