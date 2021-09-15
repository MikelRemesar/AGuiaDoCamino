export default function Result({ id, idUsuario, descripcion, url, likes }) {
    return (
        <a href={`/photos/${id}`} className="Result">
            <img src={url} alt="Imágen no disponible" />
        </a>
    );
}
