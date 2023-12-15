import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/sharedService.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
  
  userName:string=''
  constructor(
    private sharedService:SharedService,
  ){}
  ngOnInit(): void {
    
  }

  onUsernameSubmit(): void {
    this.sharedService.setusername(this.userName)
  }
}
