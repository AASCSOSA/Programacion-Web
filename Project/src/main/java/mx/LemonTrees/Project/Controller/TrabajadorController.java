package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;
import mx.LemonTrees.Project.Model.Trabajador;
import mx.LemonTrees.Project.Repository.TrabajadorRepository;
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

@RestController
@RequestMapping("/trabajador")
public class TrabajadorController {

    @Autowired
    TrabajadorRepository trabajadorRepository;

    //BUSCAR TODOS
    @GetMapping()
    public ResponseEntity<Iterable<Trabajador>> findAll() {
        return ResponseEntity.ok(trabajadorRepository.findAll());
    }

    //BUSCAR ID
    @GetMapping("/{Id_Trabajador}")
    public ResponseEntity<Trabajador> findById(@PathVariable Integer idTrabajador) {
        Optional<Trabajador> trabajadorOptional = trabajadorRepository.findById(idTrabajador);
        if (trabajadorOptional.isPresent()) {
            return ResponseEntity.ok(trabajadorOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //CREAR
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Trabajador newTrabajador, UriComponentsBuilder ucb) {
        Trabajador savedTrabajador = trabajadorRepository.save(newTrabajador);
        URI uri = ucb
                .path("trabajador/{Id_Trabajador}")
                .buildAndExpand(savedTrabajador.getId_Trabajador())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    //UPDATE
    @PutMapping("/{Id_Trabajador}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Trabajador, @RequestBody Trabajador trabajadorAct) {
        Trabajador trabajadorAnt = trabajadorRepository.findById(Id_Trabajador).get();
        if (trabajadorAnt != null) {
            trabajadorAct.setId_Trabajador(trabajadorAnt.getId_Trabajador());
            trabajadorRepository.save(trabajadorAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //ELIMINAR
    @DeleteMapping("/{Id_Trabajador}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Trabajador) {
        if (trabajadorRepository.findById(Id_Trabajador).get() != null) {
            trabajadorRepository.deleteById(Id_Trabajador);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
