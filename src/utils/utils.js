import moment from 'moment';

const versjon = (process.env.REACT_APP_VERSION ? `v${process.env.REACT_APP_VERSION}` : '(ukjent)');
const byggTidspunkt = process.env.REACT_APP_BUILD_DATETIME || '(ukjent)';
const byggVersjon = process.env.REACT_APP_BUILD_VERSION || '(ukjent)';
const branchVersjon = process.env.REACT_APP_BRANCH_NAME || '(lokal)';

export function buildinfo() {
  if (byggVersjon === 'local') {
    return {
      versjon,
      byggTidspunkt: moment(),
      byggVersjon,
      branchVersjon,
    };
  }
  return {
    versjon,
    byggTidspunkt,
    byggVersjon,
    branchVersjon,
  };
}
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
/**
 * parser et funksjonsargument som funksjon.
 * @param value
 * @returns {*}
 */
export function fn(value) {
  return typeof value === 'function' ? value : () => value;
}

/**
 * Sjekker at input string er i JSON string format
 * @param str
 * @returns {*}
 */
export const isJSON = str => {
  try {
    return (JSON.parse(str) && !!str);
  } catch (e) {
    return false;
  }
};

/**
 * Returnerer ny string hvor hver forbokstav er stor
 * @param {string} setning
 * @return {string}
 */
export const storeForbokstaver = setning => setning
  .split(' ')
  .map(e => (e.substring(0, 1).toUpperCase() + e.substring(1)))
  .join(' ');

/**
 * eksponering av location API
 */
export const location = {
  reload: forcedReload => window.location.reload(forcedReload),
  assign: DOMString => window.location.assign(DOMString),
  replace: DOMString => window.location.replace(DOMString),
};
