import { Token } from '@models/token';
import { Moment, Node } from '@models/node';
import { Ats } from '@models/ats';
import {
  isBooleanToken,
  isOpenBracketToken,
  isColonToken,
  isCommaToken,
  isEndLine,
  isEqualToken,
  isNameToken,
  isNullToken,
  isNumberToken,
  isOpenParenToken,
  isPropertyToken,
  isQuestionMarkToken,
  isStringToken,
  isCloseBracketToken,
  isCloseParenToken,
  isBracketToken,
  isInsideBracketsMoment,
  isLowerCaseNameToken,
  isParenToken,
} from './validate';

export const parser = (tokens: Token[]): Ats => {
  let current = 0;
  const walk = (moment: Moment = 'normal'): Node => {
    let token = tokens[current];
    const nextToken = tokens[current + 1];

    if (isEndLine(token, moment)) {
      return {
        type: 'EndLine',
      };
    }

    if (isNumberToken(token)) {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }

    if (isStringToken(token)) {
      current++;
      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if (isBooleanToken(token)) {
      current++;
      return {
        type: 'BooleanLiteral',
        value: token.value,
      };
    }

    if (isNullToken(token)) {
      current++;
      return {
        type: 'NullLiteral',
        value: token.value,
      };
    }

    if (isCommaToken(token) || isColonToken(token)) {
      current++;
      return {
        type: 'Separator',
        value: token.value,
      };
    }

    if (isPropertyToken(token, nextToken, moment)) {
      current++;
      const node: Node = {
        type: 'Property',
        value: token.value,
      };
      return node;
    }

    if (
      isEqualToken(token) ||
      isQuestionMarkToken(token) ||
      isNameToken(token)
    ) {
      current++;
      const node: Node = {
        type: 'Block',
        value: token.value,
        children: walk(moment),
      };
      return node;
    }

    if (isOpenBracketToken(token) && isCloseBracketToken(nextToken)) {
      current++;
      current++;
      let node: Node;
      if (isInsideBracketsMoment(moment)) {
        node = {
          type: 'Fields',
          params: [],
        };
      } else {
        node = {
          type: 'Object',
          params: [],
        };
      }
      return node;
    }

    if (isOpenBracketToken(token, { isNormal: true, moment })) {
      const node: Node = {
        type: 'Fields',
        params: [],
      };
      token = tokens[++current];
      while (
        !isBracketToken(token) ||
        (isBracketToken(token) && !isCloseBracketToken(token))
      ) {
        current++;
        if (isNameToken(token) && isLowerCaseNameToken(token)) {
          node.params.push({
            type: 'Block',
            value: token.value,
            children: walk('inside_brackets'),
          });
          token = tokens[current];
          continue;
        }
        node.params.push(walk('inside_brackets'));
        token = tokens[current];
      }
      current++;
      return node;
    }

    if (isOpenBracketToken(token)) {
      const node: Node = {
        type: 'Object',
        params: [],
      };
      token = tokens[++current];
      while (
        !isBracketToken(token) ||
        (isBracketToken(token) && !isCloseBracketToken(token))
      ) {
        node.params.push(walk(moment));
        token = tokens[current];
      }
      current++;
      return node;
    }

    if (isOpenParenToken(token) && isCloseParenToken(nextToken)) {
      current++;
      current++;
      const node: Node = {
        type: 'Params',
        params: [],
        children: null,
      };
      return node;
    }

    if (isOpenParenToken(token)) {
      const node: Node = {
        type: 'Params',
        params: [],
        children: null,
      };
      token = tokens[++current];
      while (
        !isParenToken(token) ||
        (isBracketToken(token) && !isCloseBracketToken(token))
      ) {
        node.params.push(walk('inside_paren'));
        token = tokens[current];
      }
      current++;
      node.children = walk(moment);
      return node;
    }

    throw new TypeError(
      `[nova:002]: token error "${token.type}" with value: "${token.value}"`,
    );
  };

  const ast: Ats = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};
