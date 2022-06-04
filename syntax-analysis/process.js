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
    const start = new Start(tokens, 0);
    const lastIndex = start.exec();

    if (lastIndex === tokens.length) {
      console.log('Success!');
    }
  }
}

module.exports = Process;