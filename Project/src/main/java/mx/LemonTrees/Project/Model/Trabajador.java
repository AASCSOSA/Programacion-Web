package mx.LemonTrees.Project.Model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Trabajador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Trabajador;

    @Column(nullable = false, length = 25)
    private String Nombre;

    @Column(nullable = false, length = 25)
    private String Apellido_Pat;

    @Column(nullable = false, length = 25)
    private String Apellido_Mat;

    @Column(nullable = false, length = 15)
    private String Telefono;

    @Column(nullable = false, length = 50)
    private String Direccion;

    @Column(nullable = false)
    private float Sueldo;

    //@OneToOne(mappedBy = "trabajador", cascade = CascadeType.ALL)
    //private List<Herramienta> herramientas = new ArrayList<>();
    @OneToMany(mappedBy = "trabajador", cascade = CascadeType.ALL)
    private List<Pago_Trabajador> pagos = new ArrayList<>();
    public Trabajador() {
        
    }
    public Trabajador(String Nombre, String Apellido_pat, String Apellido_mat, String Telefono, String Direccion, float Sueldo) {
        
        this.Nombre = Nombre;
        this.Apellido_Pat = Apellido_pat;
        this.Apellido_Mat = Apellido_mat;
        this.Telefono = Telefono;
        this.Direccion = Direccion;
        this.Sueldo = Sueldo;
    }

    public Integer getId_Trabajador() {
        return Id_Trabajador;
    }

    public void setId_Trabajador(Integer Id_Trabajador) {
        this.Id_Trabajador = Id_Trabajador;
    }

    public String getNombre() {
        return Nombre;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public String getApellido_Pat() {
        return Apellido_Pat;
    }

    public void setApellido_Pat(String Apellido_Pat) {
        this.Apellido_Pat = Apellido_Pat;
    }

    public String getApellido_Mat() {
        return Apellido_Mat;
    }

    public void setApellido_Mat(String Apellido_Mat) {
        this.Apellido_Mat = Apellido_Mat;
    }

    public String getTelefono() {
        return Telefono;
    }

    public void setTelefono(String Telefono) {
        this.Telefono = Telefono;
    }

    public String getDireccion() {
        return Direccion;
    }

    public void setDireccion(String Direccion) {
        this.Direccion = Direccion;
    }

    public float getSueldo() {
        return Sueldo;
    }

    public void setSueldo(float Sueldo) {
        this.Sueldo = Sueldo;
    }

    public List<Pago_Trabajador> getPagos() {
        return pagos;
    }

    public void setPagos(List<Pago_Trabajador> pagos) {
        this.pagos = pagos;
    }

//    public List<Herramienta> getHerramientas() {
//        return herramientas;
//    }
//
//    public void setHerramientas(List<Herramienta> herramientas) {
//        this.herramientas = herramientas;
//    }
}
