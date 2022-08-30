import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthFormComponent} from "../shared/auth-form/auth-form.component";
import {Dialog,  DialogRef,  DIALOG_DATA} from '@angular/cdk/dialog';
import {EventsService} from "../services/events.service";
import {User} from "../interfaces/user.interface";
import {UserData} from "../interfaces/userData.interface";
import {ApiService} from "../services/api-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-management-tool-header',
  templateUrl: './management-tool-header.component.html',
  styleUrls: ['./management-tool-header.component.scss']
})
export class ManagementToolHeaderComponent implements OnInit {

  @Output() searchValueEmitter = new EventEmitter<string>();
  dialogRef: any
  user: User | null = null ;
  showFiller = false;
  isRegistered: boolean =  false;
  isLogin: boolean =  false;
  constructor( public dialog: Dialog,
               private eventsService: EventsService,
               private apiService: ApiService,
               private router: Router) { }

  ngOnInit(): void {
    /** close login page when when click on register link **/
    this.eventsService.subscribeOpenModal()
      .subscribe((isOpen) => {
        this.closeDialog();
        if (isOpen) this.openDialog('register');
      })
    this.eventsService.getUserLocally()
      .subscribe((user: User | null) => {
        if(user) {
          this.user = {...user}
          this.isRegistered = true;
          this.isLogin = true;
        }

      })
  }

  onSearchValueChange(searchValue: string) {
    this.searchValueEmitter.emit(searchValue);
  }

  onNewIconClicked() {
    /**
     * when user click for create new Tag if is not login,  login form will open
     * **/
    const userData: UserData | null = this.eventsService.getLocalStorageData("userData");
    if(!userData?.accessToken) {
      this.isLogin = false;
      this.onLoginLinkClicked();
    } else {
      this.eventsService.toggleSideNav(true);
      this.eventsService.isCreateFormMode(true);
    }
    this.router.navigateByUrl('/tags');

  }

  onRegisterLinkClicked(){
    this.openDialog('register');
  }

  onLoginLinkClicked() {
    this.openDialog('login');
  }

  closeDialog() {
    if(this.dialogRef) {
      this.dialogRef.close();
    }
  }

  openDialog(authType: string): void {
    const dialogRef = this.dialog.open<string>( AuthFormComponent, {
      width: '500px',
      data: {authType: authType},
    });

    dialogRef.closed.subscribe(result => {
      console.log('The dialog was closed');
    });
    this.dialogRef = dialogRef;
  }

  OnSendRequest(path: string) {
    /** save current path **/
    this.apiService.setUrlPath(path);
    /** call api service **/
    this.eventsService.callItemsFromApi();
  }

}
