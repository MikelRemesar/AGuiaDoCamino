import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="main_page_land">
            <div className="main_page_screens"></div>
            <div className="main_page_access">
                <div className="main_page_access_titles">
                    <h1 className="title_1">No te pierdas el camino.</h1>
                    <h1 className="title_2">Recórrelo con nosotros.</h1>
                </div>
                <div className="main_page_access_buttons">
                    <Link className="button_access" to="login">
                        Login
                    </Link>

                    <Link className="button_access" to="register">
                        Registrarse
                    </Link>
                </div>
                <div className="omit_access_button">
                    ¿No quieres registrarte?
                    <Link to="/tendencias"> Saltar este paso</Link>
                </div>
            </div>
        </div>
    );
}
export default Home;
