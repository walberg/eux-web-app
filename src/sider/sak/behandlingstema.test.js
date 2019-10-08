/* eslint-disable no-undef */
import React from 'react';

import { BehandlingsTemaer } from './behandlingstema';
import * as Nav from '../../utils/navFrontend';


let wrapper;

describe(('BehandlingsTemaer Test Suite'), () => {
  const oppdaterTemaListe = jest.fn();
  const tema = 'BAR';
  const temaer = [
    { kode: 'GEN', term: 'Generell' },
    { kode: 'BAR', term: 'Barnetrygd' },
    { kode: 'KON', term: 'Kontantstøtte' },
  ];
  beforeEach(() => {
    wrapper = shallow(<BehandlingsTemaer oppdaterTemaListe={oppdaterTemaListe} tema={tema} temaer={temaer} />);
  });
  afterEach(() => {
    oppdaterTemaListe.mockClear();
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    describe('Nav.Select', () => {
      it('vises med korrekte props', () => {
        const component = wrapper.find(Nav.Select);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('id', 'id-behandlings-tema');
        expect(component.props()).toHaveProperty('value', 'BAR');
      });
      it('kaller oppdaterTemaListe ved onChange', () => {
        const component = wrapper.find(Nav.Select);
        component.props().onChange();
        expect(oppdaterTemaListe).toHaveBeenCalledTimes(1);
      });
      it('har tre children med korrekte props', () => {
        const component = wrapper.find('option');
        expect(component.children()).toHaveLength(3);
        expect(component.at(2).text()).toEqual('Barnetrygd');
      });
    });
  });
});
