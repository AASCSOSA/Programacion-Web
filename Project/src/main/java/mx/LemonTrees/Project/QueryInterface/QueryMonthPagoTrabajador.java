package mx.LemonTrees.Project.QueryInterface;

import java.time.LocalDate;

public interface QueryMonthPagoTrabajador {
Integer getId_Pago_Trabajador();
LocalDate getFecha_Pago();
Integer getMonto();
Integer getId_Trabajador();
String getNombre();
String getApellido_Pat();
}
