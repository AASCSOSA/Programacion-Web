package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Model.Rancho;
import mx.LemonTrees.Project.Repository.CargaRepository;
import mx.LemonTrees.Project.Repository.RanchoRepository;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/rancho")
@CrossOrigin(origins = "http://localhost:3000")
public class RanchoController {

    @Autowired
    private RanchoRepository ranchoRepository;

    @Autowired
    private CargaRepository cargaRepository;

    // Buscar todos
    @GetMapping()
    public ResponseEntity<Iterable<Rancho>> findAll() {
        return ResponseEntity.ok(ranchoRepository.findAll());
    }

    // Buscar por ID
    @GetMapping("/{Id_Rancho}")
    public ResponseEntity<Rancho> findById(@PathVariable Integer Id_Rancho) {
        Optional<Rancho> ranchoOptional = ranchoRepository.findById(Id_Rancho);
        if (!ranchoOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ranchoOptional.get());
    }

       // Crear
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Rancho newRancho, UriComponentsBuilder ucb) {
        Rancho savedRancho = ranchoRepository.save(newRancho);
        URI uri = ucb
                .path("rancho/{Id_Rancho}")
                .buildAndExpand(savedRancho.getId_Rancho())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/carga/{Id_Carga}")
    public ResponseEntity<String> getNameRancho(@PathVariable Integer Id_Carga) {
        Optional<Carga> cargaOptional= cargaRepository.findById(Id_Carga);
        if(!cargaOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Optional<Rancho> ranchOptional= ranchoRepository.findById(cargaOptional.get().getRancho().getId_Rancho());
        if(!ranchOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ranchOptional.get().getNombre_Rancho());
    }
    

    // Actualizar
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
    @DeleteMapping("/{Id_Rancho}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Rancho) {
        if (ranchoRepository.findById(Id_Rancho).get() != null) {
            ranchoRepository.deleteById(Id_Rancho);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
