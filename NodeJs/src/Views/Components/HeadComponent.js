import { Link } from "react-router-dom";
export default function HeadComponent() {
    return (

        <div>
            <div>
                <footer>
                    <div>
                        <h1 id="title-footer" alt="Logotipo">Lemon Tree´s</h1>
                    </div>
                </footer>
                <Link to='/'>
                <img src='../Img/Logo.jpeg' id="imgLogoHome"></img>
                </Link>
            </div>
        </div>
    )
}