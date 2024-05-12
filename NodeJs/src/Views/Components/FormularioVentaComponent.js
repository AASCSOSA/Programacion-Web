import React, { useState, useEffect } from "react";
import VentaService from "../../Controllers/VentaService";
import CompradorService from "../../Controllers/CompradorService";
import CargaService from "../../Controllers/CargaService";
import { Link, useNavigate, useParams } from "react-router-dom";

export const FormularioVentaComponent = () => {
  const [pago_Total, setPagoTotal] = useState("");
  const [peso_Total, setPesoTotal] = useState("");
  const [precio_LimonVerde, setPrecioLimonVerde] = useState("");
  const [precio_LimonSegunda, setPrecioLimonSegunda] = useState("");
  const [precio_LimonTercera, setPrecioLimonTercera] = useState("");
  const [id_Carga, setIdCarga] = useState("");
  const [id_Comprador, setIdComprador] = useState("");
  const [fecha, setFecha] = useState('');
  const [compradores, setCompradores] = useState([]);
  const [cargas, setCargas] = useState([]); // Lista de ranchos

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    CompradorService.findAll()
      .then((response) => {
        setCompradores(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (id) {
      VentaService.findById(id)
        .then((response) => {
          const venta = response.data;
          setPagoTotal(venta.pago_Total);
          setPesoTotal(venta.peso_Total);
          setPrecioLimonVerde(venta.precio_LimonVerde);
          setPrecioLimonSegunda(venta.precio_LimonSegunda);
          setPrecioLimonTercera(venta.precio_LimonTercera);
          setFecha(venta.fecha);
          VentaService.findByIdCarga(id)
            .then((response2) => {
              const carga = response2.data;
              setIdCarga(carga.id_Carga);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.error("Error al obtener la venta:", error);
        });

      VentaService.findByIdComprador(id)
        .then((response3) => {
          const comprador = response3.data;
          setIdComprador(comprador.id_Comprador);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const saveVenta = (e) => {
    e.preventDefault();
    const carga = { id_Carga };
    const comprador = { id_Comprador };
    const venta = {
      pago_Total,
      peso_Total,
      precio_LimonVerde,
      precio_LimonSegunda,
      precio_LimonTercera,
      carga,
      comprador,
      fecha
    };
    if (id) {
      VentaService.update(venta, id)
        .then((response) => {
          navigate("/venta");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      VentaService.create(venta)
        .then((response) => {
          navigate("/venta");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const titulo = () => {
    if (id) {
      return <h2 className="text-center">Editar Venta</h2>;
    } else {
      return <h2 className="text-center">Agregar Venta</h2>;
    }
  };
  return (
    <div>
      <div className="container" id="formVenta">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 classsName="text-center">{titulo()}</h2>
            <h2 className="text-center">Gestión de Ventas</h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label">Precio Limón Verde</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el precio del limón verde"
                    name="precioLimonVerde"
                    className="form-control"
                    value={precio_LimonVerde}
                    onChange={(e) => setPrecioLimonVerde(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Precio Limón Segunda</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el precio del limón segunda"
                    name="precioLimonSegunda"
                    className="form-control"
                    value={precio_LimonSegunda}
                    onChange={(e) => setPrecioLimonSegunda(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Precio Limón Tercera</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el precio del limón tercera"
                    name="precioLimonTercera"
                    className="form-control"
                    value={precio_LimonTercera}
                    onChange={(e) => setPrecioLimonTercera(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Peso Total</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el peso total de la venta"
                    name="pesoTotal"
                    className="form-control"
                    value={peso_Total}
                    onChange={(e) => setPesoTotal(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Pago Total</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Ingrese el pago total $"
                    name="precioTotal"
                    className="form-control"
                    value={pago_Total}
                    onChange={(e) => setPagoTotal(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Fecha</label>
                  <input
                    type="date"
                    name="fechaVenta"
                    className="form-control"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label">Id de la carga</label>
                  <input
                    type="number"
                    placeholder="Ingrese el ID de la carga"
                    name="idCarga"
                    className="form-control"
                    value={id_Carga}
                    onChange={(e) => setIdCarga(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="form-label">Seleccione el Comprador</label>
                  <select
                    className="form-select"
                    value={id_Comprador}
                    onChange={(e) => setIdComprador(e.target.value)}
                  >
                    <option value="">Seleccione el Comprador</option>
                    {compradores.map((comprador) => (
                      <option
                        key={comprador.id_Comprador}
                        value={comprador.id_Comprador}
                      >
                        {comprador.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="btn btn-success"
                  onClick={(e) => saveVenta(e)}
                >
                  Guardar
                </button>
                &nbsp;&nbsp;
                <Link to="/venta" className="btn btn-danger">
                  Cancelar
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormularioVentaComponent;
