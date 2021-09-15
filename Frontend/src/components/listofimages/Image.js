import './listOfImages.css';

function Image({ url }) {
    return (
        <div className="imagesWall">
            <img src={url} alt="Fotos Subidas Por Peregrinos" />
        </div>
    );
}

export default Image;
