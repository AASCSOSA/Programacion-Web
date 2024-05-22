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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id_Rancho;

    @Column(nullable = false, length = 25)
    private String Nombre_Rancho;

    @Column(length = 25)
    private String Ubicacion_Rancho;

    @Column(nullable = false, length = 25)
    private String Extension_Rancho;

    @OneToMany(mappedBy = "rancho", cascade = CascadeType.ALL)
    private List<Carga> cargas = new ArrayList<>();

    @OneToMany(mappedBy = "rancho", cascade = CascadeType.ALL)
    private List<Fertilizacion> Fertilizacion;

    public Rancho() {
    }

    public Rancho(String Nombre_Rancho, String Ubicacion_Rancho, String Extension_Rancho) {
        this.Nombre_Rancho = Nombre_Rancho;
        this.Ubicacion_Rancho = Ubicacion_Rancho;
        this.Extension_Rancho = Extension_Rancho;
    }

    public Integer getId_Rancho() {
        return this.Id_Rancho;
    }

    public void setId_Rancho(Integer Id_Rancho) {
        this.Id_Rancho = Id_Rancho;
    }

    public String getNombre_Rancho() {
        return this.Nombre_Rancho;
    }

    public void setNombre_Rancho(String Nombre_Rancho) {
        this.Nombre_Rancho = Nombre_Rancho;
    }

    public String getUbicacion_Rancho() {
        return this.Ubicacion_Rancho;
    }

    public void setUbicacion_Rancho(String Ubicacion_Rancho) {
        this.Ubicacion_Rancho = Ubicacion_Rancho;
    }

    public String getExtension_Rancho() {
        return this.Extension_Rancho;
    }

    public void setExtension_Rancho(String Extension_Rancho) {
        this.Extension_Rancho = Extension_Rancho;
    }

    public List<Carga> getCargas() {
        return this.cargas;
    }

    public void setCargas(List<Carga> cargas) {
        this.cargas = cargas;
    }

    public List<Fertilizacion> getFertilizacion() {
        return this.Fertilizacion;
    }

    public void setFertilizacion(List<Fertilizacion> Fertilizacion) {
        this.Fertilizacion = Fertilizacion;
    }

}
