package mx.LemonTrees.Project.Model;

import java.time.*;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Venta;

    private float Precio_LimonVerde;

    private float Precio_LimonSegunda;

    private float Precio_LimonTercera;

    private float Pago_Total;

    private float Peso_Total;

    private LocalDate fecha;

    // Relaciones
    @ManyToOne
    @JoinColumn(name = "Id_Comprador")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    private Comprador comprador;

    @ManyToOne
    @JoinColumn(name = "Id_Carga")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)

    private Carga carga;

    public Venta() {
    }

    public Venta(float precio_LimonVerde, float precio_LimonSegunda, float precio_LimonTercera, float pago_Total,
            float peso_Total, LocalDate fecha) {
        Precio_LimonVerde = precio_LimonVerde;
        Precio_LimonSegunda = precio_LimonSegunda;
        Precio_LimonTercera = precio_LimonTercera;
        Pago_Total = pago_Total;
        Peso_Total = peso_Total;
        this.fecha = fecha;
    }

    public Integer getId_Venta() {
        return Id_Venta;
    }

    public void setId_Venta(Integer id_Venta) {
        Id_Venta = id_Venta;
    }

    public float getPrecio_LimonVerde() {
        return Precio_LimonVerde;
    }

    public void setPrecio_LimonVerde(float precio_LimonVerde) {
        Precio_LimonVerde = precio_LimonVerde;
    }

    public float getPrecio_LimonSegunda() {
        return Precio_LimonSegunda;
    }

    public void setPrecio_LimonSegunda(float precio_LimonSegunda) {
        Precio_LimonSegunda = precio_LimonSegunda;
    }

    public float getPrecio_LimonTercera() {
        return Precio_LimonTercera;
    }

    public void setPrecio_LimonTercera(float precio_LimonTercera) {
        Precio_LimonTercera = precio_LimonTercera;
    }

    public float getPago_Total() {
        return Pago_Total;
    }

    public void setPago_Total(float pago_Total) {
        Pago_Total = pago_Total;
    }

    public float getPeso_Total() {
        return Peso_Total;
    }

    public void setPeso_Total(float peso_Total) {
        Peso_Total = peso_Total;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Comprador getComprador() {
        return comprador;
    }

    public void setComprador(Comprador comprador) {
        this.comprador = comprador;
    }

    public Carga getCarga() {
        return carga;
    }

    public void setCarga(Carga carga) {
        this.carga = carga;
    }

}