import axios from "axios";
const URL_BASE = "http://localhost:8080/reporte";

class ReporteService{
    getTotalVentas(){
        return axios.get(URL_BASE+"/totalVentas")
    }
    getTotalPesos(){
        return axios.get(URL_BASE+"/totalPesos")
    }
    getTotalFertilizantes(){
        return axios.get(URL_BASE+"/totalFertilizantes")
    }

    getTotalPagosTrabajadores(){
        return axios.get(URL_BASE+"/totalPagosTrabajadores")
    }

    getUtilidad(){
        return axios.get(URL_BASE+"/utilidadBruta")
    }
}
export default new ReporteService();
