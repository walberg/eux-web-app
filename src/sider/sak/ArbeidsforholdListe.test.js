/* eslint-disable no-undef */
import React from 'react';

import ArbeidsforholdListe from './ArbeidsforholdListe';
import mockData from '../../../test/arbeidsforholdMockData';
import ArbeidsforholdLinje from './ArbeidsforholdLinje';

let uuid = require('uuid/v4');

let wrapper;

const fields = {
  getAll: jest.fn(() => mockData.arbeidsforhold),
  push: jest.fn(),
  remove: jest.fn(),
};

describe(('ArbeidsforholdListe Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<ArbeidsforholdListe fields={fields} arbeidsforhold={mockData.arbeidsforhold} />);
  });
  afterEach(() => {
    fields.getAll.mockClear();
    fields.push.mockClear();
    fields.remove.mockClear();
  });

  describe('Logikk', () => {
    describe('arbeidsforholdKlikkHandler', () => {
      it('kaller fields.getAll', () => {
        wrapper.instance().arbeidsforholdKlikkHandler(44138101);
        expect(fields.getAll).toHaveBeenCalledTimes(2);
      });
      it('kaller kaller fields.push', () => {
        wrapper.instance().arbeidsforholdKlikkHandler(44138102);
        expect(fields.push).toHaveBeenCalledTimes(1);
        expect(fields.push).toHaveBeenCalledWith({});
      });
      it('kaller kaller fields.remove', () => {
        wrapper.instance().arbeidsforholdKlikkHandler(44138101);
        expect(fields.remove).toHaveBeenCalledTimes(1);
        expect(fields.remove).toHaveBeenCalledWith(0);
      });
    });
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    describe('ArbeidsforholdLinje', () => {
      it('vises tre ganger med korrekte props', () => {
        uuid = jest.fn(() => '123');
        const component = wrapper.find(ArbeidsforholdLinje);
        expect(component).toHaveLength(3);
      });
    });
  });
});
