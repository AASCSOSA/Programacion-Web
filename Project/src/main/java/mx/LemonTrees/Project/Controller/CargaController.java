package mx.LemonTrees.Project.Controller;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Repository.CargaRepository;

@RestController
@RequestMapping("/carga")

public class CargaController {

    @Autowired
    private CargaRepository cargaRepository;

    //Busca todos
    @GetMapping()
    public ResponseEntity<Iterable<Carga>>findAll(){
        return ResponseEntity.ok(cargaRepository.findAll());
    }

    //Crea
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Carga newCarga, UriComponentsBuilder ucb){
        Carga savedCarga = cargaRepository.save(newCarga);
        URI uri = ucb
                .path("carga/{Id_Carga}")
                .buildAndExpand(savedCarga.getId_Carga())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

}
