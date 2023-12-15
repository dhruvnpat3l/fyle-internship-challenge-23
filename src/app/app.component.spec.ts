import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RepoListComponent } from './components/repo-list/repo-list.component';
import {  HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule } from '@angular/material/snack-bar';


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent,SearchComponent,ProfileComponent,RepoListComponent],
      imports: [HttpClientModule,MatSnackBarModule]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
