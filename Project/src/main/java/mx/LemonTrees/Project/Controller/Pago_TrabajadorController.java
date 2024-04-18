package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;
import mx.LemonTrees.Project.Model.Pago_Trabajador;
import mx.LemonTrees.Project.Repository.Pago_TrabajadorRepository;
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
@RequestMapping("/pago_trabajador")
public class Pago_TrabajadorController {
    
    @Autowired
    Pago_TrabajadorRepository pago_trabajadorRepository;

    //BUSCAR TODOS
    @GetMapping()
    public ResponseEntity<Iterable<Pago_Trabajador>> findAll() {
        return ResponseEntity.ok(pago_trabajadorRepository.findAll());
    }

    //BUSCAR ID
    @GetMapping("/{idPago_Trabajador}")
    public ResponseEntity<Pago_Trabajador> findById(@PathVariable Long idPago_Trabajador) {
        Optional<Pago_Trabajador> pago_trabajadorOptional = pago_trabajadorRepository.findById(idPago_Trabajador);
        if (pago_trabajadorOptional.isPresent()) {
            return ResponseEntity.ok(pago_trabajadorOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //CREAR
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Pago_Trabajador newPago_Trabajador, UriComponentsBuilder ucb) {
        Pago_Trabajador savedPago_Trabajador = pago_trabajadorRepository.save(newPago_Trabajador);
        URI uri = ucb
                .path("pago_trabajador/{Id_Pago_Trabajador}")
                .buildAndExpand(savedPago_Trabajador.getId_Pago_Trabajador())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    //UPDATE
    @PutMapping("/{Id_Pago_Trabajador}")
    public ResponseEntity<Void> update(@PathVariable Long Id_Pago_Trabajador, @RequestBody Pago_Trabajador pago_trabajadorAct) {
        Pago_Trabajador pago_trabajadorAnt = pago_trabajadorRepository.findById(Id_Pago_Trabajador).get();
        if (pago_trabajadorAnt != null) {
            pago_trabajadorAct.setId_Pago_Trabajador(pago_trabajadorAnt.getId_Pago_Trabajador());
            pago_trabajadorRepository.save(pago_trabajadorAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //ELIMINAR
    @DeleteMapping("/{Id_Pago_Trabajador}")
    public ResponseEntity<Void> delete(@PathVariable Long Id_Pago_Trabajador) {
        if (pago_trabajadorRepository.findById(Id_Pago_Trabajador).get() != null) {
            pago_trabajadorRepository.deleteById(Id_Pago_Trabajador);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
