package mx.LemonTrees.Project.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mx.LemonTrees.Project.Model.Fertilizacion;
import mx.LemonTrees.Project.QueryInterface.QueryMonthFertilizacion;
@Repository
public interface FertilizacionRepository extends CrudRepository<Fertilizacion,Integer> {
@Query(value = "SELECT f.id_fertilizacion,f.cantidad_aplicacion,f.fecha_aplicacion,f.id_fertilizante,f.id_rancho FROM fertilizacion f JOIN fertilizante fe ON fe.id_fertilizante=f.id_fertilizante JOIN rancho r ON r.id_rancho=f.id_rancho WHERE YEAR(f.fecha_aplicacion) = YEAR(CURRENT_DATE) AND MONTH(f.fecha_aplicacion) = MONTH(CURRENT_DATE)", nativeQuery = true) 
List<QueryMonthFertilizacion> findFertilizacionXMonth();
}
