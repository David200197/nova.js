import { Token } from '@models/token';

export const tokenizer = (input: string) => {
  const currentInput = ` ${input} `;
  let current = 0;
  const tokens: Token[] = [];

  while (current < currentInput.length) {
    let char = currentInput[current];

    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }
    if (char === '#') {
      char = currentInput[++current];
      while (char !== '#') {
        char = currentInput[++current];
      }
      current++;
      continue;
    }

    if (char === '{' || char === '}') {
      tokens.push({
        type: 'bracket',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '(' || char === ')') {
      tokens.push({
        type: 'paren',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '[' || char === ']') {
      tokens.push({
        type: 'square_bracket',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '=') {
      tokens.push({
        type: 'equal',
        value: char,
      });
      current++;
      continue;
    }

    if (char === ':') {
      tokens.push({
        type: 'colon',
        value: char,
      });
      current++;
      continue;
    }

    if (char === '?') {
      tokens.push({
        type: 'question_mark',
        value: char,
      });
      current++;
      continue;
    }

    if (char === ',') {
      tokens.push({
        type: 'comma',
        value: char,
      });
      current++;
      continue;
    }

    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = currentInput[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }

    if (char === '"') {
      let value = '';
      char = currentInput[++current];
      while (char !== '"') {
        value += char;
        char = currentInput[++current];
      }
      current++;
      tokens.push({ type: 'string', value });
      continue;
    }

    const LETTERS = /[a-z]/i;
    if (char === '@' || LETTERS.test(char)) {
      let value = '';
      if (char === '@') {
        value += char;
        char = currentInput[++current];
      }
      while (LETTERS.test(char)) {
        value += char;
        char = currentInput[++current];
      }
      tokens.push({ type: 'name', value });
      continue;
    }

    throw new TypeError(
      '[nova:001]: I dont know what this character is: ' + char,
    );
  }

  return tokens;
};
