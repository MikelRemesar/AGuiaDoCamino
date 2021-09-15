import React, { useState } from 'react';

function SelectPhoto() {
    let token = sessionStorage.getItem('token');
    let idUsuario = sessionStorage.getItem('idusuario');

    let [fotoperfil, setFotoPerfil] = useState('');
    async function imageProfile() {
        const response = await fetch(
            `http://localhost:4000/usuarios/${idUsuario}`,
            {
                method: 'PUT',
                headers: {
                    authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
                body: {
                    fotoperfil: fotoperfil,
                },
            }
        );

        fotoperfil = response.json();
        setFotoPerfil();
    }

    imageProfile();

    return <div onClick={setFotoPerfil}>{fotoperfil}</div>;
}

export default SelectPhoto;
