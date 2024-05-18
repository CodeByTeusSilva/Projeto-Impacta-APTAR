




package com.projetoimpacta.aptar.resources;

import com.projetoimpacta.aptar.domain.Chamado;
import com.projetoimpacta.aptar.dtos.ChamadoDTOinput;
import com.projetoimpacta.aptar.dtos.ChamadoDTOout;
import com.projetoimpacta.aptar.services.ChamadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/chamados")
public class ChamadoResource {

    @Autowired
    private ChamadoService service;


    @GetMapping(value = "/{id}")
    public ResponseEntity<ChamadoDTOout> findById(@PathVariable Long id) {
        Chamado obj = service.findById(id);
        return ResponseEntity.ok().body(new ChamadoDTOout(obj));
    }

    @GetMapping(value = "os/{numeroChamado}")
    public ResponseEntity<ChamadoDTOout> findByNumeroChamado(@PathVariable String numeroChamado) {
        Chamado obj = service.findByNumeroChamado(numeroChamado);
        return ResponseEntity.ok().body(new ChamadoDTOout(obj));
    }

    @GetMapping
    public ResponseEntity<List<ChamadoDTOout>> findAll() {
        List<Chamado> list = service.findAll();
        List<ChamadoDTOout> listDTO = list.stream().map(ChamadoDTOout::new).toList();
        return ResponseEntity.ok().body(listDTO);
    }

    @PostMapping
    public ResponseEntity<ChamadoDTOinput> create(@Valid @RequestBody ChamadoDTOinput objDTO) {
        Chamado obj = service.create(objDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ChamadoDTOinput> update(@Valid @PathVariable Long id, @RequestBody ChamadoDTOinput objDTO) {
        Chamado newObj = service.update(id, objDTO);
        return ResponseEntity.ok().body(new ChamadoDTOinput(newObj));
    }

    @GetMapping(value = "/empresa/{id}")
    public ResponseEntity<List<ChamadoDTOout>> findByEmpresaId(@PathVariable Long id) {
        List<ChamadoDTOout> chamadosDTO = service.findByEmpresaId(id);
        return ResponseEntity.ok().body(chamadosDTO);
    }
    @GetMapping(value = "/tecnico/{id}")
    public ResponseEntity<List<ChamadoDTOout>> findByTecnicoId(@PathVariable Long id) {
        List<ChamadoDTOout> chamadosDTO = service.findByTecnicoId(id);
        return ResponseEntity.ok().body(chamadosDTO);
    }


}