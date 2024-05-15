package mx.LemonTrees.Project.Repository;

import mx.LemonTrees.Project.Model.Venta;

import java.time.LocalDate;
import java.util.List;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VentaRepository extends CrudRepository<Venta, Integer>{

}
