import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from "../../interfaces/tag.interface";

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  _tags: Tag[] = [];
  @Output() sortItemsByName = new EventEmitter<any>();
  @Output() selectedTableTag = new EventEmitter<Tag>();
  @Input() set tags(tags: Tag[]) {
    this._tags = tags;
  }

  get tags(): Tag[] {
    return this._tags;
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSortByName() {
    this.sortItemsByName.emit();
  }

  onShowTagDetails(tag: Tag) {
    this.selectedTableTag.emit(tag);
  }

}
