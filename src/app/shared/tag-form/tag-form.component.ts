import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.scss']
})
export class TagFormComponent implements OnInit {
  tagForm = new FormGroup<any>({
    name: new FormControl(''),
    color: new FormControl(''),
  })
  constructor() { }

  ngOnInit(): void {

  }

}
