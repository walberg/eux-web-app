/* eslint-disable no-undef */
import React from 'react';
import { FieldArray } from 'redux-form';

import Arbeidsforhold from './arbeidsforhold';
import ArbeidsforholdListe from './ArbeidsforholdListe';

let wrapper;

describe(('Arbeidsforhold Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<Arbeidsforhold props="props" />);
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('FieldArray vises med korrekte props', () => {
      const component = wrapper.find(FieldArray);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('component', ArbeidsforholdListe);
      expect(component.props()).toHaveProperty('props', { props: 'props' });
    });
  });
});

