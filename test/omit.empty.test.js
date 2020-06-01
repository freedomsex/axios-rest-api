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

    it('object', () => {
        $api.res('some').load({q: 1, a: {b: 1, c: 2}});
        expect($api.lastAxiosConfig().params).toEqual({q: 1, a: {b: 1, c: 2}}); 
    });

    it('empty object', () => {
        $api.res('some').load({q: 1, a: {}});
        expect($api.lastAxiosConfig().params).toEqual({q: 1}); 
    });

    it('null', () => {
        $api.res('some').load({q: 1, a: null});
        expect($api.lastAxiosConfig().params).toEqual({q: 1}); 
    });

    it('object with null', () => {
        $api.res('some').load({q: 1, a: {b: 1, c: null}});
        expect($api.lastAxiosConfig().params).toEqual({q: 1, a: {b: 1}}); 
        $api.res('some').load({q: null, a: {b: 1, c: 2}});
        expect($api.lastAxiosConfig().params).toEqual({a: {b: 1, c: 2}}); 
    });

    it('empty array', () => {
        $api.res('some').load({q: 1, a: []});
        expect($api.lastAxiosConfig().params).toEqual({q: 1}); 
    });

    it('all empty', () => {
        $api.res('some').load({q: null, a: {}, c: ''});
        expect($api.lastAxiosConfig().params).toEqual({}); 
    });
  
});