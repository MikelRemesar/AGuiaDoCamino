import Result from './Result';
import { useEffect, useState } from 'react';
import getResults from '../../services/getResults';

function ListOfResults({ keyword = '' }) {
    const [search, setSearch] = useState([]);

    useEffect(
        function () {
            //Llamamos al fetch y seteamos los resultados en pase al keyword
            getResults({ keyword }).then((results) => {
                setSearch(results);
            });
        },
        [keyword]
    );
    return search.map((singleImage) => (
        // No usamos el [...singleImage] para identificar que parámetros se envían
        <Result
            key={singleImage.id}
            id={singleImage.id}
            idUsuario={singleImage.idUsuario}
            descripcion={singleImage.descripcion}
            url={singleImage.url}
            likes={singleImage.likes}
        />
    ));
}
export default ListOfResults;
