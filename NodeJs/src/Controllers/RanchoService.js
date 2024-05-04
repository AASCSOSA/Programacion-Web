import axios from "axios";
const URL_BASE= "http://localhost:8080/rancho";

class RanchoService {
    findAll(){
        return axios.get(URL_BASE);
    }
    create(rancho) {
        return axios.post(URL_BASE, rancho);
    }
    findById(Id_Rancho) {
        return axios.get(URL_BASE + "/" + Id_Rancho);
    }
    delete(Id_Rancho) {
        return axios.delete(URL_BASE + "/" + Id_Rancho);
    }
    update(rancho) {
        return axios.put(URL_BASE + "/" + rancho.Id_Rancho, rancho);
    }
}
export default new RanchoService();