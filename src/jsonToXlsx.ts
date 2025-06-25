import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';
import { flattenObject } from './flattenObject';

export function jsonToXlsx(jsonFilePaths: string[]) {
  jsonFilePaths.forEach((jsonFilePath) => {
    const raw = fs.readFileSync(jsonFilePath, 'utf-8');
    const json = JSON.parse(raw);
    const flat = flattenObject(json);
    const data = Object.entries(flat).map(([key, value]) => ({
      key,
      value,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data, {
      header: ['key', 'value'],
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const outPath =
      path.basename(jsonFilePath, path.extname(jsonFilePath)) +
      '.xlsx';
    XLSX.writeFile(workbook, outPath);
    console.log(`Converted ${jsonFilePath} -> ${outPath}`);
  });
}
