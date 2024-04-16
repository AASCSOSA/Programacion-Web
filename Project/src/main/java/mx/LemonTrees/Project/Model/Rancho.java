package mx.LemonTrees.Project.Model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Rancho {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Integer Id_Rancho;

    @Column(nullable = false, length = 25)
    private String Nombre_Rancho;

    @Column(length = 25)
    private String Ubicacion_Rancho;

    @Column(nullable = false, length = 25)
    private String Extension_Rancho;

    @OneToMany (mappedBy = "Id_Rancho",cascade = CascadeType.ALL)
    private List<Carga> cargas = new ArrayList<>();


    public Rancho() {
    }

    public Rancho(Integer id_Rancho, String nombre_Rancho, String ubicacion_Rancho, String extension_Rancho) {

        Nombre_Rancho = nombre_Rancho;
        Ubicacion_Rancho = ubicacion_Rancho;
        Extension_Rancho = extension_Rancho;
    }

    public Integer getId_Rancho() {
        return Id_Rancho;
    }

    public void setId_Rancho(Integer id_Rancho) {
        Id_Rancho = id_Rancho;
    }

    public String getNombre_Rancho() {
        return Nombre_Rancho;
    }

    public void setNombre_Rancho(String nombre_Rancho) {
        Nombre_Rancho = nombre_Rancho;
    }

    public String getUbicacion_Rancho() {
        return Ubicacion_Rancho;
    }

    public void setUbicacion_Rancho(String ubicacion_Rancho) {
        Ubicacion_Rancho = ubicacion_Rancho;
    }

    public String getExtension_Rancho() {
        return Extension_Rancho;
    }

    public void setExtension_Rancho(String extension_Rancho) {
        Extension_Rancho = extension_Rancho;
    }
    
}
