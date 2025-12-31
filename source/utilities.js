export const isColor = (color) => {
  return CSS.supports("color", color);
};

export const stringContainsAlphanumericOnly = (str) => {
  return /^[0-9A-Z]+$/i.test(str);
};
