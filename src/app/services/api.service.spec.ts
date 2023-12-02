import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    }).compileComponents();
  }));

  beforeEach(() => {
    apiService = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get user data successfully', () => {
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
    const githubUsername = 'slavingia';

    apiService.getUser(githubUsername).subscribe((userData) => {
      expect(userData).toEqual(mockUserData);
    });

    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockUserData);
  });

  it('should handle 404 error when getting user data', () => {
    const githubUsername = 'nonexistentUser';

    apiService.getUser(githubUsername).subscribe(
      () => fail('Expected an error, but got a response'),
      (error) => {
        expect(error.message).toBe('User not found Enter valid username');
        expect(error.customData).toBe('additional data');
      }
    );

    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);
    req.flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('should handle other errors when getting user data', () => {
    const githubUsername = 'errorUser';

    apiService.getUser(githubUsername).subscribe(
      () => fail('Expected an error, but got a response'),
      (error) => {
        expect(error.message).toBe('An error occurred');
        expect(error.customData).toBe('additional data');
      }
    );

    const req = httpTestingController.expectOne(`https://api.github.com/users/${githubUsername}`);
    req.flush(null, { status: 500, statusText: 'Internal Server Error' });
  });

  it('should get repository data successfully', () => {
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
    const githubUsername = 'slavingia';
    const repoPerPage = 10;
    const page = 1;

    apiService.getRepos(githubUsername, repoPerPage, page).subscribe((repoData) => {
      expect(repoData).toEqual(mockRepoData);
    });

    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${repoPerPage}`;
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(mockRepoData);
  });


});
