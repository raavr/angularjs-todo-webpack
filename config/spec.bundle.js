import 'angular';
import 'angular-mocks/angular-mocks';
import 'babel-polyfill';

let testContext = require.context("../src", true, /.spec$/);
testContext.keys().map(testContext);