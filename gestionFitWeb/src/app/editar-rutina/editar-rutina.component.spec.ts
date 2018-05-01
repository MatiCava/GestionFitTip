import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRutinaComponent } from './editar-rutina.component';

describe('EditarRutinaComponent', () => {
  let component: EditarRutinaComponent;
  let fixture: ComponentFixture<EditarRutinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarRutinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
