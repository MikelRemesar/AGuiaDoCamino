export default async function getUserPhotos({ keyword }) {
    return await fetch(`http://localhost:4000/usuarios/photos/all`)
        .then((res) => res.json())
        .then((response) => {
            const { data } = response;
            const images = data.map((image) => {
                const { url, descripcion, id, idUsuario, likes } = image;
                return { url, descripcion, id, idUsuario, likes };
            });
            if (keyword) {
                let newImages = images.filter((image) => {
                    if (image.idUsuario === Number(keyword)) {
                        return image;
                    }
                });
                return newImages;
            } else {
                return images;
            }
        });
}
