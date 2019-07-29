import _ from 'underscore';

import requests from './requests';

export default class core extends requests {
  setDelay(sec) {
    this.wait = sec ? sec * 1000 : 0;
    return this;
  }

  setConfig(url, key) {
    this.config = {
      baseURL: url || this.defaults.baseURL,
      headers: {
        Authorization: `Bearer ${key || this.defaults.key}`,
      },
    };
    return this;
  }

  setAuthKey(key) {
    _.extend(this.config.headers, {
      Authorization: `Bearer ${key}`,
    });
    this.config.key = key;
    return this;
  }

}
