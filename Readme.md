# REST обертка для axios/axios

Простая обертка для популярного HTTP клиента на javascript. Необходима для упрощения запросов к REST api из фронтенд клиента. Добавляет также функцию задержки выполнения запроса для тестирования отзывчивости и интуитивности интерфейса пользователя. Есть два варианта применения библиотеки. Когда у вас единственный сервер API по умолчанию или когда у вас несколько разных серверов/сервисов API. В начале речь идет об использовании единственного сервера.

Зависит от `axios` и `underscore` - внешние зависимости. Их нужно подключить отдельно. Либо установить в проекте либо подключить отдельно в HTML для браузера.

## Как работает

Просто создайте переменную для работы с API и используйте её где вам это необходимо. Экземпляр класса может быть глобальным или расширять возможности другой библиотеки, фреймворка. Создавался для использования в приложениях VUE расширяемых через плагин или `Vue.prototype.$api = api;`.

```javascript
import Api from 'axios-rest-api';

var api = new Api();
// res() - возвращает предустановленный ресурс. В данном случае с пустым конфигом
// null - параметры запроса
// данный вариант вызова возможен, но наименее привлекателен
api.res().load(null, 'https://www.google.com?q=123').then((response) => {
  // ... вызов гугла только как пример
})
.catch((e) => {
  // ... скорее всего вы получите 405 ошибку
});

// Здесь параметры запроса уже вынесены из URL в параметры вызова метода
api.res().load({q: 123}, 'https://www.google.com');

// Здесь и параметры убраны, но и сам URL отсутствует
api.res('google').load({q: 123}); // URL вынесен в конфигурацию, описание ниже
```

## Методы запросов

Помимо стандартных *get* и *post* имеются не каноничные *cget, load, save, new, edit, remove*. Кроме прочего, *get* подразумевает наличие ID ресурса в качестве обязательного параметра запроса по умолчанию, ведь это библиотека для запросов к REST API. Когда вам понадобится просто запросить URL без праметров, используйте метод `load(null, url)` как в примере выше или сконфигурируйте свой роутер запросов.

Когда вам нужно делать простые запросы GET/POST к серверу, вам не нужна обертка над axios, тогда просто используйте axios.

## Настройка

Подразумевает установку значений по умолчанию для большинства запросов, таких как *базовый URL* и *шаблоны запросов*(роутер). У вас будет либо **единственный ресурс по умолчанию**, либо список ресурсов, которые затем необходимо передать в конструктор класса. Конфигурирование URL запросов полностью вынесено в настройки именно для удобства и простоты использования. Хотя писать полные или относительные URL запросов в методах вам никто не запрещает.

```javascript
import Api from 'axios-rest-api';

const resources = [];

resources.default = {
  host: 'http://127.0.0.1',
  prefix: 'api',
};

resources.users = {
  routing: {
    cget: 'popular',
  },
};

var api = new Api(resources);
api.res('users').load(); // GET http://127.0.0.1/api/users
api.res('users').cget(); // GET http://127.0.0.1/api/users/popular
api.res('users').get({id: 1}); // GET http://127.0.0.1/api/users/1  
```

```javascript
// Resource config
resources.some = {
  host: 'http://127.0.0.1',
  prefix: 'api',
  version: 'v2',
  postfix: '',
  authorized: false,
  key: 'someAuthKey',
  delay: 3,
  routing: {
    route: '',
    get: '{id}',
    cget: '',
    post: '',
    delete: '{id}',
    put: '{id}',
    patch: '{id}',
    option: '{id}',
    load: '',
    send: '',
    new: 'new',
    save: 'save',
    edit: 'edit/{id}',
    remove: 'remove/{id}',
  },
}

```

URL формируется следующим образом `${host}/${prefix}${version}${postfix}`

* host: 'http://127.0.0.1'
* prefix: 'api' - не обязательно
* version: 'v2' - не обязательно
* postfix: 'some' - не обязательно

Итого `http://127.0.0.1/api/v2/some` и дальше в соответствии с конфигом ресурса. Нельзя указать `routing: { route: 'some/string' }` для всех ресурсов конкретного сервера АПИ в конфигурации. Для сервера можно указать `prefix` или `postfix`. Возможность явно указать `route` существует только в контексте конкретного ресурса.

### Ресурсы

Основа запросов заключается в получении *ресурсов* с единственного или нескольких серверов. Метод `res(name|url)` устанавливает *имя* ресурса или *адрес* его нахождения. Далее имя ресурса сопоставляется со списком сконфигурированных ресурсов для настройки конкретного *запроса*, если это необходимо. При остсуствии специфических настроек ресурса берется конфигурация *по умолчанию*, а при её отсутствии, запрос сформируется по общепринятым правилам. Метод возвращает сконфигурированный экземпляр класса для дальнейшей работы с ресурсом.

Имя ресурса используется для подстановки в итоговый URL запроса как есть. Поэтому вы можете не заморачиваться с настройкой роутов, а просто вызывать ресурс с сервера по относительному адресу

```javascript
resources.default = {
  host: 'http://127.0.0.1',
  prefix: 'api',
};

var api = new Api(resources);
api.res('users/new').post({name: 'Bob'});
// POST http://127.0.0.1/api/users/new
// send data: {name: 'Bob'}
```

### Параметры запросов

Библиотека меняет порядок параметров в методе запросов(например *get* или *post*), и в отличии от Axios значению *url* отводится наименьший приоритет. **URL либо не указывается вообще либо указывается самым последним параметром.** На первое место выводятся либо *данные* для POST запроса, либо *параметры* URL для GET запросов.

```javascript
resoures.google = {
  host: 'https://www.google.com',
  routing: {
    get: 'search',
  },
};

var api = new Api(resoures);
api.res('google').load({q: 123, hl: 'ru'});
// GET https://www.google.com/search?q=123&hl=ru
```

## Роутинг

Именно для простоты вызова ресурсов в библиотеке испрользуется *роутинг*. Подразумевается, что все REST запросы к API стандартизованы. При обычной архитектуре API сервера вам даже не придется настраивать роутинг для ваших ресурсов. Настройка роутинга, это простой JS объект с указанием *названия* метода запроса и *шаблона запроса*, который перерисывает значения предустановленные этой библиотекой.

Подстановочные значения URL указываются в фигурных скобках и берутся из списка параметров для запроса. Если подстановок в шаблоне нет, параметры уйдут в *query* часть URL. Часть параметров может уйти в подстановку, а оставшиеся в параметры URL, если такая ситуация будет необходима.

```javascript

resources.users = {
  host: 'http://127.0.0.1',
  routing: {
    get: '{id}', // по умолчанию такой же
    cget: 'list',
    load: 'any/other/user'
  },
};
api.res('users').get({id: 1}); // GET http://127.0.0.1/api/users/1
api.res('users').get({id: 1, sort: 'asc'}); // GET http://127.0.0.1/api/users/1?sort=asc
api.res('users').cget(); // GET http://127.0.0.1/api/users/list
api.res('users').post({name: 'Bob'}); // POST http://127.0.0.1/api/users
api.res('users').load({id: 1, sort: 'asc'});
// GET http://127.0.0.1/api/users/any/other/user?id=1&sort=asc
```
 

Стандартный роутер библиотеки. В комментариях реальный метод запроса отправляемого на сервер. Из них *get, post, put, patch, delete, options* являются общепринятыми, остальные добавлены библиотекой и не являются обязательными.

```javascript
{
  route: resources, // имя ресурса
  load: '', // GET
  get: '{id}', // GET
  cget: '', // GET
  send: '', // GET !!!
  post: '', // POST
  save: '', // POST
  remove: '', // POST
  new: '', // POST
  edit: '', // POST
  delete: '{id}', // DELETE
  put: '{id}', // PUT
  patch: '{id}', // PATCH
  option: '{id}', // OPTIONS
}
```

## Задержка запросов

Библиотека позволяет установить задержку в секундах на выполнение любого запроса. **На данный момент запрос выполняется сразу, задержка только имитируется.** Ее можно сконфигурировать как настройку по умолчанию, для каждого ресурса в целом, для конкретного запроса индивидуально. Все эти значения могут различаться, но, если вы действительно захотите использовать что-то большее чем просто общую задержку для всех запросов по умолчанию, есть особенность. Приоритет значения задержки указан именно в такой последовательности.

Например, когда общее значение по умолчанию(5 секунд) выше любого другого значения(2 секунды), будет использовано именно оно - значение по умолчанию 5 секунд.

```javascript
resources.default = {
  delay: 5,
  host: 'http://127.0.0.1',
  prefix: 'api',
};

resources.users = {
  delay: 3,
};

resouresourcesres.comments = {
  delay: 2,
};

var api = new Api(resources);
api.res('users').load(); // реальная задержка 5 секунд
api.res('comments').load(); // реальная задержка 5 секунд
api.res('users').load(null, null, 4); // реальная задержка 5 секунд
api.res('users').setDelay(3).load(); // реальная задержка 5 секунд
api.res('autors').load(); // реальная задержка 5 секунд
// Все значения перебиты максимальным (default)
```

Обратная ситуация, когда при уменьшении приоритета будет увеличиваться время задержки запроса, будут использоваться именно эти значения.

```javascript
resources.default = {
  delay: 1,
  host: 'http://127.0.0.1',
  prefix: 'api',
};

resources.users = {
  delay: 2,
};

resources.comments = {
  delay: 3,
};

var api = new Api(resoures);
api.res('users').load(); // реальная задержка 2 секунды
api.res('comments').load(); // реальная задержка 3 секунды
api.res('users').load(null, null, 4); // реальная задержка 4 секунды
api.res('users').setDelay(3).load(); // реальная задержка 3 секунды
api.res('autors').load(); // реальная задержка 1 секунда (default)
```

## Несколько серверов API

По сказанному выше видно, что описание ресурса включает в себя в том числе перечисление настроек подключения к серверу АПИ. Когда у вас единственный сервер, эти настройки обычно легче указать в описании стандартного подключения по умолчанию. В самих же ресурсах перечислять настройки касающиеся непосредственно ресурсов. Такая путаница, или хренова "магия", необходимы для простоты использования библиотеки.

Имя конфигурации подключения к серверу АПИ указывается вторым параметром при вызове ресурса. Само по себе использование нескольких серверов и настроек для них может запутать. Но если вы не из таких, не переживайте, библиотека вам "поможет"

```javascript
api.res('comments', 'post').get({id: 123});
// Загрузить комментарии к посту номер 123 с сервера АПИ постов,
// описанном в ресурсе под именем 'post'
```

Далее, вы точно также конфигурируете ресурсы, за исключением только того, что какой-то выбранный вами лично ресурс, будет содержать настройки подключения к новому АПИ. Хорошо, если имя этого ресурса(описание подключения к новому АПИ) будет уникально. Но нет ничего плохого в том, чтобы описать получение единственного ресура с единственного сервера АПИ в одной инструкции.

```javascript
resources.default = {
  host: 'http://localhost',
  prefix: 'api',
};

resources.users = {
  host: 'http://api-server-first',
};

resources.auth = {
  host: 'http://second-server-api',
};
```

В примере выше, все ресурсы распределены между тремя серверами. Два из них четко `users` и `auth` описаны отдельно, каждый на своем сервере АПИ. Любые остальные запрашиваемые у библиотеки ресурсы будут направляться на сервер по умолчанию.

```javascript
// Ресурс или АПИ с именем 'post' не существует в новой конфигурации.
// Будет вызван ресурс 'comments' с сервера по умолчанию
api.res('comments', 'post').get({id: 123}); // http://localhost/api/comments/123

api.res('profiles', 'users').load(); // GET http://api-server-first/api/profiles
api.res('credentials', 'auth').post({login: 'Bob'}); // POST http://second-server-api/api/credentials

// Получение единственного ресурса АПИ по имени конфигурации АПИ
// Имя ресурса и имя АПИ совпадают - fucking magic (не благодарите)
api.res('users').get({id: 3}); // GET http://api-server-first/api/users/3
```

### Один ресурс на разных серверах

Объединение описания и ресурсов и самого подключения к серверу АПИ также может запутать, но это необходимо именно для простоты использования [кто бы мог подумать]. Иначе вам приходится в каждом вызове явно указывать и имя подключения и имя ресурса в других существующих библиотеках. В этой библиотеке имя подключения или имя самого ресурса могут отсутствовать в вызове ресурса или не существовать вовсе(it`s ... Magic!). Пристегнитесь

```javascript
resources.default = {
  host: 'http://localhost',
  prefix: 'api',
};
resources.first = {
  host: 'http://api-server-first',
  version: 'v1',
};
resources.second = {
  host: 'http://second-server-api',
  version: 'v2',
};

resources.users = {
  routing: {
    cget: 'popular',
  },
};

api.res('users').cget(); // GET http://localhost/api/users/popular
api.res('users', 'first').cget(); // GET http://api-server-first/api/v1/users/popular
api.res('users', 'second').cget(); // GET http://second-server-api/api/v2/users/popular

// Получить не описанный в настройках ресурс 'posts' с описанного подключения 'second'
api.res('posts', 'second').get({id: 5}); // GET http://second-server-api/api/v2/posts/5
```

## Значения по умолчанию

Для всех запросов можно установить значения по умолчанию через метод `default(key, val)` или получить установленное значение `default(key)`. Эти значения используются внутри библиотеки для формирования запроса. Например, установка ключа авторизации. Вы можете использовать их также, при необходимости.

## Авторизация

Дополнительно библиотекой реализована установка ключа авторизации в заголовок запроса `Authorization: Bearer`. Его нужно устанавливать **для каждого запроса** ресурса через `auth(key)`, или прописать параметр `key` в конфигурации ресурса, или установить значение по умолчанию для всей библиотеки `default('key', authkey)`. При формировании запроса ресурса ключ авторизации берется из конфигурации ресурса `key`, а если его там нет, из значений по умолчанию _"default: {key: authkey}"_. Значение установленное через `auth(key)` перезаписывает для этого запроса все предыдущие. Для последующих запросов **ключ сбрасывается** или берется из конфига.

```javascript
// Установить ключ только на этот запрос
api.res('user').auth(key).load();
api.res('user', 'second').auth(key).load();
api.res('auth', 'auth').auth(key).post();

// api.auth(authkey, 'default'); - устанавливает ключ авторизации для РЕСУРСА по умолчанию, имя ресурса `default`
// api.auth(authkey); - устанавливает ключ авторизации для всей библиотеки по умолчанию.
// api.default('key', authkey); - устанавливает ключ авторизации для всей библиотеки по умолчанию. Когда явно не установлен ключ авторизации, будет взят ключ из этого значения, для любого ресурса.
```

## Кэширование

Если установлено значение ключа авторизации по умолчанию, он автоматически подставляется во все запросы для всех ресурсов. Это бывает удобно, но иногда не желательно. Запросы для которых установлен заголовок авторизации, не кэшируются по умолчанию.

Когда для конкретного ресурса установка ключа авторизации не нужна, этот ресурс нужно сконфигурировать с опцией `authorized: false`. Для конкретного ресурса или для всего сервера АПИ в зависимости от способа конфигурации.

```javascript
resources.default = {
  host: 'http://localhost', 
};

// Все обращения к ресурсу `first` сервер api-server-first
resources.first = {
  host: 'http://api-server-first', 
  authorized: false
}; 

// Все обращения к ресурсу `users` сервер по умолчанию
resources.users = {
  authorized: false,
  routing: {
    cget: 'popular',
  },
};
 
```

Для конкретного запроса без конфигурации, указав третий параметр `isPublic` при выборе ресурса. Или вызвать метод `public()` после установки ресурса.

```javascript
api.res('user', 'default', true).load();
api.res('user').public().load();

```

## Костыли

Вы можете перезаписать установленный в конфигурации ключ авторизации указав вторым параметром `name` имя ресурса `api.auth(key, name)`. Это расширяет предопределенную конфигурацию ресурса ключем авторизации, или перманентно перезаписывает ранее установленный. Все последующие запросы к `name` АПИ теперь будут именно с этим новым ключем. Метод `api.auth(key)` до выбора ресурса и без указания имени АПИ перезапишет или установит значение по умолчанию глобально для всей библиотеки.

Вы можете установить свои заголовки запроса через `setHeaders(headers)`. Не сохраняются для следующих запросов.

Вы можете определить ресурс после создания экземпляра библиотеки через `define(name, resource)` указав имя и описав объект его конфигурации вторым параметром.

Вы можете расширить конфигурацию ресурса или перезаписать некоторые поля через `extend(name, resource)`, вложенные объекты копируются по ссылке.

Вы можете установить объект _конфигурации_ Axios через `setAxiosConfig(config)` или получить его `dumpAxiosConfig()`. Но он очищается после каждого запроса.

Вы можете сами выполнить свой запрос по схеме `request(method, action, data, params, url, wait)` где _action_ - это имя запроса, ключ для роутера, например `post`, `load` или `save`.

Вы можете получить Axios целиком методом `axios()`

Вы можете получить сгенерированный URL через `lastURL()`
