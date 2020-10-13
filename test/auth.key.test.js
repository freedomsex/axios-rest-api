import Api from '../src';   
 
describe('Проверить авторизацию', () => {
    let $api;
    beforeEach(() => { 
        let resources = []; 
        resources.default = {  }; 
        $api = new Api(resources);
    });

    it('запрос без ключа', () => {
        let api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить ключ', () => {
        let api = $api.res();
        api.auth('authkey');
        expect(api.dumpAxiosConfig()).toEqual({headers: {
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
        let api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer authkey'} }); 
    });

    it('запрос с другим ключем', () => {
        let api = $api.res('users');
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer somekey'} }); 
    });

    it('установить на запрос', async () => {
        let api = $api.res('users');
        api.auth('otherkey');
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        await api.load().catch((e) => {}); // очистится
        api = $api.res('users');
        expect(api.dumpAxiosConfig()).toEqual({ headers: { Authorization: 'Bearer somekey' } });
        return 1;
    });

    it('переписать', async () => {
        let api = $api.res('users');
        $api.auth('otherkey', 'users');
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer somekey'} }); 
        await api.load().catch((e) => {});
        expect(api.dumpAxiosConfig()).toEqual({}); 
        api = $api.res('users');
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
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
        let api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить на запрос', async () => {
        let api = $api.res();
        api.auth('otherkey');
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        await api.load().catch((e) => {}); // очистится
        expect(api.dumpAxiosConfig()).toEqual({}); 
    });

    it('установить по умолчанию', async () => { 
        $api.auth('otherkey', 'default');
        let api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        await api.load().catch((e) => {}); // не очистится
        api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        // expect($api.default('key')).toEqual('otherkey'); 
    });

    it('сохранить по умолчанию', async () => {
        $api.auth('otherkey', 'users');
        let api = $api.res('save/data', 'users');
        // expect($api.getConfig('users')).toEqual();
        expect(api.isAuth()).toBeTruthy();
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        await api.load().catch((e) => {}); // не очистится
        api = $api.res('delete', 'users');
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
    });

    it('обновление по умолчанию', async () => { 
        let api = $api.res();
        $api.auth('somekey', 'default');
        expect(api.dumpAxiosConfig()).toEqual({});
        api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer somekey'} }); 
        await api.load().catch((e) => {}); // !!! ОЧИСТИЛСЯ !!!
        expect(api.dumpAxiosConfig()).toEqual({}); 

        $api.auth('otherkey', 'default');
        api = $api.res();
        expect(api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} }); 
        await api.load().catch((e) => {});

        api = $api.res();
        // expect($api.dumpAxiosConfig()).toEqual({ headers: {Authorization: 'Bearer otherkey'} });
        // expect($api.resources).toEqual({});
    });
 
});