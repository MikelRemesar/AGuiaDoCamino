import './carrousel.css';
import HorizontalScroll from 'react-scroll-horizontal';
import AvatarTrendings from './AvatarTrendings';
function Carrousel() {
    return (
        <div>
            <div className="carrusel-fotos-perfil">
                <HorizontalScroll>
                    <div className="fotoperfil-container">
                        <AvatarTrendings />
                    </div>
                </HorizontalScroll>
            </div>
        </div>
    );
}
export default Carrousel;
