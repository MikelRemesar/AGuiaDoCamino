import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

import './modaleditprofile.css';
import './editprofile.css';
import imagennoperfil from '../../assets/imagennoperfil.png';

function EditCall() {
    const idUsuario = sessionStorage.getItem('idusuario');
    const tokenInfo = sessionStorage.getItem('token');
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await fetch(
                `http://localhost:4000/usuarios/${idUsuario}`,
                {
                    method: 'GET',
                    headers: {
                        authorization: tokenInfo,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            console.log(data);
            setUserInfo(data.informacion);
        };
        getUserInfo();
    }, [idUsuario]);

    const [error, setError] = useState();
    const [nombre, setNombre] = useState();

    const [email, setEmail] = useState();

    const [nickname, setNickName] = useState();

    const [oldPassword, setOldPassword] = useState(0);
    const [newPassword, setNewPassword] = useState(0);

    async function editName(event) {
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    nombre: nombre,
                },
            });
        } catch (error) {
            setError(error);
            console.log(error);
        }
    }
    async function editNickname(event) {
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    nickname: nickname,
                },
            });
        } catch (error) {
            setError(error);
        }
    }
    async function editMail(event) {
        event.preventDefault();
        try {
            const response = await axios({
                method: 'PUT',
                url: `http://localhost:4000/usuarios/${idUsuario}`,
                headers: {
                    authorization: tokenInfo,
                    'Content-Type': 'application/json',
                },
                data: {
                    email: email,
                },
            });
        } catch (error) {
            setError(error);
        }
    }

    async function editPassword(event) {
        event.preventDefault();
        const error = validatePassword(oldPassword, newPassword);

        if (error) {
            setError(error);
        } else {
            setError('');
        }

        const response = await axios({
            method: 'PUT',
            url: `http://localhost:4000/usuarios/${idUsuario}/password`,
            headers: {
                authorization: tokenInfo,
                'Content-Type': 'application/json',
            },
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
        });

        setError(error);
    }

    return (
        <div className="btn-group">
            <div className="modal-container-profile">
                <div className="main_profile_avatar">
                    {userInfo && (
                        <div>
                            <img
                                className="trendings-profile-photos"
                                alt="trendings"
                                src={
                                    userInfo.fotoperfil === null
                                        ? imagennoperfil
                                        : `http://localhost:4000/uploads/${userInfo.fotoperfil}`
                                }
                            ></img>

                            <p className="username-modal-edit">
                                {userInfo.name}
                            </p>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changename"
                >
                    Cambiar Nombre
                </button>
                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changenickname"
                >
                    Cambiar Nickname
                </button>

                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changeemail"
                >
                    Cambiar Email
                </button>
                <button
                    type="button"
                    className="open-modal-editCall"
                    data-open="changepassword"
                >
                    Cambiar Contraseña
                </button>
            </div>

            <div className="modal" id="changeemail">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar email
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        {userInfo && (
                            <div>
                                <img
                                    className="trendings-profile-options"
                                    alt="trendings"
                                    src={
                                        userInfo.fotoperfil === null
                                            ? imagennoperfil
                                            : `http://localhost:4000/uploads/${userInfo.fotoperfil}`
                                    }
                                ></img>
                            </div>
                        )}
                        <p className="instructions">
                            Para cambiar el Email solamente tendras que
                            escribirlo en el siguiente espacio, y hacer click en
                            el botón de confirmar cambios
                        </p>
                        <form className="editprofile_form">
                            <label className="change-container" for="email">
                                Escribe aqui el nuevo Email
                                <input
                                    type="email"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Introduce el nuevo email"
                                    className="change"
                                />
                            </label>

                            <input
                                className="upload-changes"
                                type="submit"
                                value="Confirmar Cambios"
                                onClick={editMail}
                            />
                        </form>
                    </section>
                </div>
            </div>
            <div className="modal" id="changename">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar Nombre
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>

                    <section className="modal-content">
                        {userInfo && (
                            <img
                                className="trendings-profile-options"
                                alt="trendings"
                                src={
                                    userInfo.fotoperfil === null
                                        ? imagennoperfil
                                        : `http://localhost:4000/uploads/${userInfo.fotoperfil}`
                                }
                            ></img>
                        )}
                        <p className="instructions">
                            Para cambiar el Nombre solamente tendras que
                            escribirlo en el siguiente espacio, y hacer click en
                            el botón de confirmar cambios
                        </p>
                        <form className="editprofile_form">
                            <label className="change-container" for="username">
                                Escribe aqui el nuevo Nombre
                                <input
                                    type="text"
                                    className="change"
                                    onChange={(event) =>
                                        setNombre(event.target.value)
                                    }
                                    placeholder="Introduce tu nuevo nombre"
                                />
                            </label>

                            <input
                                className="upload-changes"
                                type="submit"
                                value="Confirmar Cambios"
                                onClick={editName}
                            />
                        </form>
                    </section>
                </div>
            </div>

            <div className="modal" id="changenickname">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar Nickname
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        {userInfo && (
                            <img
                                className="trendings-profile-options"
                                alt="trendings"
                                src={
                                    userInfo.fotoperfil === null
                                        ? imagennoperfil
                                        : `http://localhost:4000/uploads/${userInfo.fotoperfil}`
                                }
                            ></img>
                        )}
                        <p className="instructions">
                            Para cambiar el Nickname solamente tendras que
                            escribirlo en el siguiente espacio, y hacer click en
                            el botón de confirmar cambios
                        </p>
                        <form className="editprofile_form">
                            <label className="change-container" for="nickname">
                                Escribe aqui el nuevo Nickname
                                <input
                                    type="text"
                                    className="change"
                                    onChange={(event) =>
                                        setNickName(event.target.value)
                                    }
                                    placeholder="Introduce tu nuevo nombre"
                                />
                            </label>

                            <input
                                className="upload-changes"
                                type="submit"
                                value="Confirmar Cambios"
                                onClick={editNickname}
                            />
                        </form>
                    </section>
                </div>
            </div>
            <div className="modal" id="changepassword">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Cambiar Contraseña
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        {userInfo && (
                            <img
                                className="trendings-profile-options"
                                alt="trendings"
                                src={
                                    userInfo.fotoperfil === null
                                        ? imagennoperfil
                                        : `http://localhost:4000/uploads/${userInfo.fotoperfil}`
                                }
                            ></img>
                        )}
                        <p className="instructions">
                            Para cambiar la contraseña, introduce la antigua
                            contraseña y despues la nueva (min 6 caracteres).
                        </p>
                        <form className="editprofile_form_password">
                            <label
                                className="change-container-password"
                                for="password"
                            >
                                Contraseña actual
                                <input
                                    pattern="[A-Za-z0-9!?-]{6,12}"
                                    type="password"
                                    onChange={(event) =>
                                        setOldPassword(event.target.value)
                                    }
                                    placeholder="Introduce tu contraseña"
                                    className="change"
                                />
                            </label>
                            <label
                                className="change-container-password"
                                for="password"
                            >
                                Nueva contraseña
                                <input
                                    pattern="[A-Za-z0-9!?-]{6,12}"
                                    type="password"
                                    onChange={(event) =>
                                        setNewPassword(event.target.value)
                                    }
                                    placeholder="Introduce la nueva contraseña"
                                    className="change"
                                />
                            </label>
                            <label
                                className="change-container-password"
                                for="password"
                            >
                                Repite la nueva contraseña
                                <input
                                    pattern="[A-Za-z0-9!?-]{6,12}"
                                    type="password"
                                    onChange={(event) =>
                                        setNewPassword(event.target.value)
                                    }
                                    placeholder="Repite la nueva contraseña"
                                    className="change"
                                />
                            </label>

                            <p className="message-password">{error}</p>

                            <input
                                className="upload-changes-password"
                                type="submit"
                                value="Confirmar Cambios"
                                onClick={editPassword}
                            />
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}
export default EditCall;
function validatePassword(oldPassword, newPassword) {
    const isValidPassword = newPassword === newPassword;
    if (!oldPassword) {
        return 'No puedes dejar ningún formulario vacio';
    }
    if (!newPassword) {
        return 'No puedes dejar ningún formulario vacio';
    }

    if (!isValidPassword) {
        return 'Las contraseñas deben coincidir';
    }
    if (isValidPassword) {
        return 'Se ha actualizado su contraseña';
    }
}
