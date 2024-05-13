import axios from "axios";
const URL_BASE = "http://localhost:8080/fertilizacion";

class FertilizacionService {
  findAll() {
    return axios.get(URL_BASE);
  }
  findById(id) {
    return axios.get(URL_BASE + "/" + id);
  }
  create(fertilizacion) {
    return axios.post(URL_BASE, fertilizacion);
  }
  update(id, fertilizacion) {
    return axios.put(URL_BASE + "/" + id, fertilizacion);
  }
  delete(id) {
    return axios.delete(URL_BASE + "/" + id);
  }
  getFertilizacion(id) {
    return axios.get(URL_BASE + "/fertilizante/" + id);
  }
  getNameRancho(id) {
    return axios.get(URL_BASE + "/rancho/" + id);
  }
  findByIdRancho(id){
    return axios.get(URL_BASE + "/ranchos/" + id);
  }

  findByIdFertilizante(id){
    return axios.get(URL_BASE + "/fertilizantes/" + id);
  }
}
export default new FertilizacionService();
