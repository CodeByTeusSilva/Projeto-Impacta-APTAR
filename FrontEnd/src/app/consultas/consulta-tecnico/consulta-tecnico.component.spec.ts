import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaTecnicoComponent } from './consulta-tecnico.component';

describe('ConsultaTecnicoComponent', () => {
  let component: ConsultaTecnicoComponent;
  let fixture: ComponentFixture<ConsultaTecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultaTecnicoComponent]
    });
    fixture = TestBed.createComponent(ConsultaTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
