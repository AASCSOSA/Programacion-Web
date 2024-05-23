
package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Pago_Trabajador;
import mx.LemonTrees.Project.QueryInterface.QueryMonthPagoTrabajador;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface Pago_TrabajadorRepository extends CrudRepository<Pago_Trabajador, Integer> {
    @Query(value = "SELECT pg.id_pago_trabajador, pg.fecha_pago,pg.monto,pg.id_trabajador,t.nombre,t.apellido_pat FROM pago_trabajador pg JOIN trabajador t ON t.id_trabajador=pg.id_trabajador WHERE YEAR(pg.fecha_pago)=YEAR(current_date) AND month(pg.fecha_pago)=month(current_date)", nativeQuery = true)
    List<QueryMonthPagoTrabajador> findPagoTrabajadorXMonth();
}
