import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementToolHeaderComponent } from './management-tool-header.component';

describe('ManagementToolHeaderComponent', () => {
  let component: ManagementToolHeaderComponent;
  let fixture: ComponentFixture<ManagementToolHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementToolHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagementToolHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
