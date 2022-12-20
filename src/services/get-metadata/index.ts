import { basename } from 'path';
import { readFileSync } from 'fs';
import { Metadata } from 'models/metadata';

export const getMetadata = (path: string): Metadata => {
  const fileName = basename(path);
  const folder = path.replace(`/${fileName}`, '');
  const [name] = fileName.split('.');
  const data = readFileSync(path, { encoding: 'utf-8' });
  return { path, fileName, folder, data, name };
};
