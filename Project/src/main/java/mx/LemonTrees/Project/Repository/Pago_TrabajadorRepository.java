
package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Pago_Trabajador;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Pago_TrabajadorRepository extends CrudRepository<Pago_Trabajador,Long> {
    
}
