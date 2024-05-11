package mx.LemonTrees.Project.Model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

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
    private Date Fecha;

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


    public Carga() {
    }

    public Carga(Integer Rejas_LimonVerde, Integer Rejas_LimonSegunda, Integer Rejas_LimonTercera, Date Fecha,
            Integer Total_Trabajadores, Float Total_PesoLimonVerde, Float Total_PesoLimonSegunda,
            Float Total_PesoLimonTercera) {
        this.Rejas_LimonVerde = Rejas_LimonVerde;
        this.Rejas_LimonSegunda = Rejas_LimonSegunda;
        this.Rejas_LimonTercera = Rejas_LimonTercera;
        this.Fecha = Fecha;
        this.Total_Trabajadores = Total_Trabajadores;
        this.Total_PesoLimonVerde = Total_PesoLimonVerde;
        this.Total_PesoLimonSegunda = Total_PesoLimonSegunda;
        this.Total_PesoLimonTercera = Total_PesoLimonTercera;
    }

    public Integer getId_Carga() {
        return this.Id_Carga;
    }

    public void setId_Carga(Integer Id_Carga) {
        this.Id_Carga = Id_Carga;
    }

    public Integer getRejas_LimonVerde() {
        return this.Rejas_LimonVerde;
    }

    public void setRejas_LimonVerde(Integer Rejas_LimonVerde) {
        this.Rejas_LimonVerde = Rejas_LimonVerde;
    }

    public Integer getRejas_LimonSegunda() {
        return this.Rejas_LimonSegunda;
    }

    public void setRejas_LimonSegunda(Integer Rejas_LimonSegunda) {
        this.Rejas_LimonSegunda = Rejas_LimonSegunda;
    }

    public Integer getRejas_LimonTercera() {
        return this.Rejas_LimonTercera;
    }

    public void setRejas_LimonTercera(Integer Rejas_LimonTercera) {
        this.Rejas_LimonTercera = Rejas_LimonTercera;
    }

    public Date getFecha() {
        return this.Fecha;
    }

    public void setFecha(Date Fecha) {
        this.Fecha = Fecha;
    }

    public Integer getTotal_Trabajadores() {
        return this.Total_Trabajadores;
    }

    public void setTotal_Trabajadores(Integer Total_Trabajadores) {
        this.Total_Trabajadores = Total_Trabajadores;
    }

    public Float getTotal_PesoLimonVerde() {
        return this.Total_PesoLimonVerde;
    }

    public void setTotal_PesoLimonVerde(Float Total_PesoLimonVerde) {
        this.Total_PesoLimonVerde = Total_PesoLimonVerde;
    }

    public Float getTotal_PesoLimonSegunda() {
        return this.Total_PesoLimonSegunda;
    }

    public void setTotal_PesoLimonSegunda(Float Total_PesoLimonSegunda) {
        this.Total_PesoLimonSegunda = Total_PesoLimonSegunda;
    }

    public Float getTotal_PesoLimonTercera() {
        return this.Total_PesoLimonTercera;
    }

    public void setTotal_PesoLimonTercera(Float Total_PesoLimonTercera) {
        this.Total_PesoLimonTercera = Total_PesoLimonTercera;
    }

    public Rancho getRancho() {
        return this.rancho;
    }

    public void setRancho(Rancho rancho) {
        this.rancho = rancho;
    }

}
