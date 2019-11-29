/* eslint-disable no-undef */
import React from 'react';
import configureStore from 'redux-mock-store';

import createStore from '../store';

import { VedleggJest } from './vedlegg';
import * as queryString from '../utils/queryString';
import * as Nav from '../utils/navFrontend';
import DokumentSok from './dokumentsok';
import { StatusLinje } from '../felles-komponenter/statuslinje';


const initialStore = createStore();
const mockStore = configureStore([]);
let store;
let wrapper;


describe(('Vedlegg Test Suite'), () => {
  beforeEach(() => {
    store = mockStore(initialStore.getState());
    wrapper = shallow(<VedleggJest
      store={store}
      location={{}}
      settRinaGyldighet={() => { }}
      settRinaSjekket={() => { }}
      vedleggStatus=""
      handleSubmit={() => { }}
      sendSkjema={() => { }}
      oppdaterRinaSaksnummer={() => { }}
    />);
  });
  describe('Logikk', () => {
    describe('componentDidMount', () => {
      beforeEach(() => {
        queryString.getParam = jest.fn(() => '123');
      });
      afterEach(() => {
        queryString.getParam.mockClear();
      });
      it('kaller getParam med korrekte argumenter', () => {
        wrapper.setProps({ location: { location: '90210' } });
        wrapper.instance().componentDidMount();
        expect(queryString.getParam).toHaveBeenCalledTimes(1);
        expect(queryString.getParam).toHaveBeenCalledWith({ location: '90210' }, 'rinasaksnummer');
      });
      it('kaller oppdaterRinaSaksnummer med korrekte argumenter', () => {
        const oppdaterRinaSaksnummer = jest.fn();
        wrapper.setProps({ oppdaterRinaSaksnummer });
        wrapper.instance().componentDidMount();
        expect(oppdaterRinaSaksnummer).toHaveBeenCalledTimes(1);
        expect(oppdaterRinaSaksnummer).toHaveBeenCalledWith('123');
      });
    });
    describe('overrideDefaultSubmit', () => {
      it('kaller preventDefault()', () => {
        const event = { preventDefault: jest.fn() };
        wrapper.instance().overrideDefaultSubmit(event);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('Nav.Fieldset vises og har korrekte props', () => {
      const component = wrapper.find(Nav.Fieldset);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('legend', 'Vedleggs informasjon');
    });
    it('Nav.hjelpetestBase vises og har korrekte props/children', () => {
      const component = wrapper.find('#journalPostID');
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('type', 'hoyre');
      expect(component.children().text()).toEqual('Journalpost ID finner du i Gosys');
    });
    it('Skjema.Input - journalpostID vises og har korrekte props', () => {
      const component = wrapper.find('[feltNavn="journalpostID"]');
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('label', 'JournalpostID');
    });
    it('Nav.hjelpetestBase vises og har korrekte props/children', () => {
      const component = wrapper.find('#dokumentID');
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('type', 'under');
      expect(component.children().text()).toEqual('Dokument ID finner du i Gosys');
    });
    it('Skjema.Input - dokumentID vises og har korrekte props', () => {
      const component = wrapper.find('[feltNavn="dokumentID"]');
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('label', 'DokumentID');
    });
    it('viser DokumentSok med korrekte props', () => {
      wrapper.setProps({ inntastetRinasaksnummer: '123' });
      const component = wrapper.find(DokumentSok);
      expect(component.props()).toHaveProperty('inntastetRinasaksnummer', '123');
      expect(typeof (component.props().settRinaGyldighet)).toEqual('function');
      expect(typeof (component.props().settRinaSjekket)).toEqual('function');
    });
    describe('Nav.Hovedknapp', () => {
      it('vises med korrekte props', () => {
        const component = wrapper.find(Nav.Hovedknapp);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('disabled', true);
        expect(component.props()).toHaveProperty('spinner', false);
      });
      it('vises med spinner )', () => {
        wrapper.setProps({ vedleggStatus: 'PENDING' });
        const component = wrapper.find(Nav.Hovedknapp);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('spinner', true);
      });
      it('kaller handleSubmit ved onClick med riktig argumenter', () => {
        const handleSubmit = jest.fn();
        const sendSkjema = () => { };
        wrapper.setProps({ handleSubmit, sendSkjema });
        const component = wrapper.find(Nav.Hovedknapp);
        component.prop('onClick');
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith(sendSkjema);
      });
    });
    it('StatusLinje vises med korrekte props', () => {
      wrapper.setProps({ vedleggStatus: 'status', vedlegg: { url: 'lenke' } });
      const component = wrapper.find(StatusLinje);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('status', 'status');
      expect(component.props()).toHaveProperty('url', 'lenke');
      expect(component.props()).toHaveProperty('tittel', 'Vedlegget');
    });
  });
});
