package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import mx.LemonTrees.Project.Model.Herramienta;
import mx.LemonTrees.Project.Model.Pago_Trabajador;
import mx.LemonTrees.Project.Model.Trabajador;
import mx.LemonTrees.Project.Repository.HerramientaRepository;
import mx.LemonTrees.Project.Repository.Pago_TrabajadorRepository;
import mx.LemonTrees.Project.Repository.TrabajadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/trabajador")
public class TrabajadorController {

    @Autowired
    TrabajadorRepository trabajadorRepository;

    @Autowired
    HerramientaRepository herramientaRepository;

    @Autowired
    Pago_TrabajadorRepository pago_trabajadorRepository;


    //BUSCAR TODOS
    @GetMapping()
    @CrossOrigin
    public ResponseEntity<Iterable<Trabajador>> findAll() {
        return ResponseEntity.ok(trabajadorRepository.findAll());
    }

    //BUSCAR ID
    @GetMapping("/{Id_Trabajador}")
    @CrossOrigin
    public ResponseEntity<Trabajador> findById(@PathVariable Integer Id_Trabajador) {
        Optional<Trabajador> trabajadorOptional = trabajadorRepository.findById(Id_Trabajador);
        if (trabajadorOptional.isPresent()) {
            return ResponseEntity.ok(trabajadorOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //CREAR
    @PostMapping
    @CrossOrigin
    public ResponseEntity<Void> create(@RequestBody Trabajador newTrabajador, UriComponentsBuilder ucb) {
        Optional<Herramienta> herramientaOptional = herramientaRepository.findById(newTrabajador.getHerramienta().getId_Herramienta());
        if (!herramientaOptional.isPresent()){
            return ResponseEntity.unprocessableEntity().build();
        }
        newTrabajador.setHerramienta(herramientaOptional.get());
        Trabajador savedTrabajador = trabajadorRepository.save(newTrabajador);
        //ID
        for (Pago_Trabajador pago : newTrabajador.getPago()) {
            Optional<Pago_Trabajador> pagoOptional = pago_trabajadorRepository.findById(pago.getId_Pago_Trabajador());
            pagoOptional.ifPresent(p -> {
                p.setTrabajador(savedTrabajador);
                pago_trabajadorRepository.save(p);
            });
        }
        //LISTA DE ARRAY
//        for (Pago_Trabajador pago : newTrabajador.getPago()) {
//            pago.setTrabajador(savedTrabajador);
//            pago_trabajadorRepository.save(pago);
//        }
        URI uri = ucb
                .path("trabajador/{Id_Trabajador}")
                .buildAndExpand(savedTrabajador.getId_Trabajador())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    //UPDATE
    @PutMapping("/{Id_Trabajador}")
    @CrossOrigin
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
    @CrossOrigin
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Trabajador) {
        if (trabajadorRepository.findById(Id_Trabajador).get() != null) {
            trabajadorRepository.deleteById(Id_Trabajador);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
