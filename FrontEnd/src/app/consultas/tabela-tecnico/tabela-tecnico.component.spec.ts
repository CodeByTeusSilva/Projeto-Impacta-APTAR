import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaTecnicoComponent } from './tabela-tecnico.component';

describe('TabelaTecnicoComponent', () => {
  let component: TabelaTecnicoComponent;
  let fixture: ComponentFixture<TabelaTecnicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaTecnicoComponent]
    });
    fixture = TestBed.createComponent(TabelaTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
