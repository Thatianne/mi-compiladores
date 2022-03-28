const constants = require('./constants');

const Initial = require('./initial/initial');
const Identifier = require('./identifier/identifier');
const ReservedWord = require('./reservedWord/reservedWord');
const Delimiter = require('./delimiter/delimiter');
const LogicalOperatorNot = require('./logicalOperator/logicalOperatorNot');
const LogicalOperatorPartialAnd = require('./logicalOperator/logicalOperatorPartialAnd');
const LogicalOperatorAnd = require('./logicalOperator/logicalOperatorAnd');
const LogicalOperatorPartialOr = require('./logicalOperator/logicalOperatorPartialOr');
const LogicalOperatorOr = require('./logicalOperator/logicalOperatorOr');
const RelationalOperatorAssignment = require('./relationalOperator/relationalOperatorAssignment');
const RelationalOperatorBigger = require('./relationalOperator/relationalOperatorBigger');
const RelationalOperatorBiggerOrEquals = require('./relationalOperator/relationalOperatorBiggerOrEquals');
const RelationalOperatorEquals = require('./relationalOperator/relationalOperatorEquals');
const RelationalOperatorNotEquals = require('./relationalOperator/relationalOperatorNotEquals');
const RelationalOperatorSmaller = require('./relationalOperator/relationalOperatorSmaller');
const RelationalOperatorSmallerOrEquals = require('./relationalOperator/relationalOperatorSmallerOrEquals');
const ArithmeticOperatorMultiplication = require('./arithmeticOperator/arithmeticOperatorMultiplication');
const ArithmeticOperatorDivision = require('./arithmeticOperator/arithmeticOperatorDivision');
const ArithmeticOperatorMinus = require('./arithmeticOperator/arithmeticOperatorMinus');
const ArithmeticOperatorDecrement = require('./arithmeticOperator/arithmeticOperatorDecrement');
const ArithmeticOperatorSum = require('./arithmeticOperator/arithmeticOperatorSum');
const ArithmeticOperatorIncrement = require('./arithmeticOperator/arithmeticOperatorIncrement');
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
const LineComment = require('./lineComment/lineComment');
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
const ErrorLogicalOperatorOrIncompleted = require('./error/errorLogicalOperatorOrIncompleted');

const states = {
  [constants.INITIAL]: Initial,
  [constants.IDENTIFIER]: Identifier,
  [constants.RESERVED_WORD]: ReservedWord,
  [constants.DELIMITER]: Delimiter,
  [constants.LOGICAL_OPERATOR_NOT]: LogicalOperatorNot,
  [constants.LOGICAL_OPERATOR_PARTIAL_AND]: LogicalOperatorPartialAnd,
  [constants.LOGICAL_OPERATOR_AND]: LogicalOperatorAnd,
  [constants.LOGICAL_OPERATOR_PARTIAL_OR]: LogicalOperatorPartialOr,
  [constants.LOGICAL_OPERATOR_OR]: LogicalOperatorOr,
  [constants.RELATIONAL_OPERATOR_ASSIGNMENT]: RelationalOperatorAssignment,
  [constants.RELATIONAL_OPERATOR_BIGGER]:RelationalOperatorBigger,
  [constants.RELATIONAL_OPERATOR_BIGGER_OR_EQUALS]:RelationalOperatorBiggerOrEquals,
  [constants.RELATIONAL_OPERATOR_EQUALS]:RelationalOperatorEquals,
  [constants.RELATIONAL_OPERATOR_NOT_EQUALS]:RelationalOperatorNotEquals,
  [constants.RELATIONAL_OPERATOR_SMALLER]:RelationalOperatorSmaller,
  [constants.RELATIONAL_OPERATOR_SMALLER_OR_EQUALS]:RelationalOperatorSmallerOrEquals,
  [constants.ARITHMETIC_OPERATOR_DIVISION]: ArithmeticOperatorDivision,
  [constants.ARITHMETIC_OPERATOR_MULTIPLICATION]: ArithmeticOperatorMultiplication,
  [constants.ARITHMETIC_OPERATOR_MINUS]: ArithmeticOperatorMinus,
  [constants.ARITHMETIC_OPERATOR_DECREMENT]: ArithmeticOperatorDecrement,
  [constants.ARITHMETIC_OPERATOR_SUM]: ArithmeticOperatorSum,
  [constants.ARITHMETIC_OPERATOR_INCREMENT]: ArithmeticOperatorIncrement,
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
  [constants.LINE_COMMENT]: LineComment,
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
  [constants.ERROR_LOGICAL_OPERATOR_OR_INCOMPLETED]: ErrorLogicalOperatorOrIncompleted,
}

module.exports = {
  states
}