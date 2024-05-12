import axios from "axios";
const URL_BASE = "http://localhost:8080/Fertilizante";

class CompradorService {
  findAll() {
    return axios.get(URL_BASE);
  }
  findByAll(id) {
    return axios.get(URL_BASE + "/" + id);
  }
  create(fertilizante) {
    return axios.post(URL_BASE + "/" + fertilizante);
  }
  update(id, fertilizante) {
    return axios.put(URL_BASE + "/" + id, fertilizante);
  }
  delete(id){
    return axios.delete(URL_BASE+"/"+id);
  }
  getFertilizacion(id){
    
  }

}
export default new CompradorService();
