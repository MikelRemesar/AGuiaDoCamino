async function getLikes({ id }) {
    return await fetch(`http://localhost:4000/usuarios/photos/comments`)
        .then((res) => res.json())
        .then((response) => {
            const { data } = response;

            const likes = data.map((like) => {
                const {
                    id,
                    idImagen,
                    fechaCreacion,
                    comentario,
                    likes,
                    idUsuario,
                } = like;

                return {
                    id,
                    idImagen,
                    fechaCreacion,
                    comentario,
                    likes,
                    idUsuario,
                };
            });
            if (id) {
                let newLikes = likes.filter((like) => {
                    if (like.idImagen === Number(id) && like.likes === 1) {
                        return like;
                    }
                });
                return newLikes;
            } else {
                return likes;
            }
        });
}
export default getLikes;
