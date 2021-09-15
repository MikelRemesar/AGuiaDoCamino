import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import '../session.css';

function Login() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function onSubmitLogin(event) {
        event.preventDefault();

        async function performLogin() {
            const response = await fetch(
                'http://localhost:4000/usuarios/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
            } else {
                sessionStorage.setItem('idusuario', data.data.idUsuario);
                sessionStorage.setItem('token', data.data.token);

                history.push(`/tendencias`);
            }
        }
        performLogin();
    }
    return (
        <div className="main_page_land">
            <div className="main_page_screens"></div>
            <div className="main_page_access">
                <div className="main_page_access_titles">
                    <h1 className="title_1">
                        Bienvenido a la web del Camino de Santiago
                    </h1>
                </div>
                <div className="main_page_access_buttons">
                    <form onSubmit={onSubmitLogin} className="loginform">
                        <label className="datos-container-login">
                            <input
                                className="input"
                                value={email}
                                type="email"
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="email"
                                pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                required
                            />
                        </label>
                        <label className="datos-container">
                            <input
                                className="input"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="contraseña"
                                pattern="[A-Za-z0-9!?-]{6,12}"
                                required
                            />
                            {error && (
                                <div className="error-label">{error}</div>
                            )}
                        </label>
                        <div>
                            <button type="submit" className="button-forms">
                                Entrar
                            </button>
                            <div className="linkLogin">
                                <Link to="register" className="links">
                                    <p>No tengo cuenta</p>
                                </Link>
                                <Link to="resetpassword" className="links">
                                    <p>Has olvidado tú contraseña</p>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;
