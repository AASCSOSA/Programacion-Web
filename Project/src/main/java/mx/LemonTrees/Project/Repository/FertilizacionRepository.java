package mx.LemonTrees.Project.Repository;

import org.springframework.data.repository.CrudRepository;

import org.springframework.stereotype.Repository;

import mx.LemonTrees.Project.Model.Fertilizacion;
@Repository
public interface FertilizacionRepository extends CrudRepository<Fertilizacion,Integer> {

}
