import { Link } from 'react-router-dom';
export default function HomeApp() {
    return (
        <div class="btn-group" role="group" aria-label="Basic example">
            <center><div id="buttonsUp">
                <Link to='/venta'><button type="button" class="btn btn-primary" >Venta</button></Link>
                <button type="button" class="btn btn-primary">Rancho</button>
                <button type="button" class="btn btn-primary">Carga</button>
                <button type="button" class="btn btn-primary">Herramienta</button>
                <button type="button" class="btn btn-primary">Trabajador</button><br />
            </div></center>
            <div id="buttonsDown">
                <button type="button" class="btn btn-primary" >Pago Trabajador</button>
                <button type="button" class="btn btn-primary">Fertilizante</button>
                <button type="button" class="btn btn-primary">Fertilización</button>
                <button type="button" class="btn btn-primary">Comprador</button>
                <button type="button" class="btn btn-primary">Reporte</button>
            </div>
        </div >

    )
}