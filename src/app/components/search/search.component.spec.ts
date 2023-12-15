import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SharedService } from 'src/app/services/sharedService.service';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(() => {
    const sharedServiceSpyObj = jasmine.createSpyObj('SharedService', ['setusername']);

    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        { provide: SharedService, useValue: sharedServiceSpyObj },
      ],
      imports: [FormsModule], // Import FormsModule for ngModel
    });

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call setusername on onUsernameSubmit', () => {
    const testUsername = 'testUser';
    component.userName = testUsername;

    component.onUsernameSubmit();

    expect(sharedServiceSpy.setusername).toHaveBeenCalledWith(testUsername);
  });
});
