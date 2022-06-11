const Process = require('./process');

const files = process.argv.slice(2);

if (files.length < 2) {
  console.log('Informe o arquivo de entrada e de saída');
} else {
  Process.init(files[0], files[1]);
}


