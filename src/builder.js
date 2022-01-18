import { defaults, extend } from 'underscore';
import Router from './router';
import Requests from './requests';

export default class Builder extends Requests  {
    constructor({defaults, axiosConfig, omitEmptyParams}) {
        super(axiosConfig, omitEmptyParams);
        this.name = 'default'; 
        this.config = {}; 
        this.defaults = defaults; 
        this.router = new Router();
    }

    setApi(config, isPublic) {
        this.router.init(
            config.host, 
            config.prefix, 
            config.version, 
            config.postfix
        ); 
        this.setDelay(config.delay);
        if (!this.isAuth() && !isPublic && config.authorized !== false) {
            this.auth(config.key);
        }
        return this; 
    }

    setResource(config, name) {
        this.name = name;
        this.router.setRouting(config.routing || {}, name);
        return this;
    }

    setSubResource(path) {
      this.router.setSubResource(path);
      return this;
    }

    setDelay(sec) {
      this.wait = sec || 0;
      return this;
    }

    setHeaders(headers) { 
      if (headers) {
        defaults(this.config, { headers: {} });
        extend(this.config.headers, headers);
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
        let authKey = key || this.defaults.key;
        if (authKey) {
            this.setHeaders({ Authorization: `Bearer ${authKey}` });  
        }
        return this;
    }

    public() {
      if (this.config.headers && this.config.headers.Authorization) {
        delete this.config.headers.Authorization;
      }
      return this;
    }

    baseURL() {
      return this.root;
    }
  
    lastURL() {
      return this.router.url;
    }

    setAxiosConfig(config) {
      extend(this.config, config);
      return this;
    }
 
    clear() {
      this.lastConfig = Object.assign({}, this.config);
      this.config = {};
      return this;
    }
  
    dumpAxiosConfig() {
      return this.config;
    }

    lastAxiosConfig() {
      return this.lastConfig;
    }
  

    // setConfig(url, key) {
    //   this.setBaseURL(url);
    //   this.setAuthKey(key); 
    //   return this;
    // }

    // getUri(config) {
    //   console.log(this.axiosInstance.getUri({}));
        
    //   // return this.axiosInstance.getUri(config || this.lastConfig);
    // }
   
}
