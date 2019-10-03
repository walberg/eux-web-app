/* eslint-disable no-undef */
import React from 'react';
import configureStore from 'redux-mock-store';

import createStore from '../store';
import diveUntillTarget from '../../test/utils';
import mockData from '../../test/dokumentsokMockData';
import * as Api from '../services/api';
import * as Skjema from '../felles-komponenter/skjema';
import * as Nav from '../utils/navFrontend';
import { DokumentKort } from '../komponenter';


import DokumentSok from './dokumentsok';

const initialStore = createStore();
const mockStore = configureStore([]);
let store;
let wrapper;

describe(('Dokumentsok Test Suite'), () => {
  beforeEach(() => {
    store = mockStore(initialStore.getState());
    wrapper = diveUntillTarget(
      shallow(<DokumentSok
        store={store}
        settRinaSjekket={() => { }}
        settRinaGyldighet={() => { }} />),
      'DokumentSok'
    );
  });
  describe('Variabler', () => {
    it('setter korrekt initial state', () => {
      expect(wrapper.state()).toEqual({ searching: false });
    });
  });
  describe('Logikk', () => {
    describe('sokEtterDokumenter', () => {
      Api.Dokumenter.hent = jest.fn(() => Promise.resolve(mockData.dokumenter));
      it('bryter hvis !inntastetRinasaksnummer', () => {
        wrapper.instance().sokEtterDokumenter();
        expect(wrapper.state()).toHaveProperty('searching', false);
      });
      it('kaller API og oppdaterer state med resultatet', async () => {
        wrapper.setProps({ inntastetRinasaksnummer: '1669' });
        wrapper.instance().sokEtterDokumenter();
        expect(wrapper.state()).toHaveProperty('searching', true);
        expect(Api.Dokumenter.hent).toHaveBeenCalledTimes(1);
        expect(Api.Dokumenter.hent).toHaveBeenCalledWith('1669');
        await wrapper.update();
        expect(wrapper.state()).toHaveProperty('searching', false);
        expect(wrapper.state()).toHaveProperty('nyttSok', true);
        expect(wrapper.state()).toHaveProperty('rinadokumenter', mockData.dokumenter);
      });
      it('kaller API og oppdaterer store', async () => {
        const settRinaSjekket = jest.fn();
        const settRinaGyldighet = jest.fn();
        wrapper.setProps({ inntastetRinasaksnummer: '1669', settRinaSjekket, settRinaGyldighet });
        wrapper.instance().sokEtterDokumenter();
        await wrapper.update();
        expect(settRinaSjekket).toHaveBeenCalledTimes(1);
        expect(settRinaSjekket).toHaveBeenCalledWith(true);
        expect(settRinaGyldighet).toHaveBeenCalledTimes(1);
        expect(settRinaGyldighet).toHaveBeenCalledWith(true);
      });
    });
    describe('inntastetRinaSaksnummerHarBlittEndret', () => {
      it('resetter state', () => {
        wrapper.instance().inntastetRinaSaksnummerHarBlittEndret();
        wrapper.update();
        expect(wrapper.state()).toHaveProperty('rinadokumenter', []);
        expect(wrapper.state()).toHaveProperty('nyttSok', false);
      });
    });
  });
  describe('Presentasjon', () => {
    it('Smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    describe('Skjema Input', () => {
      it('vises og har korrekte props', () => {
        const component = wrapper.find(Skjema.Input);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('label', 'RINA saksnummer');
        expect(component.props()).toHaveProperty('feltNavn', 'rinasaksnummer');
      });
      it('kaller inntastetRinaSaksnummerHarBlittEndret ved onKeyUp', () => {
        wrapper.setState({ rinadokumenter: ['dokument'], nyttSok: true });
        const component = wrapper.find(Skjema.Input);
        component.props().onKeyUp();
        wrapper.update();
        expect(wrapper.state()).toHaveProperty('rinadokumenter', []);
        expect(wrapper.state()).toHaveProperty('nyttSok', false);
      });
    });
    describe('Knapp', () => {
      it('vises med spinner hvis searching', () => {
        wrapper.setState({ searching: true });
        const component = wrapper.find(Nav.Knapp);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('spinner', true);
        expect(component.children().text()).toEqual('SØK');
      });
      it('kaller sokEtterDokumenter ved onClick', () => {
        wrapper.setProps({ inntastetRinasaksnummer: '1669' });
        wrapper.setState({ searching: false });
        const component = wrapper.find(Nav.Knapp);
        component.props().onClick();
        expect(wrapper.state()).toHaveProperty('searching', true);
      });
    });
    describe('DokumentKort', () => {
      it('vises hvis rinadokumenter og har korrekte props', () => {
        wrapper.setState({ rinadokumenter: mockData.dokumenter });
        const component = wrapper.find(DokumentKort);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('dokumenter', mockData.dokumenter);
      });
    });
    describe('p sokeStatus', () => {
      it('vises hvis harIngenDokumenter()', () => {
        wrapper.setState({ rinadokumenter: [], nyttSok: true });
        const component = wrapper.find('p');
        expect(component).toHaveLength(1);
      });
    });
  });
});
