import { dirname } from './env';
import fg from 'fast-glob';
import { getMetadata } from './services/get-metadata';
import { kompoCompile } from './services/kompo-compile';

const checkPath = (path: string) => {
  const metadata = getMetadata(path);
  console.log(metadata);
  kompoCompile();
};

const bootstrap = async () => {
  const paths = await fg([`${dirname}/**/*.kompo`], { dot: true });
  paths.map(checkPath);
};
bootstrap();
