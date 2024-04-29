package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import mx.LemonTrees.Project.Model.Herramienta;
import mx.LemonTrees.Project.Repository.HerramientaRepository;

@RestController
@RequestMapping("/herramienta")
public class HerramientaController {

    @Autowired
    private HerramientaRepository herramientaRepository;

    //Buscar todos
    @GetMapping()
    @CrossOrigin
    public ResponseEntity<Iterable<Herramienta>> findAll() {
        return ResponseEntity.ok(herramientaRepository.findAll());
    }

    //Buscar por ID
    @GetMapping("/{Id_Herramienta}")
    @CrossOrigin
    public ResponseEntity<Herramienta> findById(@PathVariable Integer Id_Herramienta) {
        Optional<Herramienta> herramientaOptional = herramientaRepository.findById(Id_Herramienta);
        if (herramientaOptional.isPresent()) {
            return ResponseEntity.ok(herramientaOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Crear
    @PostMapping
    @CrossOrigin
    public ResponseEntity<Void> create(@RequestBody Herramienta newHerramienta, UriComponentsBuilder ucb) {
        Herramienta savedHerramienta = herramientaRepository.save(newHerramienta);
        URI uri = ucb
                .path("herramienta/{Id_Herramienta}")
                .buildAndExpand(savedHerramienta.getId_Herramienta())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    //Update
    @PutMapping("/{Id_Herramienta}")
    @CrossOrigin
    public ResponseEntity<Void> update(@PathVariable Integer Id_Herramienta, @RequestBody Herramienta herramientaAct){
        Herramienta herramientaAnt = herramientaRepository.findById(Id_Herramienta).get();
        if (herramientaAnt != null){
            herramientaAct.setId_Herramienta(herramientaAnt.getId_Herramienta());
            herramientaRepository.save(herramientaAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //Delete
    @DeleteMapping("/{Id_Herramienta}")
    @CrossOrigin
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Herramienta) {
        if (herramientaRepository.findById(Id_Herramienta).get() != null){
            herramientaRepository.deleteById(Id_Herramienta);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
