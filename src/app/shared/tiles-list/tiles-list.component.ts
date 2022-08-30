import {Component, Input, OnInit} from '@angular/core';
import {Tile} from "../../interfaces/tile.interface";


@Component({
  selector: 'app-tiles-list',
  templateUrl: './tiles-list.component.html',
  styleUrls: ['./tiles-list.component.scss']
})
export class TilesListComponent implements OnInit {

  @Input() tiles: Tile[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
