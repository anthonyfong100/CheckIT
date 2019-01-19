/** @format */

import {AppRegistry} from 'react-native';
import App from './App';

global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

AppRegistry.registerComponent('reactnative', () => App);
