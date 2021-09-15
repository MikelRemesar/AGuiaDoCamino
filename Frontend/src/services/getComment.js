async function getComment({ keyword }) {
    return await fetch(`http://localhost:4000/usuarios/photos/comments`)
        .then((res) => res.json())
        .then((response) => {
            const { data } = response;
            const images = data.map((image) => {
                const { id, idImagen, fechaCreacion, comentario, idUsuario } =
                    image;

                return { id, idImagen, fechaCreacion, comentario, idUsuario };
            });
            if (keyword) {
                let newImages = images.filter((image) => {
                    if (
                        image.idImagen === Number(keyword) &&
                        image.comentario !== null
                    ) {
                        return image;
                    }
                });
                return newImages;
            } else {
                return images;
            }
        });
}

export default getComment;
