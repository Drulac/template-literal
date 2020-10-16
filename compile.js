module.exports = function (templateStr) {
	return new Function(
		'd',
		'const include = (file, opts={})=>d.include(file+".tl", Object.assign(d, opts)); return `' +
			templateStr +
			'`'
	)
}
