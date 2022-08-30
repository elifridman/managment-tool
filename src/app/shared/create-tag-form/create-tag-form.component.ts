import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api-service";
import {Tag} from "../../interfaces/tag.interface";
import {EventsService} from "../../services/events.service";
import {User} from "../../interfaces/user.interface";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-create-tag-form',
  templateUrl: './create-tag-form.component.html',
  styleUrls: ['./create-tag-form.component.scss']
})
export class CreateTagFormComponent implements OnInit {
  colorPickerColorSubject$ = new BehaviorSubject<string>('#2889e9');
  colorPickerColorObj$ = this.colorPickerColorSubject$.asObservable();
  color: string ='';
  isCreateMode: boolean = false;
  title: string = '';
  userName: string = '';
  selectedTag: Tag | null = null;

  createNewForm: FormGroup = new FormGroup<any>({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
    color: new FormControl('', Validators.required)
  })

  constructor(
    private apiService: ApiService,
    private eventsService: EventsService) { }

  ngOnInit(): void {
    /** retrieve user **/
    this.eventsService.getUserLocally()
      .subscribe((user: User | null) => {
        if (user) {
          this.userName = user.userName
        }
      });

    /** get form mode create vs details **/
    this.eventsService.getIsCreateMode()
      .subscribe((isCreateMode: boolean) => {
        this.isCreateMode = isCreateMode;
        this.setFormTitle();
      })

    this.eventsService.getSideNavStatus()
      .subscribe((isOpen) => {
        if(!isOpen) {
          this.createNewForm.reset();
          this.eventsService.setSelectedTableItem(null);
        }
      })

    /** retrieve selected tag **/
    this.eventsService.getSelectedTag()
      .subscribe((selectedTag: Tag | null) => {

        if (selectedTag) {
          this.selectedTag = selectedTag;
          this.selectedTag ? this.isCreateMode = false : this.isCreateMode = true;
          this.setFormTitle();
          const patchObj: Partial<Tag> = {
            name: selectedTag.name,
            description: selectedTag.description,
            color: selectedTag.color,
          }
          this.createNewForm.patchValue({
            ...patchObj
          })
          this.colorPickerColorSubject$.next(selectedTag.color);
        }
      });

    this.createNewForm.get("color")?.valueChanges.subscribe(color => {
      this.colorPickerColorSubject$.next(color);
    })
    this.colorPickerColorObj$.subscribe((color) => this.color = color);
  }

  setFormTitle() {
    this.title = this.isCreateMode ? 'Create New' : 'Details';
  }

  onSubmit() {
    const newTag: Tag = {
      name: this.createNewForm.value.name,
      createDate: Date.now().toString(),
      lastUpdate: Date.now().toString(),
      createdBy: this.userName,
      color: this.createNewForm.value.color
    }

    this.apiService.createTag(newTag)
      .subscribe((resolve) => {
        this.eventsService.callItemsFromApi();
        this.eventsService.toggleSideNav(false);
        console.log('tag was created');
      })
  }

  onColorPickerSelect(color: string){
    this.colorPickerColorSubject$.next(color);
    this.createNewForm.patchValue({ color });
  }

}
