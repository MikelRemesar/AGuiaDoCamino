import Result from '../listofresults/Result';

function ListOfUserPhotos({ photos }) {
    return photos.map((singleImage) => (
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
export default ListOfUserPhotos;
