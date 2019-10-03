/* eslint-disable no-undef */
import React from 'react';

import ArbeidsforholdController from './arbeidsforholdController';
import mockData from '../../../test/arbeidsforholdMockData';
import * as Api from '../../services/api';
import * as Nav from '../../utils/navFrontend';
import Arbeidsforhold from './arbeidsforhold';


let wrapper;

describe(('ArbeidsforholdController Test Suite'), () => {
  beforeEach(() => {
    Api.Arbeidsforhold.hent = jest.fn(() => Promise.resolve(mockData.arbeidsforhold));
    wrapper = shallow(<ArbeidsforholdController />);
  });
  afterEach(() => {
    Api.Arbeidsforhold.hent.mockReset();
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
    describe('Nav.Knapp', () => {
      it('vises med korrekte props', () => {
        const component = wrapper.find(Nav.Knapp);
        expect(component).toHaveLength(1);
        expect(typeof (component.props().onClick)).toEqual('function');
      });
      it('Nav.Knapp kaller korrekt handler ved onClick', async () => {
        const component = wrapper.find(Nav.Knapp);
        expect(component).toHaveLength(1);
        await component.props().onClick();
        expect(Api.Arbeidsforhold.hent).toHaveBeenCalledTimes(1);
        expect(wrapper.state()).toEqual({ arbeidsforhold: mockData.arbeidsforhold });
      });
    });
    describe('Arbeidsforhold', () => {
      it('Arbeidsforhold vises hvis arbeidsforhold', () => {
        wrapper.setState({ arbeidsforhold: mockData.arbeidsforhold });
        const component = wrapper.find(Arbeidsforhold);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('arbeidsforhold', mockData.arbeidsforhold);
      });
      it('Arbeidsforhold vises ikke hvis !arbeidsforhold', () => {
        const component = wrapper.find(Arbeidsforhold);
        expect(component).toHaveLength(0);
      });
    });
  });
});

