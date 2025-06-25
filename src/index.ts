import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

function flattenObject(obj: any, prefix = ''): Record<string, any> {
  let result: Record<string, any> = {};
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

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

// Example usage (uncomment to use):
// jsonToXlsx(['./src/example.json']);
