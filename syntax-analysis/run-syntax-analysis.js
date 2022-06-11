const Process = require('./process');

const files = process.argv.slice(2);

if (files.length < 1) {
  console.log('Informe o arquivo de entrada');
} else {
  Process.run(files[0]);
}