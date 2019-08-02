import _ from 'underscore';
import Core from './core';
import Router from './router';

export default class Api extends Core {
  constructor(resources) {
    super();
    this.resources = resources || [];
    this.defaults = {}; 
    this.config = {}; 
    this.router = new Router();
  }
 
  clear() {
    this.config = {};
  }

  res(resource, apiName) {
    this.setApi(apiName || resource);
    return this.setResource(resource);
  }

  getConfig(name) { 
    const config = this.resources[name] || {}; 
    return _.defaults(config, this.resources.default); 
  }

  setApi(name) {
    let config = this.getConfig(name);
    this.router.init(
      config.host, 
      config.prefix, 
      config.version
    ); 
    this.setDelay(config.delay);
    if (!this.isAuth()) {
      this.setAuthKey(config.key);
    }   
  }

  setResource(name) {
    let config = this.getConfig(name);
    this.router.setRouting(config.routing || {}, name);
    return this;
  }

  baseURL() {
    return this.root;
  }

  lastURL() {
    return this.router.url;
  }

}
