package mx.LemonTrees.Project.Model;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Fertilizante {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer Id_Fertilizante;

    @Column (nullable = false,length = 30)
    private String Marca;

    @Column (nullable = false,length = 30)
    private String Presentacion;

    @Column (nullable = false,length = 50)
    private String Domicilio_Distribuidora;

    @Column (nullable = false)
    private Float Cantidad;

    @Column (nullable = false,length = 30)
    private String Clasificacion;

    @Column(nullable = false)
    private Integer Lote;

    @Column(nullable = false)
    private Float Costo_Total;

    @Column(nullable = false)
    private Float Costo_Unitario;

    @Column(nullable = false)
    private Date Fecha_Caducidad;

    @OneToMany(mappedBy = "fertilizante", cascade = CascadeType.ALL)
    private List<Fertilizacion> Fertilizacion ;

    public Fertilizante() {
    }

    public Fertilizante(Integer Id_Fertilizante, String Marca, String Presentacion, String Domicilio_Distribuidora, Float Cantidad, String Clasificacion, Integer Lote, Float Costo_Total, Float Costo_Unitario, Date Fecha_Caducidad) {
        this.Marca = Marca;
        this.Presentacion = Presentacion;
        this.Domicilio_Distribuidora = Domicilio_Distribuidora;
        this.Cantidad = Cantidad;
        this.Clasificacion = Clasificacion;
        this.Lote = Lote;
        this.Costo_Total = Costo_Total;
        this.Costo_Unitario = Costo_Unitario;
        this.Fecha_Caducidad = Fecha_Caducidad;
    }

    public Integer getId_Fertilizante() {
        return this.Id_Fertilizante;
    }

    public void setId_Fertilizante(Integer Id_Fertilizante) {
        this.Id_Fertilizante = Id_Fertilizante;
    }

    public String getMarca() {
        return this.Marca;
    }

    public void setMarca(String Marca) {
        this.Marca = Marca;
    }

    public String getPresentacion() {
        return this.Presentacion;
    }

    public void setPresentacion(String Presentacion) {
        this.Presentacion = Presentacion;
    }

    public String getDomicilio_Distribuidora() {
        return this.Domicilio_Distribuidora;
    }

    public void setDomicilio_Distribuidora(String Domicilio_Distribuidora) {
        this.Domicilio_Distribuidora = Domicilio_Distribuidora;
    }

    public Float getCantidad() {
        return this.Cantidad;
    }

    public void setCantidad(Float Cantidad) {
        this.Cantidad = Cantidad;
    }

    public String getClasificacion() {
        return this.Clasificacion;
    }

    public void setClasificacion(String Clasificacion) {
        this.Clasificacion = Clasificacion;
    }

    public Integer getLote() {
        return this.Lote;
    }

    public void setLote(Integer Lote) {
        this.Lote = Lote;
    }

    public Float getCosto_Total() {
        return this.Costo_Total;
    }

    public void setCosto_Total(Float Costo_Total) {
        this.Costo_Total = Costo_Total;
    }

    public Float getCosto_Unitario() {
        return this.Costo_Unitario;
    }

    public void setCosto_Unitario(Float Costo_Unitario) {
        this.Costo_Unitario = Costo_Unitario;
    }

    public Date getFecha_Caducidad() {
        return this.Fecha_Caducidad;
    }

    public void setFecha_Caducidad(Date Fecha_Caducidad) {
        this.Fecha_Caducidad = Fecha_Caducidad;
    }


    public List<Fertilizacion> getFertilizacion() {
        return this.Fertilizacion;
    }

    public void setFertilizacion(List<Fertilizacion> Fertilizacion) {
        this.Fertilizacion = Fertilizacion;
    }

}
