const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const inputFile = path.join(__dirname, 'input.json');
const outputFile = path.join(__dirname, 'output.xlsx');

// Flatten function that returns key-value pairs
function flatten(obj, parentKey = '') {
  let items = [];

  for (const key in obj) {
    const value = obj[key];
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (
      typeof value === 'object' &&
      value !== null &&
      !Array.isArray(value)
    ) {
      items = items.concat(flatten(value, fullKey));
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          items = items.concat(flatten(item, `${fullKey}[${index}]`));
        } else {
          items.push({ Key: `${fullKey}[${index}]`, Value: item });
        }
      });
    } else {
      items.push({ Key: fullKey, Value: value });
    }
  }

  return items;
}

function convertToKeyValueTable(jsonObject) {
  let rows = [];

  for (const [topKey, data] of Object.entries(jsonObject)) {
    const flattened = flatten(data, topKey);
    rows = rows.concat(flattened);
  }

  return rows;
}

// Main execution
try {
  const raw = fs.readFileSync(inputFile, 'utf8');
  const jsonData = JSON.parse(raw);

  if (
    !jsonData ||
    typeof jsonData !== 'object' ||
    Array.isArray(jsonData)
  ) {
    throw new Error('Top-level JSON must be an object');
  }

  const keyValueRows = convertToKeyValueTable(jsonData);

  const worksheet = xlsx.utils.json_to_sheet(keyValueRows);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Flattened');
  xlsx.writeFile(workbook, outputFile);

  console.log(`✅ Written to ${outputFile}`);
} catch (err) {
  console.error('❌ Error:', err.message);
}
