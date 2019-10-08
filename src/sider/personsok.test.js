/* eslint-disable no-undef */
import React from 'react';
import configureStore from 'redux-mock-store';

import createStore from '../store';
import diveUntillTarget from '../../test/utils';
import mockData from '../../test/personsokMockData';

import PersonSok from './personsok';
import * as Skjema from '../felles-komponenter/skjema';
import * as Nav from '../utils/navFrontend';
import { StatusLinje } from '../felles-komponenter/statuslinje';
import { PersonKort } from '../komponenter';

const initialStore = createStore();
const mockStore = configureStore([]);
let store;
let wrapper;

describe(('Opprettsak Test Suite'), () => {
  beforeEach(() => {
    store = mockStore(initialStore.getState());
    wrapper = diveUntillTarget(shallow(<PersonSok store={store} settFnrGyldighet={() => { }} settFnrSjekket={() => { }} />), 'PersonSok');
  });
  describe('Logikk', () => {
    describe('sokEtterPerson', () => {
      it('kaller personSok hvis inntastetFnr', () => {
        const personSok = jest.fn(() => Promise.resolve('response'));
        wrapper.setProps({ personSok, inntastetFnr: '12312312312' });
        wrapper.instance().sokEtterPerson();
        expect(personSok).toHaveBeenCalledTimes(1);
      });
      it('kaller ikke personSok hvis !inntastetFnr', () => {
        const personSok = jest.fn(() => Promise.resolve('response'));
        wrapper.setProps({ personSok, inntastetFnr: '' });
        wrapper.instance().sokEtterPerson();
        expect(personSok).toHaveBeenCalledTimes(0);
      });
      it('kaller settFnrGyldighet og settFnrSjekket med true hvis personSok returnerer korrekt data', async () => {
        const personSok = jest.fn(() => Promise.resolve({ data: mockData.person }));
        const settFnrGyldighet = jest.fn();
        const settFnrSjekket = jest.fn();
        wrapper.setProps({
          personSok, settFnrGyldighet, settFnrSjekket, inntastetFnr: '12312312312',
        });
        await wrapper.instance().sokEtterPerson();
        await wrapper.update();
        expect(settFnrGyldighet).toHaveBeenLastCalledWith(true);
        expect(settFnrSjekket).toHaveBeenLastCalledWith(true);
      });
      it('kaller settFnrGyldighet og settFnrSjekket med false hvis personSok returnerer feil / ingen data', async () => {
        const personSok = jest.fn(() => Promise.resolve({}));
        const settFnrGyldighet = jest.fn();
        const settFnrSjekket = jest.fn();
        wrapper.setProps({
          personSok, settFnrGyldighet, settFnrSjekket, inntastetFnr: '12312312312',
        });
        await wrapper.instance().sokEtterPerson();
        await wrapper.update();
        expect(settFnrGyldighet).toHaveBeenLastCalledWith(false);
        expect(settFnrSjekket).toHaveBeenLastCalledWith(false);
      });
    });
  });
  describe('Presentasjon', () => {
    it('Skjema Input- Finn bruker vises med props', () => {
      const component = wrapper.find(Skjema.Input);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('label', 'Finn bruker');
      expect(component.props()).toHaveProperty('feltNavn', 'fnr');
      // expect(component.props()).toHaveProperty('type', 'number');
    });
    it('Spinner vises ved status PENDING', () => {
      wrapper.setProps({ status: 'PENDING' });
      const component = wrapper.find(Nav.NavFrontendSpinner);
      expect(component).toHaveLength(1);
    });
    it('Knapp vises og kaller sokEtterPerson en gang ved klikk', async () => {
      const personSok = jest.fn(() => Promise.resolve('response'));
      wrapper.setProps({ personSok, inntastetFnr: '12312312312' });
      const component = wrapper.find(Nav.Knapp);
      expect(component).toHaveLength(1);
      await component.simulate('click');
      await wrapper.update();
      expect(personSok).toHaveBeenCalledTimes(1);
    });
    it('StatusLinje vises ved errdata.status og har riktige props', () => {
      wrapper.setProps({ errdata: { status: 'error' }, status: 'STATUS' });
      const component = wrapper.find(StatusLinje);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('status', 'STATUS');
    });
    it('p vises ved errdata.status og viser errdata.message', () => {
      wrapper.setProps({ errdata: { status: 'error', message: 'message' }, status: 'STATUS' });
      const component = wrapper.find('p');
      expect(component).toHaveLength(1);
      expect(component.children().at(0).text()).toEqual('message');
    });
    it('viser PersonKort hvis fornavn && etternavn', () => {
      wrapper.setProps({ person: mockData.person });
      const component = wrapper.find(PersonKort);
      expect(component).toHaveLength(1);
    });
    it('viser ikke PersonKort hvis !fornavn || !etternavn', () => {
      const component = wrapper.find(PersonKort);
      expect(component).toHaveLength(0);
    });
  });
});

