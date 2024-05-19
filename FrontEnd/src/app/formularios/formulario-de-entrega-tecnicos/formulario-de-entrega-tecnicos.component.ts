import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
import { FormsFinalizacaoDTO } from 'src/app/models/FormsFinalizacaoDTO';
import { EntregaService } from 'src/app/services/Entrega.service';

@Component({
  selector: 'app-formulario-de-entrega-tecnicos',
  templateUrl: './formulario-de-entrega-tecnicos.component.html',
  styleUrls: ['./formulario-de-entrega-tecnicos.component.css']
})
export class FormularioDeEntregaTecnicosComponent {

  form: FormGroup;
  selectedFile: File | null = null;
  formsfinalizacao?: FormsFinalizacaoDTO;

  constructor(
    private fb: FormBuilder,
    private service: EntregaService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      observacoes: [''],
      chamadoId: [''],
      imagem: ['']
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  preencherFormulario() {
    this.formsfinalizacao = this.authService.getTecnicoEncontrado();
    if (this.formsfinalizacao) {
      this.form.patchValue({
        observacoes: this.formsfinalizacao.observacoes,
        chamadoId: this.formsfinalizacao.chamadoId,
        imagem: this.formsfinalizacao.fotoUrl,
      });
    }
  }

  onSubmitTec() {
    const formData = new FormData();
    const tecnicoData: FormsFinalizacaoDTO = this.form.value;
    
    formData.append('observacoes', tecnicoData.observacoes);
    formData.append('chamadoId', tecnicoData.chamadoId);
    if (this.selectedFile) {
      formData.append('File', this.selectedFile, this.selectedFile.name);
    }

    this.service.saveTec(formData).subscribe(
      response => {
        console.log('Técnico salvo com sucesso!', response);
      },
      error => {
        console.error('Erro ao salvar técnico:', error);
      }
    );
  }
}
