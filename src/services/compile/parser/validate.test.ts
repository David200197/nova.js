import { Moment } from '@models/node';
import { Token } from '@models/token';
import { describe, expect, it } from 'vitest';
import {
  isBooleanToken,
  isEndLine,
  isInsideBracketsMoment,
  isLowerCaseNameToken,
  isNumberToken,
  isStringToken,
} from './validate';

describe('validate', () => {
  describe('isInsideBracketsMoment', () => {
    it('Should be retun true', () => {
      const moment: Moment = 'inside_brackets';

      const result = isInsideBracketsMoment(moment);

      expect(result).toEqual(true);
    });
    it('Should be retun false', () => {
      const insideParenesult = isInsideBracketsMoment('inside_paren');
      const insideSquareResult = isInsideBracketsMoment(
        'inside_square_brackets',
      );
      const normalResult = isInsideBracketsMoment('normal');
      expect(insideParenesult).toEqual(false);
      expect(insideSquareResult).toEqual(false);
      expect(normalResult).toEqual(false);
    });
  });
  describe('isEndLine', () => {
    it('Should be return true when is lower case name token inside bracket', () => {
      const result = isEndLine(
        { type: 'name', value: 'test' },
        'inside_brackets',
      );
      expect(result).toEqual(true);
    });
    it('Should be return true when is close bracket token inside bracket', () => {
      const result = isEndLine(
        { type: 'bracket', value: '}' },
        'inside_brackets',
      );
      expect(result).toEqual(true);
    });
    it('Should be return true when is close square bracket token inside bracket', () => {
      const result = isEndLine(
        { type: 'square_bracket', value: ']' },
        'inside_brackets',
      );
      expect(result).toEqual(true);
    });
    it('Should be return false when is not close with bracket', () => {
      const result = isEndLine(
        { type: 'bracket', value: '{' },
        'inside_brackets',
      );
      expect(result).toEqual(false);
    });
    it('Should be return false when is not close with square bracket', () => {
      const result = isEndLine(
        { type: 'square_bracket', value: '[' },
        'inside_brackets',
      );
      expect(result).toEqual(false);
    });
    it('Should be return false when is lower case name token not inside bracket', () => {
      const result = isEndLine({ type: 'name', value: 'test' }, 'inside_paren');
      expect(result).toEqual(false);
    });
    it('Should be return false when is close bracket token not inside bracket', () => {
      const result = isEndLine({ type: 'bracket', value: '}' }, 'inside_paren');
      expect(result).toEqual(false);
    });
    it('Should be return false when is close square bracket token not inside bracket', () => {
      const result = isEndLine(
        { type: 'square_bracket', value: ']' },
        'inside_paren',
      );
      expect(result).toEqual(false);
    });
    it('Should be return false when is not correct args', () => {
      const result = isEndLine({ type: 'colon', value: ',' }, 'inside_paren');
      expect(result).toEqual(false);
    });
  });
  describe('isLowerCaseNameToken', () => {
    it('Should be true when name is lower case', () => {
      const token: Token = { type: 'name', value: 'test' };

      const response = isLowerCaseNameToken(token);

      expect(response).toEqual(true);
    });
    it('Should be false when name is not lower case', () => {
      const token: Token = { type: 'name', value: 'Test' };

      const response = isLowerCaseNameToken(token);

      expect(response).toEqual(false);
    });
    it('Should be false when is not name', () => {
      const token: Token = { type: 'bracket', value: '}' };

      const response = isLowerCaseNameToken(token);

      expect(response).toEqual(false);
    });
  });
  describe('isStringToken', () => {
    it('Should be true if the response is string', () => {
      const token: Token = { type: 'string', value: 'test' };

      const response = isStringToken(token);

      expect(response).toEqual(true);
    });
    it('Should be false if the response is not string', () => {
      const token: Token = { type: 'number', value: 'test' };

      const response = isStringToken(token);

      expect(response).toEqual(false);
    });
  });
  describe('isNumberToken', () => {
    it('Should be true if the response is number', () => {
      const token: Token = { type: 'number', value: 'test' };

      const response = isNumberToken(token);

      expect(response).toEqual(true);
    });
    it('Should be false if the response is not number', () => {
      const token: Token = { type: 'string', value: 'test' };

      const response = isNumberToken(token);

      expect(response).toEqual(false);
    });
  });
  describe('isBooleanToken', () => {
    it('Should be true if the value is "true"', () => {
      const token: Token = { type: 'name', value: 'true' };

      const response = isBooleanToken(token);

      expect(response).toEqual(true);
    });
    it('Should be true if the value is "false"', () => {
      const token: Token = { type: 'name', value: 'false' };

      const response = isBooleanToken(token);

      expect(response).toEqual(true);
    });
    it('Should be false if the value is not "true" or "false"', () => {
      const token: Token = { type: 'name', value: 'hello' };

      const response = isBooleanToken(token);

      expect(response).toEqual(false);
    });
    it('Should be false if the type is not name', () => {
      const token: Token = { type: 'string', value: 'true' };

      const response = isBooleanToken(token);

      expect(response).toEqual(false);
    });
  });
});
