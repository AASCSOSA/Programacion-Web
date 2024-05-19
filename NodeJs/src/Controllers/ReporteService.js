import axios from "axios";
const URL_BASE = "http://localhost:8080/reporte";

class ReporteService{
    getTotalVentas(){
        return axios.get(URL_BASE+"/totalVentas")
    }
}
export default new ReporteService();
