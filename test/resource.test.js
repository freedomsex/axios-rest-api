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
        let api = $api.res('auth');
        await api.load().catch(() => {});
        expect(api.lastURL()).toBe('http://auth/api/v1/auth'); 
    });

    it('запросить ресурс по id', async () => { 
        let api = $api.res('auth');
        await api.get({id: 1234}).catch(() => {});
        expect(api.lastURL()).toBe('http://auth/api/v1/auth/1234'); 
    });

    it('запросить ресурс по URI', async () => { 
        let api = $api.res('auth/popular', 'auth');
        await api.get({id: 1234}).catch(() => {});
        expect(api.lastURL()).toBe('http://auth/api/v1/auth/popular/1234'); 
    });

    it('запросить ресурс user по URI', async () => { 
        let api = $api.res('user/popular', 'user');
        await api.get({id: 1234}).catch(() => {});
        expect(api.lastURL()).toBe('http://user/prefix/api/v1/user/popular/1234'); 
    });

    it('запросить дефолтный ресурс комментариев по URI', async () => { 
        let api = $api.res('comments/popular');
        await api.get({id: 1234}).catch(() => {});
        expect(api.lastURL()).toBe('http://-DEFAULT-/api/v1/comments/popular/1234'); 
    });

    it('запросить ресурс на несуществующий апи', async () => { 
        let api = $api.res('auth', 'mailer');
        await api.get({id: 1234}).catch(() => {});
        expect(api.lastURL()).toBe('http://-DEFAULT-/api/v1/auth/1234'); 
    });

    it('запросить ресурс api', async () => { 
        let api = $api.res('popular', 'auth');
        await api.get({id: 1234}).catch(() => {});
        expect(api.lastURL()).toBe('http://auth/api/v1/popular/1234'); 
    });

    // it('запросить ресурс query', () => { 
    //     $api.res('popular', 'auth').load({id: 1234, sort: 'desc'}).catch(() => {});
    //     expect($api.dumpAxiosConfig()).toBe('http://auth/api/v1/popular?id=1234&sort=desc'); 
    // });
});