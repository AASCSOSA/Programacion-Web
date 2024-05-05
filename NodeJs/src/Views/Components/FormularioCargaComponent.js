import React, { useState, useEffect } from 'react';
import CargaService from '../../Controllers/CargaService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const FormularioRanchoComponent = () => {
    const [fecha, setfecha] = useState('');
    const [rejas_LimonVerde,setRejasVerde] = useState('');
    const [rejas_LimonSegunda,setRejasSegunda] = useState('');
    const [rejas_LimonTercera,setRejasTercera] = useState('');
    const[pesoT_LimonVerde,setPesoTLimonVerde] = useState('');
    const[pesoT_LimonSegunda,setPesoTLimonSegunda] = useState('');
    const[pesoT_LimonTercera,setPesoTLimonTercera] = useState('');
    const [trabajadores,setTrabajadores] = useState('');
    const [id_Rancho,setId_Rancho] = useState('');


    const navigate = useNavigate();
    const { id } = useParams();
    const [carga, setCarga] = useState([]);

    useEffect(() => {
        CargaService.findById(id).then(response => {
            setfecha(response.data.fecha);
            setRejasVerde(response.data.rejas_LimonVerde);
            setRejasSegunda(response.data.rejas_LimonSegunda);
            setRejasTercera(response.data.rejas_LimonTercera);
            setPesoTLimonVerde(response.data.pesoT_LimonVerde);
            setPesoTLimonSegunda(response.data.pesoT_LimonSegunda);
            setPesoTLimonTercera(response.data.pesoT_LimonTercera);
            setTrabajadores(response.data.trabajadores);
            setId_Rancho(response.data.id_Rancho);
        }).catch(e => {
            console.log(e);
        })
    }, []);

    const saveCarga = (e) => {
        e.preventDefault();
        const carga = { fecha, rejas_LimonVerde, rejas_LimonSegunda, rejas_LimonTercera, pesoT_LimonVerde, pesoT_LimonSegunda, pesoT_LimonTercera, trabajadores, id_Rancho };
        if (id) {
            CargaService.update(id, carga).then(response => {
                navigate('/carga');
            }).catch(e => {
                console.log(e);
            })
        } else {
            CargaService.create(carga).then(response => {
                navigate('/carga');
            }).catch(e => {
                console.log(e);
            })
        }
    }

    const titulo = () => {
        if (id) {
            return <h2 className="text-center">Editar Carga</h2>
        } else {
            return <h2 className="text-center">Agregar Carga</h2>
        }
    }
    return (
        <div>
            <div className='container' id="formCarga">
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 classsName="text-center">
                            {titulo()}
                        </h2>
                        <h2 className='text-center'>Gestión de Cargas</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Fecha</label>
                                    <input type='date'
                                        name='NombreRancho'
                                        className='form-control'
                                        value={fecha}
                                        onChange={(e) => setfecha(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Rejas de limón Verde</label>
                                    <input type='number'step="0.01"
                                        placeholder='Ingrese las rejas de limón verde'
                                        name='rejasLimonVerde'
                                        className='form-control'
                                        value={rejas_LimonVerde}
                                        onChange={(e) => setRejasVerde(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Rejas de limón Segunda</label>
                                    <input type='number'step="0.01"
                                        placeholder='Ingrese las rejas de limón segunda'
                                        name='rejasLimonSegunda'
                                        className='form-control'
                                        value={rejas_LimonSegunda}
                                        onChange={(e) => setRejasSegunda(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Rejas de limón Tercera</label>
                                    <input type='number'step="0.01"
                                        placeholder='Ingrese las rejas de limón tercera'
                                        name='rejasLimonTercera'
                                        className='form-control'
                                        value={rejas_LimonTercera}
                                        onChange={(e) => setRejasTercera(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Total peso Limón Verde</label>
                                    <input type='number'step="0.01"
                                        placeholder='Ingrese el total del peso del limón verde'
                                        name='pesoLimónVerde'
                                        className='form-control'
                                        value={pesoT_LimonVerde}
                                        onChange={(e) => setPesoTLimonVerde(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Total peso Limón Segunda</label>
                                    <input type='number'step="0.01"
                                        placeholder='Ingrese el total del peso del limón segunda'
                                        name='pesoLimónsegunda'
                                        className='form-control'
                                        value={pesoT_LimonSegunda}
                                        onChange={(e) => setPesoTLimonSegunda(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Total peso Limón Tercera</label>
                                    <input type='number'step="0.01"
                                        placeholder='Ingrese el total del peso del limón tercera'
                                        name='pesoLimóntercera'
                                        className='form-control'
                                        value={pesoT_LimonTercera}
                                        onChange={(e) => setPesoTLimonTercera(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Total de trabajadores</label>
                                    <input type='number'
                                        placeholder='Ingrese el total de trabajadores'
                                        name='totalTrabajadores'
                                        className='form-control'
                                        value={trabajadores}
                                        onChange={(e) => setTrabajadores(e.target.value)}>
                                    </input>
                                </div>

                                <div className='form-group mb-2'>
                                    <label className='form-label'>Id Rancho</label>
                                    <input type='number'
                                        placeholder='Ingrese el Id del rancho'
                                        name='idRancho'
                                        className='form-control'
                                        value={id_Rancho}
                                        onChange={(e) => setId_Rancho(e.target.value)}>
                                    </input>
                                </div>

                                <button className='btn btn-success' onClick={(e) => saveCarga(e)}>Guardar</button>
                                &nbsp;&nbsp;
                                <Link to='/carga' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FormularioRanchoComponent;