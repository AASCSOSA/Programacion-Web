package mx.LemonTrees.Project.QueryInterface;

import java.time.LocalDate;

import mx.LemonTrees.Project.Model.Carga;
import mx.LemonTrees.Project.Model.Comprador;

public interface QueryMonthVenta {
    Integer getId_Venta();

    Float getPrecio_Limon_Verde();

    Float getPrecio_Limon_Segunda();

    Float getPrecio_Limon_Tercera();

    Float getPago_Total();

    Float getPeso_Total();

    LocalDate getFecha();

    Integer getId_Comprador(); // Cambio: solo obtener el ID del comprador

    Integer getId_Carga(); // Cambio: solo obtener el ID de la carga
    String getNombre();
}
