import { checkFile, readFile } from '~/helpers/file-manager';

type TToken = {
  token: string;
};
export const getToken = (id: number): TToken | null => {
  if (checkFile(`${id}.json`)) {
    const savedToken = JSON.parse(readFile(`${id}.json`));
    return savedToken.token;
  }
  return null;
};
