import axios from "axios";
const URL_BASE= "http://localhost:8080/comprador";
class CompradorService{
    findAll() {
        return axios.get(URL_BASE);
    }
    create(comprador) {
        return axios.post(URL_BASE, comprador);
    }
    findById(id) {
        return axios.get(URL_BASE + "/" + id);
    }
    update(id, comprador) {
        return axios.put(URL_BASE + "/" + id, comprador);
    }
    delete(id) {
        return axios.delete(URL_BASE + "/" + id);
    }
    getNameComprador(id){
        return axios.get(URL_BASE+"/venta/"+id)
    }

}
export default new CompradorService();