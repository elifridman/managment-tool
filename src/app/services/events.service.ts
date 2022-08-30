import { Injectable } from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {User} from "../interfaces/user.interface";
import {UserData} from "../interfaces/userData.interface";
import {Tag} from "../interfaces/tag.interface";
import {ApiService} from "./api-service";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private itemsSubject$ = new BehaviorSubject<Tag[]>([]);
  private itemsObs$ = this.itemsSubject$.asObservable();

  private selectedTagSubject$ = new BehaviorSubject<Tag | null>(null);
  private selectedTagObs$ = this.selectedTagSubject$.asObservable();

  private searchValueSubject$ = new BehaviorSubject<string>('');
  private searchValueObs$ = this.searchValueSubject$.asObservable();

  private openModalSubject$ = new BehaviorSubject<boolean>(false);
  private openModalObs$ = this.openModalSubject$.asObservable();

  private userSubject$ = new BehaviorSubject<User | null>(null);
  private userObs$ = this.userSubject$.asObservable();

  private isSideNavOpenedSubject$ = new BehaviorSubject<boolean>(false);
  private isSideNavOpenedObs$ = this.isSideNavOpenedSubject$.asObservable();

  private isCreateModeSubject$ = new BehaviorSubject<boolean>(false);
  private isCreateModeObs$ = this.isCreateModeSubject$.asObservable();

  private localStorageData: string | null = null;


  constructor(private apiService: ApiService) { }

  getLocalItems() {
    return this.itemsObs$;
  }

  getSelectedTag() {
    return this.selectedTagObs$;
  }

  getIsCreateMode() {
    return this.isCreateModeObs$;
  }

  isCreateFormMode(mode: boolean) {
    this.isCreateModeSubject$.next(mode);
  }

  setSelectedTableItem(item: Tag | null) {
    this.selectedTagSubject$.next(item);
  }

  callItemsFromApi() {
    this.apiService.getItems()
      .pipe(
       tap((tags: Tag[]) => this.itemsSubject$.next(tags))
      ).subscribe();
  }

  setItems(tags: Tag[]) {
    this.itemsSubject$.next(tags);
  }

  emitSearchValue(searchValue: string) {
    this.searchValueSubject$.next(searchValue);
  }

  getSearchValue() {
    return this.searchValueObs$;
  }

  emitOpenModal() {
    this.openModalSubject$.next(true);
  }

  subscribeOpenModal() {
    return this.openModalObs$;
  }

  setLocalStorageData(key: string, userStr: string) {
    localStorage.setItem(key, userStr);
  }

  getLocalStorageData(key: string): UserData | null {
    this.localStorageData = localStorage.getItem(key);
    if (this.localStorageData){
      return JSON.parse(this.localStorageData);
    } else {
      return null;
    }
  }

  setUserLocally(user: User) {
    this.userSubject$.next(user)
  }

  getUserLocally() {
    return this.userObs$;
  }

  toggleSideNav(toOpen: boolean) {
    this.isSideNavOpenedSubject$.next(toOpen);
  }

  getSideNavStatus() {
    return this.isSideNavOpenedObs$;
  }

}
