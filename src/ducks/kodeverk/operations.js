/**
 * Operations
 * ----------------------------------------------------------------------------------
 * Dette er Thunk-operasjoner som muliggjør asynkrone kall mot Redux
 * ved å returnere en action-generatoren som en egen funksjon. Denne kjøres deretter
 * når det asynkrone kallet, feks fra API'et er ferdigkjørt.
 *
 */

import { doThenDispatch } from '../../services/utils';
import * as Api from '../../services/api';
import * as Types from './types';
import kodeverk from '../../kodeverk.json';

// eslint-disable-next-line import/prefer-default-export
export function hent() {
  return doThenDispatch(() => Api.Kodeverk.hent(), {
    OK: Types.OK,
    FEILET: Types.FEILET,
    PENDING: Types.PENDING,
  });
}

export function preload() {
  return {
    type: Types.PRELOAD,
    data: kodeverk,
  };
}
