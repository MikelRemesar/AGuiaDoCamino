import Image from './Image';
import { useEffect, useState } from 'react';
import getImage from '../../services/getImage';
import axios from 'axios';
import Like from '../likes/Like';

export default function ListOfImages({ keyword = '' }) {
    const [search, setSearch] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [idOwner, setIdOwner] = useState(0);
    console.log('user photowall:', userInfo);
    console.log('idowner: ', idOwner);

    const idUsuario = idOwner;
    const tokenInfo = sessionStorage.getItem('token');

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
        } catch (error) {
            console.log('error: ', error);
        }
    }

    useEffect(
        function () {
            //Llamamos al fetch y seteamos los resultados en pase al keyword
            getImage({ keyword }).then((results) => {
                setSearch(results);
                setIdOwner(results[0].idUsuario);
                getUserInfo();
            });
        },

        [keyword]
    );

    return search.map((singleImage) => (
        // No usamos el [...singleImage] para identificar que parámetros se envían

        <div className="imagesWall_parent">
            <Image url={singleImage.url} />
            <div className="photoinfo">
                <p>{userInfo.nickname}</p>
                <p>{singleImage.descripcion ? '' : singleImage.descripcion}</p>
                <Like />
            </div>
        </div>
    ));
}
