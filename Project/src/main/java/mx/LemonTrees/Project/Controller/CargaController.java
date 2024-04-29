package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Model.Rancho;
import mx.LemonTrees.Project.Repository.CargaRepository;
import mx.LemonTrees.Project.Repository.RanchoRepository;

@RestController
@RequestMapping("/carga")

public class CargaController {

    @Autowired
    private CargaRepository cargaRepository;

    @Autowired
    private RanchoRepository ranchoRepository;

    // Buscar todos
    @CrossOrigin
    @GetMapping()
    public ResponseEntity<Iterable<Carga>> findAll() {
        return ResponseEntity.ok(cargaRepository.findAll());
    }

    // Buscar por ID
    @CrossOrigin
    @GetMapping("/{Id_Carga}")
    public ResponseEntity<Carga> findById(@PathVariable Integer Id_Carga) {
        Optional<Carga> cargaOptional = cargaRepository.findById(Id_Carga);
        if (!cargaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(cargaOptional.get());
    }

    // Crear
    @CrossOrigin
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Carga newCarga, UriComponentsBuilder ucb) {
        Optional<Rancho> ranchoOptional = ranchoRepository.findById(newCarga.getRancho().getId_Rancho());
        if (!ranchoOptional.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        newCarga.setRancho(ranchoOptional.get());
        Carga savedCarga = cargaRepository.save(newCarga);
        URI uri = ucb
                .path("carga/{Id_Carga}")
                .buildAndExpand(savedCarga.getId_Carga())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    // Actualizar
    @CrossOrigin
    @PutMapping("/{Id_Carga}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Carga, @RequestBody Carga cargaAct) {
        Carga cargaAnt = cargaRepository.findById(Id_Carga).get();
        if (cargaAct != null) {
            cargaAct.setId_Carga(cargaAnt.getId_Carga());
            cargaRepository.save(cargaAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar
    @CrossOrigin
    @DeleteMapping("/{Id_Carga}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Carga) {
        if (cargaRepository.findById(Id_Carga).get() != null) {
            cargaRepository.deleteById(Id_Carga);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
