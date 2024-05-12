package mx.LemonTrees.Project.Model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Comprador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Comprador;

    @Column(nullable = false, length = 30)
    private String Nombre;

    @Column(nullable = false, length = 30)
    private String Apellido_Pat;

    @Column(nullable = false, length = 30)
    private String Apellido_Mat;

    @Column(nullable = false, length = 15)
    private String Telefono;

    @Column(nullable = false, length = 50)
    private String Nombre_Empresa;

    @OneToMany(mappedBy = "comprador", cascade = CascadeType.ALL)
    private List<Venta> ventas;

    public Comprador() {
    }

    public Comprador(String nombre, String apellido_Pat, String apellido_Mat, String telefono, String nombre_Empresa) {
        Nombre = nombre;
        Apellido_Pat = apellido_Pat;
        Apellido_Mat = apellido_Mat;
        Telefono = telefono;
        Nombre_Empresa = nombre_Empresa;
    }

    public Integer getId_Comprador() {
        return Id_Comprador;
    }

    public void setId_Comprador(Integer id_Comprador) {
        Id_Comprador = id_Comprador;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String nombre) {
        Nombre = nombre;
    }

    public String getApellido_Pat() {
        return Apellido_Pat;
    }

    public void setApellido_Pat(String apellido_Pat) {
        Apellido_Pat = apellido_Pat;
    }

    public String getApellido_Mat() {
        return Apellido_Mat;
    }

    public void setApellido_Mat(String apellido_Mat) {
        Apellido_Mat = apellido_Mat;
    }

    public String getTelefono() {
        return Telefono;
    }

    public void setTelefono(String telefono) {
        Telefono = telefono;
    }

    public String getNombre_Empresa() {
        return Nombre_Empresa;
    }

    public void setNombre_Empresa(String nombre_Empresa) {
        Nombre_Empresa = nombre_Empresa;
    }

    public List<Venta> getVentas() {
        return ventas;
    }

    public void setVentas(List<Venta> ventas) {
        this.ventas = ventas;
    }
    
}
