import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioEmpresaComponent } from './relatorio-empresa.component';

describe('RelatorioEmpresaComponent', () => {
  let component: RelatorioEmpresaComponent;
  let fixture: ComponentFixture<RelatorioEmpresaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatorioEmpresaComponent]
    });
    fixture = TestBed.createComponent(RelatorioEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
