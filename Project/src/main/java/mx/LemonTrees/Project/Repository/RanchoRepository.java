package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import mx.LemonTrees.Project.Model.Rancho;

@Repository
public interface RanchoRepository extends CrudRepository<Rancho,Long>{



}
