const LexicalProcess = require('./lexical-analysis/process');
const SyntaxProcess = require('./syntax-analysis/process');

// Ex.: npm run analyze program/errorNoIdentifier.txt
const files = process.argv.slice(2);

if (files.length < 1) {
  console.log('Informe o nome do arquivo');
} else {
  const file = files[0];
  LexicalProcess.init(`syntax-analysis/tests/${file}`, `syntax-analysis/input/${file}`);

  SyntaxProcess.run(`syntax-analysis/input/${file}`);
}


