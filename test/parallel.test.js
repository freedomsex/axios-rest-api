import Api from '../src';   
 
describe('Создание ресурсов', () => {
    let $api;
    beforeEach(() => { 
        let resources = [];
        resources.default = {
            delay: 0,
            host: 'http://some',
            prefix: 'api',
            version: 'v1',
            routing: {},
        };
        $api = new Api(resources, {}, false);
    });

    it('получить простой ресурс', async () => {
        $api.res('aame').load({id: 1}).catch(() => {});
        $api.res('came');
        $api.res('same').load({id: 3}).catch(() => {});
        $api.res('same').get({id: 2}).catch(() => {});
        $api.res('same').load({someId: 5}).catch((e) => {
            expect(e.request._currentUrl).toBe('http://some/api/v1/same?someId=5');  
        });
        return 1;
        // expect($api.lastURL()).toBe('http://some/api/v1/same?id=3'); 
        // expect($api.lastAxiosConfig()).toBe({}); 
 
        // expect($api.adaptParams({id: 2})).toEqual({id: 2});
    });

});