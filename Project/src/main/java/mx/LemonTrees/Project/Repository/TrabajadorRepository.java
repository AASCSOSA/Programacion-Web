package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Trabajador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrabajadorRepository extends CrudRepository<Trabajador,Long>{
    
}
