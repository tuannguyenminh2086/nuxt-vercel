import fs from 'fs';
import { join, resolve } from 'path';

const __dirname = process.cwd();
export const readFile = (name: string): any => {
  return fs.readFileSync(resolve(join(__dirname, '/.file'), name));
};

export const writeFile = (name: string, content: any) => {
  if (!checkFolder()) {
    fs.mkdirSync(resolve(join(__dirname, '/.file')));
  }
  return fs.writeFileSync(resolve(join(__dirname, '/.file'), name), content);
};

export const checkFile = (name: string): boolean => {
  if (checkFolder()) {
    return fs.existsSync(resolve(join(__dirname, '/.file'), name));
  }
  return checkFolder();
};
export const checkFolder = (): boolean => {
  return fs.existsSync(resolve(join(__dirname, '/.file')));
};
export const removeFile = (name: string) => {
  return fs.unlinkSync(resolve(join(__dirname, '/.file'), name));
};
