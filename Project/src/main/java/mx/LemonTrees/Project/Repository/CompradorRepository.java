package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import mx.LemonTrees.Project.Model.Comprador;

@Repository
public interface CompradorRepository extends CrudRepository<Comprador, Integer>{

}
