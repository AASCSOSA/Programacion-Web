package mx.LemonTrees.Project.Model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

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
    
    //HOLA A TODOS
    @OneToOne(mappedBy = "trabajador", cascade = CascadeType.ALL) 
    private Carga carga;
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

    public String getApellido_pat() {
        return Apellido_Pat;
    }

    public void setApellido_pat(String Apellido_pat) {
        this.Apellido_Pat = Apellido_pat;
    }

    public String getApellido_mat() {
        return Apellido_Mat;
    }

    public void setApellido_mat(String Apellido_mat) {
        this.Apellido_Mat = Apellido_mat;
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
    
}
