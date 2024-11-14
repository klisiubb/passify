export const MAX_HISTORY = 10;

export const generatePassword = (
  length: number,
  uppercase: boolean,
  lowercase: boolean,
  numbers: boolean,
  symbols: boolean
): string => {
  const charset = ([] as string[])
    .concat(uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : [])
    .concat(lowercase ? "abcdefghijklmnopqrstuvwxyz" : [])
    .concat(numbers ? "0123456789" : [])
    .concat(symbols ? "!@#$%^&*()_+{}[]|:;<>,.?/~" : [])
    .join("");

  if (charset.length === 0) {
    return "";
  }

  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (x) => charset[x % charset.length]).join("");
};

export const copyToClipboard = (text: string): Promise<void> => {
  return navigator.clipboard.writeText(text);
};
