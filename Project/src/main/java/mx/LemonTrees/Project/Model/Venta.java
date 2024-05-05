package mx.LemonTrees.Project.Model;

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
    private float Precio_Total;

    //Relaciones
    @ManyToOne (fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "Id_Comprador")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Comprador comprador;

    public Venta() {
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

    public float getPrecio_Total() {
        return this.Precio_Total;
    }

    public void setPrecio_Total(float precio_Total) {
        this.Precio_Total = precio_Total;
    }

    public Comprador getComprador() {
        return this.comprador;
    }

    public void setComprador(Comprador comprador) {
        this.comprador = comprador;
    }
}
