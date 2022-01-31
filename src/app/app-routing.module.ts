import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page/myBooks',
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
        path: ':book-id',
        loadChildren: () => import('./book-details/book-details.module').then( m => m.BookDetailsPageModule)
      }
    ]
  },
  {
    path: 'my-books',
    loadChildren: () => import('./my-books/my-books.module').then( m => m.MyBooksPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
