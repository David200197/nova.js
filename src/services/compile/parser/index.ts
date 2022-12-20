import { startsWithLowercase } from '../../../helpers/validation';
import { Token } from '@models/token';
import { Node } from '@models/node';
import { Ats } from '@models/ats';

type Moment = 'normal' | 'inside_brackets' | 'inside_paren';

export const parser = (tokens: Token[]): Ats => {
  let current = 0;
  const walk = (mode: Moment = 'normal'): Node => {
    let token = tokens[current];
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }
    if (token.type === 'string') {
      current++;
      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }
    if (
      token.type === 'name' &&
      (token.value === 'true' || token.value === 'false')
    ) {
      current++;
      return {
        type: 'BooleanLiteral',
        value: token.value,
      };
    }
    if (token.type === 'name' && token.value === 'null') {
      current++;
      return {
        type: 'NullLiteral',
        value: token.value,
      };
    }
    if (token.type === 'comma') {
      current++;
      return {
        type: 'Separator',
        value: ',',
      };
    }
    if (token.type === 'colon') {
      current++;
      return {
        type: 'Separator',
        value: ':',
      };
    }
    if (token.type === 'equal') {
      current++;
      const node: Node = {
        type: 'Block',
        value: '=',
        children: walk(mode),
      };
      return node;
    }
    if (token.type === 'question_mark') {
      current++;
      const node: Node = {
        type: 'Block',
        value: '?',
        children: null,
      };
      const nextToken = tokens[current];
      if (
        !startsWithLowercase(nextToken.value) &&
        nextToken.type !== 'bracket'
      ) {
        node.children = walk(mode);
      }
      return node;
    }
    if (token.type === 'name') {
      current++;
      const nextToken = tokens[current];
      if (mode === 'normal') {
        const node: Node = {
          type: 'Block',
          value: token.value,
          children: walk(mode),
        };
        return node;
      }
      if (mode === 'inside_paren' && nextToken.type === 'colon') {
        const node: Node = {
          type: 'Property',
          value: token.value,
        };
        return node;
      }
      const node: Node = {
        type: 'Block',
        value: token.value,
        children: null,
      };
      if (
        !startsWithLowercase(nextToken.value) &&
        nextToken.type !== 'bracket'
      ) {
        node.children = walk(mode);
      }
      return node;
    }
    if (token.type === 'bracket' && token.value === '{') {
      const node: Node = {
        type: mode === 'inside_paren' ? 'Object' : 'Fields',
        params: [],
      };
      token = tokens[++current];
      while (
        token.type !== 'bracket' ||
        (token.type === 'bracket' && token.value !== '}')
      ) {
        node.params.push(
          walk(mode === 'inside_paren' ? mode : 'inside_brackets'),
        );
        token = tokens[current];
      }
      current++;
      return node;
    }
    if (token.type === 'paren' && token.value === '(') {
      const node: Node = {
        type: 'Params',
        params: [],
        children: null,
      };
      token = tokens[++current];
      while (
        token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk('inside_paren'));
        token = tokens[current];
      }
      current++;
      const nextToken = tokens[current];
      if (
        !startsWithLowercase(nextToken.value) &&
        nextToken.type !== 'bracket'
      ) {
        node.children = walk(mode);
      }
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
