const LexicalProcess = require('./lexical-analysis/process');
const SyntaxProcess = require('./syntax-analysis/process');

const files = process.argv.slice(2);

if (files.length < 1) {
  console.log('Informe o nome do arquivo');
} else {
  const file = files[files.length - 1];
  LexicalProcess.init(`syntax-analysis/tests/${file}.txt`, `syntax-analysis/input/${file}.txt`);

  SyntaxProcess.run(`syntax-analysis/input/${file}.txt`);
}


