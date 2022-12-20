import { dirname } from './env';
import fg from 'fast-glob';
import { getMetadata } from './services/get-metadata';
import { compile } from './services/compile';

const checkPath = (path: string) => {
  const metadata = getMetadata(path);
  compile(metadata);
};

const bootstrap = async () => {
  const extension = 'nova';
  const paths = await fg(
    [`${dirname}/**/*.${extension}`, `${dirname}/*.${extension}`],
    {
      dot: true,
    },
  );
  paths.map(checkPath);
};
bootstrap();
