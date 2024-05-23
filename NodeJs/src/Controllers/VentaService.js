import axios from "axios";
const URL_BASE = "http://localhost:8080/venta";

class VentaService {
  findAll() {
    return axios.get(URL_BASE);
  }
  create(venta) {
    return axios.post(URL_BASE, venta);
  }
  findById(id) {
    return axios.get(URL_BASE + "/" + id);
  }
  update(venta, id) {
    return axios.put(URL_BASE + "/" + id, venta);
  }
  delete(id) {
    return axios.delete(URL_BASE + "/" + id);
  }
  findByIdComprador(id) {
    return axios.get(URL_BASE + "/comprador/"+id);
  }
  findByIdCarga(id) {
    return axios.get(URL_BASE + "/carga/"+id);
  }
  obtenerVentasMesActual(){
    return axios.get(URL_BASE );
  }
  findVentaXMonth(){
    return axios.get(URL_BASE + "/ventaxmes");
  }
}
export default new VentaService();
