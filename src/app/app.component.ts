import {Component, OnInit} from '@angular/core';
import {EventsService} from "./services/events.service";
import {AuthFormComponent} from "./shared/auth-form/auth-form.component";
import {UserData} from "./interfaces/userData.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TA9';
  isSideNavOpened = false;
  constructor(private eventsService: EventsService) {
  }

  onSearchValueChange(searchValue: string) {
    this.eventsService.emitSearchValue(searchValue);
  }

  ngOnInit(): void {
    /** check for login **/
    const userData: UserData | null = this.eventsService.getLocalStorageData("userData");
    if(userData && userData.accessToken) {
      this.eventsService.setUserLocally(userData.user);
    }

    /** register for sidenav **/
    this.eventsService.getSideNavStatus()
      .subscribe((isSideNavOpen: boolean) => {
        this.isSideNavOpened = isSideNavOpen;
      });
  }

  onSideNavClose() {
    this.eventsService.toggleSideNav(false);
  }

}
