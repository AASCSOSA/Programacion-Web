package mx.LemonTrees.Project.Controller;

import java.net.URI;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mx.LemonTrees.Project.Model.Herramienta;
import mx.LemonTrees.Project.Repository.HerramientaRepository;

@RestController
@RequestMapping("/herramienta")
public class HerramientaController {

    @Autowired
    private HerramientaRepository herramientaRepository;

    @GetMapping()
    public ResponseEntity<Iterable<Herramienta>> findAll() {
        return ResponseEntity.ok(herramientaRepository.findAll());
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
    public ResponseEntity<Void> update(@PathVariable Long Id_Herramienta, @RequestBody Herramienta herramientaAct){
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
    public ResponseEntity<Void> delete(@PathVariable Long Id_Herramienta) {
        if (herramientaRepository.findById(Id_Herramienta).get() != null){
            herramientaRepository.deleteById(Id_Herramienta);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
