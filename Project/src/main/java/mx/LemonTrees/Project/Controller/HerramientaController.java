package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Model.Rancho;
import mx.LemonTrees.Project.Model.Trabajador;
import mx.LemonTrees.Project.Repository.CargaRepository;
import mx.LemonTrees.Project.Repository.TrabajadorRepository;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;

import mx.LemonTrees.Project.Model.Herramienta;
import mx.LemonTrees.Project.Repository.HerramientaRepository;

@RestController
@RequestMapping("/herramienta")
@CrossOrigin(origins = "http://localhost:3000")
public class HerramientaController {

    @Autowired
    private HerramientaRepository herramientaRepository;

    @Autowired
    private TrabajadorRepository trabajadorRepository;

    //Buscar todos
    @GetMapping()
    public ResponseEntity<Iterable<Herramienta>> findAll() {
        return ResponseEntity.ok(herramientaRepository.findAll());
    }

    //Buscar por ID
    @GetMapping("/{Id_Herramienta}")
    public ResponseEntity<Herramienta> findById(@PathVariable Integer Id_Herramienta) {
        Optional<Herramienta> herramientaOptional = herramientaRepository.findById(Id_Herramienta);
        if (!herramientaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(herramientaOptional.get());
        }
    }

    //Crear
    @PostMapping
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

    public ResponseEntity<Void> delete(@PathVariable Integer Id_Herramienta) {
        if (herramientaRepository.findById(Id_Herramienta).get() != null){
            herramientaRepository.deleteById(Id_Herramienta);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/trabajador/{Id_Trabajador}")
    public ResponseEntity<String> getModeloHerramienta(@PathVariable Integer Id_Trabajador) {
        Optional<Trabajador> trabajadorOptional= trabajadorRepository.findById(Id_Trabajador);
        if(!trabajadorOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Optional<Herramienta> herramientaOptional= herramientaRepository.findById(trabajadorOptional.get().getHerramienta().getId_Herramienta());
        if(!trabajadorOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(herramientaOptional.get().getModelo());
    }
}
