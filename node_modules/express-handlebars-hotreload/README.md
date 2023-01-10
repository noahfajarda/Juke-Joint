# Express Handlebars Hot Reload

🔥 Automatically reload handlebars templates when they change.

## Installation

```bash
npm install express-handlebars-hotreload
```
## Usage
A simple example:

```js
const exphbs = require('express-handlebars-hotreload');
const express = require('express');
exphbs.hotreload()

const app = express();
const hbs = exphbs.create({
  hotreload: true,
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', process.cwd() + '/example/views');

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(4241);
```

## Options

If you want to specifiy the websocket port, you can pass an object to the `hotreload` function and the `engine` function or the `create` method.

### `hotreload`
```js
hotreload({
  port: number /** Websocket port - default is 8080 */
})

// and 
exphbs.create({
  hotreload: true,
  port: number /** Websocket port - default is 8080 */
})

// or 
engine({
  hotreload: {
    port: number /** Websocket port - default is 8080 */
  }
})
```

### `engine`
```js
engine({
  hotreload: boolean /** Enable hot reload - default is false */
})

// or
engine({
  hotreload: {
    port: number /** Websocket port - default is 8080 */
  }
})
```

`hotreload` will actually return the `port` that it is using, so you can use that to pass to the `engine` function.

```js
let port;
if (process.env.NODE_ENV !== 'production') port = hotreload();

app.engine('handlebars', engine({
  ...(process.env.NODE_ENV !== 'production') && {
    hotreload: {
      port
    }
  },
}));
```

## Handlebars

The handlebars engine is the same as the [express-handlebars](https://github.com/ericf/express-handlebars) engine.

## Thanks
:heart: [express-handlebars](https://github.com/ericf/express-handlebars)
