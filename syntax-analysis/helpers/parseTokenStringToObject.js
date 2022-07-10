const parseTokenStringToObject = (token) => {
  const tokenSplited = token.split(/([0-9]+)\s(.*)\s(.*)/);
  return {
    line: tokenSplited[1],
    lexema: tokenSplited[2],
    class: tokenSplited[3]
  }
}

module.exports = parseTokenStringToObject;