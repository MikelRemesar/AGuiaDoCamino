import { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import '../../session.css';

function ResetPassword() {
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    function onSubmitResetPassword(event) {
        event.preventDefault();
        const error = validateResetPassword(email);
        if (error) {
            setError(error);
            return;
        }
        async function resetPasswordConfirm() {
            const response = await fetch(
                'http://localhost:4000/usuarios/password/recover/',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setError(data.message);
                return;
            } else {
                history.push('/usuarios/password');
            }
        }
        resetPasswordConfirm();
        setError('');
    }
    return (
        <div className="main_page_land">
            <div className="main_page_screens"></div>
            <div className="main_page_access">
                <div className="main_page_access_titles">
                    <h1 className="title_1">Recupera tu contraseña</h1>
                </div>
                <div className="register-form">
                    <form onSubmit={onSubmitResetPassword} className="form">
                        <label>
                            Para recuperar la contraseña introduce el email:
                            <input
                                className="input"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                type="text"
                                placeholder="email"
                                pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                required
                            ></input>
                            {error && (
                                <div className="error-label">{error}</div>
                            )}
                        </label>
                        <button
                            className="button-forms"
                            type="submit"
                            value="Enviar"
                        >
                            Enviar
                        </button>
                        <Link to="/login" className="links">
                            <p>Ya tengo cuenta</p>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ResetPassword;
function validateResetPassword(email) {
    if (!email) {
        return 'Introduce el correo con el que te has registrado si quires cambiar la contraseña';
    }
}
