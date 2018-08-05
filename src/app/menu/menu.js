import uirouter from 'angular-ui-router';

import { NavbarComponent } from "./navbar/navbar.component";
import { MenuComponent } from "./menu.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryItemComponent } from "./category-item/category-item.component";
import { CategoryCreatorComponent } from "./category-creator/category-creator.component";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { BackShadowComponent } from "./back-shadow/back-shadow.component";
import { HamburgerBtnComponent } from "./hamburger-btn/hamburger-btn.component";

export default angular.module('menu', [uirouter])
  .component('navbar', NavbarComponent)
  .component('appMenu', MenuComponent)
  .component('categoryList', CategoryListComponent)
  .component('categoryItem', CategoryItemComponent)
  .component('categoryCreator', CategoryCreatorComponent)
  .component('categoryForm', CategoryFormComponent)
  .component('backShadow', BackShadowComponent)
  .component('hamburgerBtn', HamburgerBtnComponent)
  .name;