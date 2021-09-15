import { useState } from 'react';
import '../../session.css';
import { useHistory } from 'react-router-dom';

function ResetUsuarioPass() {
    const history = useHistory();

    const [recoverCode, setRecoverCode] = useState('');
    const [newPassword, setNewPasswor] = useState(0);
    const [repeatPassword, setRepeatPassWord] = useState('');

    const [error, setError] = useState('');

    function onSubmitResetUsuarioPass(event) {
        event.preventDefault();
        const error = validateResetUsuariosPass(recoverCode);
        if (!error) {
            setError(error);
        }
        async function resetUsuarioPassConfirm() {
            const response = await fetch(
                'http://localhost:4000/usuarios/password/reset',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        recoverCode,
                        newPassword,
                        repeatPassword,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            } else {
                history.push('/login');
            }
        }
        resetUsuarioPassConfirm();
        setError('');
    }

    return (
        <div className="main_page_land">
            <div className="main_page_screens"></div>
            <div className="main_page_access">
                <div className="main_page_access_titles">
                    <h1 className="title_1">Actualiza la contraseña aquí</h1>
                    <p className="reset-text">
                        Hemos enviado a tú email un código de recuperación.
                    </p>
                </div>
                <div className="register-form">
                    <form
                        className="loginform"
                        onSubmit={onSubmitResetUsuarioPass}
                    >
                        <label>
                            <input
                                className="input"
                                value={recoverCode}
                                onChange={(event) =>
                                    setRecoverCode(event.target.value)
                                }
                                type="password"
                                placeholder="Código de recuperación"
                            ></input>
                        </label>
                        <label>
                            <input
                                className="input"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPasswor(event.target.value)
                                }
                                type="password"
                                placeholder="Introduce la contraseña nueva"
                            ></input>
                        </label>
                        <label>
                            <input
                                className="input"
                                value={repeatPassword}
                                onChange={(event) =>
                                    setRepeatPassWord(event.target.value)
                                }
                                type="password"
                                placeholder="Repite la nueva contraseña"
                            ></input>

                            <button className="button-forms" type="submit">
                                Actualizar
                            </button>
                            {error && (
                                <div className="error-label">{error} </div>
                            )}
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default ResetUsuarioPass;
//TODO
function validateResetUsuariosPass(
    recoverCode,
    newPassword,
    repeatNewPassWord
) {
    if (!recoverCode) {
        return 'El código de recuperación que estas introduceindo no es el correcto, anda corta y pega que te será más fácil';
    }
    if (!newPassword) {
        return 'A ver, ¿quieres cambiar la contraseña y no la estás introduciendo?';
    }
    if (!repeatNewPassWord) {
        return 'A ver, ¿quieres cambiar la contraseña y no la estás introduciendo?';
    }

    const isValidPassword = newPassword === repeatNewPassWord;
    if (!isValidPassword) {
        return 'Las contraseñas no coinciden, escríbela con calma, seguramente tu madre te dijo algún día que las prisas no son buenas';
    }
}
