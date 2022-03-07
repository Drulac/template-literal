module.exports = function (templateStr) {
	const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
	return new AsyncFunction(
		'd',
		'const include = (file, opts={})=>d.include(file+".tl", Object.assign(d, opts)); return `' +
			templateStr +
			'`'
	)
}
