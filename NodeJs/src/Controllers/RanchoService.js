import axios from "axios";
const URL_BASE = "http://localhost:8080/rancho";

class RanchoService {
  findAll() {
    return axios.get(URL_BASE);
  }
  create(rancho) {
    return axios.post(URL_BASE, rancho);
  }
  findById(id) {
    return axios.get(URL_BASE + "/" + id);
  }
  update(id, rancho) {
    return axios.put(URL_BASE + "/" + id, rancho);
  }
  delete(id) {
    return axios.delete(URL_BASE + "/" + id);
  }
  getNameRancho(id) {
    return axios.get(URL_BASE + "/carga/" + id);
  }
}
export default new RanchoService();
