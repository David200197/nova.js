import { basename } from 'path';
import { readFileSync } from 'fs';

export const getMetadata = (path: string) => {
  const fileName = basename(path);
  const folder = path.replace(`/${fileName}`, '');
  const [name] = fileName.split('.');
  const data = readFileSync(path, { encoding: 'utf-8' });
  return { path, fileName, folder, data, name };
};
