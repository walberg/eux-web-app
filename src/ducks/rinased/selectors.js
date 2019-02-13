/**
 * Selectors
 * -----------------------------------------------------------------------------------------
 * Målet med selectorer er å samle funksjonalitet som behandler, itererer og omformer
 * data slik at denne logikken kan benyttes flere steder i applikasjonen - ikke bare ett sted.
 */

import { createSelector } from 'reselect';

// selector(s)
export const sedSelector = createSelector(
  state => (state.rina.sed.data ? state.rina.sed.data : {}),
  sed => sed || {}
);
export const sedStatusSelector = createSelector(
  state => (state.rina.sed.status ? state.rina.sed.status : ''),
  status => status || ''
);

export const errorDataSedSelector = createSelector(
  state => (state.rina.sed.status === 'ERROR' ? state.rina.sed.data : {}),
  data => (data.data ? JSON.parse(data.data) : {})
);
