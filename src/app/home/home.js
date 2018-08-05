import uirouter from 'angular-ui-router';

import { HomeComponent } from "./home.component";
import HomeConfig from "./home.config";

export default angular.module('home', [uirouter])
  .config(HomeConfig)
  .component('home', HomeComponent)
  .name;