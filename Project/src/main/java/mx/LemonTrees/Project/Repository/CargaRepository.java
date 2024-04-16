package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mx.LemonTrees.Project.Model.Carga;

@Repository
public interface CargaRepository extends CrudRepository<Carga,Long>{

}
