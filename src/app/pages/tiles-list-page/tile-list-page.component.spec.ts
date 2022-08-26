import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesListPageComponent } from './tiles-list-page.component';

describe('TilesListPageComponent', () => {
  let component: TilesListPageComponent;
  let fixture: ComponentFixture<TilesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TilesListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TilesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
