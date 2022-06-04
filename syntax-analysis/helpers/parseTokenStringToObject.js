const parseTokenStringToObject = (token) => {
  const tokenSplited = token.split(' ');
  return {
    line: tokenSplited[0],
    lexema: tokenSplited[1],
    class: tokenSplited[2]
  }
}

module.exports = parseTokenStringToObject;