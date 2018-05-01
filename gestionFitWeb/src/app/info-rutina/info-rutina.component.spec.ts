import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRutinaComponent } from './info-rutina.component';

describe('InfoRutinaComponent', () => {
  let component: InfoRutinaComponent;
  let fixture: ComponentFixture<InfoRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
