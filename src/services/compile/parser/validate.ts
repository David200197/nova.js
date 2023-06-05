import { startsWithLowercase } from '../../../utils/validation';
import { Moment } from '@models/node';
import { Token } from '@models/token';

export const isInsideBracketsMoment = (moment: Moment) =>
  moment === 'inside_brackets';

export const isEndLine = (token: Token, moment: Moment) =>
  (isInsideBracketsMoment(moment) && isLowerCaseNameToken(token)) ||
  (isInsideBracketsMoment(moment) && isCloseBracketToken(token)) ||
  (isInsideBracketsMoment(moment) && isCloseSquareBracketToken(token));

export const isLowerCaseNameToken = (token: Token) =>
  token.type === 'name' && startsWithLowercase(token.value);

export const isStringToken = (token: Token) => token.type === 'string';

export const isNumberToken = (token: Token) => token.type === 'number';

export const isBooleanToken = (token: Token) =>
  token.type === 'name' && (token.value === 'true' || token.value === 'false');

export const isNullToken = (token: Token) =>
  token.type === 'name' && token.value === 'null';

export const isCommaToken = (token: Token) => token.type === 'comma';

export const isColonToken = (token: Token) => token.type === 'colon';

export const isEqualToken = (token: Token) => token.type === 'equal';

export const isQuestionMarkToken = (token: Token) =>
  token.type === 'question_mark';

export const isPropertyToken = (
  token: Token,
  nextToken: Token,
  moment: Moment,
) =>
  token.type === 'name' &&
  moment === 'inside_paren' &&
  nextToken.type === 'colon';

export const isNameToken = (token: Token) => token.type === 'name';

export const isBracketToken = (token: Token) => token.type === 'bracket';

export const isOpenBracketToken = (
  token: Token,
  { isNormal = false, moment }: { isNormal?: boolean; moment?: Moment } = {},
) => {
  const isBracket = isBracketToken(token) && token.value === '{';
  return isNormal ? isBracket && moment === 'normal' : isBracket;
};

export const isCloseBracketToken = (token: Token) =>
  isBracketToken(token) && token.value === '}';

export const isParenToken = (token: Token) => token.type === 'paren';

export const isOpenParenToken = (token: Token) =>
  isParenToken(token) && token.value === '(';

export const isCloseParenToken = (token: Token) =>
  isParenToken(token) && token.value === ')';

export const isSquareBracketToken = (token: Token) =>
  token.type === 'square_bracket';

export const isOpenSquareBracketToken = (
  token: Token,
  {
    isInsideBracket = false,
    moment,
  }: { isInsideBracket?: boolean; moment?: Moment } = {},
) => {
  const isSquareBracket = isSquareBracketToken(token) && token.value === '[';
  return isInsideBracket
    ? isSquareBracket && moment === 'inside_brackets'
    : isSquareBracket;
};

export const isCloseSquareBracketToken = (token: Token) =>
  isSquareBracketToken(token) && token.value === ']';
