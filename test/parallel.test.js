import Api from '../src';   
 
describe('Создание ресурсов', () => {
    let $api;
    beforeEach(() => { 
        let resources = [];
        resources.default = {
            delay: 0,
            host: 'http://127.0.0.1:8000',
            prefix: 'api',
            version: '',
        };
        $api = new Api(resources);
    });

    it('получить простой ресурс', async () => {
        for (let index = 0; index < 50; index++) {
            await $api.res('aame').get({cid: 2}).catch(() => {});
        }
        await $api.res('same').load({id: 1}).catch((e) => {
            // expect(e.request._currentUrl).toBe('http://some/api/v1/same?someId=5');  
            expect(e.request.path).toBe('/api/same?id=1');  
            
        });
        // expect($api.lastURL()).toBe('http://some/api/v1/same?id=3'); 
        // expect($api.lastAxiosConfig()).toBe({}); 
 
        // expect($api.adaptParams({id: 2})).toEqual({id: 2});
    });

});