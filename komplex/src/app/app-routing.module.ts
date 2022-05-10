import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { UserCreateComponent } from './admin/user-create/user-create.component';
import { UserEditComponent } from './admin/user-edit/user-edit.component';
import { UserListComponent } from './admin/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PackageListComponent } from './packages/package-list/package-list.component';


const routes: Routes = [
  {
    path:'package',
    component: PackageListComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'admin',
    component: UserListComponent
  },
  {
    path:'admin/create',
    component: UserCreateComponent
  },
  {
    path:'admin/edit/:id',
    component: UserEditComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
