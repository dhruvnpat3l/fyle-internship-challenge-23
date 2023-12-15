import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/sharedService.service';
import { RepoListComponent } from './repo-list.component';

describe('RepoListComponent', () => {
  let component: RepoListComponent;
  let fixture: ComponentFixture<RepoListComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(() => {
    const apiServiceSpyObj = jasmine.createSpyObj('ApiService', ['getRepos']);
    const sharedServiceSpyObj = jasmine.createSpyObj('SharedService', ['username$']);

    TestBed.configureTestingModule({
      declarations: [ RepoListComponent ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpyObj },
        { provide: SharedService, useValue: sharedServiceSpyObj },
      ],
    });

    fixture = TestBed.createComponent(RepoListComponent);
    component = fixture.componentInstance;
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load repos on init', fakeAsync(() => {
    const mockRepoData =  [
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
    const mockUsername = 'slavingia'
    sharedServiceSpy.username$ = of(mockUsername)
    apiServiceSpy.getRepos.and.returnValue(of(mockRepoData));

    fixture.detectChanges();
    tick(300);
   

    expect(apiServiceSpy.getRepos).toHaveBeenCalledWith(mockUsername, component.repoPerPage, component.currentPage);
    fixture.whenStable().then(() => {
      expect(component.userReposData).toEqual(mockRepoData);
      expect(component.loadingRepos).toBeFalsy();
    });
  }));

});
