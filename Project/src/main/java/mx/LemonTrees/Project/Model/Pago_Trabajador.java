
package mx.LemonTrees.Project.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.sql.Date;

@Entity
public class Pago_Trabajador {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Pago_Trabajador;

    @Column(nullable = false)
    private String Monto;

    @Column(nullable = false)
    private Date Fecha_Pago;

    public Pago_Trabajador() {
        
    }

    public Pago_Trabajador(String Monto, Date Fecha_Pago) {
        this.Monto = Monto;
        this.Fecha_Pago = Fecha_Pago;
    }


    public Integer getId_Pago_Trabajador() {
        return Id_Pago_Trabajador;
    }

    public void setId_Pago_Trabajador(Integer Id_Pago_Trabajador) {
        this.Id_Pago_Trabajador = Id_Pago_Trabajador;
    }

    public String getMonto() {
        return Monto;
    }

    public void setMonto(String Monto) {
        this.Monto = Monto;
    }

    public Date getFecha_Pago() {
        return Fecha_Pago;
    }

    public void setFecha_Pago(Date Fecha_Pago) {
        this.Fecha_Pago = Fecha_Pago;
    }
    
    
    
    
}
