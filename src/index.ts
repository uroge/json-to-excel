/**
 * JSON <-> XLSX Converter CLI
 *
 * Usage:
 *   pnpm run cli <file1> [file2 ...]
 *
 * Examples:
 *   pnpm run cli ./example.json
 *   pnpm run cli ./example.xlsx
 *   pnpm run cli ./file1.json ./file2.json ./file3.xlsx
 *
 * - Pass one or more .json or .xlsx files as arguments.
 * - .json files will be converted to .xlsx (flattened keys).
 * - .xlsx files (with key/value columns) will be converted to nested .json.
 */
import { jsonToXlsx } from './jsonToXlsx';
import { xlsxToJson } from './xlsxToJson';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage: pnpm run cli <file1> [file2 ...]');
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
