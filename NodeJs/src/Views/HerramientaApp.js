import React, { useState, useEffect } from 'react';
import HerramientaService from '../Controllers/HerramientaService';
import { Link } from 'react-router-dom';

export default function HerramientaApp() {
    const [herramienta, setHerramienta] = useState([]);
    
    const listarHerramienta = () => {
        HerramientaService.findAll().then((response) => {
            setHerramienta(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        listarHerramienta();
    }, []);

    const deleteHerramienta = (id_Herramienta) => {
        HerramientaService.delete(id_Herramienta).then((response) => {
            listarHerramienta();
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <div>
            <footer className="tittleFrm">Herramienta</footer>
            <div className='container'>
                <div className="table-container">
                    <table class="table" id="tableHerramienta">
                        <thead class="table-dark">
                            <tr>
                                <th>Id Herramienta</th>
                                <th >Modelo</th>
                                <th >Marca</th>
                                <th >Cantidad</th>
                                <th >Color</th>
                                <th >Costo</th>
                                <th >Fecha de Adquisición</th>
                            </tr>
                        </thead>
                        <tbody>
                            {herramienta.map((herramienta) => (
                                <tr key={herramienta.id_Herramienta}>
                                    <td>{herramienta.id_Herramienta}</td>
                                    <td>{herramienta.modelo}</td>
                                    <td>{herramienta.marca}</td>
                                    <td>{herramienta.cantidad}</td>
                                    <td>{herramienta.color}</td>
                                    <td>{herramienta.costo}</td>
                                    <td>{herramienta.fecha_Adquisicion}</td>
                                    <td>
                                        <Link className='btn btn-info' to={`/edit-herramienta/${herramienta.id_Herramienta}`}>Editar</Link>
                                        <button style={{ marginLeft: "10px" }} className='btn btn-danger' onClick={() => deleteHerramienta(herramienta.id_Herramienta)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/form-herramienta'><button type="button" class="btn btn-success" >Insertar</button></Link>
                <Link to='/form-herramienta'><button type="button" class="btn btn-success" >Consular</button></Link>
            </div>
        </div>
    )
}