import Menu from '../../components/menu/menu';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListOfUserPhotos from '../../components/listofuserphotos/ListofUserPhotos';

import './profile.css';
import ShowNickname from '../../components/profile/ShowNickname';
import GetAvatarPhoto from '../../components/profile/GetAvatarPhoto';

import { MdAddAPhoto } from 'react-icons/md';
import imagennoperfil from '../../assets/imagennoperfil.png';

const idLogin = sessionStorage.getItem('idusuario');
const token = sessionStorage.getItem('token');

function Profile() {
    const { idUsuario } = useParams();
    const [user, setUser] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            const response = await fetch(
                `http://localhost:4000/usuarios/${idUsuario}`,
                {
                    method: 'GET',
                    headers: {
                        authorization: token,
                    },
                }
            );
            const data = await response.json();

            setUser(data.informacion);
            setPhotos(data.Fotos);
        };
        loadUser();
    }, [idUsuario]);

    const handleUpdateAvatar = async (e) => {
        try {
            const payload = new FormData();
            payload.append('photo', e.target.files[0]);

            const response = await fetch(
                `http://localhost:4000/usuarios/${idLogin}/photos`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: token,
                    },
                    body: payload,
                }
            );

            const json = await response.json();

            if (response.ok) {
                const { fotoperfil } = json.data;

                setUser({
                    ...user,
                    fotoperfil,
                });
            } else {
                throw new Error(json.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Menu />
            {user ? (
                <>
                    <div className="user-info-container">
                        <div className="user-avatar">
                            <GetAvatarPhoto
                                avatar={
                                    user.fotoperfil
                                        ? `http://localhost:4000/uploads/${user.fotoperfil}`
                                        : imagennoperfil
                                }
                                name={user.name}
                            />

                            {idUsuario === idLogin ? (
                                <form className="avatar-button">
                                    <label for="avatar">
                                        <MdAddAPhoto />
                                    </label>
                                    <input
                                        onChange={handleUpdateAvatar}
                                        type="file"
                                        id="avatar"
                                        style={{ display: 'none' }}
                                    />
                                </form>
                            ) : null}
                        </div>

                        <ShowNickname
                            className={'email'}
                            name={user.name}
                            nickname={user.nickname}
                        />
                    </div>
                    <div className="listofimages-profile ">
                        <ListOfUserPhotos photos={photos} />
                    </div>
                </>
            ) : (
                <div class="preloader"></div>
            )}
        </div>
    );
}
export default Profile;
