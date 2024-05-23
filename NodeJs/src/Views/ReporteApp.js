import React, {useState, useEffect, useRef} from "react";
import ReporteService from "../Controllers/ReporteService";
import {Link} from "react-router-dom";


export default function ReporteApp(){

    const [totalVentas, setTotalVentas] = useState(null);
    const [totalPesos, setTotalPesos] = useState(null);
    const [totalFertilizantes, setTotalFertilizantes] = useState(null);
    const[totalPagosTrabajadores, setTotalPagosTrabajadores] = useState(null);
    const[utilidad, setUtilidad] = useState(null);

    const updateValues = ()=>{
        ReporteService.getUtilidad().then((response)=>{
            setUtilidad(response.data);
        })
            .catch((error)=>{
                console.log(error);
            });

        ReporteService.getTotalVentas().then((response)=>{
            setTotalVentas(response.data);
        })
            .catch((error)=>{
            console.log(error);
        });

        ReporteService.getTotalPesos().then((response)=>{
            setTotalPesos(response.data);
        })
            .catch((error)=>{
                console.log(error);
            });

        ReporteService.getTotalFertilizantes().then((response)=>{
           setTotalFertilizantes(response.data);
        })
            .catch((error)=>{
            console.log(error);
        });

        ReporteService.getTotalPagosTrabajadores().then((response)=>{
           setTotalPagosTrabajadores(response.data);
        })
            .catch((error)=>{
                console.log(error);
            });
    };
    useEffect(() => {
        updateValues();
    }, []);




    return (
        <div>
            <footer className="titleFrm">Reportes</footer>
            <div className="container">
                <div className="table-container">
                    <div className="table-responsive">
                        <table className="table table-hover table-bordered">
                            <thead className="table-success">
                            <tr>
                                <th>TOTAL VENDIDO</th>
                                <th>TOTAL KG VENDIDOS</th>
                                <th>TOTAL FERTILIZANTES COMPRADOS</th>
                                <th>TOTAL DE PAGOS A TRABAJADORES</th>
                                <th>UTILIDAD BRUTA</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                            <td>$ {totalVentas} MXN</td>
                            <td>{totalPesos} Kg</td>
                            <td>$ {totalFertilizantes} MXN</td>
                            <td>$ {totalPagosTrabajadores} MXN</td>
                            <td>$ {utilidad} MXN</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}