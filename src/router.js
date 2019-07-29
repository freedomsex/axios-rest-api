import _ from 'underscore';
import routes from './assets/routes';

export default class Router {
  constructor() {
    this.root = '/';
    this.url = '';
    this.routing = routes;
    this.params = {};
  }

  init(host, prefix, version) {
    const ver = version ? `${version}/` : '';
    const pre = prefix ? `${prefix}/` : '';
    this.root = `${host}/${pre}${ver}`;
    return this; 
  }

  setRouting(routing, resource) {
    this.routing = {
      route: resource,
    };
    _.extend(this.routing, routes, routing);
    return this;
  }
 
  setParams(params, url) {
    const result = url.replace(/\{(.*?)\}/gi, (match, token) => {
      const slug = params[token];
      delete params[token];
      return slug;
    });
    // console.log('url: ', [this.root, result, params]);
    this.params = params || {};
    return result;
  }

  getUrlPath(method) {
    let result;  
    const {route} = this.routing;
    const action = this.routing[method];
    result = route || '';
    if (result && action) {
      result = `${result}/${action}`;
    } else if (action) {
      result = action;
    }
    return result;
  }

  setUrl(method, params, url) {
    let result;
    let {root} = this;
    if (this.isAbsolute(url)) {
      root = '';
      result = url;
    } else {
      if (url) {
        result = url;
      } else { 
        result = this.getUrlPath(method);
      }
    }
    result = this.setParams(params, result);
    this.url = root + result;
    return this.url;
  }

  // eslint-disable-next-line
  isAbsolute(url) {
    const re = new RegExp('(www|://)');
    return re.test(url);
  }
}