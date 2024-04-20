package mx.LemonTrees.Project.Controller;


import mx.LemonTrees.Project.Model.Venta;
import mx.LemonTrees.Project.Repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/venta")
public class VentaController {
    @Autowired
    private VentaRepository ventaRepository;

    // Buscar todos
    @GetMapping()
    public ResponseEntity<Iterable<Venta>> findAll() {
        return ResponseEntity.ok(ventaRepository.findAll());
    }

    // Buscar por ID
    @GetMapping("/{Id_Venta}")
    public ResponseEntity<Venta> findById(@PathVariable Integer Id_Venta) {
        Optional<Venta> ventaOptional = ventaRepository.findById(Id_Venta);
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ventaOptional.get());
    }

    // Crear
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Venta newVenta) {
        Venta savedVenta = ventaRepository.save(newVenta);
        return ResponseEntity.ok().build();
    }

    // Actualizar
    @PutMapping
    public ResponseEntity<Venta> update(@RequestBody Venta venta) {
        Optional<Venta> ventaOptional = ventaRepository.findById(venta.getId_Venta());
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        ventaRepository.save(venta);
        return ResponseEntity.ok(venta);
    }

    // Eliminar
    @DeleteMapping("/{Id_Venta}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Venta) {
        Optional<Venta> ventaOptional = ventaRepository.findById(Id_Venta);
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        ventaRepository.deleteById(Id_Venta);
        return ResponseEntity.ok().build();
    }
}
