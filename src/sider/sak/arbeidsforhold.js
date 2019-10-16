import React from 'react';
import { FieldArray } from 'redux-form';

import ArbeidsforholdListe from './ArbeidsforholdListe';


const Arbeidsforhold = props => (
  <div className="arbeidsforhold" data-cy="arbeidsforhold-liste">
    <FieldArray name="tilleggsopplysninger.arbeidsforhold" component={ArbeidsforholdListe} props={props} />
  </div>
);

export default Arbeidsforhold;
