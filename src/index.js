import { defaults, extend } from 'underscore';
import Builder from './builder';

export default class Api {
  constructor(resources, axiosConfig, omitEmptyParams) {
    this.resources = resources || [];
    this.defaults = {}; 
    this.config = {}; 
    this.axiosConfig = axiosConfig;
    this.omitEmptyParams = omitEmptyParams;
    this.builder;
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
    extend(this.resources[name], resource);
    return this;
  }

  getConfig(name) { 
    const config = this.resources[name] || {}; 
    const copy = Object.assign({}, config);
    return defaults(copy, this.resources.default); 
  }

  res(resource, name, isPublic) {
    this.builder = new Builder(this); 
    this.config = this.getConfig(name || resource);
    this.builder.setApi(this.config, isPublic);
    this.builder.setResource(this.getConfig(resource), resource);
    return this.builder;
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

  public() {
    this.builder.public();
    return this.builder;
  }

  private() {
    this.builder.private(this.config);
    return this.builder;
  }
   
}
