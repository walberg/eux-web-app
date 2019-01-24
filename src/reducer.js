import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dokumenterReducers from './ducks/dokumenter';
import fagsakReducers from './ducks/fagsak';
import kodeverkReducers from './ducks/kodeverk';
import personReducers from './ducks/person';
import rinasakReducers from './ducks/rinasak';
import rinavedleggReducers from './ducks/rinavedlegg';
import saksbehandlerReducers from './ducks/saksbehandler';

export default combineReducers({
  dokumenter: dokumenterReducers,
  fagsaker: fagsakReducers,
  form: formReducer,
  kodeverk: kodeverkReducers,
  person: personReducers,
  rina: combineReducers({
    sak: rinasakReducers,
    vedlegg: rinavedleggReducers,
  }),
  saksbehandler: saksbehandlerReducers,
});
