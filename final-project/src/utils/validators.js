export const isRequired = value =>
  value !== undefined &&
  value !== null &&
  value.toString().trim().length > 0;

export const isPostalCode = value =>
  /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(value);
