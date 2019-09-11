import { toInteger, isEmpty } from 'lodash';

export const boolTilNorsk = value => (value ? 'JA' : 'NEI');

export const norskTilBool = value => (value ? (value.toLowerCase() === 'ja') : false);

export const boolTilStreng = value => {
  if (value === undefined || value === null) { return undefined; }
  return value ? 'true' : 'false';
};

export const strengTilBool = value => value === 'true';

export const tryParseBool = value => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value; // undefined, null, bool
};

export const strengTilInt = value => toInteger(value);

export const tekstEllerDash = data => data || '-';

export const sammensattNavn = (fornavn, etternavn) => ((isEmpty(fornavn) || isEmpty(etternavn)) ? undefined : `${fornavn} ${etternavn}`);
