
package mx.LemonTrees.Project.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

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
    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Trabajador")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Trabajador trabajador;

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

    public Trabajador getTrabajador() {
        return trabajador;
    }

    public void setTrabajador(Trabajador trabajador) {
        this.trabajador = trabajador;
    }
}
