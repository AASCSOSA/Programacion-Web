package mx.LemonTrees.Project.Model;

import java.time.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Carga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Carga;

    @Column(nullable = false)
    private Integer Rejas_LimonVerde;
    @Column(nullable = false)
    private Integer Rejas_LimonSegunda;
    @Column(nullable = false)
    private Integer Rejas_LimonTercera;
    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private Integer Total_Trabajadores;

    @Column(nullable = false)
    private Float Total_PesoLimonVerde;
    @Column(nullable = false)
    private Float Total_PesoLimonSegunda;
    @Column(nullable = false)
    private Float Total_PesoLimonTercera;

    // Relación muchos a muchos
    @ManyToOne
    @JoinColumn(name = "Id_Rancho")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Rancho rancho;

    // Relacion con Venta
    @OneToMany(mappedBy = "carga")
    private List<Venta> venta;

    public Carga() {
    }
    public Carga(Integer rejas_LimonVerde, Integer rejas_LimonSegunda, Integer rejas_LimonTercera, LocalDate fecha,
            Integer total_Trabajadores, Float total_PesoLimonVerde, Float total_PesoLimonSegunda,
            Float total_PesoLimonTercera) {
        Rejas_LimonVerde = rejas_LimonVerde;
        Rejas_LimonSegunda = rejas_LimonSegunda;
        Rejas_LimonTercera = rejas_LimonTercera;
        this.fecha = fecha;
        Total_Trabajadores = total_Trabajadores;
        Total_PesoLimonVerde = total_PesoLimonVerde;
        Total_PesoLimonSegunda = total_PesoLimonSegunda;
        Total_PesoLimonTercera = total_PesoLimonTercera;
    }


    public Integer getId_Carga() {
        return Id_Carga;
    }
    public void setId_Carga(Integer id_Carga) {
        Id_Carga = id_Carga;
    }
    public Rancho getRancho() {
        return rancho;
    }
    public List<Venta> getVenta() {
        return venta;
    }
    public void setRancho(Rancho rancho) {
        this.rancho = rancho;
    }
    public void setVenta(List<Venta> venta) {
        this.venta = venta;
    }
    public Integer getRejas_LimonVerde() {
        return Rejas_LimonVerde;
    }

    public void setRejas_LimonVerde(Integer rejas_LimonVerde) {
        Rejas_LimonVerde = rejas_LimonVerde;
    }

    public Integer getRejas_LimonSegunda() {
        return Rejas_LimonSegunda;
    }

    public void setRejas_LimonSegunda(Integer rejas_LimonSegunda) {
        Rejas_LimonSegunda = rejas_LimonSegunda;
    }

    public Integer getRejas_LimonTercera() {
        return Rejas_LimonTercera;
    }

    public void setRejas_LimonTercera(Integer rejas_LimonTercera) {
        Rejas_LimonTercera = rejas_LimonTercera;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Integer getTotal_Trabajadores() {
        return Total_Trabajadores;
    }

    public void setTotal_Trabajadores(Integer total_Trabajadores) {
        Total_Trabajadores = total_Trabajadores;
    }

    public Float getTotal_PesoLimonVerde() {
        return Total_PesoLimonVerde;
    }

    public void setTotal_PesoLimonVerde(Float total_PesoLimonVerde) {
        Total_PesoLimonVerde = total_PesoLimonVerde;
    }

    public Float getTotal_PesoLimonSegunda() {
        return Total_PesoLimonSegunda;
    }

    public void setTotal_PesoLimonSegunda(Float total_PesoLimonSegunda) {
        Total_PesoLimonSegunda = total_PesoLimonSegunda;
    }

    public Float getTotal_PesoLimonTercera() {
        return Total_PesoLimonTercera;
    }

    public void setTotal_PesoLimonTercera(Float total_PesoLimonTercera) {
        Total_PesoLimonTercera = total_PesoLimonTercera;
    }

    
    
}
