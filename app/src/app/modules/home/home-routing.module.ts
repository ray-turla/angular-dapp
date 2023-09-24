import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { authGuard } from 'src/app/guards/auth/auth.guard';
import { PostFormComponent } from './components/post-form/post-form.component';

const routes: Routes = [
  { 
    path : '', 
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PostListComponent
      },
      {
        path: 'post/create',
        component: PostFormComponent
      },
      {
        path: 'post/update/:id',
        component: PostFormComponent
      },
      {
        path: 'post/:id',
        component: PostDetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
