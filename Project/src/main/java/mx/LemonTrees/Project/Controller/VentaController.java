package mx.LemonTrees.Project.Controller;


import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Model.Comprador;
import mx.LemonTrees.Project.Model.Venta;
import mx.LemonTrees.Project.Repository.CargaRepository;
import mx.LemonTrees.Project.Repository.CompradorRepository;
import mx.LemonTrees.Project.Repository.VentaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/venta")
public class VentaController {
    @Autowired
    private VentaRepository ventaRepository;
    @Autowired
    private CompradorRepository compradorRepository;
    @Autowired
    private CargaRepository cargaRepository;

    // Buscar todos
    @CrossOrigin
    @GetMapping()
    public ResponseEntity<Iterable<Venta>> findAll() {
        return ResponseEntity.ok(ventaRepository.findAll());
    }

    // Buscar por ID
    @CrossOrigin
    @GetMapping("/{Id_Venta}")
    public ResponseEntity<Venta> findById(@PathVariable Integer Id_Venta) {
        Optional<Venta> ventaOptional = ventaRepository.findById(Id_Venta);
        if (!ventaOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ventaOptional.get());
    }
     //Crear
     @CrossOrigin
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

     //Actualizar
    @CrossOrigin
    @PutMapping("/{Id_Venta}")
    public ResponseEntity<Void> update(@PathVariable Integer Id_Venta, @RequestBody Venta ventaAct){
        Venta ventaAnt =  ventaRepository.findById(Id_Venta).get();
        if( ventaAct != null){
            ventaAct.setId_Venta(ventaAnt.getId_Venta());
            ventaRepository.save(ventaAct);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    //Eliminar
    @CrossOrigin
    @DeleteMapping("/{Id_Venta}")
    public ResponseEntity<Void> delete(@PathVariable Integer Id_Venta){
        if(ventaRepository.findById(Id_Venta).get() != null){
            ventaRepository.deleteById(Id_Venta);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
