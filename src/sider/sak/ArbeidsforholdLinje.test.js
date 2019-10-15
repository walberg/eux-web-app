/* eslint-disable no-undef */
import React from 'react';

import ArbeidsforholdLinje from './ArbeidsforholdLinje';
import * as Nav from '../../utils/navFrontend';
import * as datoUtils from '../../utils/dato';


let wrapper;

describe(('ArbeidsforholdLinje Test Suite'), () => {
  const arbeidsforholdKlikkHandler = jest.fn();
  const arbeidsforholdet = {
    ansettelsesPeriode: { fom: '2011-09-12', tom: '2018-01-12' },
    arbeidsforholdIDnav: 45138102,
    navn: 'SKANSKA NORGE AS',
    orgnr: '943049467',
  };
  beforeEach(() => {
    datoUtils.formatterDatoTilNorsk = jest.fn(() => '12.12.2012');
    wrapper = shallow(<ArbeidsforholdLinje
      arbeidsforholdKlikkHandler={arbeidsforholdKlikkHandler}
      arbeidsforholdet={arbeidsforholdet}
      erValgt />);
  });
  afterEach(() => {
    datoUtils.formatterDatoTilNorsk.mockReset();
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    describe('Nav.Column', () => {
      it('viser children med riktige props', () => {
        const component = wrapper.find({ style: { width: '20%', marginBottom: '0.5em' } });
        expect(component.children().at(0).text()).toEqual('SKANSKA NORGE AS');
        expect(component.children().at(3).text()).toEqual('943049467');
      });
      it('formatterer dato til norsk', () => {
        const component = wrapper.find({ style: { width: '20%', marginBottom: '0.5em' } });
        expect(datoUtils.formatterDatoTilNorsk).toHaveBeenCalledTimes(2);
        expect(datoUtils.formatterDatoTilNorsk).toHaveBeenCalledWith('2011-09-12');
        expect(component.children().at(6).text()).toEqual('12.12.2012');
        expect(component.children().at(9).text()).toEqual('12.12.2012');
      });
    });
    describe('Nav.Checkbox', () => {
      it('setter checked prop basert på erValgt', () => {
        const component = wrapper.find(Nav.Checkbox);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('checked', true);
      });
      it('og kaller handler med korrekt arg ved onChange', () => {
        const component = wrapper.find(Nav.Checkbox);
        component.props().onChange();
        expect(arbeidsforholdKlikkHandler).toHaveBeenCalledTimes(1);
        expect(arbeidsforholdKlikkHandler).toHaveBeenCalledWith(45138102);
      });
    });
  });
});
