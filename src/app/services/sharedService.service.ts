import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn:'root',
})

export class SharedService{

    private usernameSubject = new BehaviorSubject<string>('dhruvnpat3l');
    username$ = this.usernameSubject.asObservable();

    setusername(username: string){
        this.usernameSubject.next(username)
    }
    getUsername(): string{
        return this.usernameSubject.value;
    }
}