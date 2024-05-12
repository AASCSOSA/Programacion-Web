import axios from "axios";
const URL_BASE = "http://localhost:8080/herramienta";

class HerramientaService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(herramienta) {
        return axios.post(URL_BASE, herramienta);
    }
    findById(id_Herramienta) {
        return axios.get(URL_BASE + "/" + id_Herramienta);
    }
    update(id_Herramienta, herramienta) {
        return axios.put(URL_BASE + "/" + id_Herramienta, herramienta);
    }
    delete(id_Herramienta) {
        return axios.delete(URL_BASE + "/" + id_Herramienta);
    }
    getModeloHerramienta(id_Trabajador){
        return axios.get(URL_BASE + "/trabajador/" + id_Trabajador);
    }
}
export default new HerramientaService();