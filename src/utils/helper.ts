import { writeFileSync } from 'fs';
import path from 'path';

type Options = {
  fileName: string;
  extension: string;
  folder: string;
};
export const generateFile = <Data>(
  data: Data,
  { fileName, extension, folder }: Options,
) => {
  const dataStringify = JSON.stringify(data);
  writeFileSync(path.join(folder, `${fileName}.${extension}`), dataStringify);
};
