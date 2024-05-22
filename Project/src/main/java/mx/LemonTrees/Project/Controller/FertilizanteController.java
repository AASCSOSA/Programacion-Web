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
import mx.LemonTrees.Project.Model.Fertilizante;
import mx.LemonTrees.Project.Repository.FertilizanteRepository;

@RestController
@RequestMapping("/fertilizante")
@CrossOrigin(origins = "http://localhost:3000")
public class FertilizanteController {
    @Autowired
    private FertilizanteRepository fertilizanteRepository;

    @GetMapping()
    public ResponseEntity<Iterable<Fertilizante>> findAll() {
        return ResponseEntity.ok(fertilizanteRepository.findAll());
    }

    // Buscar por ID
    @GetMapping("/{Id_Fertilizante}")
    public ResponseEntity<Fertilizante> findById(@PathVariable Integer Id_Fertilizante) {
        Optional<Fertilizante> fertilizanteOptional = fertilizanteRepository.findById(Id_Fertilizante);
        if (fertilizanteOptional.isPresent()) {
            return ResponseEntity.ok(fertilizanteOptional.get());
        } else {
            return ResponseEntity.ok(fertilizanteRepository.findById(Id_Fertilizante).get());
        }
    }

    // Crear
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Fertilizante newFertilizante, UriComponentsBuilder ucb) {
        Fertilizante savedFertilizante = fertilizanteRepository.save(newFertilizante);
        URI uri = ucb
                .path("fertilizante/{Id_Fertilizante}")
                .buildAndExpand(savedFertilizante.getId_Fertilizante())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    // Actualizar
    @PutMapping("/{Id_Fertilizante}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Fertilizante,
            @RequestBody Fertilizante fertilizanteAct) {
        Fertilizante fertilizanteAnt = fertilizanteRepository.findById(Id_Fertilizante).get();
        if (fertilizanteAnt != null) {
            fertilizanteAct.setId_Fertilizante(fertilizanteAnt.getId_Fertilizante());
            fertilizanteRepository.save(fertilizanteAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar
    @DeleteMapping("/{Id_Fertilizante}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Fertilizante) {
        if (fertilizanteRepository.findById(Id_Fertilizante).get() != null) {
            fertilizanteRepository.deleteById(Id_Fertilizante);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
