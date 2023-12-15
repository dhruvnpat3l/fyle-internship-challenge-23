import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileComponent } from './components/profile/profile.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RepoListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule
    
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
