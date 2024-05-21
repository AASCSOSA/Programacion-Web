import axios from "axios";
const URL_BASE = "http://localhost:8080/fertilizante";

class FertilizanteService {
  findAll() {
    return axios.get(URL_BASE);
  }
  findById(id) {
    return axios.get(URL_BASE + "/" + id);
  }
  create(fertilizante) {
    return axios.post(URL_BASE ,fertilizante);
  }
  update(id, fertilizante) {
    return axios.put(URL_BASE + "/" + id, fertilizante);
  }
  delete(id) {
    return axios.delete(URL_BASE + "/" + id);
  }
}
export default new FertilizanteService();
