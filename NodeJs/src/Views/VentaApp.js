import React, { useState, useEffect, useRef } from "react";
import VentaService from "../../src/Controllers/VentaService";
import CargaService from "../Controllers/CargaService";
import CompradorService from "../Controllers/CompradorService";
import { Link } from "react-router-dom";

export default function VentaApp() {
  const [venta, setVenta] = useState([]);
  const [cargas, setCargas] = useState([]);
  const [compradores, setCompradores] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const tableRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const [selectedVenta, setselectedVenta] = useState(null);

  const [ventaXmes, setVentaXmes] = useState([]);
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
    mesxprmex();
  }, []);
  const mesxprmex=() => {
    VentaService.findVentaXMonth().then((response) => {
      const venta = response.data;
      console.log("Ventas por mes: ", venta);
      setVentaXmes(response.data);
    });
  };
  useEffect(() => {
    const obtenerNombresCompradores = async () => {
      try {
        const nombresCompradres = await Promise.all(
          venta.map(async (venta) => {
            const response = await CompradorService.getNameComprador(
              venta.id_Venta
            );
            return response.data;
          })
        );
        setCompradores(nombresCompradres);
      } catch (error) {
        console.log(error);
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
        console.log(error);
      }
    };
    if (venta.length > 0) {
      obtenerNombresCompradores();
      obtenerIDCarga();
    }
  }, [venta]);

    const deleteVenta = (id) => {
      const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este registro?");
      if (confirmDelete) {
        VentaService.delete(id)
          .then((response) => {
            listarVenta();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

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
                  <th>Fecha</th>
                  <th>Id Carga</th>
                  <th>Nombre Comprador</th>
                </tr>
              </thead>
              <tbody>
                {venta.map((venta, index) => (
                  <tr
                    key={venta.id_Venta}
                    onClick={() => {
                      setSelectedRow(venta.id_Venta);
                      setShowButtons(true);
                      handleRowClick(venta.id_Venta);
                    }}
                  >
                    <td>{venta.id_Venta}</td>
                    <td>{venta.precio_LimonVerde}</td>
                    <td>{venta.precio_LimonSegunda}</td>
                    <td>{venta.precio_LimonTercera}</td>
                    <td>{venta.peso_Total}</td>
                    <td>{venta.pago_Total}</td>
                    <td>{venta.fecha}</td>
                    <td>{cargas[index]}</td>
                    <td>{compradores[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttonsInLine">
          {!showButtons && (
            <div>
              <Link to="/form-venta">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  {" "}
                  <img
                    src="icons/Insertar.png"
                    alt="Insertar Venta"
                    className="imgInsert"
                  ></img>
                  Insertar
                </button>
              </Link>
              <Link to="/form-venta">
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Buscar.png"
                    alt="Buscar venta"
                    className="imgBuscar"
                  ></img>
                  Consultar
                </button>
              </Link>
            </div>
          )}
          {selectedRow && showButtons && (
            <div className="butonsEditandDelete">
              <Link to={`/edit-venta/${selectedRow}`}>
                <button
                  type="button"
                  className="btn btn-success"
                  class="btnimagen"
                >
                  <img
                    src="icons/Actualizar.png"
                    alt="Editar venta"
                    className="imgEditar"
                  ></img>
                  Editar
                </button>
              </Link>
              <button
                onClick={() => deleteVenta(selectedRow)}
                className="btn btn-success"
                class="btnimagen"
                type="button"
              >
                <img
                  src="icons/Eliminar.png"
                  alt="Eliminar venta"
                  className="imgEliminar"
                ></img>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
