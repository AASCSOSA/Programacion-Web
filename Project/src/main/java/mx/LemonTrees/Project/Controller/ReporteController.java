package mx.LemonTrees.Project.Controller;

import mx.LemonTrees.Project.QueryInterface.QueryReporteVentas;
import mx.LemonTrees.Project.Repository.ReporteVentasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reporte")
@CrossOrigin(origins = "http://localhost:3000")
public class ReporteController {

    @Autowired
    private ReporteVentasRepository reporteVentasRepository;

    @GetMapping("/totalVentas")
    public ResponseEntity<Float> getTotalVentas() {
        Float totalVentas = reporteVentasRepository.getTotalVentas();
        if(totalVentas != null) {
            return ResponseEntity.ok(totalVentas);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/totalPesos")
    public ResponseEntity<Float> getTotalPesos() {
        Float totalPesos = reporteVentasRepository.getTotalPeso();
        if(totalPesos != null) {
            return ResponseEntity.ok(totalPesos);
        }else {
            return ResponseEntity.notFound().build();
        }
    }


}
