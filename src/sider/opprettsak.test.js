/* eslint-disable no-undef */
import React from 'react';
import configureStore from 'redux-mock-store';

import createStore from '../store';
import mockData from '../../test/opprettsakMockData';

import * as Api from '../services/api';
import { OpprettSakJest } from './opprettsak';
import * as Nav from '../utils/navFrontend';
import { RinaSakStatuslinje } from '../felles-komponenter/rinaSakStatuslinje';
import PersonSok from './personsok';
import FamilieRelasjonsComponent from '../felles-komponenter/skjema/PersonOgFamilieRelasjoner';
import { ArbeidsforholdController, BehandlingsTemaer, Fagsaker } from './sak';
import AvsluttModal from '../komponenter/AvsluttModal';


const initialStore = createStore();
const mockStore = configureStore([]);
let store;
let wrapper;

const errdata = { err: 'error' };

describe(('Opprettsak Test Suite'), () => {
  beforeEach(() => {
    store = mockStore(initialStore.getState());
    wrapper = shallow(<OpprettSakJest
      store={store}
      serverInfo={{}}
      validerFnrRiktig={() => { }}
      validerFnrFeil={() => { }}
      handleSubmit={() => { }}
      sendSkjema={() => { }}
      settFnrGyldighet={() => { }}
      settFnrSjekket={() => { }}
      settBuctype={() => { }}
      hentLandkoder={() => { }}
      submitFailed={false}
    />);
  });

  describe('Variabler', () => {
    it('setter korrekt initial state', () => {
      expect(wrapper.state()).toEqual({
        landKode: '',
        institusjonsID: '',
        institusjoner: [],
        tema: '',
        fagsaker: [],
        saksID: '',
        visModal: false,
      });
    });
  });

  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('viser Systemtittel', () => {
      expect(wrapper.find(Nav.Systemtittel)).toHaveLength(1);
    });
    it('viser PersonSok med en string og tre funksjoner', () => {
      wrapper.setProps({ inntastetFnr: '12312312312' });
      const component = wrapper.find(PersonSok);
      expect(component.props()).toHaveProperty('inntastetFnr', '12312312312');
      expect(typeof (component.props().resettSokStatus)).toEqual('function');
      expect(typeof (component.props().settFnrSjekket)).toEqual('function');
      expect(typeof (component.props().settFnrGyldighet)).toEqual('function');
    });
    describe('skjema: id-sektor ', () => {
      it('vises og har korrekte props', () => {
        wrapper.setProps({ fnrErGyldig: true, fnrErSjekket: true });
        const component = wrapper.find('#id-sektor');
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('feltNavn', 'sektor');
        expect(component.props()).toHaveProperty('label', 'Fagområde');
        expect(component.props()).toHaveProperty('disabled', false);
      });
      it('setter disabled = true hvis ugyldig fnr', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true });
        const component = wrapper.find('#id-sektor');
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('disabled', true);
      });
      it('viser riktig antall valg', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true, sektor: mockData.sektor });
        const component = wrapper.find('#id-sektor');
        expect(component.children()).toHaveLength(3);
        expect(component.children().at(1).props()).toHaveProperty('value', 'FB');
        expect(component.children().at(2).children().text()).toEqual('Yrkesskade og yrkessykdom');
      });
    });
    describe('skjema: id-buctype', () => {
      it('vises og har korrekte props', () => {
        wrapper.setProps({ fnrErGyldig: true, fnrErSjekket: true });
        const component = wrapper.find('#id-buctype');
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('feltNavn', 'buctype');
        expect(component.props()).toHaveProperty('label', 'BUC');
        expect(component.props()).toHaveProperty('disabled', false);
      });
      it('setter disabled = true hvis ugyldig fnr', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true });
        const component = wrapper.find('#id-buctype');
        expect(component).toHaveLength(1);
        expect(component.props().disabled).toEqual(true);
      });
      // Ser ikke ut som det er en god måte å mocke es6 metoder. asserter heller sideeffekt i dette tilfellet.
      it('kaller oppdaterBucKode ved onChange som oppdaterer state', async () => {
        const settBuctype = jest.fn();
        const hentLandkoder = jest.fn();
        const event = {
          target: { value: 'the-value' },
        };
        wrapper.setProps({ settBuctype, hentLandkoder });
        wrapper.setState({ landKode: 'NO' });
        await wrapper.find('#id-buctype').simulate('change', event);
        await wrapper.update();
        expect(wrapper.state()).toHaveProperty('landKode', '');
      });
      it('viser riktig antall valg', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true, buctyper: mockData.buctyper });
        const component = wrapper.find('#id-buctype');
        expect(component.children()).toHaveLength(4);
        expect(component.children().at(1).props()).toHaveProperty('value', 'FB_BUC_02');
        expect(component.children().at(2).children().at(2)
          .text()).toEqual('Tilleggsytelser for foreldreløse barn');
      });
    });
    describe('skjema: id-sedtype ', () => {
      it('vises og har korrekte props', () => {
        wrapper.setProps({ fnrErGyldig: true, fnrErSjekket: true });
        const component = wrapper.find('#id-sedtype');
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('feltNavn', 'sedtype');
        expect(component.props()).toHaveProperty('label', 'SED');
        expect(component.props()).toHaveProperty('disabled', false);
      });
      it('setter disabled = true hvis ugyldig fnr', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true });
        const component = wrapper.find('#id-sedtype');
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('disabled', true);
      });
      it('viser riktig antall valg', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true, sedtyper: mockData.sedtyper });
        const component = wrapper.find('#id-sedtype');
        expect(component.children()).toHaveLength(3);
        expect(component.children().at(1).props()).toHaveProperty('value', 'F002');
        expect(component.children().at(2).children().at(2)
          .text()).toEqual('Vedtak om utbetaling vedrørende fortrinnsrett');
      });
    });
    describe('skjema: id-landkode', () => {
      it('vises og har korrekte props', () => {
        wrapper.setProps({ fnrErGyldig: true, fnrErSjekket: true });
        wrapper.setState({ landKode: 'NO' });
        const component = wrapper.find('#id-landkode');
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('label', 'Land');
        expect(component.props()).toHaveProperty('value', 'NO');
        expect(component.props()).toHaveProperty('disabled', false);
      });
      it('setter disabled = true hvis ugyldig fnr', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true });
        const component = wrapper.find('#id-landkode');
        expect(component).toHaveLength(1);
        expect(component.props().disabled).toEqual(true);
      });
      // Ser ikke ut som det er en god måte å mocke es6 metoder. asserter heller sideeffekt i dette tilfellet.
      it('kaller oppdaterLandKode ved onChange som oppdaterer state', async () => {
        Api.Institusjoner.hent = jest.fn(() => Promise.resolve(mockData.institusjoner));
        const event = {
          target: { value: 'the-value' },
        };
        wrapper.setProps({ buctype: 'buctype' });
        await wrapper.find('#id-landkode').simulate('change', event);
        await wrapper.update();
        expect(wrapper.state().institusjoner).toHaveLength(2);
        expect(wrapper.state().institusjoner[1]).toHaveProperty('institusjonsID', 'DU:GIFTEST');
      });
      it('viser riktig antall valg', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true, landkoder: mockData.landkoder });
        const component = wrapper.find('#id-landkode');
        expect(component.children()).toHaveLength(6);
        expect(component.children().at(1).props()).toHaveProperty('value', 'BE');
        expect(component.children().at(2).children().text()).toEqual('Bulgaria');
      });
    });
    describe('skjema: id-institusjon', () => {
      it('vises og har korrekte props', () => {
        wrapper.setProps({ fnrErGyldig: true, fnrErSjekket: true });
        wrapper.setState({ institusjonsID: 'en-id' });
        const component = wrapper.find('#id-institusjon');
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('value', 'en-id');
        expect(component.props()).toHaveProperty('disabled', false);
      });
      it('setter disabled = true hvis ugyldig fnr', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true });
        const component = wrapper.find('#id-institusjon');
        expect(component).toHaveLength(1);
        expect(component.props().disabled).toEqual(true);
      });
      it('kaller oppdaterInstitusjonKode ved onChange som oppdaterer state', async () => {
        const event = {
          target: { value: 'the-value' },
        };
        await wrapper.find('#id-institusjon').simulate('change', event);
        await wrapper.update();
        expect(wrapper.state()).toHaveProperty('institusjonsID', 'the-value');
      });
      it('viser riktig antall valg', () => {
        wrapper.setProps({ fnrErGyldig: false, fnrErSjekket: true });
        wrapper.setState({ institusjoner: mockData.institusjoner });
        const component = wrapper.find('#id-institusjon');
        expect(component.children()).toHaveLength(3);
        expect(component.children().at(1).props()).toHaveProperty('value', 'NO:GFFTEST');
        expect(component.children().at(2).children().text()).toEqual('Guarantee Fund for Bears');
      });
    });
    it('viser FamilieRelasjonsComponent hvis korrekt sektor er valgt', () => {
      wrapper.setProps({ valgtSektor: 'FB' });
      expect(wrapper.find(FamilieRelasjonsComponent)).toHaveLength(1);
      wrapper.setProps({ valgtSektor: 'SAS' });
      expect(wrapper.find(FamilieRelasjonsComponent)).toHaveLength(0);
    });
    describe('Familerelasjoner', () => {
      it('BehandlingsTemaer vises hvis sektor er valgt', () => {
        wrapper.setProps({ valgtSektor: 'FB', temar: [] });
        wrapper.setState({ tema: 'tema' });
        const component = wrapper.find(BehandlingsTemaer);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('tema', 'tema');
        expect(component.props()).toHaveProperty('temaer', []);
        expect(typeof (component.props().oppdaterTemaListe)).toEqual('function');
      });
      it('BehandlingsTemaer vises ikke hvis !sektor', () => {
        wrapper.setProps({ valgtSektor: undefined });
        const component = wrapper.find(BehandlingsTemaer);
        expect(component).toHaveLength(0);
      });
      it('Knapp vises hvis sektor er valgt', async () => {
        Api.Fagsaker.hent = jest.fn(() => Promise.resolve(mockData.fagsaker));
        wrapper.setProps({ valgtSektor: 'FB', inntastetFnr: '12312312312' });
        wrapper.setState({ tema: 'tema' });
        const component = wrapper.find(Nav.Knapp);
        await component.simulate('click');
        await wrapper.update();
        expect(component).toHaveLength(1);
        expect(wrapper.state()).toHaveProperty('tema', 'tema');
      });
      it('Knapp vises ikke hvis !sektor', () => {
        wrapper.setProps({ valgtSektor: undefined });
        const component = wrapper.find(Nav.Knapp);
        expect(component).toHaveLength(0);
      });
      it('Lenke vises hvis sektor er valgt', () => {
        wrapper.setProps({ valgtSektor: 'FB' });
        const component = wrapper.find(Nav.Lenke);
        expect(component).toHaveLength(1);
        expect(component.props()).toHaveProperty('ariaLabel', 'Opprett ny sak i GOSYS');
      });
      it('Lenke vises ikke hvis !sektor', () => {
        wrapper.setProps({ valgtSektor: undefined });
        const component = wrapper.find(Nav.Lenke);
        expect(component).toHaveLength(0);
      });
    });
    describe('Fagsaker', () => {
      it('vises hvis visFagsakerListe', async () => {
        wrapper.setState({ tema: 'tema', fagsaker: ['fagsak'] });
        wrapper.setProps({ valgtSektor: 'sektor' });
        const component = wrapper.find(Fagsaker);
        expect(component).toHaveLength(1);
      });
      it('vises ikke hvis !visFagsakerListe', async () => {
        wrapper.setState({ fagsaker: [], tema: '' });
        const component = wrapper.find(Fagsaker);
        await expect(component).toHaveLength(0);
      });
    });
    describe('ArbeidsforholdController', () => {
      it('vises hvis visArbeidsforhold', () => {
        wrapper.setProps({ valgtSektor: 'FB', buctype: 'FB_BUC_01', sedtype: 'F001' });
        const component = wrapper.find(ArbeidsforholdController);
        expect(component).toHaveLength(1);
      });
      it('vises ikke hvis !visArbeidsforhold', async () => {
        const component = wrapper.find(ArbeidsforholdController);
        expect(component).toHaveLength(0);
      });
    });
    it('Hovedknapp vises med props og spinner ved submit', () => {
      const handleSubmit = jest.fn();
      wrapper.setProps({ handleSubmit, status: 'PENDING' });
      const component = wrapper.find(Nav.Hovedknapp);
      component.simulate('click');
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('spinner', true);
      expect(component.props()).toHaveProperty('disabled', true);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
    it('Flatknapp vises med props', () => {
      const component = wrapper.find(Nav.Flatknapp);
      expect(component).toHaveLength(1);
      expect(typeof (component.props().onClick)).toEqual('function');
      expect(component.props()).toHaveProperty('aria-label', 'Navigasjonslink tilbake til forsiden');
    });
    it('viser RinaSakStatuslinje med props', () => {
      wrapper.setProps({ opprettetSak: { rinasaksnummer: '6969', url: 'www.www.www' }, status: 'OK' });
      const component = (wrapper.find(RinaSakStatuslinje));
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('status', 'OK');
      expect(component.props()).toHaveProperty('tittel', 'Saksnummer: 6969');
      expect(component.props()).toHaveProperty('rinaURL', 'www.www.www');
      expect(component.props()).toHaveProperty('routePath', '/vedlegg?rinasaksnummer=6969');
    });
    it('viser RinaSakStatuslinje ved feil', () => {
      wrapper.setProps({ opprettetSak: { rinasaksnummer: '6969', url: 'www.www.www' }, status: 'ERROR', errdata });
      const component = (wrapper.find(RinaSakStatuslinje));
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('errdata', errdata);
    });
  });
  describe('Avslutt Modal', () => {
    it('mountes med korrekte props', () => {
      wrapper.setState({ visModal: true });
      const component = (wrapper.find(AvsluttModal));
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('visModal', true);
      expect(typeof (component.props().closeModal)).toEqual('function');
    });
  });

  describe('Logikk', () => {
    describe('visFagsakerListe', () => {
      it('returnerer true hvis valgtSektor && tema && fagsaker', () => {
        wrapper.setState({ tema: 'tema', fagsaker: ['fagsak'] });
        wrapper.setProps({ valgtSektor: 'sektor' });
        const instance = wrapper.instance().visFagsakerListe();
        expect(instance).toBeTruthy();
      });
      it('returnerer false hvis !valgtSektor || !tema || !fagsaker', () => {
        wrapper.setState({ tema: 'tema', fagsaker: ['fagsak'] });
        const instance = wrapper.instance().visFagsakerListe();
        expect(instance).toBeFalsy();
      });
    });
    describe('visArbeidsForhold', () => {
      it('returnerer sedtype hvis valgtSektor = FB && buctype = FB_BUC_01', () => {
        wrapper.setProps({ valgtSektor: 'FB', buctype: 'FB_BUC_01', sedtype: 'F001' });
        const instance = wrapper.instance().visArbeidsforhold();
        expect(instance).toEqual('F001');
      });
      it('returnerer false hvis valgtSektor != FB || buctype != FB_BUC_01', () => {
        wrapper.setProps({ valgtSektor: 'UB', buctype: 'FB_BUC_01', sedtype: 'F001' });
        const instance = wrapper.instance().visArbeidsforhold();
        expect(instance).toBeFalsy();
      });
    });
    describe('oppdaterBucKoder', () => {
      const buctype = 'FB_BUC_01';
      const hentLandkoder = jest.fn();
      const settBuctype = jest.fn();
      it('kaller hendLandkoder og settBuctype med buctype og resetter landKode', async () => {
        wrapper.setProps({ settBuctype, hentLandkoder });
        await wrapper.instance().oppdaterBucKode({ target: { value: buctype } });
        expect(settBuctype).toHaveBeenCalledWith(buctype);
        expect(hentLandkoder).toHaveBeenCalledWith(buctype);
        expect(wrapper.state()).toHaveProperty('landKode', '');
      });
    });
    describe('oppdarerLandKode', () => {
      Api.Institusjoner.hent = jest.fn(() => Promise.resolve(mockData.institusjoner));
      it('kaller api med korrekt landkode og buctype, og oppdaterer state med resultatet', async () => {
        wrapper.setProps({ buctype: 'FB_BUC_01' });
        await wrapper.instance().oppdaterLandKode({ target: { value: 'NO' } });
        expect(Api.Institusjoner.hent).toHaveBeenCalledWith('FB_BUC_01', 'NO');
        expect(wrapper.state()).toHaveProperty('landKode', 'NO');
        expect(wrapper.state().institusjoner).toHaveLength(2);
        expect(wrapper.state().institusjoner[1]).toHaveProperty('institusjonsID', 'DU:GIFTEST');
      });
    });
    describe('oppdaterInstitusjonsKode', () => {
      it('oppdaterer institusjonsID', () => {
        wrapper.instance().oppdaterInstitusjonKode({ target: { value: 'institusjonsID' } });
        expect(wrapper.state()).toHaveProperty('institusjonsID', 'institusjonsID');
      });
    });
    describe('oppdaterTemaListe', () => {
      it('oppdaterer tema og tømmer fagsaker', () => {
        wrapper.instance().oppdaterTemaListe({ target: { value: 'tema' } });
        expect(wrapper.state()).toHaveProperty('tema', 'tema');
        expect(wrapper.state()).toHaveProperty('fagsaker', []);
      });
    });
    describe('oppdaterFagsakListe', () => {
      it('oppdaterer saksID', () => {
        wrapper.instance().oppdaterFagsakListe({ target: { value: 'saksID' } });
        expect(wrapper.state()).toHaveProperty('saksID', 'saksID');
      });
    });
    describe('visFagsaker', () => {
      Api.Fagsaker.hent = jest.fn(() => Promise.resolve(mockData.fagsaker));
      it('kaller api med fnr, sektor og tema, og oppdaterer state med resultatet', async () => {
        wrapper.setProps({ inntastetFnr: '12312312312', valgtSektor: 'AB' });
        wrapper.setState({ tema: 'tema' });
        await wrapper.instance().visFagsaker();
        expect(Api.Fagsaker.hent).toHaveBeenCalledWith('12312312312', 'AB', 'tema');
        expect(wrapper.state()).toHaveProperty('tema', 'tema');
        expect(wrapper.state().fagsaker).toHaveLength(2);
        expect(wrapper.state().fagsaker[1]).toHaveProperty('fagsystem', 'Gosys');
      });
    });
    describe('skjemaSubmit', () => {
      const sendSkjema = jest.fn();
      const verdier = {
        tilfeldige: 'verdier',
        flere: 'verdier',
        fnrErGyldig: true,
        fnrErSjekket: true,
      };
      afterEach(() => {
        sendSkjema.mockReset();
      });
      it('vasker verdier og sender skjema', async () => {
        wrapper.setProps({ sendSkjema, submitFailed: false });
        wrapper.setState({ institusjonsID: 'institusjonsID', landKode: 'landKode', saksID: 'saksID' });
        await wrapper.instance().skjemaSubmit(verdier);
        expect(sendSkjema).toBeCalledWith({
          flere: 'verdier',
          institusjonsID: 'institusjonsID',
          landKode: 'landKode',
          saksID: 'saksID',
          tilfeldige: 'verdier',
        });
      });
      it('returnerer undefined hvis submitFailed = true', async () => {
        wrapper.setProps({ sendSkjema, submitFailed: true });
        wrapper.setState({ institusjonsID: 'institusjonsID', landKode: 'landKode', saksID: 'saksID' });
        const instance = await wrapper.instance().skjemaSubmit(verdier);
        expect(sendSkjema).toHaveBeenCalledTimes(0);
        expect(instance).toBeUndefined();
      });
    });
    describe('overrideDefaultSubmit', () => {
      const event = { preventDefault: jest.fn() };
      it('kaller preventDefault()', () => {
        wrapper.instance().overrideDefaultSubmit(event);
        expect(event.preventDefault).toHaveBeenCalledTimes(1);
      });
    });
    describe('validerFnr', () => {
      const validerFnrRiktig = jest.fn();
      const validerFnrFeil = jest.fn();
      const settFnrGyldighet = jest.fn();
      afterEach(() => {
        settFnrGyldighet.mockReset();
      });
      it('setter validert hvis gyldig fnr', async () => {
        wrapper.setProps({ validerFnrRiktig, validerFnrFeil, settFnrGyldighet });
        await wrapper.instance().validerFnr(true);
        expect(validerFnrRiktig).toHaveBeenCalledTimes(1);
        expect(settFnrGyldighet).toHaveBeenCalledTimes(1);
        expect(settFnrGyldighet).toHaveBeenCalledWith(true);
      });
      it('setter !validert hvis fnr er feil', async () => {
        wrapper.setProps({ validerFnrRiktig, validerFnrFeil, settFnrGyldighet });
        await wrapper.instance().validerFnr(false);
        expect(validerFnrFeil).toHaveBeenCalledTimes(1);
        expect(settFnrGyldighet).toHaveBeenCalledTimes(1);
        expect(settFnrGyldighet).toHaveBeenCalledWith(false);
      });
    });
    describe('erSedtyperGyldig', () => {
      it('returnerer første element om det finnes sedtyper', () => {
        const instance = wrapper.instance().erSedtyperGyldig(['sedtype1', 'sedtype2']);
        expect(instance).toEqual('sedtype1');
      });
      it('returnerer false om det ikke finnes sedtyper', () => {
        const instance = wrapper.instance().erSedtyperGyldig([]);
        expect(instance).toBeFalsy();
      });
    });
    describe('resettSokStatus', () => {
      const settFnrGyldighet = jest.fn();
      const settFnrSjekket = jest.fn();
      it('resetter sokestatus i store', async () => {
        wrapper.setProps({ settFnrGyldighet, settFnrSjekket });
        await wrapper.instance().resettSokStatus();
        expect(settFnrGyldighet).toHaveBeenCalledTimes(1);
        expect(settFnrGyldighet).toHaveBeenCalledWith(null);
        expect(settFnrSjekket).toHaveBeenCalledTimes(1);
        expect(settFnrSjekket).toHaveBeenCalledWith(false);
      });
    });
    describe('Modal', () => {
      it('openModal - setter korrekt state', () => {
        wrapper.setState({ visModal: false });
        wrapper.instance().openModal();
        expect(wrapper.state()).toHaveProperty('visModal', true);
      });
      it('closeModal - setter korrekt state', () => {
        wrapper.setState({ visModal: true });
        wrapper.instance().closeModal();
        expect(wrapper.state()).toHaveProperty('visModal', false);
      });
    });
  });
});
