import Api from '../src';   
 
describe('Проверить авторизацию', () => {

    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = { }; 
        resources.users = { };
        $api = new Api(resources);
    });

    it('запрос пустой', () => { 
        expect($api.default()).toBeUndefined; 
        expect($api.default('key')).toBeUndefined;  
    }); 

    it('key', () => {   
        $api.default('key', 'value')
        expect($api.default('key')).toEqual('value'); 
    }); 
});