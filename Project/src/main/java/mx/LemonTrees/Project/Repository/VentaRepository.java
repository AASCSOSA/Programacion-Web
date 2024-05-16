package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Venta;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends CrudRepository<Venta, Integer>{

}
