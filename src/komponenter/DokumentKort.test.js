/* eslint-disable no-undef */
import React from 'react';

import { DokumentKort } from '../komponenter';
import * as Skjema from '../felles-komponenter/skjema';
import mockData from '../../test/dokumentsokMockData';


let wrapper;

describe(('DokumentKort Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<DokumentKort dokumenter={mockData.dokumenter} />);
  });
  it('somketest', () => {
    expect(wrapper).toHaveLength(1);
  });
  describe('skjema select - id-rinadokument', () => {
    it('har korrekte props', () => {
      wrapper.setProps({ fnrErGyldig: true, fnrErSjekket: true });
      const component = wrapper.find(Skjema.Select);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('id', 'id-rinadokument');
      expect(component.props()).toHaveProperty('label', 'Velg SED Type');
    });
    it('viser dokumentinformasjon hvis tilgjengelig', () => {
      const component = wrapper.find('option');
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('value', '760c632d67da4bc');
    });
    // Venter med denne testen da mockdata ikke har noe opprettetdato-felt for rinasaker foreløpig
    // it('viser dato i korrekt format', () => {
    //   const component = wrapper.find('option');
    //   expect(component.children().at(2).text()).toEqual('2019-10-03');
    // });
  });
});
