import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { unflattenObject } from './unflattenObject';

export function xlsxToJson(xlsxFilePath: string) {
  const workbook = XLSX.readFile(xlsxFilePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data: { key: string; value: any }[] =
    XLSX.utils.sheet_to_json(worksheet, {
      header: ['key', 'value'],
      range: 1,
    });
  // If the first row is header, skip it
  const filtered = data.filter((row) => row.key && row.key !== 'key');
  const flatObj: Record<string, any> = {};
  filtered.forEach((row) => {
    flatObj[row.key] = row.value;
  });
  const nested = unflattenObject(flatObj);
  const outPath =
    path.basename(xlsxFilePath, path.extname(xlsxFilePath)) + '.json';
  fs.writeFileSync(outPath, JSON.stringify(nested, null, 2), 'utf-8');
  console.log(`Converted ${xlsxFilePath} -> ${outPath}`);
}
