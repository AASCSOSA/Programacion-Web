package mx.LemonTrees.Project.Model;

import java.time.*;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Fertilizante;

    @Column(nullable = false, length = 30)
    private String Marca;

    @Column(nullable = false, length = 50)
    private String Domicilio_Distribuidora;

    @Column(nullable = false)
    private Float Cantidad;

    @Column(nullable = false, length = 30)
    private String Clasificacion;

    @Column(nullable = false)
    private Integer Lote;

    @Column(nullable = false)
    private Float Costo_Total;

    @Column(nullable = false)
    private Float Costo_Unitario;

    @Column(nullable = false)
    private LocalDate Fecha_Caducidad;
    @Column(nullable = false)
    private LocalDate Fecha_Adquisicion;

    @OneToMany(mappedBy = "fertilizante", cascade = CascadeType.ALL)
    private List<Fertilizacion> Fertilizacion;

    public Fertilizante() {
    }

    public Fertilizante(String marca, String domicilio_Distribuidora, Float cantidad, String clasificacion,
            Integer lote, Float costo_Total, Float costo_Unitario, LocalDate fecha_Caducidad,
            LocalDate fecha_Adquisicion) {
        Marca = marca;
        Domicilio_Distribuidora = domicilio_Distribuidora;
        Cantidad = cantidad;
        Clasificacion = clasificacion;
        Lote = lote;
        Costo_Total = costo_Total;
        Costo_Unitario = costo_Unitario;
        Fecha_Caducidad = fecha_Caducidad;
        Fecha_Adquisicion = fecha_Adquisicion;
    }

    public Integer getId_Fertilizante() {
        return Id_Fertilizante;
    }

    public void setId_Fertilizante(Integer id_Fertilizante) {
        Id_Fertilizante = id_Fertilizante;
    }

    public String getMarca() {
        return Marca;
    }

    public void setMarca(String marca) {
        Marca = marca;
    }

    public String getDomicilio_Distribuidora() {
        return Domicilio_Distribuidora;
    }

    public void setDomicilio_Distribuidora(String domicilio_Distribuidora) {
        Domicilio_Distribuidora = domicilio_Distribuidora;
    }

    public Float getCantidad() {
        return Cantidad;
    }

    public void setCantidad(Float cantidad) {
        Cantidad = cantidad;
    }

    public String getClasificacion() {
        return Clasificacion;
    }

    public void setClasificacion(String clasificacion) {
        Clasificacion = clasificacion;
    }

    public Integer getLote() {
        return Lote;
    }

    public void setLote(Integer lote) {
        Lote = lote;
    }

    public Float getCosto_Total() {
        return Costo_Total;
    }

    public void setCosto_Total(Float costo_Total) {
        Costo_Total = costo_Total;
    }

    public Float getCosto_Unitario() {
        return Costo_Unitario;
    }

    public void setCosto_Unitario(Float costo_Unitario) {
        Costo_Unitario = costo_Unitario;
    }

    public LocalDate getFecha_Caducidad() {
        return Fecha_Caducidad;
    }

    public void setFecha_Caducidad(LocalDate fecha_Caducidad) {
        Fecha_Caducidad = fecha_Caducidad;
    }

    public LocalDate getFecha_Adquisicion() {
        return Fecha_Adquisicion;
    }

    public void setFecha_Adquisicion(LocalDate fecha_Adquisicion) {
        Fecha_Adquisicion = fecha_Adquisicion;
    }

    public List<Fertilizacion> getFertilizacion() {
        return Fertilizacion;
    }

    public void setFertilizacion(List<Fertilizacion> fertilizacion) {
        Fertilizacion = fertilizacion;
    }
    

    
}
