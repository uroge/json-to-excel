export function unflattenObject(
  flatObj: Record<string, any>
): Record<string, any> {
  const result: Record<string, any> = {};
  for (const flatKey in flatObj) {
    const value = flatObj[flatKey];
    const keys = flatKey.split('.');
    let curr = result;
    keys.forEach((key, idx) => {
      if (idx === keys.length - 1) {
        curr[key] = value;
      } else {
        if (!(key in curr)) {
          curr[key] = {};
        }
        curr = curr[key];
      }
    });
  }
  return result;
}
