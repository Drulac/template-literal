module.exports = templateStr => new Function('d', 'return `' + templateStr + '`')
