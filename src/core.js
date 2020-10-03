import _ from 'underscore';

import requests from './requests';

export default class core extends requests { 

  define(name, resource) {
    this.resources[name] = resource;
    return this;
  }

  extend(name, resource) {
    _.extend(this.resources[name], resource);
    return this;
  }

  default(key, val) {
    if (val !== undefined) {
      this.defaults[key] = val;
    }
    return this.defaults[key];
  }

  setDelay(sec) {
    this.wait = sec || 0;
    return this;
  }

  setHeaders(headers) { 
    if (headers) {
      _.defaults(this.config, { headers: {} });
      _.extend(this.config.headers, headers);
    }    
    return this;
  } 

  setBaseURL(url) {
    let base = url || this.defaults.baseURL || null;
    if (base) {
      this.config.baseURL = base;
    }   
    return this; 
  }

  isAuth() {
    return this.config.headers && this.config.headers.Authorization;
  }

  auth(key) {
    this.setAuthKey(key);
    return this;
  }

  saveAuthKey(key, name) {
    this.extend(name, {key});
    return this;
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
    return this;
  }

  dumpAxiosConfig() {
    return this.config;
  }

}
