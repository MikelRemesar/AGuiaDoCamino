import ImagesProfile from './images-profile';
import { useEffect, useState } from 'react';
import getProfilePhotos from './getProfilePhotos';

export default function ListProfilePhotos({ keyword = '' }) {
    const [search, setSearch] = useState([]);

    useEffect(
        function () {
            //Llamamos al fetch y seteamos los resultados en pase al keyword
            getProfilePhotos({ keyword }).then((results) => {
                setSearch(results);
            });
        },
        [keyword]
    );

    return search.map((singleImage) => (
        // No usamos el [...singleImage] para identificar que parámetros se envían

        <ImagesProfile
            key={singleImage.id}
            id={singleImage.id}
            idUsuario={singleImage.idUsuario}
            descripcion={singleImage.descripcion}
            url={singleImage.url}
            likes={singleImage.likes}
        />
    ));
}
