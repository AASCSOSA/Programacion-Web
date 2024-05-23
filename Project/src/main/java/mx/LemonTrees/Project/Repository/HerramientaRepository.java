package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mx.LemonTrees.Project.Model.Herramienta;

@Repository
public interface HerramientaRepository extends CrudRepository<Herramienta, Integer> {

}
