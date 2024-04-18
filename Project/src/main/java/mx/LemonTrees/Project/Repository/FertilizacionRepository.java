package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;
import mx.LemonTrees.Project.Model.Fertilizacion;
import org.springframework.stereotype.Repository;

@Repository
public interface FertilizacionRepository extends CrudRepository<Fertilizacion, Integer> {

}
