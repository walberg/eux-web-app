/* eslint-disable no-undef */
import React from 'react';

import * as Nav from '../utils/navFrontend';
import Forside from './forside';


let wrapper;

describe(('Forside Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<Forside history={{}} location={{}} />);
  });
  it('systemtittel vises en gang med riktig children', () => {
    const component = wrapper.find(Nav.Systemtittel);
    expect(component).toHaveLength(1);
    expect(component.children().at(1).text()).toEqual('nEESSI');
  });
  it('lenkepanel vises en gang og linker til korrekt path (/opprett)', () => {
    const component = wrapper.find({ href: '/opprett' });
    expect(component).toHaveLength(1);
  });
  it('lenkepanel vises en gang og linker til korrekt path (/vedlegg)', () => {
    const component = wrapper.find({ href: '/vedlegg' });
    expect(component).toHaveLength(1);
  });
});
