import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';

const routes: Routes = [
  {    path: '',    redirectTo: 'home',    pathMatch: 'full'   },
  {    path: 'home',    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)  },
  {    path: 'signin',    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)  },
  {    path: 'signup',    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)  },
  {    path: 'dloc',    loadChildren: () => import('./dloc/dloc.module').then( m => m.DlocPageModule)  },
  {
    path: 'inlok',
    loadChildren: () => import('./in-lok/in-lok.module').then( m => m.InLokPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules },
      ),
      // AgmCoreModule.forRoot({
      //   apiKey: environment.googleMapsKey}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
