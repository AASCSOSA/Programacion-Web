import axios from "axios";
const URL_BASE = "http://localhost:8080/pago_trabajador";

class Pago_TrabajadorService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(pago_Trabajador) {
        return axios.post(URL_BASE, pago_Trabajador);
    }
    findById(id_Pago_Trabajador) {
        return axios.get(URL_BASE + "/" + id_Pago_Trabajador);
    }
    update(id_Pago_Trabajador, pago_Trabajador) {
        return axios.put(URL_BASE + "/" + id_Pago_Trabajador, pago_Trabajador);
    }
    delete(id_Pago_Trabajador) {
        return axios.delete(URL_BASE + "/" + id_Pago_Trabajador);
    }
    getNameTrabajador(id_Pago_Trabajador){
        return axios.get(URL_BASE+"/trabajador/"+id_Pago_Trabajador)
    }
}
export default new Pago_TrabajadorService();