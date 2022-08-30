import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import {EventsService} from "../../services/events.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api-service";
import {User} from "../../interfaces/user.interface";
import {mergeMap} from "rxjs";
import {UserData} from "../../interfaces/userData.interface";

export interface DialogData {
  authType: string;
};

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})

export class AuthFormComponent implements OnInit {

  title: string = '';
  registerMessage: string = ''
  isRegisterForm: boolean = false;

  /** init register form && login form **/
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor( public dialogRef: DialogRef<string>,
               @Inject(DIALOG_DATA) public data: DialogData,
               private eventsService: EventsService,
               private apiService: ApiService) { }

  ngOnInit(): void {
    if (this.data.authType === 'register') {
      this.title = 'Register Form';
      this.isRegisterForm = true;
    } else {
      this.isRegisterForm = false;
      this.registerMessage = 'if you dont have an account please register';
      this.title = 'Login Form';
    }
  }

  onRegisterLinkClicked() {
    this.eventsService.emitOpenModal();
  }

  onSubmit() {
    /**
     * register user or login user
     * set the user locally in the app
     * set local in storage
     * close modal
     **/
    if(this.isRegisterForm) {
      this.apiService.registerUser(this.registerForm.value)
        .subscribe((userData: UserData) => {
          this.eventsService.setUserLocally(userData.user);
          this.eventsService.setLocalStorageData("userData", JSON.stringify(userData));
          this.dialogRef.close();
        })
    } else {
      this.apiService.loginUser(this.loginForm.value)
        .subscribe((userData: UserData) => {
          this.eventsService.setUserLocally(userData.user);
          this.eventsService.setLocalStorageData("userData", JSON.stringify(userData));
          this.dialogRef.close();
        })
    }
  }

}
