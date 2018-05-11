import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoEjercicioComponent } from './info-ejercicio.component';

describe('InfoEjercicioComponent', () => {
  let component: InfoEjercicioComponent;
  let fixture: ComponentFixture<InfoEjercicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoEjercicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
