package com.projetoimpacta.aptar.services;

import com.projetoimpacta.aptar.domain.Chamado;
import com.projetoimpacta.aptar.domain.Empresa;
import com.projetoimpacta.aptar.domain.NumeroChamado;
import com.projetoimpacta.aptar.domain.Tecnico;
import com.projetoimpacta.aptar.domain.enums.Prioridade;
import com.projetoimpacta.aptar.domain.enums.Status;
import com.projetoimpacta.aptar.dtos.ChamadoDTOinput;
import com.projetoimpacta.aptar.dtos.ChamadoDTOout;
import com.projetoimpacta.aptar.repositories.ChamadoRepository;
import com.projetoimpacta.aptar.services.exceptions.ObjectnotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ChamadoService {

    @Autowired
    private ChamadoRepository repository;

    @Autowired
    private TecnicoService tecnicoService;

    @Autowired
    private EmpresaService empresaService;


    public Chamado findById(Long id) {
        Optional<Chamado> obj = repository.findById(id);
        return obj.orElseThrow(() -> new ObjectnotFoundException("Chamado não encontrado! Id: " + id));
    }

    public Chamado findByNumeroChamado(String numeroChamado) {
        Optional<Chamado> obj = repository.findByNumeroChamado(numeroChamado);
        return obj.orElseThrow(() -> new ObjectnotFoundException("Chamado não encontrado!"));
    }

    public List<Chamado> findAll() {
        return repository.findAll();
    }

    public Chamado create(@Valid ChamadoDTOinput objDTO) {
        return repository.save(newChamado(objDTO));
    }

    public Chamado update(Long id, ChamadoDTOinput objDTO) {
        objDTO.setId(id);
        Chamado chamadoExistente = findById(id);
        Chamado novoChamado = newChamado(objDTO);
        novoChamado.setNumeroChamado(chamadoExistente.getNumeroChamado());
        return repository.save(novoChamado);
    }

    private Chamado newChamado(ChamadoDTOinput obj) {
        Tecnico tecnico = tecnicoService.findById(obj.getTecnico());
        Empresa empresa = empresaService.findById(obj.getEmpresa());

        Chamado chamado = new Chamado();
        if (obj.getId() != null) {
            chamado.setId(obj.getId());
        }

        if (obj.getStatus().equals(2)) {
            chamado.setDataFechamento(LocalDate.now());
        }

        chamado.setTecnico(tecnico);
        chamado.setEmpresa(empresa);
        chamado.setNumeroChamado(NumeroChamado.proximoNumero());
        chamado.setPrioridade(Prioridade.toEnums(obj.getPrioridade()));
        chamado.setStatus(Status.toEnum(obj.getStatus()));
        chamado.setTitulo(obj.getTitulo());
        chamado.setObservacoes(obj.getObservacoes());
        chamado.setEndereco(obj.getEndereco());

        return chamado;
    }

    public List<ChamadoDTOout> findByEmpresaId(Long id) {
        List<Chamado> chamados = repository.findAll();
        List<ChamadoDTOout> chamadosDTO = new ArrayList<>();
        for (Chamado chamado : chamados) {
            if (chamado.getEmpresa().getId().equals(id)) {
                chamadosDTO.add(new ChamadoDTOout(chamado));
            }
        }
        return chamadosDTO;
    }

    public List<ChamadoDTOout> findByTecnicoId(Long id) {
        List<Chamado> chamados = repository.findAll();
        List<ChamadoDTOout> chamadosDTO = new ArrayList<>();
        for (Chamado chamado : chamados) {
            if (chamado.getTecnico().getId().equals(id)) {
                chamadosDTO.add(new ChamadoDTOout(chamado));
            }
        }
        return chamadosDTO;
    }

    public ChamadoDTOout findChamadoDTOById(Long id) {
        Chamado chamado = findById(id);
        return mapToDTO(chamado);
    }

    private ChamadoDTOout mapToDTO(Chamado chamado) {
        ChamadoDTOout dto = new ChamadoDTOout();
        dto.setId(chamado.getId());
        dto.setNumeroChamado(chamado.getNumeroChamado());
        dto.setDataAbertura(chamado.getDataAbertura());
        dto.setDataFechamento(chamado.getDataFechamento());
        dto.setPrioridade(chamado.getPrioridade().toString());
        dto.setTitulo(chamado.getTitulo());
        dto.setObservacoes(chamado.getObservacoes());
        dto.setEndereco(chamado.getEndereco());
        dto.setTecnico(chamado.getTecnico().getId());
        dto.setEmpresa(chamado.getEmpresa().getId());
        dto.setNomeTecnico(chamado.getTecnico().getNome());
        dto.setNomeEmpresa(chamado.getEmpresa().getNome());
        return dto;
    }

}