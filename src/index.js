import _ from 'underscore';
import Builder from './builder';

export default class Api {
  constructor(resources, axiosConfig, omitEmptyParams) {
    this.resources = resources || [];
    this.defaults = {}; 
    this.axiosConfig = axiosConfig;
    this.omitEmptyParams = omitEmptyParams;
  }

  default(key, val) {
    if (val !== undefined) {
      this.defaults[key] = val;
    }
    return this.defaults[key];
  }

  define(name, resource) {
    this.resources[name] = resource;
    return this;
  }

  extend(name, resource) {
    _.extend(this.resources[name], resource);
    return this;
  }

  getConfig(name) { 
    const config = this.resources[name] || {}; 
    const copy = Object.assign({}, config);
    return _.defaults(copy, this.resources.default); 
  }

  res(resource, name) {
    let builder = new Builder(this); 
    builder.setApi(this.getConfig(name || resource));
    builder.setResource(this.getConfig(resource), resource);
    return builder;
  }
  
  auth(key, name) { 
    if (key) {
      if (name) {
        this.extend(name, {key});
      } else {
        this.default('key', key); 
      } 
    }
    return this;
  }
   
}
