import { generateFile } from '../../utils/helper';
import { Metadata } from '@models/metadata';
import { parser } from './parser';
import { tokenizer } from './tokenizer';

export const compile = ({ data, fileName, folder, name, path }: Metadata) => {
  const tokens = tokenizer(data);
  const ast = parser(tokens);
  generateFile(ast, {
    extension: 'json',
    fileName: 'ast',
    folder,
  });
  return null;
};
