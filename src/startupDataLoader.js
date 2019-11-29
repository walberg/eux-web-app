import * as Utils from './utils';
import { KodeverkOperations } from './ducks/kodeverk/';
import { saksbehandlerOperations, saksbehandlerTypes } from './ducks/saksbehandler/';
import { ServerinfoOperations } from './ducks/serverinfo/';

export default async function loadInitialData(store) {
  let res;
  try {
    window.frontendlogger.info(Utils.buildinfo());
    await store.dispatch(KodeverkOperations.preload());
    await store.dispatch(ServerinfoOperations.hent());
    res = await store.dispatch(saksbehandlerOperations.hent());
    if (res && res.type === saksbehandlerTypes.OK) {
      window.frontendlogger.info(res.data.brukernavn);
    }
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    window.frontendlogger.error({
      e,
      stack: e.stack,
      res,
    });
  }
}
