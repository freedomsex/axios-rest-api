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
        let api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить base', () => {
        let api = $api.res();
        api.setBaseURL('baseurl');
        expect(api.dumpAxiosConfig()).toEqual({baseURL: 'baseurl'}); 
    });

    it('установить auth & base ', () => {
        let api = $api.res();
        api.auth('authkey');
        api.setBaseURL('baseurl');
        expect(api.dumpAxiosConfig()).toEqual({baseURL: 'baseurl', headers: {
            Authorization: 'Bearer authkey',
        }}); 
    });

});