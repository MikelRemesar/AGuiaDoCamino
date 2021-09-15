import React, { useState, useEffect } from 'react';
import './carrousel.css';
// import imagennoperfil from '../../../assets/imagennoperfil.png';
import imagennoperfil from '../../assets/imagennoperfil.png';

function AvatarTrendings() {
    let [showAvatar, setShowAvatar] = useState([]);

    async function takePhoto() {
        const response = await fetch(
            `http://localhost:4000/usuarios/all/users`,
            {
                method: 'GET',
            }
        );
        const data = await response.json();
        const fotoperfil = data.usuario;
        const arrayAvatar = [];

        for (let i = 0; i < fotoperfil.length; i++) {
            const profilePhoto = data.usuario[i];
            arrayAvatar.push(profilePhoto);
        }

        setShowAvatar(arrayAvatar);
    }
    useEffect(() => {
        takePhoto();
    }, []);

    return showAvatar.map((avatar) => (
        <a href={`/perfil/${avatar.id}`} className="links-profiles">
            <img
                className="trendings-profile-photos"
                alt="trendings"
                src={
                    avatar.fotoperfil === null
                        ? imagennoperfil
                        : `http://localhost:4000/uploads/${avatar.fotoperfil}`
                }
            ></img>
            <p>{avatar.nickname}</p>
        </a>
    ));
}
export default AvatarTrendings;
