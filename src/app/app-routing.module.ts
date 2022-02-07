import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main-page/MyBooks',
    pathMatch: 'full'
  },
  {
    path: 'main-page/:id',
    children: [
      {
        path: '',
        loadChildren: () => import('./main-page/main-page.module').then(m => m.FolderPageModule)
      },
      {
        path: 'createBook',
        loadChildren: () => import('./book-details/book-details.module').then( m => m.BookDetailsPageModule)
      },
      {
        path: ':book-id',
        loadChildren: () => import('./book-details/book-details.module').then( m => m.BookDetailsPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
