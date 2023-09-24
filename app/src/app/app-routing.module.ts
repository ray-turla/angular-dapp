import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './modules/home/components/home/home.component';
import { authGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { 
      path : '', 
      loadChildren: () => import ('./modules/home/home.module').then(m => m.HomeModule),
      canActivate: [authGuard],
  }, 
  { path: 'connect', component: LandingComponent, outlet: 'primary' },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
