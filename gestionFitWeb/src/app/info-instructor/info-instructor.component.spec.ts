import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoInstructorComponent } from './info-instructor.component';

describe('InfoInstructorComponent', () => {
  let component: InfoInstructorComponent;
  let fixture: ComponentFixture<InfoInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
