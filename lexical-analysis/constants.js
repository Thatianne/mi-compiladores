const INITIAL = 'initial';
const IDENTIFIER = 'identifier';
const RESERVED_WORD = 'reservedWord';
const DELIMITER = 'delimiter';
const LOGICAL_OPERATOR_NOT = 'logicalOperatorNot';
const LOGICAL_OPERATOR_PARTIAL_AND = 'logicalOperatorPartialAnd';
const LOGICAL_OPERATOR_AND = 'logicalOperatorAnd';
const LOGICAL_OPERATOR_PARTIAL_OR = 'logicalOperatorPartialOr';
const LOGICAL_OPERATOR_OR = 'logicalOperatorOr';
const LOGICAL_OPERATOR_PARTIAL = 'logicalOperatorPartial';
const RELATIONAL_OPERATOR_SIMPLE = 'relationalOperatorSimple';
const RELATIONAL_OPERATOR = 'relationalOperator';
const ARITHMETIC_OPERATOR = 'arithmeticOperator';
const ARITHMETIC_OPERATOR_SLASH = 'arithmeticOperatorSlash';
const ARITHMETIC_OPERATOR_PLUS = 'arithmeticOperatorPlus';
const ARITHMETIC_OPERATOR_DOUBLE_PLUS = 'arithmeticOperatorDoublePlus';
const ARITHMETIC_OPERATOR_MINUS = 'arithmeticOperatorMinus';
const ARITHMETIC_OPERATOR_DOUBLE_MINUS = 'arithmeticOperatorDoubleMinus';
const NUMBER = 'number';
const NUMBER_POINT = 'numberPoint';
const NUMBER_FLOAT = 'numberFloat';
const STRING_START_DOUBLE_QUOTES = 'stringStartDoubleQuotes';
const STRING_MIDDLE = 'stringMiddle';
const STRING_END_DOUBLE_QUOTES = 'stringEndDoubleQuotes';
const CHARACTER_START_SINGLE_QUOTES = 'characterStartSingleQuotes';
const CHARACTER_MIDDLE = 'characterMiddle';
const CHARACTER_END_SINGLE_QUOTES = 'characterEndSingleQuotes';
const LINE_COMMENT_PERCENT = 'lineCommentPercent';
const LINE_COMMENT_MIDDLE = 'lineCommentMiddle';
const LINE_COMMENT_LINE_BREAK = 'lineCommentLineBreak';
const BLOCK_COMMENT_START_HASH = 'blockCommentStartHash';
const BLOCK_COMMENT_MIDDLE = 'blockCommentMiddle';
const BLOCK_COMMENT_END_HASH = 'blockCommentEndHash';
const BLOCK_COMMENT_END_SLASH = 'blockCommentEndSlash';
const ERROR_INVALID_CHARACTER = 'invalidCharacter';
const ERROR_NUMBERS_POINT = 'errorNumbersPoint';
const ERROR_BLOCK_COMMENT_NOT_CLOSED = 'errorBlockCommentNotClosed';
const ERROR_STRING_NOT_CLOSED = 'errorStringNotClosed';
const ERROR_CHARACTER_NOT_CLOSED = 'errorCharacterNotClosed';
const ERROR_LOGICAL_OPERATOR_AND_INCOMPLETED = 'errorLogicalOperatorAndIncompleted';
const ERROR_LOGICAL_OPERATOR_OR_INCOMPLETED = 'errorLogicalOperatorOrIncompleted';

module.exports = {
  INITIAL,
  IDENTIFIER,
  RESERVED_WORD,
  DELIMITER,
  LOGICAL_OPERATOR_NOT,
  LOGICAL_OPERATOR_PARTIAL_AND,
  LOGICAL_OPERATOR_AND,
  LOGICAL_OPERATOR_PARTIAL_OR,
  LOGICAL_OPERATOR_OR,
  LOGICAL_OPERATOR_PARTIAL,
  RELATIONAL_OPERATOR_SIMPLE,
  RELATIONAL_OPERATOR,
  ARITHMETIC_OPERATOR,
  ARITHMETIC_OPERATOR_SLASH,
  ARITHMETIC_OPERATOR_PLUS,
  ARITHMETIC_OPERATOR_DOUBLE_PLUS,
  ARITHMETIC_OPERATOR_MINUS,
  ARITHMETIC_OPERATOR_DOUBLE_MINUS,
  NUMBER,
  NUMBER_POINT,
  NUMBER_FLOAT,
  STRING_START_DOUBLE_QUOTES,
  STRING_MIDDLE,
  STRING_END_DOUBLE_QUOTES,
  CHARACTER_START_SINGLE_QUOTES,
  CHARACTER_MIDDLE,
  CHARACTER_END_SINGLE_QUOTES,
  LINE_COMMENT_PERCENT,
  LINE_COMMENT_MIDDLE,
  LINE_COMMENT_LINE_BREAK,
  BLOCK_COMMENT_START_HASH,
  BLOCK_COMMENT_MIDDLE,
  BLOCK_COMMENT_END_HASH,
  BLOCK_COMMENT_END_SLASH,
  ERROR_INVALID_CHARACTER,
  ERROR_NUMBERS_POINT,
  ERROR_BLOCK_COMMENT_NOT_CLOSED,
  ERROR_STRING_NOT_CLOSED,
  ERROR_CHARACTER_NOT_CLOSED,
  ERROR_LOGICAL_OPERATOR_AND_INCOMPLETED,
  ERROR_LOGICAL_OPERATOR_OR_INCOMPLETED,
}