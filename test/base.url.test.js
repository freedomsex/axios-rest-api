import Api from '../src';   
 
describe('Проверить авторизацию', () => {

    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = {
            delay: 0,
            host: 'http://-DEFAULT-',
            prefix: 'api',
            version: 'v1',
            routing: {},
        }; 
        $api = new Api(resources);
    });

    it('запрос без base', () => {
        $api.res();
        expect($api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить base', () => {
        $api.setBaseURL('baseurl');
        $api.res();
        expect($api.dumpAxiosConfig()).toEqual({baseURL: 'baseurl'}); 
    });

    it('установить auth & base ', () => {
        $api.setAuthKey('authkey');
        $api.setBaseURL('baseurl');
        $api.res();
        expect($api.dumpAxiosConfig()).toEqual({baseURL: 'baseurl', headers: {
            Authorization: 'Bearer authkey',
        }}); 
    });

});