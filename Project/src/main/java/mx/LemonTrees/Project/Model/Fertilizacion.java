package mx.LemonTrees.Project.Model;

import java.time.*;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Fertilizacion {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer Id_Fertilizacion;

    private LocalDate Fecha_Aplicacion;

    private Integer Cantidad_Aplicacion;

    @ManyToOne
    @JoinColumn(name = "Id_Fertilizante")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Fertilizante fertilizante;
    
    @ManyToOne
    @JoinColumn(name = "Id_Rancho")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Rancho rancho;

    public Integer getId_Fertilizacion() {
        return this.Id_Fertilizacion;
    }

    public void setId_Fertilizacion(Integer Id_Fertilizacion) {
        this.Id_Fertilizacion = Id_Fertilizacion;
    }

    public LocalDate getFecha_Aplicacion() {
        return this.Fecha_Aplicacion;
    }

    public void setFecha_Aplicacion(LocalDate Fecha_Aplicacion) {
        this.Fecha_Aplicacion = Fecha_Aplicacion;
    }

    public Integer getCantidad_Aplicacion() {
        return this.Cantidad_Aplicacion;
    }

    public void setCantidad_Aplicacion(Integer Cantidad_Aplicacion) {
        this.Cantidad_Aplicacion = Cantidad_Aplicacion;
    }

    public Fertilizante getFertilizante() {
        return this.fertilizante;
    }

    public void setFertilizante(Fertilizante fertilizante) {
        this.fertilizante = fertilizante;
    }

    public Rancho getRancho() {
        return this.rancho;
    }

    public void setRancho(Rancho rancho) {
        this.rancho = rancho;
    }

    public Fertilizacion(LocalDate Fecha_Aplicacion, Integer Cantidad_Aplicacion) {
        this.Fecha_Aplicacion = Fecha_Aplicacion;
        this.Cantidad_Aplicacion = Cantidad_Aplicacion;
    }

    public Fertilizacion() {
    }

}
