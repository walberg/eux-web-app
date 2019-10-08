/* eslint-disable no-undef */
import React from 'react';

import UkjentSide from './ukjentSide';
import * as Nav from '../utils/navFrontend';


let wrapper;

describe(('UkjentSide Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<UkjentSide location={{ pathname: 'testlokasjon' }} />);
  });
  describe('Presentasjon', () => {
    it('smoketest', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('Nav.AlertStripe vises med korrekte props', () => {
      const component = wrapper.find(Nav.AlertStripe);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('type', 'feil');
    });
    it('Nav.Systemtittel vises med location fra props', () => {
      const component = wrapper.find(Nav.Systemtittel);
      expect(component).toHaveLength(1);
      expect(component.children().at(1).text()).toEqual('testlokasjon');
    });
    it('Nav.Lenke vises med korrekte props', () => {
      const component = wrapper.find(Nav.Lenke);
      expect(component).toHaveLength(1);
      expect(component.props()).toHaveProperty('href', '/');
      expect(component.props()).toHaveProperty('ariaLabel', 'Navigasjonslink tilbake til forsiden');
    });
  });
});
