const fs = require('fs');
let code = fs.readFileSync('./template.html', 'utf8');

const compile = require('../compile.js');

let runTemplate = compile(code);

console.log(runTemplate({
	eat: ['apple', 'orange', 'carot'],
	sport: true
}));