import _ from 'underscore';
import Core from './core';

export default class Api extends Core {
  constructor(resources) {
    super();
    this.resources = resources || [];
    this.defaults = {};
  }

  res(resource) {
    return this.setResource(resource);
  }

  default(key, val) {
    if (val !== undefined) {
      this.defaults[key] = val;
    }
    return this.defaults[key];
  }

  setResource(name) {
    this.name = name || 'default';
    const config = this.resources[name] || {};
    _.defaults(config, this.resources.default);
    // console.log('name', [name, config]);
    // console.log('default', this.resources.default);

    this.host = config.host || '';
    const version = config.version || '';
    const prefix = config.prefix || '';

    this.setDelay(config.delay || 0);
    this.setRoot(this.host, prefix, version);
    this.setConfig(this.root, config.key || '');
    this.setRouting(config.routing || {}, name);
    return this;
  }

  baseURL() {
    return this.root;
  }
}
