import { useState } from 'react';
import '../session.css';
import { Link } from 'react-router-dom';

function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [nickname, setNickName] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [error, setError] = useState(null);

    function onSubmitRegister(event) {
        event.preventDefault();

        const error = validatePassword(password, repeatPassword);

        if (error) {
            setError(error);
            return;
        }

        async function registerConfirm() {
            const response = await fetch('http://localhost:4000/usuarios/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    nickname,
                }),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                setError(data.message);
                setConfirmEmail('');
                return;
            } else {
                setConfirmEmail(
                    `Haz click en el enlace de tu correo para activarte como usuario`
                );
            }
        }
        registerConfirm();
    }

    return (
        <div className="main_page_land">
            <div className="main_page_screens"></div>
            <div className="main_page_access">
                <div className="main_page_access_titles">
                    <h1 className="title_1">Disfruta con nosotros el Camino</h1>
                </div>
                <div className="register-form">
                    <form onSubmit={onSubmitRegister} className="form">
                        <label className="datos-container">
                            <input
                                className="input"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                type="text"
                                placeholder="Ingrese su Nombre y Apellidos"
                                pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,48}"
                                required
                            />
                        </label>
                        <label className="datos-container">
                            <input
                                className="input"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                type="email"
                                placeholder="Ingrese su email"
                                pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                required
                            />
                        </label>
                        <label className="datos-container">
                            <input
                                className="input"
                                value={nickname}
                                onChange={(event) =>
                                    setNickName(event.target.value)
                                }
                                type="text"
                                placeholder="Ingrese el Nombre de Usuario"
                                pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'- 0-9]{2,48}"
                                required
                            />
                        </label>
                        <label className="datos-container">
                            <input
                                className="input"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                type="password"
                                placeholder="Ingrese su Contraseña"
                                pattern="[A-Za-z0-9!?-]{6,12}"
                                required
                            />

                            <label className="datos-container">
                                <input
                                    className="input"
                                    value={repeatPassword}
                                    onChange={(event) =>
                                        setRepeatPassword(event.target.value)
                                    }
                                    type="password"
                                    placeholder="Repita su Contraseña"
                                    pattern="[A-Za-z0-9!?-]{6,12}"
                                    required
                                />
                            </label>
                            <div>
                                <p className="pterminos">
                                    Al hacer clic en Registrar, aceptas nuestros
                                    términos y condiciones.
                                </p>
                                <button className="button-forms" type="submit">
                                    Registrar
                                </button>
                            </div>
                            <Link to="/login" className="links">
                                <p>Ya tengo cuenta</p>
                            </Link>

                            {confirmEmail && <div>{confirmEmail} </div>}
                            <p>{error}</p>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;

function validatePassword(password, repeatPassword) {
    const isValidPassword = password === repeatPassword;

    if (!isValidPassword) {
        return 'Las contraseñas deben coincidir';
    }
}
