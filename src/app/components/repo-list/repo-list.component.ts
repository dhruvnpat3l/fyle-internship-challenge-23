import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent implements OnInit {
  
  @Input() userName: string='';
  userReposData: any = undefined;
  currentPage: number = 1;
  repoPerPage: number = 10;
  currentUsername: string = '';
  loadingRepos: boolean = false;
  initialCardColors: string[] = [];
  imgpath: string='../../../assets/coding.png'
  colors = [
    '#f45d9e', // pink
    '#f58401', // orange
    '#f44d34', // red
    '#25b2af', // cyan
    '#824d9c', // purple
    '#9f8e94'  // gre
  ];

  constructor(
    private apiService:ApiService,
    private sharedService:SharedService,
  ) {
  
  }

  ngOnInit() {
    this.sharedService.username$.subscribe((newUsername) =>{
      this.loadRepos(newUsername,this.repoPerPage,this.currentPage)
      this.userName = newUsername
      this.initialCardColors = this.getInitialCardColors();
    })
  }

  loadRepos(user: string,repoperpage:number,currentpage:number) {

    this.loadingRepos = true

    this.apiService.getRepos(user, repoperpage,currentpage).pipe(
      delay(300),)
      .subscribe((userData) => {
        
        this.userReposData = userData; 
        this.loadingRepos = false
        
      },
      (error) => {
        this.loadingRepos =false;
        console.error('Error Fetching user Repo:', error);
      }
    );
  }

  setRepoPerPage(count: number): void {
    this.repoPerPage = count;
    this.currentPage = 1
    this.loadRepos(this.userName,this.repoPerPage,this.currentPage);
    this.initialCardColors = this.getInitialCardColors();
  }

  getCardBackgroundColor(index: number): string {
    return this.initialCardColors[index];
  }
  
  getRandomColor(colors: string[]): string {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  // Initialize the initial card colors
  private getInitialCardColors(): string[] {
    return Array.from({ length: this.repoPerPage }, () => this.getRandomColor(this.colors));
  }

  // Update the color of each card
  private updateCardColors(): void {
    this.initialCardColors = this.initialCardColors.map(() => this.getRandomColor(this.colors));
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadRepos(this.userName,this.repoPerPage,this.currentPage);
  }
}
