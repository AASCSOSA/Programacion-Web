package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Venta;
import mx.LemonTrees.Project.QueryInterface.QueryReporteVentas;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReporteVentasRepository extends CrudRepository<Venta, Integer> {
    @Query("SELECT SUM(v.Pago_Total) FROM Venta v where MONTH(v.fecha) = MONTH (CURRENT_DATE )")
    Float getTotalVentas();

    @Query("SELECT SUM(v.Peso_Total) FROM Venta v where MONTH(v.fecha) = MONTH (CURRENT_DATE )")
    Float getTotalPeso();
}
