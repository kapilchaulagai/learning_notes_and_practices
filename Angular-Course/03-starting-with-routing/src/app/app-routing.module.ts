import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'about',
    //component: AboutComponent, //standaloe lazy loading
    loadComponent: () => import('./about/about.component').then((mod) => mod.AboutComponent)
  },
  {
    //lazy loading children non standalone
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/routes').then(
        (mod) => mod.DASHBOARD_ROUTES
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
