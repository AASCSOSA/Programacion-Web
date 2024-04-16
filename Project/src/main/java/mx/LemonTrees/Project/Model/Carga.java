package mx.LemonTrees.Project.Model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Carga {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer Id_Carga;

    @Column (nullable = false)
    private Integer Rejas_LimonVerde;
    @Column (nullable = false)
    private Integer Rejas_LimonSegunda;
    @Column (nullable = false)
    private Integer Rejas_LimonTercera;
    @Column (nullable = false)
    private Date Fecha;

    @Column (nullable = false)
    private Integer Total_Trabajadores;

    @Column(nullable = false)
    private Float Total_PesoLimonVerde;
    @Column(nullable = false)
    private Float Total_PesoLimonSegunda;
    @Column(nullable = false)
    private Float Total_PesoLimonTercera;

    @ManyToOne (fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Rancho")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Rancho Id_Rancho;


    public Carga() {
    }

    public Carga(Integer id_Carga, Integer rejas_LimonVerde, Integer rejas_LimonSegunda, Integer rejas_LimonTercera, Date fecha, Integer total_Trabajadores, Float total_PesoLimonVerde, Float total_PesoLimonSegunda, Float total_PesoLimonTercera, Rancho id_Rancho) {

        Rejas_LimonVerde = rejas_LimonVerde;
        Rejas_LimonSegunda = rejas_LimonSegunda;
        Rejas_LimonTercera = rejas_LimonTercera;
        Fecha = fecha;
        Total_Trabajadores = total_Trabajadores;
        Total_PesoLimonVerde = total_PesoLimonVerde;
        Total_PesoLimonSegunda = total_PesoLimonSegunda;
        Total_PesoLimonTercera = total_PesoLimonTercera;
        Id_Rancho = id_Rancho;
    }

    public Integer getId_Carga() {
        return Id_Carga;
    }

    public void setId_Carga(Integer id_Carga) {
        Id_Carga = id_Carga;
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

    public Date getFecha() {
        return Fecha;
    }

    public void setFecha(Date fecha) {
        Fecha = fecha;
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

    public Rancho getId_Rancho() {
        return Id_Rancho;
    }

    public void setId_Rancho(Rancho id_Rancho) {
        Id_Rancho = id_Rancho;
    }
}
