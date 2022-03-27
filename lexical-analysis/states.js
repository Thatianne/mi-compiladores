const constants = require('./constants');

const Initial = require('./initial/initial');
const Identifier = require('./identifier/identifier');
const ReservedWord = require('./reservedWord/reservedWord');
const Delimiter = require('./delimiter/delimiter');
const LogicalOperator = require('./logicalOperator/logicalOperator');
const LogicalOperatorNot = require('./logicalOperator/logicalOperatorNot');
const LogicalOperatorPartialAnd = require('./logicalOperator/logicalOperatorPartialAnd');
const LogicalOperatorAnd = require('./logicalOperator/logicalOperatorAnd');
const LogicalOperatorPartialOr = require('./logicalOperator/logicalOperatorPartialOr');
const LogicalOperatorOr = require('./logicalOperator/logicalOperatorOr');
const RelationalOperatorSimple = require('./relationalOperator/relationalOperatorSimple');
const RelationalOperator = require('./relationalOperator/relationalOperator');
const ArithmeticOperator = require('./arithmeticOperator/arithmeticOperation');
const ArithmeticOperatorSlash = require('./arithmeticOperator/arithmeticOperationSlash');
const ArithmeticOperatorMinus = require('./arithmeticOperator/arithmeticOperationMinus');
const ArithmeticOperatorDoubleMinus = require('./arithmeticOperator/arithmeticOperationDoubleMinus');
const ArithmeticOperatorPlus = require('./arithmeticOperator/arithmeticOperationPlus');
const ArithmeticOperatorDoublePlus = require('./arithmeticOperator/arithmeticOperationDoublePlus ');
const Number = require('./number/number');
const NumberPoint = require('./number/numberPoint');
const NumberFloat = require('./number/numberFloat');
const StringStartDoubleQuotes = require('./string/stringStartDoubleQuotes');
const StringEndDoubleQuotes = require('./string/stringEndDoubleQuotes');
const StringMiddle = require('./string/stringMiddle');
const CharacterStartSingleQuotes = require('./character/characterStartSingleQuotes');
const CharacterMiddle = require('./character/characterMiddle');
const CharacterEndSingleQuotes = require('./character/characterEndSingleQuotes');
const LineCommentPercent = require('./lineComment/lineCommentPercent');
const LineCommentMiddle = require('./lineComment/lineCommentMiddle');
const LineCommentLineBreak = require('./lineComment/lineCommentLineBreak');
const BlockCommentStartHash = require('./blockComment/blockCommentStartHash');
const BlockCommentMiddle = require('./blockComment/blockCommentMiddle');
const BlockCommentEndHash = require('./blockComment/blockCommentEndHash');
const BlockCommentEndSlash = require('./blockComment/blockCommentEndSlash');
const ErrorInvalidCharacter = require('./error/errorInvalidCharacter');
const ErrorNumberPoint = require('./error/errorNumberPoint');
const ErrorBlockCommentNotClosed = require('./error/errorBlockCommentNotClosed');
const ErrorStringNotClosed = require('./error/errorStringNotClosed');
const ErrorCharacterNotClosed = require('./error/errorCharacterNotClosed');
const ErrorLogicalOperatorAndIncompleted = require('./error/errorLogicalOperatorAndIncompleted');

const states = {
  [constants.INITIAL]: Initial,
  [constants.IDENTIFIER]: Identifier,
  [constants.RESERVED_WORD]: ReservedWord,
  [constants.DELIMITER]: Delimiter,
  [constants.LOGICAL_OPERATOR]: LogicalOperator,
  [constants.LOGICAL_OPERATOR_NOT]: LogicalOperatorNot,
  [constants.LOGICAL_OPERATOR_PARTIAL_AND]: LogicalOperatorPartialAnd,
  [constants.LOGICAL_OPERATOR_AND]: LogicalOperatorAnd,
  [constants.LOGICAL_OPERATOR_PARTIAL_OR]: LogicalOperatorPartialOr,
  [constants.LOGICAL_OPERATOR_OR]: LogicalOperatorOr,
  [constants.RELATIONAL_OPERATOR_SIMPLE]: RelationalOperatorSimple,
  [constants.RELATIONAL_OPERATOR]: RelationalOperator,
  [constants.ARITHMETIC_OPERATOR]: ArithmeticOperator,
  [constants.ARITHMETIC_OPERATOR_SLASH]: ArithmeticOperatorSlash,
  [constants.ARITHMETIC_OPERATOR_MINUS]: ArithmeticOperatorMinus,
  [constants.ARITHMETIC_OPERATOR_DOUBLE_MINUS]: ArithmeticOperatorDoubleMinus,
  [constants.ARITHMETIC_OPERATOR_PLUS]: ArithmeticOperatorPlus,
  [constants.ARITHMETIC_OPERATOR_DOUBLE_PLUS]: ArithmeticOperatorDoublePlus,
  [constants.NUMBER]: Number,
  [constants.NUMBER_POINT]: NumberPoint,
  [constants.NUMBER_FLOAT]: NumberFloat,
  [constants.STRING_START_DOUBLE_QUOTES]: StringStartDoubleQuotes,
  [constants.STRING_MIDDLE]: StringMiddle,
  [constants.STRING_END_DOUBLE_QUOTES]: StringEndDoubleQuotes,
  [constants.CHARACTER_START_SINGLE_QUOTES]: CharacterStartSingleQuotes,
  [constants.CHARACTER_MIDDLE]: CharacterMiddle,
  [constants.CHARACTER_END_SINGLE_QUOTES]: CharacterEndSingleQuotes,
  [constants.LINE_COMMENT_PERCENT]: LineCommentPercent,
  [constants.LINE_COMMENT_MIDDLE]: LineCommentMiddle,
  [constants.LINE_COMMENT_LINE_BREAK]: LineCommentLineBreak,
  [constants.BLOCK_COMMENT_START_HASH]: BlockCommentStartHash,
  [constants.BLOCK_COMMENT_MIDDLE]: BlockCommentMiddle,
  [constants.BLOCK_COMMENT_END_HASH]: BlockCommentEndHash,
  [constants.BLOCK_COMMENT_END_SLASH]: BlockCommentEndSlash,
  [constants.ERROR_INVALID_CHARACTER]: ErrorInvalidCharacter,
  [constants.ERROR_NUMBERS_POINT]: ErrorNumberPoint,
  [constants.ERROR_BLOCK_COMMENT_NOT_CLOSED]: ErrorBlockCommentNotClosed,
  [constants.ERROR_STRING_NOT_CLOSED]: ErrorStringNotClosed,
  [constants.ERROR_CHARACTER_NOT_CLOSED]: ErrorCharacterNotClosed,
  [constants.ERROR_LOGICAL_OPERATOR_AND_INCOMPLETED]: ErrorLogicalOperatorAndIncompleted,
}

module.exports = {
  states
}