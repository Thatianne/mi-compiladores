const fs = require('fs');
const parseTokenStringToObject = require('./helpers/parseTokenStringToObject');
const Start = require('./start');

class Process {
  static run(inputFile) {
    const codeTokens = fs.readFileSync(inputFile, {encoding:'utf8', flag:'r'});
    const tokensLine = codeTokens.split('\n');
    tokensLine.pop();
    const tokens = tokensLine.map(token => parseTokenStringToObject(token))

    console.log(tokens)

    const errors = [];
    const start = new Start(tokens, 0, errors);
    const lastIndex = start.exec();

    console.log(`Last analysed index: ${lastIndex}, token length: ${tokens.length}`);

    if (errors.length === 0) {
      console.log('Success!');
    } else {
      errors.map((error) => console.log(error.message));
    }

  }
}

module.exports = Process;