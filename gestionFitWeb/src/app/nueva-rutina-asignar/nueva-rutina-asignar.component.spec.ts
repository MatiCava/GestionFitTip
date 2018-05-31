import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaRutinaAsignarComponent } from './nueva-rutina-asignar.component';

describe('NuevaRutinaAsignarComponent', () => {
  let component: NuevaRutinaAsignarComponent;
  let fixture: ComponentFixture<NuevaRutinaAsignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaRutinaAsignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaRutinaAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
