const fs = require('fs');
let code = fs.readFileSync('./template.html', 'utf8');

const compile = require('template-literal');

let runTemplate = compile(code);

console.log(runTemplate({
	eat: ['apple', 'orange', 'carot'],
	sport: true
}));