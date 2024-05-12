import React, {useState,useEffect} from 'react';
import VentaService from '../../src/Controllers/VentaService'
import CargaService from '../Controllers/CargaService';
import CompradorService from '../Controllers/CompradorService';
import { Link, useNavigate, useParams } from 'react-router-dom';
export default function VentaApp(){
    const [venta,setVenta]=useState([]);
    const [cargas,setCargas]=useState([]);
    const [compradores,setCompradores]=useState([]);

    const navigate = useNavigate();
    const { id } = useParams();
  
    const listarVenta = () => {
      VentaService.findAll()
        .then((response) => {
          setVenta(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      listarVenta();
    }, []);

    useEffect(() => {
      const obtenerNombresCompradores = async () => {
        try {
          const nombresCompradres = await Promise.all(
            venta.map(async (venta) => {
              const response = await CompradorService.getNameComprador(venta.id_Venta);
              return response.data;
            })
          );
          setCompradores(nombresCompradres);
        } catch (error) {
        }
      };
      const obtenerIDCarga = async () => {
        try {
          const idCargas = await Promise.all(
            venta.map(async (venta) => {
              const response = await CargaService.getIdCarga(venta.id_Venta);
              return response.data;
            })
          );
          setCargas(idCargas);
        } catch (error) {
        }
      };
      if (venta.length > 0) {
        obtenerNombresCompradores();
        obtenerIDCarga();
      }
    }, [venta]);

    const deleteVenta = (id) => {
      CargaService.delete(id)
        .then((response) => {
          listarVenta();
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    return (
      <div >
        <footer className="tittleFrm">Venta</footer>
        <div className="container">
          <div className="table-container">
            <table className="table" id="tableVenta">
              <thead className="table-dark">
                <tr>
                  <th>Id Venta</th>
                  <th>Precio Limón Verde</th>
                  <th>Precio Limón Segunda</th>
                  <th>Precio Limón Tercera</th>
                  <th>Peso Total</th>
                  <th>Pago Total</th>
                  <th>Fec</th>
                  <th>Id Carga</th>
                  <th>Nombre Comprador</th>
                </tr>
              </thead>
              <tbody>
                {venta.map((venta, index) => (
                  <tr key={venta.id_Venta}>
                    <td>{venta.id_Venta}</td>
                    <td>{venta.precio_LimonVerde}</td>
                    <td>{venta.precio_LimonSegunda}</td>
                    <td>{venta.precio_LimonTercera}</td>
                    <td>{venta.peso_Total}</td>
                    <td>{venta.pago_Total}</td>
                    <td>{venta.fecha}</td>
                    <td>{cargas[index]}</td>
                    <td>{compradores[index]}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        to={`/edit-venta/${venta.id_Venta}`}
                      >
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteVenta(venta.id_Venta)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/form-venta">
            <button type="button" className="btn btn-success" >
              Insertar
            </button>
          </Link>
          <Link to="/form-venta">
            <button type="button" className="btn btn-success" >
              Consultar
            </button>
          </Link>
        </div>
      </div>
    );
}