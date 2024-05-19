import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BarraNavegacionComponent from "./Components/BarraNavegacionComponent";

export default function HomeApp() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    return (
        <div className='fondo1'>
        <div className="CentroC">
            <BarraNavegacionComponent />
            <div className="carousel-container">
                <Slider {...settings}>
                    <div className="carousel-item">
                        <Link to='/ventaForMonth'>
                            <img src="Img/BANNER4.png" alt="Venta" className="carousel-image" />
                            <p className="NameButtons">Ventas</p>
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link to='/cargaForMonth'>
                            <img src="Img/BANNER2.png" alt="Carga" className="carousel-image" />
                            <p className="NameButtons">Cargas</p>
                        </Link>
                    </div>
                    <div className="carousel-item">
                        <Link to='/reporte'>
                            <img src="Img/BANNER3.png" alt="Carga" className="carousel-image" />
                            <p className="NameButtons">Reportes</p>
                        </Link>
                    </div>
                </Slider>
            </div>
        </div>
        </div>
    );
}
