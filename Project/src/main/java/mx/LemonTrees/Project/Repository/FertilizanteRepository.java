package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;
import mx.LemonTrees.Project.Model.Fertilizante;
import org.springframework.stereotype.Repository;

@Repository
public interface FertilizanteRepository  extends CrudRepository<Fertilizante,Integer>{

}
