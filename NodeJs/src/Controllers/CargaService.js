import axios from "axios";
const URL_BASE = "http://localhost:8080/carga";

class CargaService {
    findAll() {
        return axios.get(URL_BASE);
    }
    create(carga) {
        return axios.post(URL_BASE, carga);
    }
    findById(id) {
        return axios.get(URL_BASE + "/" + id);
    }
    update(id, carga) {
        return axios.put(URL_BASE + "/" + id, carga);
    }
    delete(id) {
        return axios.delete(URL_BASE + "/" + id);
    }
}
export default new CargaService();