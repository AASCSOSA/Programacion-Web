package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mx.LemonTrees.Project.Model.Fertilizante;
@Repository
public interface FertilizanteRepository  extends CrudRepository<Fertilizante,Integer>{

}
