# template-literal
fastest, smallest and simplest template engine, using JS's literal template feature

## Install

If you use Express, you can find here a simple wrapper to use it as Express templating engine : https://github.com/Drulac/express-tl/

```
npm install template-literal
```

## Usage

Usage is simple, the syntaxe is [template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

Expressions are enclosed by `${` and `}`. The value returned by the expression contained inside brackets is insered in the page code. `d` is the name of the object used to access data variable.

`require('template-literal')` returns the template compiler function.

## Code sample

[example template](example/template.html)
```html
<!doctype html>
<html>
<head>
	<title>index template</title>
</head>
<body>
	<meal>
		${d.eat.reduce((str,food)=>str+'<eat>'+food+'</eat>', '')}
	</meal>

	<sport>
		${d.sport ? 'you are in a good way' : 'change it now'}
	</sport>

	<dessert>
	</dessert>
</body>
</html>
```
[example use](example/index.js)
```js
const fs = require('fs');
let code = fs.readFileSync('./template.html', 'utf8');

const compile = require('template-literal');

let runTemplate = compile(code);

console.log(runTemplate({
	eat: ['apple', 'orange', 'carot'],
	sport: true
}));
```

## Benchmark

this benchmark (and this documentation) is mostly inspired by [Zup's official benchmark](https://github.com/mscdex/zup/wiki/Benchmarks)

 * module's versions:
   * benchmark : v2.1.4
   * template-literal : v0.0.1
   * dot : v1.1.2
   * edge.js : v1.1.0
   * ejs : v2.5.7
   * zup : v0.0.1
 * node v7.10.1

template-literal doesn't have options, unlike the others template engine. It's a parts of the high speed reason.

### Template code

```html
<html>
<head>
	<title>My First Article</title>
</head>
<body>
	<h1>${d.heading.length > 16 ? d.heading.slice(0,16) + '...' : d.heading}</h1>
	${d.alert ? '<h3>'+d.alert+'</h3>' : ''}
	<pre>${d.content}</pre>
</body>
</html>
```
template for other engines can be found in the [bench directory](bench/)


### Results
#### Simplifed

##### Using `console.time` with 1e5 runs (lower is better)

|               |  Compilation  |     Render    |
| ------------- |          ---: |          ---: |
|    literal    |     622.954ms |     33.071ms  |
|      zup      |   2'555.846ms |    184.788ms  |
|      doT      |   6'624.527ms |    620.174ms  |
|      ejs      |  15'055.106ms |  1'660.634ms  |
|      edge     |  25'413.106ms | 28'073.437ms  |


##### Using the `benchmark` nodejs lib (higher is better)
|               |    Compilation   |       Render        |
| ------------- |             ---: |                ---: |
|    literal    |  163'222 ops/sec |  3'156'867 ops/sec  |
|      zup      |   38'914 ops/sec |    562'130 ops/sec  |
|      doT      |   14'515 ops/sec |    157'347 ops/sec  |
|      ejs      |    6'216 ops/sec |     57'079 ops/sec  |
|      edge     |    4'285 ops/sec |      3'476 ops/sec  |



##### Original results
```
--------- console.time Compile ---------
literal compile: 622.954ms
zup compile: 2555.846ms
ejs compile: 15055.106ms
doT compile: 6624.527ms
edge compile: 25413.106ms
--------- console.time Render ---------
literal render: 33.071ms
zup render: 184.788ms
ejs render: 1660.634ms
doT render: 620.174ms
edge render: 28073.437ms
--------- Benchmark Compile ---------
Literal compile x 163,222 ops/sec ±0.86% (79 runs sampled)
Zup compile x 38,914 ops/sec ±1.89% (78 runs sampled)
Ejs compile x 6,216 ops/sec ±3.10% (77 runs sampled)
Dot compile x 14,515 ops/sec ±0.71% (80 runs sampled)
Edge compile x 4,285 ops/sec ±1.60% (80 runs sampled)
Fastest is Literal compile
--------- Benchmark Render ---------
Literal render x 3,156,867 ops/sec ±0.43% (81 runs sampled)
Zup render x 562,130 ops/sec ±1.64% (80 runs sampled)
Ejs render x 57,079 ops/sec ±1.79% (78 runs sampled)
Dot render x 157,347 ops/sec ±0.82% (80 runs sampled)
Edge render x 3,476 ops/sec ±2.40% (79 runs sampled)
Fastest is Literal render

```

### Run by yourself
you can run the benchmark on your own computer easily :
go to the bench directory, run :
- `npm i`
- `node benchmark.js`
and wait :grin:

# Donate
You can make me a donation to support my work :
- With Liberapay : [https://liberapay.com/drulac/](https://liberapay.com/drulac/)
- With Paypal : drulac@protonmail.com

