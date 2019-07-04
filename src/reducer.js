import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import institusjonReducer from './ducks/institusjoner';
import arbeidsforholdReducers from './ducks/arbeidsforhold';
import dokumenterReducers from './ducks/dokumenter';
import fagsakReducers from './ducks/fagsak';
import kodeverkReducers from './ducks/kodeverk';
import landkoderReducers from './ducks/landkoder';
import personReducers from './ducks/person';
import rinasakReducers from './ducks/rinasak';
import rinavedleggReducers from './ducks/rinavedlegg';
import saksbehandlerReducers from './ducks/saksbehandler';
import serverinfoReducers from './ducks/serverinfo';

export default combineReducers({
  institusjoner: institusjonReducer,
  arbeidsforhold: arbeidsforholdReducers,
  dokumenter: dokumenterReducers,
  fagsaker: fagsakReducers,
  form: formReducer,
  kodeverk: kodeverkReducers,
  landkoder: landkoderReducers,
  person: personReducers,
  rina: combineReducers({
    sak: rinasakReducers,
    vedlegg: rinavedleggReducers,
  }),
  saksbehandler: saksbehandlerReducers,
  serverinfo: serverinfoReducers,
});
