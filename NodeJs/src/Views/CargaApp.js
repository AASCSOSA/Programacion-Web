import React, { useState, useEffect } from 'react';
import CargaService from '../Controllers/CargaService';
import { Link } from 'react-router-dom';

export default function CargaApp() {

    const [carga, setCarga] = useState([]);
   
    const listarCarga = () => {
        CargaService.findAll().then((response) => {
            setCarga(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarCarga();
    }, []);
    useEffect(() => {
        CargaService.findAll().then((response) => {
            setCarga(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    const deleteCarga = (id) => {
        CargaService.delete(id).then((response) => {
            listarCarga();
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <footer className="tittleFrm">Carga</footer>
            <div className='container'>
                <div className="table-container">
                    <table class="table" id="tableCarga">
                        <thead class="table-dark">
                            <tr>
                                <th id="id_IdCarga">Id Carga</th>
                                <th >Fecha</th>
                                <th >Rejas de limón verde</th>
                                <th >Rejas de limón segunda</th>
                                <th >Rejas de limón tercera</th>
                                <th >Total peso de limón verde</th>
                                <th >Total peso de limón segunda</th>
                                <th >Total peso de limón tercera</th>
                                <th >Trabajadores</th>
                                <th >Id Rancho</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carga.map((carga) => (
                                <tr key={carga.id_Carga}>
                                    <td>{carga.id_Carga}</td>
                                    <td>{carga.fecha}</td>
                                    <td>{carga.rejas_LimonVerde}</td>
                                    <td>{carga.rejas_LimonSegunda}</td>
                                    <td>{carga.rejas_LimonTercera}</td>
                                    <td>{carga.total_PesoLimonVerde}</td>
                                    <td>{carga.total_PesoLimonSegunda}</td>
                                    <td>{carga.total_PesoLimonTercera}</td>
                                    <td>{carga.total_Trabajadores}</td>
                                    <td>{carga.Id_Rancho}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-carga/${carga.id_Carga}`}>Editar</Link>
                                        <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteCarga(carga.id_Carga)}>Eliminar</button>
                                    </td>
                                </tr>
                                
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/form-carga'><button type="button" class="btn btn-success" >Insertar</button></Link>
                <Link to='/form-carga'><button type="button" class="btn btn-success" >Consular</button></Link>
            </div>
        </div>
    )
}