import _ from 'underscore';
import Core from './core';
import Router from './router';

export default class Api extends Core {
  constructor(resources) {
    super();
    this.resources = resources || [];
    this.defaults = {}; 
    this.router = new Router();
  }

  getConfig(name) {
    // this.name = name || 'default';
    const config = this.resources[name] || {};
    _.defaults(config, this.resources.default);
    // console.log('name', [name, config]);
    // console.log('default', this.resources.default);
    return config;
  }

  res(resource, apiName) {
    this.setApi(apiName || resource);
    return this.setResource(resource);
  }

  setApi(name) {
    let config = this.getConfig(name);
    this.host = config.host || '';
    const version = config.version || '';
    const prefix = config.prefix || '';

    this.setDelay(config.delay || 0);
    this.setConfig(this.root, config.key || '');

    this.router.init(this.host, prefix, version);
  }

  setResource(name) {
    let config = this.getConfig(name);
    this.router.setRouting(config.routing || {}, name);
    return this;
  }

  default(key, val) {
    if (val !== undefined) {
      this.defaults[key] = val;
    }
    return this.defaults[key];
  }

  baseURL() {
    return this.root;
  }

  lastURL() {
    return this.router.url;
  }

}
