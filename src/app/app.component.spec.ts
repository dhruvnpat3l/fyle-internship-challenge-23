import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { MockDataService } from './mocksServices/mockdata.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let mockDataServiceSpy: jasmine.SpyObj<MockDataService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getUser', 'getRepos']);
    mockDataServiceSpy = jasmine.createSpyObj('MockDataService', ['getRepos']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: MockDataService, useValue: mockDataServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data successfully', fakeAsync(() => {
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
    const mockRepoData = [
      {
          "svn_url": "https://github.com/slavingia/addyourreps",
          "name": "addyourreps",
          "language": "Ruby",
          "topics": [],
          "description": null
      },
      {
          "svn_url": "https://github.com/slavingia/askmybook",
          "name": "askmybook",
          "language": "Python",
          "topics": [],
          "description": null
      },
      {
          "svn_url": "https://github.com/slavingia/caltrainer",
          "name": "caltrainer",
          "language": "Objective-C",
          "topics": [],
          "description": "A Caltrain schedule for iOS."
      },
      {
          "svn_url": "https://github.com/slavingia/code-corps-api",
          "name": "code-corps-api",
          "language": "Elixir",
          "topics": [],
          "description": "Elixir/Phoenix API for Code Corps."
      },
      {
          "svn_url": "https://github.com/slavingia/communitynotes",
          "name": "communitynotes",
          "language": null,
          "topics": [],
          "description": null
      },
      {
          "svn_url": "https://github.com/slavingia/darkdocs",
          "name": "darkdocs",
          "language": "CSS",
          "topics": [],
          "description": "Dark mode for Google Docs"
      },
      {
          "svn_url": "https://github.com/slavingia/discover-gumroad",
          "name": "discover-gumroad",
          "language": "Ruby",
          "topics": [],
          "description": null
      },
      {
          "svn_url": "https://github.com/slavingia/doorkeeper",
          "name": "doorkeeper",
          "language": "Ruby",
          "topics": [],
          "description": "Doorkeeper is an OAuth 2 provider for Ruby on Rails / Grape."
      },
      {
          "svn_url": "https://github.com/slavingia/dotfiles",
          "name": "dotfiles",
          "language": "Shell",
          "topics": [],
          "description": null
      },
      {
          "svn_url": "https://github.com/slavingia/elastic-beanstalk-sample",
          "name": "elastic-beanstalk-sample",
          "language": "HTML",
          "topics": [],
          "description": null
      }
  ];

    apiServiceSpy.getUser.and.returnValue(of(mockUserData));
    apiServiceSpy.getRepos.and.returnValue(of(mockRepoData));

    component.loadUserData('slavingia');

    // Simulate asynchronous data loading
    tick(500);

    expect(apiServiceSpy.getUser).toHaveBeenCalledWith('slavingia');
    expect(apiServiceSpy.getRepos).toHaveBeenCalledWith('slavingia', component.repoPerPage, component.currentPage);

    expect(component.userProfileData).toEqual(mockUserData);
    expect(component.userReposData).toEqual(mockRepoData);
    expect(component.loadingRepos).toBe(false);
    expect(component.errorMessage).toBe('');
  }));

  it('should handle error when loading user data (user not found)', fakeAsync(() => {
    const errorResponse = { message: 'User not found Enter valid username', customData: 'additional data' };
    apiServiceSpy.getUser.and.returnValue(throwError(errorResponse));

    component.loadUserData('ldlasjdla');

    // Simulate asynchronous data loading
    tick();

    expect(apiServiceSpy.getUser).toHaveBeenCalledWith('ldlasjdla');
    expect(component.errorMessage).toEqual(errorResponse.message);
    expect(snackBarSpy.open).toHaveBeenCalledWith(errorResponse.message, 'Close', {
      duration: 0,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    expect(component.userReposData).toBe(null);
    expect(component.userProfileData).toBe('');
    expect(component.loadingRepos).toBe(false);
  }));
});
