import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-location-field',
  templateUrl: './location-field.component.html',
  styleUrls: ['./location-field.component.scss']
})
export class LocationFieldComponent implements OnInit {
  @Output() sendRequestEmitter = new EventEmitter<string>();
  pathValue: string = ''
  constructor() { }

  ngOnInit(): void {
  }

  onSendRequest() {
    this.sendRequestEmitter.emit(this.pathValue);
  }

}
