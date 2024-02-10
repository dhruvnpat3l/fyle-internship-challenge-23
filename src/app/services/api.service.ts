import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError,map, catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private cache: Map<string , any> = new Map();
  constructor(
    private httpClient: HttpClient
  
  ) { }

  getUser(githubUsername: string) {
    const url = `https://api.github.com/users/${githubUsername}`

    if( this.cache.has(url)){
      return of(this.cache.get(url))
    } 
    else
    {
      return this.httpClient.get<any>(url).pipe(
        tap(response => {
          this.cache.set(url,response)
        }), 
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
  }
  
  getRepos(githubUsername: string, repoPerPage: number, page: number):Observable<any> {
    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${repoPerPage}`;

    if(this.cache.has(url)){
      return of(this.cache.get(url))
    }
    else{

          return this.httpClient.get<any[]>(url).pipe(
            map(repos => {

              const tranfomredRepos= repos.map(repo => ({
                svn_url: repo.svn_url,
                name: repo.name,
                language: repo.language,
                topics: repo.topics,
                description: repo.description
              }));

              this.cache.set(url, tranfomredRepos);
              return tranfomredRepos;
            }),

          );
      }
    }

 
}
