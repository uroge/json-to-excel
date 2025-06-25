# JSON <-> XLSX Converter CLI

Easily convert between nested JSON files and Excel (XLSX) files with key/value columns, and vice versa.

## Features

- **Convert JSON to XLSX:** Flattens nested JSON keys (e.g., `a.b.c`) and writes them as two columns: `key` and `value`.
- **Convert XLSX to JSON:** Reads an XLSX file with `key`/`value` columns and reconstructs the nested JSON structure.
- **Batch Processing:** Pass multiple files at once.
- **User-friendly CLI:** Clear error messages for missing or invalid files.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/uroge/json-to-excel.git
   cd json-to-excel
   ```
2. **Install dependencies:**
   ```sh
   pnpm install
   ```

## Usage

### Convert JSON to XLSX

```sh
pnpm run cli ./example.json
```

- Produces `example.xlsx` in the same directory.

### Convert XLSX to JSON

```sh
pnpm run cli ./example.xlsx
```

- Produces `example.json` in the same directory.

### Batch Conversion

```sh
pnpm run cli ./file1.json ./file2.json ./file3.xlsx
```

### Supported File Types

- `.json` files are converted to `.xlsx` (flattened keys)
- `.xlsx` files (with `key`/`value` columns) are converted to nested `.json`

## Example

**Input JSON (`example.json`):**

```json
{
  "name": "Alice",
  "address": {
    "city": "Wonderland",
    "zip": 12345
  }
}
```

**Output XLSX:**
| key | value |
|-----------------|------------|
| name | Alice |
| address.city | Wonderland |
| address.zip | 12345 |

**Reverse Conversion:**

- The XLSX above will convert back to the original nested JSON structure.

## Development

- Source code is in the `src/` directory.
- Main CLI entry point: `src/index.ts`
- Helpers are modularized for easy extension and testing.

## License

MIT
