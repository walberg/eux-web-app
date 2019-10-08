/* eslint-disable no-undef */
import React from 'react';

import { Fagsaker } from './fagsaker';
import FagsakerListe from './FagsakerListe';
import mockData from '../../../test/fagsakerMockData';


let wrapper;

describe(('Fagsaker Test Suite'), () => {
  const oppdaterFagsakListe = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<Fagsaker
      fagsaker={mockData.fagsaker}
      saksID="ubGEN:a2873465"
      oppdaterFagsakListe={oppdaterFagsakListe} />);
  });
  afterEach(() => {
    oppdaterFagsakListe.mockClear();
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('viser FagsakerListe med korrekte proips', () => {
      const component = wrapper.find(FagsakerListe);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('fagsaker', mockData.fagsaker);
      expect(component.props()).toHaveProperty('saksID', 'ubGEN:a2873465');
    });
  });
});
