import Api from '../src';   
 
describe('Создание ресурсов', () => {

    
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
    
        resources.user = {
            host: 'http://user',
            prefix: 'prefix/api',
        };
    
        resources.auth = {
            host: 'http://auth',
        };
        $api = new Api(resources);
    });

    it('получить простой ресурс', async () => {
        await $api.res('auth').load().catch(() => {});
        expect($api.lastURL()).toBe('http://auth/api/v1/auth'); 
    });

    it('запросить ресурс по id', async () => { 
        await $api.res('auth').get({id: 1234}).catch(() => {});
        expect($api.lastURL()).toBe('http://auth/api/v1/auth/1234'); 
    });

    it('запросить ресурс по URI', async () => { 
        await $api.res('auth/popular', 'auth').get({id: 1234}).catch(() => {});
        expect($api.lastURL()).toBe('http://auth/api/v1/auth/popular/1234'); 
    });

    it('запросить ресурс user по URI', async () => { 
        await $api.res('user/popular', 'user').get({id: 1234}).catch(() => {});
        expect($api.lastURL()).toBe('http://user/prefix/api/v1/user/popular/1234'); 
    });

    it('запросить дефолтный ресурс комментариев по URI', async () => { 
        await $api.res('comments/popular').get({id: 1234}).catch(() => {});
        expect($api.lastURL()).toBe('http://-DEFAULT-/api/v1/comments/popular/1234'); 
    });

    it('запросить ресурс на несуществующий апи', async () => { 
        await $api.res('auth', 'mailer').get({id: 1234}).catch(() => {});
        expect($api.lastURL()).toBe('http://-DEFAULT-/api/v1/auth/1234'); 
    });

    it('запросить ресурс api', async () => { 
        await $api.res('popular', 'auth').get({id: 1234}).catch(() => {});
        expect($api.lastURL()).toBe('http://auth/api/v1/popular/1234'); 
    });

    // it('запросить ресурс query', () => { 
    //     $api.res('popular', 'auth').load({id: 1234, sort: 'desc'}).catch(() => {});
    //     expect($api.dumpAxiosConfig()).toBe('http://auth/api/v1/popular?id=1234&sort=desc'); 
    // });
});