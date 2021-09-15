function ImagesProfile({ id, idUsuario, descripcion, url, likes }) {
    return (
        <div>
            <div className="images-profile">
                <img src={url} alt="Fotos Subidas Por Peregrinos" />
            </div>
        </div>
    );
}

export default ImagesProfile;
