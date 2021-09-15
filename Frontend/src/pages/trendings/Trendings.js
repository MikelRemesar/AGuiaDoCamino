// import FotosUsuarios from '../componenetesmenunologueado/fotosUsarios';
import Menu from '../../components/menu/menu';
import ListOfResults from '../../components/listofresults/ListOfResults';
import Carrousel from '../../components/carrousel/carrousel';
import '../search/search.css';
export default function Trendings() {
    const keyword = '';

    return (
        <div>
            <Menu />
            <Carrousel />
            <div className="showsearch-container">
                <ListOfResults keyword={keyword} />
            </div>
        </div>
    );
}
