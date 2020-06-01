import _ from 'underscore';
import Core from './core';
import Router from './router';

export default class Api extends Core {
  constructor(resources, axiosConfig, omitEmptyParams) {
    super(axiosConfig, omitEmptyParams);
    this.resources = resources || [];
    this.defaults = {}; 
    this.config = {}; 
    this.lastConfig = {}; 
    this.router = new Router();
  }
 
  clear() {
    this.lastConfig = Object.assign({}, this.config);
    this.config = {};
  }

  res(resource, apiName) {
    this.setApi(apiName || resource);
    return this.setResource(resource);
  }

  getConfig(name) { 
    const config = this.resources[name] || {}; 
    const copy = Object.assign({}, config);
    return _.defaults(copy, this.resources.default); 
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

  // getUri(config) {
  //   console.log(this.axiosInstance.getUri({}));
    
  //   // return this.axiosInstance.getUri(config || this.lastConfig);
  // }

  lastAxiosConfig() {
    return this.lastConfig;
  }

}
