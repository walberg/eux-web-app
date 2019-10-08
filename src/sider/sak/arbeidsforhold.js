import React from 'react';
import { FieldArray } from 'redux-form';

import ArbeidsforholdListe from './ArbeidsforholdListe';


const Arbeidsforhold = props => (
  <div className="arbeidsforhold">
    <FieldArray name="tilleggsopplysninger.arbeidsforhold" component={ArbeidsforholdListe} props={props} />
  </div>
);

export default Arbeidsforhold;
