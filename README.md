# easy-rotate-in-canvas

## Usage

```bash
yarn add easy-rotate
```

```js
const enhance = require('easy-rotate');

const c = document.getElementById('myCanvas');
// wrapper original ctx object use enhance
const ctx = enhance(c.getContext('2d'));

const img = document.getElementById('tulip');
// c.getContext('2d').drawImage(img, 0, 0);

ctx.drawImage(img, {
    x: 100,
    y: 100,
    rotate: 90,
});
```

It will first move to 100, 100, and then rotate 90 with the upper left corner as the origin.

## options

## todos

[]supports chain call.
[]suports rotate around its center.
[]suports scale


