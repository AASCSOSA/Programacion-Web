package mx.LemonTrees.Project.Model;

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

    @ManyToOne
    @JoinColumn(name = "Id_Comprador")
    private Comprador comprador;

    public Venta() {
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

    public float getPrecio_Total() {
        return Precio_Total;
    }

    public void setPrecio_Total(float precio_Total) {
        Precio_Total = precio_Total;
    }
}
