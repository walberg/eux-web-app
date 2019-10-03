/* eslint-disable no-undef */
import React from 'react';

import ArbeidsforholdController from './arbeidsforholdController';
import mockData from '../../../test/arbeidsforholdMockData';
import * as Api from '../../services/api';
import * as Nav from '../../utils/navFrontend';


let wrapper;

describe(('ArbeidsforholdController Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<ArbeidsforholdController />);
  });
  describe('Variabler', () => {
    it('setter initial state korrekt', () => {
      expect(wrapper.state()).toEqual({
        arbeidsforhold: [],
      });
    });
  });
  describe('Logikk', () => {
    describe('hentArbeidsForhold', () => {
      beforeEach(() => {
        Api.Arbeidsforhold.hent = jest.fn(() => Promise.resolve(mockData.arbeidsforhold));
      });
      afterEach(() => {
        Api.Arbeidsforhold.hent.mockReset();
      });
      it('kalles med fnr', () => {
        wrapper.setProps({ fnr: '123' });
        wrapper.instance().hentArbeidsforhold();
        expect(Api.Arbeidsforhold.hent).toHaveBeenCalledTimes(1);
        expect(Api.Arbeidsforhold.hent).toHaveBeenCalledWith('123');
      });
      it('oppdaterer state med arbeidsforhold', async () => {
        wrapper.setProps({ fnr: '123' });
        await wrapper.instance().hentArbeidsforhold();
        expect(wrapper.state()).toEqual({ arbeidsforhold: mockData.arbeidsforhold });
      });
    });
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('Nav.Knapp kaller korrekt handler ved onClick', async () => {
      const component = wrapper.find(Nav.Knapp);
      // expect(component).toHaveLength(1);
      // console.log(component.debug())
      await component.props().onClick();
      // expect(Api.Arbeidsforhold.hent).toHaveBeenCalledTimes(1);
      // expect(wrapper.state()).toEqual({ arbeidsforhold: mockData.arbeidsforhold });
    });
  });
});

