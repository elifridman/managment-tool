import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {asyncScheduler, Observable, of, scheduled} from "rxjs";
import {User} from "../../interfaces/user.interface";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  _user: User | undefined;
  _isRegistered: boolean | undefined;
  _isLogin: boolean | undefined;

  @Input() set isRegistered(isRegistered: boolean | null) {
    if(isRegistered) {
      this._isRegistered = isRegistered;
    }
  }

  get isRegistered(): boolean | null {
    if (this._isRegistered) {
      return this._isRegistered;
    } else {
      return null;
    }
  }

  @Input() set isLogin(isLogin: boolean | null) {
    if(isLogin) {
      this._isLogin = isLogin;
    }
  }

  get isLogin(): boolean | null {
    if (this._isLogin) {
      return this._isLogin;
    } else {
      return null;
    }
  }

  @Input() set user(user: User | null) {
    if(user) {
      this._user = user;
    }
    this.userName = user?.userName || '';
  }

  get user(): User | null {
    if (this._user) {
      return this._user;
    } else {
      return null;
    }
  }
  @Output() newIconClickedEmitter = new EventEmitter<any>();
  @Output() registerLinkClickedEmitter = new EventEmitter<any>();
  @Output() loginLinkClickedEmitter = new EventEmitter<any>();

  userName: string = '';
  constructor() { }

  ngOnInit(): void {

  }

  onNewIconClicked() {
    this.newIconClickedEmitter.emit();
  }

  onRegister() {
    this.registerLinkClickedEmitter.emit();
  }

  onLogin() {
    this.loginLinkClickedEmitter.emit();
  }

}
