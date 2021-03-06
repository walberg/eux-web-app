/**
 * Selectors
 * -----------------------------------------------------------------------------------------
 * Målet med selectorer er å samle funksjonalitet som behandler, itererer og omformer
 * data slik at denne logikken kan benyttes flere steder i applikasjonen - ikke bare ett sted.
 */

import { createSelector } from 'reselect';
import { KodeverkSelectors } from '../kodeverk';
import { FormSelectors } from '../form';

// selector(s)
export const sakSelector = createSelector(
  state => (state.rina.sak.data ? state.rina.sak.data : {}),
  sak => sak || {}
);
export const sakStatusSelector = createSelector(
  state => (state.rina.sak.status ? state.rina.sak.status : ''),
  status => status || ''
);

export const errorDataSakSelector = createSelector(
  state => (state.rina.sak.status === 'ERROR' ? state.rina.sak.data : {}),
  data => (data.data ? JSON.parse(data.data) : {})
);

export const buctyperSelector = createSelector(
  state => KodeverkSelectors.kodemapsSelector(state),
  state => KodeverkSelectors.alleBUCtyperSelector(state),
  state => FormSelectors.valgtSektorSelector(state),
  (kodemaps, buctyper, valgtSektor) => {
    if (!kodemaps) { return []; }
    if (!valgtSektor) { return []; }
    return buctyper[kodemaps.SEKTOR2BUC[valgtSektor]];
  }
);

export const sedtyperSelector = createSelector(
  state => FormSelectors.valgtSektorSelector(state),
  state => KodeverkSelectors.kodemapsSelector(state),
  state => KodeverkSelectors.alleSEDtyperSelector(state),
  state => FormSelectors.valgtBucTypeSelector(state),
  (valgtSektor, kodemaps, sedKodeverk, valgtBucType) => {
    if (!kodemaps) { return []; }
    if (!valgtBucType) { return []; }
    const sedtyper = kodemaps.BUC2SEDS[valgtSektor][valgtBucType];
    if (!(sedtyper && sedtyper.length)) return [];
    return sedtyper.reduce((acc, curr) => {
      const kode = sedKodeverk.find(elem => elem.kode === curr);
      acc.push(kode);
      return acc;
    }, []);
  }
);
