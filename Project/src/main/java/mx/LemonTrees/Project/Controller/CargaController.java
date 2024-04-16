package mx.LemonTrees.Project.Controller;

import java.net.URI;
<<<<<<< HEAD
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
=======

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
>>>>>>> main
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Repository.CargaRepository;

@RestController
@RequestMapping("/carga")

public class CargaController {

    @Autowired
    private CargaRepository cargaRepository;

<<<<<<< HEAD
    // Buscar todos
    @GetMapping()
    public ResponseEntity<Iterable<Carga>> findAll() {
        return ResponseEntity.ok(cargaRepository.findAll());
    }

    // Buscar por ID
    @GetMapping("/{Id_Carga}")
    public ResponseEntity<Carga> findById(@PathVariable Long Id_Carga) {
        Optional<Carga> cargaOptional = cargaRepository.findById(Id_Carga);
        if (cargaOptional.isPresent()) {
            return ResponseEntity.ok(cargaOptional.get());
        } else {
            return ResponseEntity.ok(cargaRepository.findById(Id_Carga).get());
        }
    }

    // Buscar por ID
    @GetMapping("/search")
    public ResponseEntity<Iterable<Carga>> findByCarga(@RequestParam String Carga) {
        return ResponseEntity.ok(cargaRepository.findAll());
    }

    // Crear
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Carga newCarga, UriComponentsBuilder ucb) {
=======
    //Busca todos
    @GetMapping()
    public ResponseEntity<Iterable<Carga>>findAll(){
        return ResponseEntity.ok(cargaRepository.findAll());
    }

    //Crea
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Carga newCarga, UriComponentsBuilder ucb){
>>>>>>> main
        Carga savedCarga = cargaRepository.save(newCarga);
        URI uri = ucb
                .path("carga/{Id_Carga}")
                .buildAndExpand(savedCarga.getId_Carga())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

<<<<<<< HEAD
    // Actualizar
    @PutMapping("/{Id_Carga}")
    public ResponseEntity<Void> update(@PathVariable Long Id_Carga, @RequestBody Carga cargaAct) {
        Carga cargaAnt = cargaRepository.findById(Id_Carga).get();
        if (cargaAct != null) {
            cargaAct.setId_Carga(cargaAnt.getId_Carga());
            cargaRepository.save(cargaAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar
    @DeleteMapping("/{Id_Carga}")
    public ResponseEntity<Void> delete(@PathVariable Long Id_Carga) {
        if (cargaRepository.findById(Id_Carga).get() != null) {
            cargaRepository.deleteById(Id_Carga);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

=======
>>>>>>> main
}
