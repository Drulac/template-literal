;(async () => {
	const n = 1e5
	const fs = require('fs')

	const wait = () =>
		new Promise(resolve => {
			setTimeout(resolve, 500)
		})

	const tpl = fs.readFileSync('bench.html', 'utf8')
	const tplZup = fs.readFileSync('benchZup.html', 'utf8')
	const tplEjs = tplZup.replace(/\[\[/g, '<%').replace(/\]\]/g, '%>')
	const tplDot = tplZup
	const tplEdge = fs.readFileSync('benchEdge.html', 'utf8')

	const compile = require('../compile.js')
	const zupcompile = require('zup')
	const ejscompile = require('ejs').compile
	const dotcompile = require('dot').template
	const edge = require('edge.js')

	const vars = {
		heading: 'This title will be truncated',
		content: `
		My life story, and I'm not kidding this time...
		`,
		alert: '<b>HI MOM!</b>'
	}

	const opts = null
	const zupOpts = {}
	const ejsOpts = {localsName: 'z'}
	const dotOpts = {
		evaluate: /\[\[([\s\S]+?)\]\]/g,
		interpolate: /\[\[-([\s\S]+?)\]\]/g,
		encode: /\[\[=([\s\S]+?)\]\]/g,
		varname: 'z',
		strip: false
	}
	const edgeOpts = null

	const fn = compile(tpl)
	const zupfn = zupcompile(tplZup, zupOpts)
	const ejsfn = ejscompile(tplEjs, ejsOpts)
	const dotfn = dotcompile(tplDot, dotOpts)
	const edgefn = data => edge.renderString(tplEdge, data)

	console.log('--------- console.time Compile ---------')

	edge.configure({
		cache: false
	})

	console.time('literal compile')
	for (var i = 0; i < n; ++i) compile(tpl)
	console.timeEnd('literal compile')

	await wait()

	console.time('zup compile')
	for (var i = 0; i < n; ++i) zupcompile(tplZup, zupOpts)
	console.timeEnd('zup compile')

	await wait()

	console.time('ejs compile')
	for (var i = 0; i < n; ++i) ejscompile(tplEjs, ejsOpts)
	console.timeEnd('ejs compile')

	await wait()

	console.time('doT compile')
	for (var i = 0; i < n; ++i) dotcompile(tplDot, dotOpts)
	console.timeEnd('doT compile')

	await wait()

	console.time('edge compile')
	for (var i = 0; i < n; ++i) edge.compileString(tplEdge)
	console.timeEnd('edge compile')

	await wait()

	console.log('--------- console.time Render ---------')

	edge.configure({
		cache: true
	})

	console.time('literal render')
	for (var i = 0; i < n; ++i) fn(vars)
	console.timeEnd('literal render')

	await wait()

	console.time('zup render')
	for (var i = 0; i < n; ++i) zupfn(vars)
	console.timeEnd('zup render')

	await wait()

	console.time('ejs render')
	for (var i = 0; i < n; ++i) ejsfn(vars)
	console.timeEnd('ejs render')

	await wait()

	console.time('doT render')
	for (var i = 0; i < n; ++i) dotfn(vars)
	console.timeEnd('doT render')

	await wait()

	console.time('edge render')
	for (var i = 0; i < n; ++i) edgefn(vars)
	console.timeEnd('edge render')

	await wait()

	console.log('--------- Benchmark Compile ---------')

	edge.configure({
		cache: false
	})

	const Benchmark = require('benchmark')
	let suite = new Benchmark.Suite()

	suite
		.add('Literal compile', function() {
			compile(tpl)
		})
		.add('Zup compile', function() {
			zupcompile(tplZup, zupOpts)
		})
		.add('Ejs compile', function() {
			ejscompile(tplEjs, ejsOpts)
		})
		.add('Dot compile', function() {
			dotcompile(tplDot, dotOpts)
		})
		.add('Edge compile', function() {
			edge.compileString(tplEdge)
		})
		.on('cycle', function(event) {
			console.log(String(event.target))
		})
		.on('complete', function() {
			console.log('Fastest is ' + this.filter('fastest').map('name'))
		})
		.run()

	await wait()

	console.log('--------- Benchmark Render ---------')

	edge.configure({
		cache: true
	})

	suite = new Benchmark.Suite()

	suite
		.add('Literal render', function() {
			fn(vars)
		})
		.add('Zup render', function() {
			zupfn(vars)
		})
		.add('Ejs render', function() {
			ejsfn(vars)
		})
		.add('Dot render', function() {
			dotfn(vars)
		})
		.add('Edge render', function() {
			edgefn(vars)
		})
		.on('cycle', function(event) {
			console.log(String(event.target))
		})
		.on('complete', function() {
			console.log('Fastest is ' + this.filter('fastest').map('name'))
		})
		.run()
})()
