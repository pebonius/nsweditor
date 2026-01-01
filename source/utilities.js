export const isColor = (color) => {
  return CSS.supports("color", color);
};

export const stringContainsAlphanumericOnly = (str) => {
  return /^[0-9A-Z]+$/i.test(str);
};

export const stringContainsNumericOnly = (str) => {
  return /^[0-9]+$/i.test(str);
};
