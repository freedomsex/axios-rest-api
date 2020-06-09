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

    it('установить на запрос', async () => {
        let req;
        $api.setAuthKey('otherkey');
        req = $api.res('users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        await req.load().catch((e) => {}); // очистится
        $api.res('users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: { Authorization: 'Bearer somekey' } });
        return 1;
    });

    it('переписать', async () => {
        let req;
        $api.setAuthKey('otherkey', 'users');
        req = $api.res('users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        await req.load().catch((e) => {}); // очистится
        $api.res('users')
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        return 1;
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

    it('установить на запрос', async () => {
        let req;
        req = $api.res();
        $api.setAuthKey('otherkey');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        await req.load().catch((e) => {}); // очистится
        expect($api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить по умолчанию', async () => {
        let req;
        req = $api.res();
        $api.setAuthKey('otherkey', 'default');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        await req.load().catch((e) => {}); // не очистится
        req = $api.res();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        // expect($api.default('key')).toEqual('otherkey'); 
    });

    it('сохранить по умолчанию', async () => {
        let req;
        $api.saveAuthKey('otherkey', 'users');
        req = $api.res('save/data', 'users');
        // expect($api.getConfig('users')).toEqual();
        expect($api.isAuth()).toBeTruthy();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        await req.load().catch((e) => {}); // не очистится
        req = $api.res('delete', 'users');
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
    });

    it('обновление по умолчанию', async () => {
        let req;
        req = $api.res();
        $api.saveAuthKey('somekey', 'default');
        expect($api.dumpAxiosConfig()).toEqual({});
        req = $api.res();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer somekey'} }); 
        await req.load().catch((e) => {}); // !!! ОЧИСТИЛСЯ !!!
        expect($api.dumpAxiosConfig()).toEqual({}); 

        $api.saveAuthKey('otherkey', 'default');
        req = $api.res();
        expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        await req.load().catch((e) => {});
        req = $api.res();

        // expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        // expect($api.resources).toEqual({});
    });
 
});