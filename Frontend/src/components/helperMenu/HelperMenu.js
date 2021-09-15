import './helpermenu.css';
import { MdAddAPhoto } from 'react-icons/md';
import { GoGear } from 'react-icons/go';
import UploadImage from '../uploadimage/UploadImage';
import EditProfile from '../editprofile/EditProfile';
import EditCall from '../editprofile/EditCall';
import React, { useState } from 'react';
import axios from 'axios';
export default function HelperMenu(props) {
    const openEls = document.querySelectorAll('[data-open]');
    const closeEls = document.querySelectorAll('[data-close]');
    const isVisible = 'is-visible';

    for (const el of openEls) {
        el.addEventListener('click', function () {
            const modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible);
        });
    }

    for (const el of closeEls) {
        el.addEventListener('click', function () {
            this.parentElement.parentElement.parentElement.classList.remove(
                isVisible
            );
        });
    }

    document.addEventListener('click', (e) => {
        if (e.target === document.querySelector('.modal.is-visible')) {
            document
                .querySelector('.modal.is-visible')
                .classList.remove(isVisible);
        }
    });

    document.addEventListener('keyup', (e) => {
        // if we press the ESC
        if (e.key === 'Escape' && document.querySelector('.modal.is-visible')) {
            document
                .querySelector('.modal.is-visible')
                .classList.remove(isVisible);
        }
    });
    const tokenInfo = sessionStorage.getItem('token');
    const idUsuario = sessionStorage.getItem('idusuario');

    const [userInfo, setUserInfo] = useState();
    // Solicitud GET USERINFO
    if (!userInfo) {
        async function getUserInfo() {
            try {
                const response = await axios({
                    method: 'GET',
                    url: `http://localhost:4000/usuarios/${idUsuario}`,
                    headers: {
                        authorization: tokenInfo,
                        'Content-Type': 'application/json',
                    },
                });
                setUserInfo(response.data.informacion);
            } catch (error) {}
        }
        getUserInfo();
    }
    return (
        <div className="btn-group-options">
            <button
                type="button"
                className="open-modal"
                data-open="uploadimage"
            >
                <MdAddAPhoto />
                <p>Subir imagen</p>
            </button>
            <button
                type="button"
                className="open-modal"
                data-open="editprofile"
            >
                <GoGear />
                <p>Opciones de perfil</p>
            </button>

            <div className="modal" id="editprofile">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Editar perfil
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        <EditCall />
                    </section>
                </div>
            </div>

            <div className="modal" id="uploadimage">
                <div className="modal-dialog">
                    <header className="modal-header">
                        Sube una foto
                        <button
                            className="close-modal"
                            aria-label="close modal"
                            data-close
                        >
                            ✕
                        </button>
                    </header>
                    <section className="modal-content">
                        <UploadImage />
                    </section>
                </div>
            </div>
        </div>
    );
}
