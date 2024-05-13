package mx.LemonTrees.Project.Controller;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Model.Comprador;
import mx.LemonTrees.Project.Model.Rancho;
import mx.LemonTrees.Project.Model.Venta;
import mx.LemonTrees.Project.Repository.CompradorRepository;
import mx.LemonTrees.Project.Repository.VentaRepository;

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
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/comprador")
@CrossOrigin(origins = "http://localhost:3000")

public class CompradorController {

    @Autowired
    private CompradorRepository compradorRepository;
    @Autowired
    private VentaRepository ventaRepository;

    // Buscar todos
    @GetMapping()
    public ResponseEntity<Iterable<Comprador>> findAll() {
        return ResponseEntity.ok(compradorRepository.findAll());
    }

    // Buscar por ID
    @GetMapping("/{Id_Comprador}")
    public ResponseEntity<Comprador> findById(@PathVariable Integer Id_Comprador) {
        Optional<Comprador> compradorOptional = compradorRepository.findById(Id_Comprador);
        if (!compradorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(compradorOptional.get());
        }
    }

    // Crear
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Comprador newComprador, UriComponentsBuilder ucb) {
        Comprador savedComprador = compradorRepository.save(newComprador);
        URI uri = ucb
                .path("comprador/{Id_Comprador}")
                .buildAndExpand(savedComprador.getId_Comprador())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    // Actualizar
    @PutMapping("/{Id_Comprador}")
    public ResponseEntity<Comprador> update(@PathVariable Integer Id_Comprador, @RequestBody Comprador comprador) {
        Optional<Comprador> compradorOptional = compradorRepository.findById(Id_Comprador);
        if (!compradorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        comprador.setId_Comprador(Id_Comprador);
        return ResponseEntity.ok(compradorRepository.save(comprador));
    }

    // Eliminar
    @DeleteMapping("/{Id_Comprador}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Comprador) {
        Optional<Comprador> compradorOptional = compradorRepository.findById(Id_Comprador);
        if (!compradorOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        compradorRepository.deleteById(Id_Comprador);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/venta/{Id_Venta}")
    public ResponseEntity<String> getNameComprador(@PathVariable Integer Id_Venta) {
        Optional<Venta> ventaOptional = ventaRepository.findById(Id_Venta);
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Optional<Comprador> compradorOptional = compradorRepository.findById(ventaOptional.get().getComprador().getId_Comprador());
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        String nombreComleto= compradorOptional.get().getNombre()+" "+compradorOptional.get().getApellido_Pat();
        return ResponseEntity.ok(nombreComleto);
    }
}
