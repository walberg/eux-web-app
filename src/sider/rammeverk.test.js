/* eslint-disable no-undef */
import React from 'react';

import Hovedside from './rammeverk';
import Topplinje from '../felles-komponenter/topplinje';

let wrapper;

describe(('Hovedside Test Suite'), () => {
  beforeEach(() => {
    wrapper = shallow(<Hovedside><div id="tester">Child</div></Hovedside>);
  });
  it('viser Topplinje', () => {
    const component = wrapper.find(Topplinje);
    expect(component).toHaveLength(1);
  });
  it('vidrefører children', () => {
    const component = wrapper.find('#tester');
    expect(component).toHaveLength(1);
  });
});
