import { jsonToXlsx } from './jsonToXlsx';
import { xlsxToJson } from './xlsxToJson';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: pnpm start <file1> [file2 ...]');
  process.exit(1);
}

args.forEach((file) => {
  if (file.endsWith('.json')) {
    jsonToXlsx([file]);
  } else if (file.endsWith('.xlsx')) {
    xlsxToJson(file);
  } else {
    console.log(`Unsupported file type: ${file}`);
  }
});
