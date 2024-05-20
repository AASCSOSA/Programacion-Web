package mx.LemonTrees.Project.Repository;
import mx.LemonTrees.Project.Model.Fertilizante;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ReporteFertilizantesRepository extends CrudRepository<Fertilizante, Integer>{
    @Query("SELECT SUM(f.Costo_Total) FROM Fertilizante f WHERE MONTH(f.Fecha_Adquisicion) = MONTH(CURRENT_DATE)" )
    Float getTotalFertilizantes();
}
