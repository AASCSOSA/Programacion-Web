package mx.LemonTrees.Project.QueryInterface;

import java.time.LocalDate;

public interface QueryMonthFertilizacion {
Integer getId_Fertilizacion();
Integer getCantidad_Aplicacion();
LocalDate getFecha_Aplicacion();
Integer getId_Fertilizante();
Integer getId_Rancho();
String getMarca();
String getNombre_Rancho();
}
