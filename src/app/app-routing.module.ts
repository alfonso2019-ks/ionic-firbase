import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'developers', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'details/:id',loadChildren: './pages/todo-details/todo-details.module'},
  {path: 'details', loadChildren: './pages/todo-details/todo-details.module'},
  {path: 'developers',loadChildren: './pages/developers/developers.module'},
  { path: 'developers/id',loadChildren: './pages/developer/developer.module'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
