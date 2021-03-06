import Api from '../src';   
 
describe('Omit Empty:', () => {

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

        };
        $api = new Api(resources, config, true);
    });

    it('object', async () => {
        let api = $api.res('some');
        await api.load({q: 1, a: {b: 1, c: 2}}).catch(() => {});
        expect(api.lastAxiosConfig().params).toEqual({q: 1, a: {b: 1, c: 2}}); 
    });

    it('empty object', async () => {
        let api = $api.res('some');
        await api.load({q: 1, a: {}}).catch(() => {});
        expect(api.lastAxiosConfig().params).toEqual({q: 1}); 
    });

    it('null', async () => {
        let api = $api.res('some');
        await api.load({q: 1, a: null}).catch(() => {});
        expect(api.lastAxiosConfig().params).toEqual({q: 1}); 
    });

    it('object with null', async () => {
        let api = $api.res('some');
        await api.load({q: 1, a: {b: 1, c: null}}).catch(() => {});
        expect(api.lastAxiosConfig().params).toEqual({q: 1, a: {b: 1}}); 
        await api.load({q: null, a: {b: 1, c: 2}}).catch(() => {});
        expect(api.lastAxiosConfig().params).toEqual({a: {b: 1, c: 2}}); 
    });

    it('empty array', async () => {
        let api = $api.res('some');
        await api.load({q: 1, a: []}).catch(() => {});
        expect(api.lastAxiosConfig().params).toEqual({q: 1}); 
    });

    it('all empty', async () => {
        let api = $api.res('some');
        await api.load({q: null, a: {}, c: ''}).catch(() => {});
        expect(api.lastAxiosConfig().params).toEqual({}); 
    });
  
});