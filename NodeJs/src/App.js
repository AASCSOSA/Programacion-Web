import "./App.css";
import HomeApp from "./Views/HomeApp";
import VentaApp from "./Views/VentaApp";
import HeadComponent from "./Views/Components/HeadComponent";
import RanchoApp from "./Views/RanchoApp";
import CargaApp from "./Views/CargaApp";
import HerramientaApp from "./Views/HerramientaApp";
import TrabajadorApp from "./Views/TrabajadorApp";
import Pago_TrabajadorApp from "./Views/Pago_TrabajadorApp";
import CompradorApp from "./Views/CompradorApp";
import FertilizanteApp from "./Views/FertilizanteApp";
import FertilizacionApp from "./Views/FertilizacionApp";
import VentaForMonth from "./Views/VentaForMonth";
import CargaForMonth from "./Views/CargaForMonth";
import FertilizacionForMonth from "./Views/FertilizacionForMonth";
import Pago_TrabajadoForMonth from "./Views/Pago_TrabajadorForMonth";

import FormularioRanchoComponent from "./Views/Components/FormularioRanchoComponent";
import FormularioCargaComponent from "./Views/Components/FormularioCargaComponent";
import FormularioHerramientaComponent from "./Views/Components/FormularioHerramientaComponent";
import FormularioTrabajadorComponent from "./Views/Components/FormularioTrabajadorComponent";
import FormularioPago_TrabajadorComponent from "./Views/Components/FormularioPago_TrabajadorComponent";
import FormularioCompradorComponent from "./Views/Components/FormularioCompradorComponent";
import FormularioVentaComponent from "./Views/Components/FormularioVentaComponent";
import FormularioFertilizanteComponent from "./Views/Components/FormularioFertilizanteComponent";
import FormularioFertilizacionComponent from "./Views/Components/FormularioFertilizacionComponent";

import ReporteApp from "./Views/ReporteApp";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeadComponent />
        <Routes>
          <Route exact path="/" element={<HomeApp />} />
          <Route path="/venta" element={<VentaApp />} />
          <Route path="/rancho" element={<RanchoApp />} />
          <Route path="/carga" element={<CargaApp />} />
          <Route path="/herramienta" element={<HerramientaApp />} />
          <Route path="/trabajador" element={<TrabajadorApp />} />
          <Route path="/pago_trabajador" element={<Pago_TrabajadorApp />} />
          <Route path="/comprador" element={<CompradorApp />} />
          <Route path="/fertilizante" element={<FertilizanteApp />} />
          <Route path="/fertilizacion" element={<FertilizacionApp />} />
          <Route path="/ventaForMonth" element={<VentaForMonth />} />
          <Route path="/cargaForMonth" element={<CargaForMonth />} />
          <Route
            path="/fertilizacionForMonth"
            element={<FertilizacionForMonth />}
          />
          <Route
            path="/pago_trabajadorForMonth"
            element={<Pago_TrabajadoForMonth />}
          />

          <Route path="/form-rancho" element={<FormularioRanchoComponent />} />
          <Route
            path="/edit-rancho/:id"
            element={<FormularioRanchoComponent />}
          />
          <Route path="/form-carga" element={<FormularioCargaComponent />} />
          <Route
            path="/edit-carga/:id"
            element={<FormularioCargaComponent />}
          />
          <Route
            path="/form-herramienta"
            element={<FormularioHerramientaComponent />}
          />
          <Route
            path="/edit-herramienta/:id_Herramienta"
            element={<FormularioHerramientaComponent />}
          />
          <Route
            path="/form-trabajador"
            element={<FormularioTrabajadorComponent />}
          />
          <Route
            path="/edit-trabajador/:id_Trabajador"
            element={<FormularioTrabajadorComponent />}
          />
          <Route
            path="/form-pago_trabajador"
            element={<FormularioPago_TrabajadorComponent />}
          />
          <Route
            path="/edit-pago_trabajador/:id_Pago_Trabajador"
            element={<FormularioPago_TrabajadorComponent />}
          />
          <Route
            path="/form-comprador"
            element={<FormularioCompradorComponent />}
          />
          <Route
            path="/edit-comprador/:id"
            element={<FormularioCompradorComponent />}
          />
          <Route path="/form-venta" element={<FormularioVentaComponent />} />
          <Route
            path="/edit-venta/:id"
            element={<FormularioVentaComponent />}
          />
          <Route
            path="/form-fertilizante"
            element={<FormularioFertilizanteComponent />}
          />
          <Route
            path="/edit-fertilizante/:id_Fertilizante"
            element={<FormularioFertilizanteComponent />}
          />
          <Route
            path="/form-fertilizacion"
            element={<FormularioFertilizacionComponent />}
          />
          <Route
            path="/edit-fertilizacion/:id_Fertilizacion"
            element={<FormularioFertilizacionComponent />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
