import Api from '../src';   
 
describe('Проверить авторизацию', () => {
    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = {  }; 
        $api = new Api(resources);
    });

    it('запрос без ключа', () => {
        $api.res();
        expect($api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить ключ', () => {
        $api.setAuthKey('authkey');
        $api.res();
        expect($api.dumpAxiosConfig()).toEqual({headers: {
            Authorization: 'Bearer authkey',
        }}); // .toEqual({}); 
    }); 
});


describe('Авторизация по умолчанию', () => {
    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = {  
            key: 'authkey', 
        }; 
        resources.users = {
            key: 'somekey', 
        };
        $api = new Api(resources);
    });

    it('запрос по умолчанию', () => {
        $api.res();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer authkey'} }); 
    });

    it('запрос с другим ключем', () => {
        $api.res('users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer somekey'} }); 
    });

    it('установить на запрос', () => {
        let req;
        $api.setAuthKey('otherkey');
        req = $api.res('users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        req.load().catch(() => {}); // очистится
        $api.res('users')
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer somekey'} });
    });

    it('переписать', () => {
        let req;
        $api.setAuthKey('otherkey', 'users');
        req = $api.res('users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        req.load().catch(() => {}); // очистится
        $api.res('users')
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
    });
 
});

describe('Переписать по умолчанию', () => {
    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = { }; 
        resources.users = { };
        $api = new Api(resources);
    });

    it('запрос по умолчанию', () => {
        $api.res();
        expect($api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить на запрос', () => {
        let req;
        req = $api.res();
        $api.setAuthKey('otherkey');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        req.load().catch(() => {}); // очистится
        expect($api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить по умолчанию', () => {
        let req;
        req = $api.res();
        $api.setAuthKey('otherkey', 'default');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        req.load().catch(() => {}); // не очистится
        req = $api.res();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        // expect($api.default('key')).toEqual('otherkey'); 
    });

    it('сохранить по умолчанию', () => {
        let req;
        $api.saveAuthKey('otherkey', 'users');
        req = $api.res('save/data', 'users');
        // expect($api.getConfig('users')).toEqual();
        expect($api.isAuth()).toBeTruthy();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        req.load().catch(() => {}); // не очистится
        req = $api.res('delete', 'users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
    });

    it('обновление по умолчанию', () => {
        let req;
        req = $api.res();
        $api.saveAuthKey('somekey', 'default');
        expect($api.dumpAxiosConfig()).toEqual({});
        req = $api.res();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer somekey'} }); 
        req.load().catch(() => {}); // !!! ОЧИСТИЛСЯ !!!
        expect($api.dumpAxiosConfig()).toEqual({}); 

        $api.saveAuthKey('otherkey', 'default');
        req = $api.res();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        req.load().catch(() => {});
        req = $api.res();

        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
    });
 
});