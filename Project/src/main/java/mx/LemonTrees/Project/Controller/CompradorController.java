package mx.LemonTrees.Project.Controller;

import mx.LemonTrees.Project.Model.Comprador;
import mx.LemonTrees.Project.Repository.CompradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/comprador")

public class CompradorController {

    @Autowired
    private CompradorRepository compradorRepository;

    // Buscar todos
    @GetMapping()
    public ResponseEntity<Iterable<Comprador>> findAll() {
        return ResponseEntity.ok(compradorRepository.findAll());
    }

    //Buscar por ID
    @GetMapping("/{Id_Comprador}")
    public ResponseEntity<Comprador> findById(@PathVariable Integer Id_Comprador) {
        Optional<Comprador> compradorOptional = compradorRepository.findById(Id_Comprador);
        if (!compradorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(compradorOptional.get());
    }

    //Crear
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Comprador newComprador, UriComponentsBuilder ucb) {
        Comprador savedComprador = compradorRepository.save(newComprador);
        URI uri = ucb
                .path("comprador/{Id_Comprador}")
                .buildAndExpand(savedComprador.getId_Comprador())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    //Actualizar
    @PutMapping("/{Id_Comprador}")
    public ResponseEntity<Comprador> update(@PathVariable Integer Id_Comprador, @RequestBody Comprador comprador) {
        Optional<Comprador> compradorOptional = compradorRepository.findById(Id_Comprador);
        if (!compradorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        comprador.setId_Comprador(Id_Comprador);
        return ResponseEntity.ok(compradorRepository.save(comprador));
    }

    //Eliminar
    @DeleteMapping("/{Id_Comprador}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Comprador) {
        Optional<Comprador> compradorOptional = compradorRepository.findById(Id_Comprador);
        if (!compradorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        compradorRepository.deleteById(Id_Comprador);
        return ResponseEntity.ok().build();
    }
}
