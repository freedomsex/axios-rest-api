import Api from '../src';   
 
describe('Проверить заголовки', () => {
    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = {  }; 
        $api = new Api(resources);
    }); 

    it('установить ключ', () => {
        let api = $api.res();
        api.auth('authkey');
        api.setHeaders({content: 'first'});
        expect(api.dumpAxiosConfig()).toEqual({headers: {
            Authorization: 'Bearer authkey',
            content: 'first',
        }});
    });
});
