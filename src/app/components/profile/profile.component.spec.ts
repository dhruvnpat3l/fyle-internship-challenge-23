import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/sharedService.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const apiServiceSpyObj = jasmine.createSpyObj('ApiService', ['getUser']);
    const sharedServiceSpyObj = jasmine.createSpyObj('SharedService', ['username$']);
    const snackBarSpyObj = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports:[NgxSkeletonLoaderModule],
      providers: [
        { provide: ApiService, useValue: apiServiceSpyObj },
        { provide: SharedService, useValue: sharedServiceSpyObj },
        { provide: MatSnackBar, useValue: snackBarSpyObj },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    const mockUserData = {
      "login": "slavingia",
      "id": 74396,
      "node_id": "MDQ6VXNlcjc0Mzk2",
      "avatar_url": "https://avatars.githubusercontent.com/u/74396?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/slavingia",
      "html_url": "https://github.com/slavingia",
      "followers_url": "https://api.github.com/users/slavingia/followers",
      "following_url": "https://api.github.com/users/slavingia/following{/other_user}",
      "gists_url": "https://api.github.com/users/slavingia/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/slavingia/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/slavingia/subscriptions",
      "organizations_url": "https://api.github.com/users/slavingia/orgs",
      "repos_url": "https://api.github.com/users/slavingia/repos",
      "events_url": "https://api.github.com/users/slavingia/events{/privacy}",
      "received_events_url": "https://api.github.com/users/slavingia/received_events",
      "type": "User",
      "site_admin": false,
      "name": "Sahil Lavingia",
      "company": "Gumroad",
      "blog": "http://sahillavingia.com/",
      "location": "San Francisco, CA",
      "email": null,
      "hireable": null,
      "bio": "writing code for @gumroad. writing fiction for myself.",
      "twitter_username": null,
      "public_repos": 32,
      "public_gists": 2,
      "followers": 419,
      "following": 11,
      "created_at": "2009-04-16T10:43:25Z",
      "updated_at": "2023-10-19T16:45:46Z"
  };
    const mockUsername = "slavingia";
    sharedServiceSpy.username$ = of(mockUsername)
    apiServiceSpy.getUser.and.returnValue(of(mockUserData));

    fixture.detectChanges();

    expect(apiServiceSpy.getUser).toHaveBeenCalledWith(mockUsername);
    fixture.whenStable().then(() => {
      expect(component.userProfileData).toEqual(mockUserData);
      expect(component.loadingUserData).toBeFalsy();
    });
  });

  it('should display error message on error', () => {
    const mockError = { message: 'test error message' };
    const mockUsername = 'ljsafdljsdd';
    sharedServiceSpy.username$ = of(mockUsername)
    apiServiceSpy.getUser.and.returnValue(of(mockError));

    fixture.detectChanges();

    expect(apiServiceSpy.getUser).toHaveBeenCalledWith(mockUsername);
    fixture.whenStable().then(() => {
      expect(component.errorMessage).toEqual(mockError.message);
      expect(snackBarSpy.open).toHaveBeenCalledWith(mockError.message, 'Close', jasmine.any(Object));
      expect(component.loadingUserData).toBeFalsy();
    })
  });
});
