import axios from "axios";
const URL_BASE = "http://localhost:8080/trabajador";

class TrabajadorService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(trabajador) {
        return axios.post(URL_BASE, trabajador);
    }
    findById(id_Trabajador) {
        return axios.get(URL_BASE + "/" + id_Trabajador);
    }
    update(id_Trabajador, trabajador) {
        return axios.put(URL_BASE + "/" + id_Trabajador, trabajador);
    }
    delete(id_Trabajador) {
        return axios.delete(URL_BASE + "/" + id_Trabajador);
    }

    findByIdHerramienta(id_Herramienta) {
        return axios.get(URL_BASE + "/herramienta/" + id_Herramienta);
    }
    
    getNameTrabajador(id_Trabajador){
        return axios.get(URL_BASE + "/pago_trabajador/" + id_Trabajador);
    }
}
export default new TrabajadorService();