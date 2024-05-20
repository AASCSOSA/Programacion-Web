package mx.LemonTrees.Project.Controller;

import mx.LemonTrees.Project.Repository.ReportePagoTrabajadoresRepository;
import mx.LemonTrees.Project.Repository.ReporteFertilizantesRepository;
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
    @Autowired
    ReporteFertilizantesRepository reporteFertilizantesRepository;
    @Autowired
    ReportePagoTrabajadoresRepository reportePagoTrabajadoresRepository;

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

    @GetMapping ("/totalFertilizantes")
    public ResponseEntity<Float> getTotalFertilizantes() {
        Float totalFertilizantes = reporteFertilizantesRepository.getTotalFertilizantes();
        if(totalFertilizantes != null) {
            return ResponseEntity.ok(totalFertilizantes);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/totalPagosTrabajadores")
    public ResponseEntity<Float> getTotalPagosTrabajadores() {
        Float pagosTrabajadores = reportePagoTrabajadoresRepository.getPagosTrabajadores();
        if(pagosTrabajadores != null) {
            return ResponseEntity.ok(pagosTrabajadores);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/utilidadBruta")
    public ResponseEntity<Float> getUtilidad() {
        Float utilidad = reporteVentasRepository.getTotalVentas()
                        - reportePagoTrabajadoresRepository.getPagosTrabajadores()
                        -reporteFertilizantesRepository.getTotalFertilizantes();
        if(utilidad != null) {
            return ResponseEntity.ok(utilidad);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
}
