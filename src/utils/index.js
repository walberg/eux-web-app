import { isFunction, isNil, isString, isEmpty, isObject, isBoolean, toInteger, round, set } from 'lodash';

import throttle from 'lodash.throttle';

import * as adresse from './adresse';
import * as dato from './dato';
import * as streng from './streng';
import * as logger from './logger';
import * as queryString from './queryString';
import * as yup from './yup';

import { buildinfo, delay, fn, isJSON, verdiSomNullable, queryParamsTilObjekt, erPropertyUnik, finnVerdierMedKey } from './utils';

export {
  buildinfo, delay, fn, isJSON, verdiSomNullable, queryParamsTilObjekt, erPropertyUnik, finnVerdierMedKey,
  adresse,
  dato, streng,
  logger,
  queryString,
  yup,
  // isUndefined as _isUndefined,
  isFunction as _isFunction,
  isNil as _isNil,
  isString as _isString,
  throttle as _throttle,
  isEmpty as _isEmpty,
  isObject as _isObject,
  isBoolean as _isBoolean,
  toInteger as _toInteger,
  round as _round,
  set as _set,
};
