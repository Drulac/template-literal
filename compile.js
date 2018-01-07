module.exports = function(templateStr) {
	return new Function('d', 'return `' + templateStr + '`')
}
