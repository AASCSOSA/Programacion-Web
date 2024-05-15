package mx.LemonTrees.Project.Controller;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Model.Comprador;
import mx.LemonTrees.Project.Model.Venta;
import mx.LemonTrees.Project.Repository.CargaRepository;
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
import java.time.LocalDate;
import java.time.YearMonth;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/venta")
@CrossOrigin(origins = "http://localhost:3000")
public class VentaController {
    @Autowired
    private VentaRepository ventaRepository;
    @Autowired
    private CompradorRepository compradorRepository;
    @Autowired
    private CargaRepository cargaRepository;

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
    public ResponseEntity<Void> create(@RequestBody Venta newVenta, UriComponentsBuilder ucb) {
        Optional<Comprador> compradorOptional = compradorRepository.findById(newVenta.getComprador().getId_Comprador());
        Optional<Carga> cargaOptional = cargaRepository.findById(newVenta.getCarga().getId_Carga());
        if (!compradorOptional.isPresent() && !cargaOptional.isPresent()) {
            return ResponseEntity.unprocessableEntity().build();
        }
        newVenta.setComprador(compradorOptional.get());
        newVenta.setCarga(cargaOptional.get());
        Venta savedVenta = ventaRepository.save(newVenta);
        URI uri = ucb
                .path("/venta/{Id_Venta}")
                .buildAndExpand(savedVenta.getId_Venta())
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    // Actualizar
    @PutMapping("/{Id_Venta}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Venta, @RequestBody Venta ventaUpdate) {
        Optional<Carga> cargaOptional = cargaRepository.findById(ventaUpdate.getCarga().getId_Carga());
        Optional<Comprador> compradorOptional = compradorRepository.findById(ventaUpdate.getComprador().getId_Comprador());
        Optional<Venta> ventaOptional = ventaRepository.findById(Id_Venta);
        if (!(cargaOptional.isPresent() && compradorOptional.isPresent())) {
            return ResponseEntity.unprocessableEntity().build();
        }
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        ventaUpdate.setCarga(cargaOptional.get());
        ventaUpdate.setComprador(compradorOptional.get());
        ventaUpdate.setId_Venta(ventaOptional.get().getId_Venta());
        ventaRepository.save(ventaUpdate);
        return ResponseEntity.noContent().build();
    }

    // Eliminar
    @DeleteMapping("/{Id_Venta}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Venta) {
        if (ventaRepository.findById(Id_Venta).get() != null) {
            ventaRepository.deleteById(Id_Venta);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/carga/{Id_Venta}")
    public ResponseEntity<Carga> findByIdCarga(@PathVariable Integer Id_Venta) {
        Optional<Venta> ventaOptional = ventaRepository.findById(Id_Venta);
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Carga carga = ventaOptional.get().getCarga();
        return ResponseEntity.ok(carga);
    }

    @GetMapping("/comprador/{Id_Venta}")
    public ResponseEntity<Comprador> findByIdComprador(@PathVariable Integer Id_Venta) {
        Optional<Venta> ventaOptional = ventaRepository.findById(Id_Venta);
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Comprador comprador = ventaOptional.get().getComprador();
        return ResponseEntity.ok(comprador);
    }




}
