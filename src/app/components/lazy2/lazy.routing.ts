import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartShoppingUkComponent } from '../start-shopping-uk/start-shopping-uk.component';
import { ShoppingCartComponent } from '../shopping-cart-uk/shopping-cart.component';

const routes: Routes = [
  { path: '', component: StartShoppingUkComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);