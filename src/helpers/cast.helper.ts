export function toNumbersArray(value) {
  if (!value) {
    return value;
  }
  return typeof value === 'object' ? value : value.split(',');
}

export function toBoolean(value) {
  const optionalBooleanMapper = new Map([
    ['null', false],
    [undefined, false],
    ['true', true],
    ['false', false],
  ]);
  return optionalBooleanMapper.get((value || false).toString());
}
export function toBooleanString(value) {
  const optionalBooleanMapper = new Map([
    ['null', 'false'],
    [undefined, 'false'],
    ['true', 'true'],
    ['false', 'false'],
  ]);
  return optionalBooleanMapper.get((value || false).toString());
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
