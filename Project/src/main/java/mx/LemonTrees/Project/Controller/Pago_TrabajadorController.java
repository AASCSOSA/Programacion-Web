package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import mx.LemonTrees.Project.Model.*;
import mx.LemonTrees.Project.Repository.Pago_TrabajadorRepository;
import mx.LemonTrees.Project.Repository.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/pago_trabajador")
@CrossOrigin(origins = "http://localhost:3000")
public class Pago_TrabajadorController {
    
    @Autowired
    Pago_TrabajadorRepository pago_trabajadorRepository;

    @Autowired
    TrabajadorRepository trabajadorRepository;

    //BUSCAR TODOS
    @GetMapping()
    public ResponseEntity<Iterable<Pago_Trabajador>> findAll() {
        return ResponseEntity.ok(pago_trabajadorRepository.findAll());
    }

    //BUSCAR ID
    @GetMapping("/{Id_Pago_Trabajador}")
    public ResponseEntity<Pago_Trabajador> findById(@PathVariable Integer Id_Pago_Trabajador) {
        Optional<Pago_Trabajador> pago_trabajadorOptional = pago_trabajadorRepository.findById(Id_Pago_Trabajador);
        if (!pago_trabajadorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(pago_trabajadorOptional.get());
        }
    }

    //CREAR
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Pago_Trabajador newPago_Trabajador, UriComponentsBuilder ucb) {
        Optional<Trabajador> trabajadorOptional = trabajadorRepository.findById(newPago_Trabajador.getTrabajador().getId_Trabajador());
        if(!trabajadorOptional.isPresent()){
            return ResponseEntity.unprocessableEntity().build();
        }
        newPago_Trabajador.setTrabajador(trabajadorOptional.get());
        Pago_Trabajador savedPago_Trabajador = pago_trabajadorRepository.save(newPago_Trabajador);
        URI uri = ucb
                .path("pago_trabajador/{Id_Pago_Trabajador}")
                .buildAndExpand(savedPago_Trabajador.getId_Pago_Trabajador())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    //UPDATE
    @PutMapping("/{Id_Pago_Trabajador}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Pago_Trabajador, @RequestBody Pago_Trabajador pago_TrabajadorAct) {
        Pago_Trabajador pago_TrabajadorAnt = pago_trabajadorRepository.findById(Id_Pago_Trabajador).get();
        if (pago_TrabajadorAct != null) {
            pago_TrabajadorAct.setId_Pago_Trabajador(pago_TrabajadorAnt.getId_Pago_Trabajador());
            pago_trabajadorRepository.save(pago_TrabajadorAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //ELIMINAR
    @DeleteMapping("/{Id_Pago_Trabajador}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Pago_Trabajador) {
        if (pago_trabajadorRepository.findById(Id_Pago_Trabajador).get() != null) {
            pago_trabajadorRepository.deleteById(Id_Pago_Trabajador);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/trabajador/{Id_Pago_Trabajador}")
    public ResponseEntity<Trabajador> findByIdTrabajador(@PathVariable Integer Id_Pago_Trabajador) {
        Optional<Pago_Trabajador> pago_trabajadorOptional = pago_trabajadorRepository.findById(Id_Pago_Trabajador);
        if (!pago_trabajadorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Trabajador trabajador = pago_trabajadorOptional.get().getTrabajador();
        return ResponseEntity.ok(trabajador);
    }

    @GetMapping("/trabajadores/{Id_Pago_Trabajador}")
    public ResponseEntity<String> getNameTrabajador(@PathVariable Integer Id_Pago_Trabajador) {
        Optional<Pago_Trabajador> pagoTrabajadorOptional= pago_trabajadorRepository.findById(Id_Pago_Trabajador);
        if(!pagoTrabajadorOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Trabajador trabajador=pagoTrabajadorOptional.get().getTrabajador();
        String nombreCompleto = trabajador.getNombre() + " " + trabajador.getApellido_Pat();
        return ResponseEntity.ok(nombreCompleto);

    }

}
