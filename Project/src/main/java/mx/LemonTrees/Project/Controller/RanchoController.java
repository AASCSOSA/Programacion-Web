package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import mx.LemonTrees.Project.Model.Rancho;
import mx.LemonTrees.Project.Repository.RanchoRepository;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
@RestController
@RequestMapping("/rancho")
public class RanchoController {

    @Autowired
    private RanchoRepository ranchoRepository;

    // Buscar todos
    @CrossOrigin
    @GetMapping()
    public ResponseEntity<Iterable<Rancho>> findAll() {
        return ResponseEntity.ok(ranchoRepository.findAll());
    }

    // Buscar por ID
    @CrossOrigin
    @GetMapping("/{Id_Rancho}")
    public ResponseEntity<Rancho> findById(@PathVariable Integer Id_Rancho) {
        Optional<Rancho> ranchoOptional = ranchoRepository.findById(Id_Rancho);
        if (ranchoOptional.isPresent()) {
            return ResponseEntity.ok(ranchoOptional.get());
        } else {
            return ResponseEntity.ok(ranchoRepository.findById(Id_Rancho).get());
        }
    }

    // Buscar por ID
    @CrossOrigin
    @GetMapping("/search")
    public ResponseEntity<Iterable<Rancho>> findByRancho(@RequestParam String Rancho) {
        return ResponseEntity.ok(ranchoRepository.findAll());
    }

    // Crear
    @CrossOrigin
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Rancho newRancho, UriComponentsBuilder ucb) {
        Rancho savedRancho = ranchoRepository.save(newRancho);
        URI uri = ucb
                .path("rancho/{Id_Rancho}")
                .buildAndExpand(savedRancho.getId_Rancho())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    // Actualizar
    @CrossOrigin
    @PutMapping("/{Id_Rancho}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Rancho, @RequestBody Rancho ranchoAct) {
        Rancho ranchoAnt = ranchoRepository.findById(Id_Rancho).get();
        if (ranchoAnt != null) {
            ranchoAct.setId_Rancho(ranchoAnt.getId_Rancho());
            ranchoRepository.save(ranchoAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar
    @CrossOrigin
    @DeleteMapping("/{Id_Rancho}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Rancho) {
        if (ranchoRepository.findById(Id_Rancho).get() != null) {
            ranchoRepository.deleteById(Id_Rancho);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
