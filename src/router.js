import { extend } from 'underscore';
import routes from './assets/routes';

export default class Router {
  constructor() {
    this.root = '/';
    this.url = '';
    this.routing = routes;
    this.params = {};
    this.subresource;
    this.subId;
  }

  init(host, prefix, version, postfix) {
    const ver = version ? `${version}/` : '';
    const pre = prefix ? `${prefix}/` : '';
    const post = postfix ? `${postfix}/` : '';
    this.root = `${host}/${pre}${ver}${post}`;
    this.subresource = null;
    this.subId = null;
    return this; 
  }

  setRouting(routing, resource) {
    this.routing = {
      route: resource,
    };
    extend(this.routing, routes, routing);
    return this;
  }
 
  setParams(params, url) {
    const result = url.replace(/\{(.*?)\}/gi, (match, token) => {
      const slug = params[token];
      delete params[token];
      return slug;
    });
    if (params && params.subId) {
      this.setSubId(subId);
      delete params.subId;
    }
    // console.log('url: ', [this.root, result, params]);
    this.params = params || {};
    return result;
  }

  setSubId(subId) {
    if (subId) {
      this.subId = subId;
    } 
  }

  setSubResource(path, subId) {
    this.setSubId(subId);
    this.subresource = path;
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
    if (this.subresource) {
      result = `${result}/${this.subresource}`;
      if (this.subId) {
        result = `${result}/${this.subId}`;
      } 
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