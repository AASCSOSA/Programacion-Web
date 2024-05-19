package mx.LemonTrees.Project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.QueryInterface.QueryMonthCarga;

@Repository
public interface CargaRepository extends CrudRepository<Carga,Integer>{
@Query(value = "SELECT c.id_Carga, c.rejas_limon_verde,c.rejas_limon_segunda,c.rejas_limon_tercera,c.fecha,c.total_trabajadores, c.total_peso_limon_verde,c.total_peso_limon_segunda,c.total_peso_limon_tercera,c.id_rancho from carga c JOIN rancho r  ON c.id_rancho=r.id_rancho WHERE YEAR(c.fecha) = YEAR(CURRENT_DATE) AND MONTH(c.fecha) = MONTH(CURRENT_DATE)", nativeQuery = true) 
List<QueryMonthCarga> findCargaXMonth();
}
