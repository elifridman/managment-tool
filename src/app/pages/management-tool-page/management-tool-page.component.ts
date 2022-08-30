import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api-service";
import {Tag} from "../../interfaces/tag.interface";
import {catchError, of} from "rxjs";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Tile} from "../../interfaces/tile.interface";


@Component({
  selector: 'app-management-tool-page',
  templateUrl: './management-tool-page.component.html',
  styleUrls: ['./management-tool-page.component.scss']
})
export class ManagementToolPageComponent implements OnInit {
  items: Tag[] = [];
  filteredItems: Tag[] | Tile[] = [];
  searchValue: string = '';
  sortOrdering: boolean = false;
  isTagsPage: boolean = false;
  isTilesPage: boolean = false;

  constructor(private apiService: ApiService,
              private eventsService: EventsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /** catch routing  **/
    this.route.data.subscribe((data: any) => {
      if (data.pageType === 'tags') {
        this.isTagsPage = true;
      }
      if (data.pageType === 'tiles') {
        this.isTilesPage = true;
      }
    });

    /** get search value Observable **/
    this.eventsService.getSearchValue()
      .subscribe((searchValue: string) => {
        this.searchValue = searchValue;
        this.filterListBySearchValue(searchValue);
      });

    /** get items array **/
    this.eventsService.getLocalItems()
      .pipe(
        catchError(() => {
          return of([
        {
          id: "1",
          name: "Car accident",
          createDate: "03/02/2021",
          lastUpdate: "03/02/2021",
          createdBy: "Ori Lugasi",
          color: "#008000"
        },
      ])}))
      .subscribe((items: Tag[]) => {
          this.items = items;
          this.filteredItems = this.isTagsPage ? items as Tag[] : items.map((item) => {
            return {
              name: item.name,
              color: item.color
            }
          } ) as Tile[];
      })
  }

  filterListBySearchValue(searchValue: string) {
    this.filteredItems = this.items.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase())
    })
  }

  /** user select table item **/
  onSelectedTableItem(item: Tag) {
    this.eventsService.setSelectedTableItem(item);
    this.eventsService.isCreateFormMode(false);
    this.eventsService.toggleSideNav(true);
  }

  /** sort items **/
  onSortItemsByName() {
    this.sortOrdering = !this.sortOrdering;
    if (this.sortOrdering) {
      this.filteredItems = this.items.sort((a,b) => (a.name > b.name) ? -1 : ((b.name > a.name) ? 1 : 0));
    } else {
      this.filteredItems = this.items.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }
  }

}
