import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-field',
  templateUrl: './filter-field.component.html',
  styleUrls: ['./filter-field.component.scss']
})
export class FilterFieldComponent implements OnInit {

  @Output() searchValueEmitter = new EventEmitter<string>();
  searchValue: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearchValueChanged() {
    this.searchValueEmitter.emit(this.searchValue);
    console.log(this.searchValue);
  }

}
