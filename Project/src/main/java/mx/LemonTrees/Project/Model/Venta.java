package mx.LemonTrees.Project.Model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Venta;

    @Column(nullable = false)
    private float Precio_LimonVerde;

    @Column(nullable = false)
    private float Precio_LimonSegunda;

    @Column(nullable = false)
    private float Precio_LimonTercera;

    @Column(nullable = false)
    private float Pago_Total;

    @Column(nullable = false)
    private float Peso_Total;

    @Column(nullable = false)
    private Date Fecha;

    // Relaciones
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Id_Comprador")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Comprador comprador;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Id_Carga")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Carga carga;

    public Venta() {
    }

   

    public Venta(float precio_LimonVerde, float precio_LimonSegunda, float precio_LimonTercera, float pago_Total,
            float peso_Total, Date fecha) {
        Precio_LimonVerde = precio_LimonVerde;
        Precio_LimonSegunda = precio_LimonSegunda;
        Precio_LimonTercera = precio_LimonTercera;
        Pago_Total = pago_Total;
        Peso_Total = peso_Total;
        Fecha = fecha;
    }



    public Integer getId_Venta() {
        return this.Id_Venta;
    }

    public void setId_Venta(Integer id_Venta) {
        this.Id_Venta = id_Venta;
    }

    public float getPrecio_LimonVerde() {
        return this.Precio_LimonVerde;
    }

    public void setPrecio_LimonVerde(float precio_LimonVerde) {
        this.Precio_LimonVerde = precio_LimonVerde;
    }

    public float getPrecio_LimonSegunda() {
        return this.Precio_LimonSegunda;
    }

    public void setPrecio_LimonSegunda(float precio_LimonSegunda) {
        this.Precio_LimonSegunda = precio_LimonSegunda;
    }

    public float getPrecio_LimonTercera() {
        return this.Precio_LimonTercera;
    }

    public void setPrecio_LimonTercera(float precio_LimonTercera) {
        this.Precio_LimonTercera = precio_LimonTercera;
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

    public Comprador getComprador() {
        return this.comprador;
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



    public Date getFecha() {
        return Fecha;
    }



    public void setFecha(Date fecha) {
        Fecha = fecha;
    }

}
