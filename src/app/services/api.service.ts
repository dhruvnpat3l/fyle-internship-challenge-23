import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError,map, catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get<any>(`https://api.github.com/users/${githubUsername}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // User not found
          return throwError({ message: 'User not found Enter valid username', customData: 'additional data' });
        } else {
          // Other errors
          return throwError({ message: 'An error occurred', customData: 'additional data' });
        }
      })
    )
  }
  
  getRepos(githubUsername: string, repoPerPage: number, page: number) {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${repoPerPage}`;

    return this.httpClient.get<any[]>(url).pipe(
      map(repos => {
        // Transform each repository object to include only the desired fields
        return repos.map(repo => ({
          svn_url: repo.svn_url,
          name: repo.name,
          language: repo.language,
          topics: repo.topics,
          description: repo.description
        }));
      })
    );
  }
  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
