package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Pago_Trabajador;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportePagoTrabajadoresRepository extends CrudRepository <Pago_Trabajador, Integer> {
    @Query("SELECT SUM(p.Monto) FROM Pago_Trabajador p WHERE MONTH(p.Fecha_Pago) = MONTH(CURRENT_DATE)")
    Float getPagosTrabajadores();
}
