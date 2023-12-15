import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

 userProfileData:any = undefined;
 currentUsername: string ='';
 userName: string='';
 errorMessage:string='';
 loadingUserData:boolean =false;

 constructor(
  private apiService: ApiService,
  private sharedService:SharedService,
  private snackBar:MatSnackBar,
 ){}

 ngOnInit(): void {
   this.sharedService.username$.subscribe((newUsername) => {
    this.loadUserData(newUsername)
   } )
 }

  loadUserData(user:string):void{
    const newUsername = user.trim();
    this.loadingUserData = true

    if (newUsername !== '' && newUsername !== this.currentUsername) {
      this.apiService.getUser(newUsername).pipe(delay(300)).subscribe(

        (userData) => {
          this.userProfileData = userData
          this.loadingUserData = false
          this.userName = newUsername
        },
        (error) => {
          this.errorMessage = error.message
          console.log(error)
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 0, // Adjust duration as needed
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.userProfileData=this.userProfileData
          this.loadingUserData = false
        // Set the error message to display to the user
        }
      );
    }
  }
}

