import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserModule } from './user/user.module';
import {HttpClientModule} from '@angular/common/http';
import { UserService } from './services/user.service';
import { PackageService } from './services/package.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptorProvider } from './_helper/auth.interceptor';
import { AdminModule } from './admin/admin.module';
import { PackagesModule } from './packages/packages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AdminModule,
    PackagesModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDividerModule,
  ],
  providers: [UserService,PackageService,AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }

