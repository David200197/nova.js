import { Token } from '@models/token';
import { describe, expect, it } from 'vitest';
import { tokenizer } from '.';

describe('tokenizer', () => {
  it('should return a name value', () => {
    const value = 'test';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'name',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a name value with @', () => {
    const value = '@test';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'name',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a string value', () => {
    const value = 'test';
    const [token] = tokenizer(` "${value}" `);

    const expected: Token = {
      type: 'string',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a number value', () => {
    const value = '1234';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'number',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a equal value', () => {
    const value = '=';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'equal',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a colon value', () => {
    const value = ':';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'colon',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a comment value', () => {
    const value = '#this is a comment#';
    const [token] = tokenizer(value);

    expect(token).toBeUndefined();
  });
  it('should return a question mark value', () => {
    const value = '?';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'question_mark',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a comma value', () => {
    const value = ',';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'comma',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a bracket left value', () => {
    const value = '{';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'bracket',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a bracket rigth value', () => {
    const value = '}';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'bracket',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a paren left value', () => {
    const value = '(';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'paren',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a paren rigth value', () => {
    const value = ')';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'paren',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a square bracket left value', () => {
    const value = '[';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'square_bracket',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return a square bracket rigth value', () => {
    const value = ']';
    const [token] = tokenizer(value);

    const expected: Token = {
      type: 'square_bracket',
      value,
    };

    expect(token).toEqual(expected);
  });
  it('should return multiple values', () => {
    const value = `
      [ ( { @test test "test" 123 ? = , : #this is a comment# } ) ]
    `;
    const tokens = tokenizer(value);

    const expected: Token[] = [
      {
        type: 'square_bracket',
        value: '[',
      },
      {
        type: 'paren',
        value: '(',
      },
      {
        type: 'bracket',
        value: '{',
      },
      {
        type: 'name',
        value: '@test',
      },
      {
        type: 'name',
        value: 'test',
      },
      {
        type: 'string',
        value: 'test',
      },
      {
        type: 'number',
        value: '123',
      },

      {
        type: 'question_mark',
        value: '?',
      },
      {
        type: 'equal',
        value: '=',
      },
      {
        type: 'comma',
        value: ',',
      },
      {
        type: 'colon',
        value: ':',
      },
      {
        type: 'bracket',
        value: '}',
      },
      {
        type: 'paren',
        value: ')',
      },
      {
        type: 'square_bracket',
        value: ']',
      },
    ];

    expect(tokens).toEqual(expected);
  });
  it('should throw a error with a no-valid value', () => {
    const value = '_';
    try {
      tokenizer(value);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });
});
