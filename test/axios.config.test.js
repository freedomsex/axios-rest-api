import Api from '../src';   
import Qs from 'qs';

describe('AXIOS Config', () => {

    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = {
            delay: 0,
            host: 'http://other.ru',
            prefix: 'api',
            version: 'v1',
            routing: {},
        }; 
        let config = {
            paramsSerializer(params) {
                return Qs.stringify(params, { arrayFormat: 'indices', encodeValuesOnly: true });
            },
        };
        $api = new Api(resources, config);
    });

    it('QS params', async () => {
        let params = {q: 1, a: {b: 1, c: 2}};
        await $api.res('some').load(params).catch(() => {});
        // console.log($api.getUri());
        // expect($api.lastAxiosConfig().paramsSerializer(params)).toEqual({q: 1, a: {b: 1, c: 2}}); 
    });
  
});