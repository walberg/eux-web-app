/* eslint-disable no-undef */
import React from 'react';
import configureStore from 'redux-mock-store';

import createStore from '../store';
import diveUntillTarget from '../../test/utils';

const rewire = require('rewire');

const Personsok = rewire('./personsok.js');

const PersonKort = Personsok.__get__('PersonKort');


describe(('Personsok Test Suite'), () => {
  beforeEach(() => {
  });
  describe('PersonKort', () => {
    console.log(PersonKort);
  });
});
