# literal-template
fastest, smallest and simplest template engine, using JS's literal template feature

## benchmark

 * module versions:
   * benchmark : v2.1.4
   * literal-template : v0.0.1
   * dot : v1.1.2
   * edge.js : v1.1.0
   * ejs : v2.5.7
   * zup : v0.0.1
 * node v7.10.1

## template code

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
template for other engines can be found in the bench directory



### simplifed results

#### using `console.time` (lower is better)

|               |  Compilation  |     Render    |
| ------------- |          ---: |          ---: |
|    literal    |     622.954ms |     33.071ms  |
|      zup      |   2'555.846ms |    184.788ms  |
|      ejs      |  15'055.106ms |  1'660.634ms  |
|      doT      |   6'624.527ms |    620.174ms  |
|      edge     |  25'413.106ms | 28'073.437ms  |


#### using the `benchmark` nodejs lib (higher is better)
|               |    Compilation   |       Render        |
| ------------- |             ---: |                ---: |
|    literal    |  163'222 ops/sec |  3'156'867 ops/sec  |
|      zup      |   38'914 ops/sec |    562'130 ops/sec  |
|      ejs      |    6'216 ops/sec |     57'079 ops/sec  |
|      doT      |   14'515 ops/sec |    157'347 ops/sec  |
|      edge     |    4'285 ops/sec |      3'476 ops/sec  |



### original results
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


you can run the benchmark on your own computer easily :
go to the bench directory, run :
- `npm i`
- `node benchmark.js`
and wait :grin: