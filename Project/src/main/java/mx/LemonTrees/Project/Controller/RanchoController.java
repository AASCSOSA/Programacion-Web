package mx.LemonTrees.Project.Controller;

import java.net.URI;
<<<<<<< HEAD
import java.util.Optional;
=======
>>>>>>> main

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
<<<<<<< HEAD

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
=======
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
>>>>>>> main

@RestController
@RequestMapping("/rancho")
public class RanchoController {

    @Autowired
    private RanchoRepository ranchoRepository;
<<<<<<< HEAD

    // Buscar todos
=======
    
>>>>>>> main
    @GetMapping()
    public ResponseEntity<Iterable<Rancho>> findAll() {
        return ResponseEntity.ok(ranchoRepository.findAll());
    }

<<<<<<< HEAD
    // Buscar por ID
    @GetMapping("/{Id_Rancho}")
    public ResponseEntity<Rancho> findById(@PathVariable Long Id_Rancho) {
        Optional<Rancho> ranchoOptional = ranchoRepository.findById(Id_Rancho);
        if (ranchoOptional.isPresent()) {
            return ResponseEntity.ok(ranchoOptional.get());
        } else {
            return ResponseEntity.ok(ranchoRepository.findById(Id_Rancho).get());
        }
    }

    // Buscar por ID
    @GetMapping("/search")
    public ResponseEntity<Iterable<Rancho>> findByRancho(@RequestParam String Rancho) {
        return ResponseEntity.ok(ranchoRepository.findAll());
    }

    // Crear
=======
    //Crear
>>>>>>> main
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Rancho newRancho, UriComponentsBuilder ucb) {
        Rancho savedRancho = ranchoRepository.save(newRancho);
        URI uri = ucb
                .path("rancho/{Id_Rancho}")
                .buildAndExpand(savedRancho.getId_Rancho())
                .toUri();
        return ResponseEntity.created(uri).build();
    }
<<<<<<< HEAD

    // Actualizar
    @PutMapping("/{Id_Rancho}")
    public ResponseEntity<Void> update(@PathVariable Long Id_Rancho, @RequestBody Rancho ranchoAct) {
        Rancho ranchoAnt = ranchoRepository.findById(Id_Rancho).get();
        if (ranchoAnt != null) {
=======
    
    //Update
    @PutMapping("/{Id_Rancho}")
    public ResponseEntity<Void> update(@PathVariable Long Id_Rancho, @RequestBody Rancho ranchoAct){
        Rancho ranchoAnt = ranchoRepository.findById(Id_Rancho).get();
        if (ranchoAnt != null){
>>>>>>> main
            ranchoAct.setId_Rancho(ranchoAnt.getId_Rancho());
            ranchoRepository.save(ranchoAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
<<<<<<< HEAD

    // Eliminar
    @DeleteMapping("/{Id_Rancho}")
    public ResponseEntity<Void> delete(@PathVariable Long Id_Rancho) {
        if (ranchoRepository.findById(Id_Rancho).get() != null) {
=======
    
    
    //Delete
    @DeleteMapping("/{Id_Rancho}")
    public ResponseEntity<Void> delete(@PathVariable Long Id_Rancho) {
        if (ranchoRepository.findById(Id_Rancho).get() != null){
>>>>>>> main
            ranchoRepository.deleteById(Id_Rancho);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
<<<<<<< HEAD

}
=======
    
}


>>>>>>> main
