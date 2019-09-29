/* eslint-disable no-undef */
import React from 'react';

import mockData from '../../test/personsokMockData';

import { PersonKort } from '../komponenter';
import { PanelHeader } from '../felles-komponenter/panelHeader';
import * as Nav from '../utils/navFrontend';


let wrapper;

describe(('PersonKort Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<PersonKort person={mockData.person} />);
  });
  it('Vises uten feil', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('Viser PanelHeader med korrekte props', () => {
    const component = wrapper.find(PanelHeader);
    expect(component).toHaveLength(1);
    expect(component.props()).toHaveProperty('tittel', 'STOR BLYANT');
    expect(component.props()).toHaveProperty('ikon', 'ikon-mann.svg');
  });
  it('Viser undertittel med korrekte props', () => {
    const component = wrapper.find(PanelHeader);
    const undertittel = component.dive();
    expect(undertittel).toHaveLength(1);
    expect(undertittel.children().at(1).children().at(1)
      .text()).toEqual('Fødselsnummer: 02026100715Fødselsdato: 02.02.1961');
  });
  it('Viser Nav.Knapp med korrekte props', () => {
    window.location.reload = jest.fn();
    const component = wrapper.find(Nav.Knapp);
    expect(component).toHaveLength(1);
    component.simulate('click');
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    expect(component.children().at(1).text()).toEqual('Fjern');
  });
});
