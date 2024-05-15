import { Link } from 'react-router-dom';
export default function HomeApp() {
    return (
        <div class="container" id="buttonsHome">
            <div class="btn-group" role="group" aria-label="Basic example">
                <div >
                    <Link to='/venta'><button type="button" class="btn btn-primary" >Venta</button></Link>
                    <Link to='/rancho'><button type="button" class="btn btn-primary">Rancho</button></Link>
                    <Link to='/carga'><button type="button" class="btn btn-primary">Carga</button></Link>
                    <Link to='/herramienta'><button type="button" class="btn btn-primary">Herramienta</button></Link>
                    <Link to='/trabajador'><button type="button" class="btn btn-primary">Trabajador</button></Link>
                </div>
                </div>
                <div class="btn-group" role="group" aria-label="Basic example">
                <div id="buttonsDown">
                <Link to='/pago_trabajador'><button type="button" class="btn btn-primary">Pago de Trabajador</button></Link>
                <Link to='/fertilizante'><button type="button" class="btn btn-primary">Fertilizante</button></Link>
                <Link to='/fertilizacion'><button type="button" class="btn btn-primary">Fertilización</button></Link>
                <Link to='/comprador'><button type="button" class="btn btn-primary">Comprador</button></Link>
                <Link to='/reporte'><button type="button" class="btn btn-primary">Reporte</button></Link>
                </div>
            </div>
            </div>
    )
}