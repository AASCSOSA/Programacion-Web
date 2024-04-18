package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mx.LemonTrees.Project.Model.Rancho;
import mx.LemonTrees.Project.Repository.RanchoRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/rancho")
public class RanchoController {

    @Autowired
    private RanchoRepository ranchoRepository;
    
    @GetMapping()
    public ResponseEntity<Iterable<Rancho>> findAll() {
        return ResponseEntity.ok(ranchoRepository.findAll());
    }
    
    //BUSCAR ID
    @GetMapping("/{idRancho}")
    public ResponseEntity<Rancho> findById(@PathVariable Long idRancho) {
        Optional<Rancho> ranchoOptional = ranchoRepository.findById(idRancho);
        if (ranchoOptional.isPresent()) {
            return ResponseEntity.ok(ranchoOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Crear
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Rancho newRancho, UriComponentsBuilder ucb) {
        Rancho savedRancho = ranchoRepository.save(newRancho);
        URI uri = ucb
                .path("rancho/{Id_Rancho}")
                .buildAndExpand(savedRancho.getId_Rancho())
                .toUri();
        return ResponseEntity.created(uri).build();
    }
    
    //Update
    @PutMapping("/{Id_Rancho}")
    public ResponseEntity<Void> update(@PathVariable Long Id_Rancho, @RequestBody Rancho ranchoAct){
        Rancho ranchoAnt = ranchoRepository.findById(Id_Rancho).get();
        if (ranchoAnt != null){
            ranchoAct.setId_Rancho(ranchoAnt.getId_Rancho());
            ranchoRepository.save(ranchoAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    
    //Delete
    @DeleteMapping("/{Id_Rancho}")
    public ResponseEntity<Void> delete(@PathVariable Long Id_Rancho) {
        if (ranchoRepository.findById(Id_Rancho).get() != null){
            ranchoRepository.deleteById(Id_Rancho);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
}


