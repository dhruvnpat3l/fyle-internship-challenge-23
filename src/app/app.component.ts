import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { MockDataService } from './mocksServices/mockdata.service';
import { delay } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName: string = 'dhruvnpat3l';
  userProfileData: any = undefined;
  userReposData: any = undefined;
  currentPage: number = 1;
  repoPerPage: number = 10;
  currentUsername: string = '';
  imgpath: string='../assets/coding.png'
  colors = [
    '#f45d9e', // pink
    '#f58401', // orange
    '#f44d34', // red
    '#25b2af', // cyan
    '#824d9c', // purple
    '#9f8e94'  // gre
  ];
  loadingRepos: boolean = false
  errorMessage: string ='';

  // Array to store the initial card colors
  initialCardColors: string[] = [];

  constructor(
    private apiService: ApiService,
    private mockDataServices: MockDataService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
   this.loadUserData(this.userName)
   this.initialCardColors = this.getInitialCardColors();
   
  }

  onUsernameSubmit(): void {
    this.loadUserData(this.userName)
  }

  loadUserData(user:string):void{
    const newUsername = user.trim();
    this.userProfileData = ''
    if (newUsername !== '' && newUsername !== this.currentUsername) {
      this.apiService.getUser(this.userName).pipe(delay(300) ).subscribe(
        (userData) => {
          this.userProfileData = userData;
          console.log(this.userProfileData);
          this.loadRepos(newUsername, this.repoPerPage, this.currentPage);
          this.updateCardColors()
          this.errorMessage = ''
          this.loadRepos(this.userName,this.repoPerPage,this.currentPage);
      
      // Update the color of each card when the user submits the form
          this.updateCardColors();
        },
        (error) => {

        // Set the error message to display to the user
        this.errorMessage = error.message;
        console.log(this.errorMessage)
        
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 0, // Adjust duration as needed
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        this.userReposData = null
        this.userProfileData = ''
        // Display the error message and return to the last username

        }
      );
    }
  }

  // load the repo Data
  loadRepos(user: string,repoperpage:number,currentpage:number) {

    this.loadingRepos = true

    this.apiService.getRepos(user, repoperpage,currentpage).pipe(
      delay(300),)
      .subscribe((userData) => {
        this.userReposData = userData; 
        this.loadingRepos = false
        console.log(this.userReposData);
      },
      (error) => {
        this.loadingRepos =false;
        console.error('Error Fetching user Repo:', error);
      }
    );
  }
  // Load the Repository mock data
  // loadRepos(user: string,repoperpage:number,currentpage:number): void {
  //   this.mockDataServices.getRepos().subscribe(
  //     (userData) => {
  //       this.userReposData = userData;
  //       console.log(this.userReposData);
  //     },
  //     (error) => {
  //       console.error('Error Fetching user Repo:', error);
  //     }
  //   );
  // }
  
  //Pageination
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.loadRepos(this.userName,this.repoPerPage,this.currentPage);
  }
  
  //set how much repo per page 
  setRepoPerPage(count: number): void {
    this.repoPerPage = count;
    this.currentPage = 1
    this.loadRepos(this.userName,this.repoPerPage,this.currentPage);
    this.initialCardColors = this.getInitialCardColors();
  }

    
  // Return the color at the specified index in the initialCardColors array
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

 
}