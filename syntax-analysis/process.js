const fs = require('fs');
const parseTokenStringToObject = require('./helpers/parseTokenStringToObject');
const Start = require('./start');

class Process {
  static run(inputFile, outputFile) {
    const codeTokens = fs.readFileSync(inputFile, {encoding:'utf8', flag:'r'});
    const tokensLine = codeTokens.split('\n');
    tokensLine.pop();
    const tokens = tokensLine.map(token => parseTokenStringToObject(token))

    // console.log(tokens)

    const errors = [];
    const start = new Start(tokens, 0, errors);
    const lastIndex = start.exec();

    // console.log(`Last analysed index: ${lastIndex}, token length: ${tokens.length}`);

    const index = outputFile.lastIndexOf('/');
    const dir = outputFile.substring(0, index);

    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    if (errors.length === 0) {
      console.log('Syntax - Success!');
      fs.writeFileSync(outputFile, 'Success!', { flag: 'w+' });
    } else {
      const errorMessages = errors.map((error) => error.message);
      console.log(errorMessages);
      fs.writeFileSync(outputFile, errorMessages.join('\n'), { flag: 'w+' });
    }


  }
}

module.exports = Process;