import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarRutinaDialogComponent } from './eliminar-rutina-dialog.component';

describe('EliminarRutinaDialogComponent', () => {
  let component: EliminarRutinaDialogComponent;
  let fixture: ComponentFixture<EliminarRutinaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EliminarRutinaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarRutinaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
