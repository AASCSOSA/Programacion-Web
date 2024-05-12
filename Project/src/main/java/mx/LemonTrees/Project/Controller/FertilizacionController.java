package mx.LemonTrees.Project.Controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import mx.LemonTrees.Project.Model.Fertilizacion;
import mx.LemonTrees.Project.Model.Fertilizante;
import mx.LemonTrees.Project.Model.Rancho;
import mx.LemonTrees.Project.Repository.FertilizacionRepository;
import mx.LemonTrees.Project.Repository.FertilizanteRepository;
import mx.LemonTrees.Project.Repository.RanchoRepository;

@RestController
@RequestMapping("/fertilizacion")
public class FertilizacionController {
    @Autowired
    private FertilizacionRepository fertilizacionRepository;

    @Autowired
    private RanchoRepository ranchoRepository;

    @Autowired
    private FertilizanteRepository fertilizanteRepository;

    // Buscar todos
    @CrossOrigin
    @GetMapping()
    public ResponseEntity<Iterable<Fertilizacion>> findAll() {
        return ResponseEntity.ok(fertilizacionRepository.findAll());
    }

    // Buscar por ID
    @CrossOrigin
    @GetMapping("/{Id_Fertilizacion}")
    public ResponseEntity<Fertilizacion> findById(@PathVariable Integer Id_Fertilizacion) {
        Optional<Fertilizacion> fertilizacionOptional = fertilizacionRepository.findById(Id_Fertilizacion);
        if (!fertilizacionOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(fertilizacionOptional.get());
    }

    // Crear
    @CrossOrigin
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Fertilizacion newFertilizacion, UriComponentsBuilder ucb) {
        Optional<Rancho> ranchoOptional = ranchoRepository.findById(newFertilizacion.getRancho().getId_Rancho());
        Optional<Fertilizante> fertilizanteOptional = fertilizanteRepository
                .findById(newFertilizacion.getFertilizante().getId_Fertilizante());
        if (!ranchoOptional.isPresent() && !fertilizanteOptional.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        newFertilizacion.setRancho(ranchoOptional.get());
        newFertilizacion.setFertilizante(fertilizanteOptional.get());
        Fertilizacion savedFertilizacion = fertilizacionRepository.save(newFertilizacion);
        URI uri = ucb
                .path("fertilizacion/{Id_Fertilizacion}")
                .buildAndExpand(savedFertilizacion.getId_Fertilizacion())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    // Actualizar
    @CrossOrigin
    @PutMapping("/{Id_Fertilizacion}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Fertilizacion,
            @RequestBody Fertilizacion fertilizacionAct) {
        Fertilizacion fertilizacionAnt = fertilizacionRepository.findById(Id_Fertilizacion).get();
        if (fertilizacionAct != null) {
            fertilizacionAct.setId_Fertilizacion(fertilizacionAnt.getId_Fertilizacion());
            fertilizacionRepository.save(fertilizacionAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Eliminar
    @CrossOrigin
    @DeleteMapping("/{Id_Fertiliacion}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Fertiliacion) {
        if (fertilizacionRepository.findById(Id_Fertiliacion).get() != null) {
            fertilizacionRepository.deleteById(Id_Fertiliacion);

            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Obtener la marca del fertilziante de un terreno
    @GetMapping("/fertilizante/{Id_Fertilizacion}")
    public ResponseEntity<String> getFertilizacion(@PathVariable Integer Id_Fertilizacion) {
        Optional<Fertilizacion> fertilizacionOptional = fertilizacionRepository.findById(Id_Fertilizacion);
        if (!fertilizacionOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Fertilizante fertilizante = fertilizacionOptional.get().getFertilizante();

        return ResponseEntity.ok(fertilizante.getMarca());
    }

    @GetMapping("/rancho/{Id_Fertilziacion}")
    public ResponseEntity<String> getNameRancho(@PathVariable Integer Id_Fertilizacion) {
        Optional<Fertilizacion> fertilizacionOptional = fertilizacionRepository.findById(Id_Fertilizacion);
        if(!fertilizacionOptional.isPresent()){
            return ResponseEntity.notFound().build();
        }
        Rancho rancho=fertilizacionOptional.get().getRancho();
        return ResponseEntity.ok(rancho.getNombre_Rancho());
    }

}
