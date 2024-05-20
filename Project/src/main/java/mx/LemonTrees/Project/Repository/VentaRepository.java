package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Venta;
import mx.LemonTrees.Project.QueryInterface.QueryMonthVenta;
import mx.LemonTrees.Project.QueryInterface.vtm;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends CrudRepository<Venta, Integer> {
    @Query(value = "SELECT v.id_venta, v.fecha, v.pago_total, v.peso_total, v.precio_limon_verde, v.precio_limon_segunda, v.precio_limon_tercera, v.id_carga, v.id_comprador,c.nombre FROM venta v JOIN comprador c ON v.id_comprador = c.id_comprador JOIN carga ca ON v.id_carga = ca.id_carga AND YEAR(v.fecha) = YEAR(CURRENT_DATE) AND MONTH(v.fecha) = MONTH(CURRENT_DATE)", nativeQuery = true)
    List<QueryMonthVenta> findVentaXMonth();

    @Query(value="SELECT sum(pago_total) as Pago_Total,sum(peso_total) as Peso_Total from venta  where month(venta.fecha) = month(current_date())",nativeQuery = true)
    List<vtm> mostar();
}
