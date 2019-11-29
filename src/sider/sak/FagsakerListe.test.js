/* eslint-disable no-undef */
import React from 'react';

import FagsakerListe from './FagsakerListe';
import mockData from '../../../test/fagsakerMockData';
import * as Nav from '../../utils/navFrontend';


let wrapper;

describe(('FagsakerListe Test Suite'), () => {
  const oppdaterFagsakListe = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<FagsakerListe
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
    describe('Nav.Select', () => {
      it('vises med korrekte props', () => {
        const component = wrapper.find(Nav.Select);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('value', 'ubGEN:a2873465');
        expect(component.props()).toHaveProperty('id', 'id-fagsaker');
      });
      it('har to children med korrekte props', () => {
        const component = wrapper.find('option');
        expect(component.children()).toHaveLength(2);
        expect(component.at(1).text()).toEqual('ubDAG:34243232223');
        expect(component.at(1).props()).toHaveProperty('value', 'ubDAG:34243232223');
        expect(component.at(2).text()).toEqual('ubGEN:a2873465');
        expect(component.at(2).props()).toHaveProperty('value', 'ubGEN:a2873465');
      });
      it('kaller oppdaterFagsakListe ved onChange', () => {
        const component = wrapper.find(Nav.Select);
        component.props().onChange();
        expect(oppdaterFagsakListe).toHaveBeenCalledTimes(1);
      });
    });
  });
});
