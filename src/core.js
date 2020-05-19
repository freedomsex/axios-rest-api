import _ from 'underscore';

import requests from './requests';

export default class core extends requests { 

  define(name, resource) {
    this.resources[name] = resource;
  }

  extend(name, resource) {
    _.extend(this.resources[name], resource);
  }

  default(key, val) {
    if (val !== undefined) {
      this.defaults[key] = val;
    }
    return this.defaults[key];
  }

  setDelay(sec) {
    this.wait = sec ? sec * 1000 : 0;
    return this;
  }

  setHeaders(headers) { 
    if (headers) {
      _.defaults(this.config, { headers: {} });
      _.extend(this.config.headers, headers);
    }    
  } 

  setBaseURL(url) {
    let base = url || this.defaults.baseURL || null;
    if (base) {
      this.config.baseURL = base;
    }    
  }

  isAuth() {
    return this.config.headers && this.config.headers.Authorization;
  }

  saveAuthKey(key, name) {
    this.extend(name, {key});
  }

  setAuthKey(key, name) {
    let authKey = key || this.defaults.key;
    if (authKey) {
      this.setHeaders({ Authorization: `Bearer ${authKey}` });  
    }
    if (name) {
      this.saveAuthKey(authKey, name); 
    }
    return this;
  }

  // setConfig(url, key) {
  //   this.setBaseURL(url);
  //   this.setAuthKey(key); 
  //   return this;
  // }

  setAxiosConfig(config) {
    _.extend(this.config, config);
  }

  dumpAxiosConfig() {
    return this.config;
  }

}
